-- Create enum for company types
CREATE TYPE company_type AS ENUM ('AB', 'EF');

-- Create enum for package types
CREATE TYPE package_tier AS ENUM ('basic', 'standard', 'professional', 'premium', 'enterprise');

-- Create pricing packages table
CREATE TABLE pricing_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  company_type company_type NOT NULL,
  package_tier package_tier NOT NULL,
  monthly_price DECIMAL(10, 2) NOT NULL,
  annual_price DECIMAL(10, 2),
  features JSONB,
  included_services TEXT[],
  max_transactions INTEGER,
  max_employees INTEGER,
  support_level TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for active packages
CREATE INDEX idx_pricing_packages_active ON pricing_packages(company_type, is_active) WHERE is_active = true;

-- Create RLS policies
ALTER TABLE pricing_packages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to pricing packages
CREATE POLICY "Public can view active pricing packages" ON pricing_packages
  FOR SELECT
  USING (is_active = true);

-- Only authenticated admins can manage pricing packages
CREATE POLICY "Admins can manage pricing packages" ON pricing_packages
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pricing_packages_updated_at BEFORE UPDATE ON pricing_packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert AB packages (5 packages for Aktiebolag)
INSERT INTO pricing_packages (name, description, company_type, package_tier, monthly_price, display_order, included_services) VALUES
('AB Bas', 'Perfekt för nystartade aktiebolag', 'AB', 'basic', 1200.00, 1,
  ARRAY['Löpande bokföring', 'Momsdeklaration', 'Arbetsgivardeklarationer', 'Årsbokslut']),
('AB Standard', 'För växande aktiebolag', 'AB', 'standard', 2400.00, 2,
  ARRAY['Allt i Bas', 'Månadsrapporter', 'Leverantörsbetalningar', 'Kundfakturering']),
('AB Professional', 'För etablerade aktiebolag', 'AB', 'professional', 3600.00, 3,
  ARRAY['Allt i Standard', 'KPI-uppföljning', 'Budgetarbete', 'Kvartalsgenomgång']),
('AB Premium', 'Komplett ekonomistyrning', 'AB', 'premium', 4800.00, 4,
  ARRAY['Allt i Professional', 'Likviditetsprognoser', 'Strategisk rådgivning', 'Månadsgenomgång']),
('AB Enterprise', 'Skräddarsydd lösning', 'AB', 'enterprise', 6000.00, 5,
  ARRAY['Allt i Premium', 'Dedikerad ekonomichef', 'Veckovis uppföljning', 'Obegränsad rådgivning']);

-- Insert EF packages (3 packages for Enskild firma)
INSERT INTO pricing_packages (name, description, company_type, package_tier, monthly_price, display_order, included_services) VALUES
('EF Start', 'För enskilda firmor som just startat', 'EF', 'basic', 700.00, 1,
  ARRAY['Löpande bokföring', 'Momsdeklaration', 'Deklaration', 'Digital hantering']),
('EF Växande', 'För enskilda firmor i tillväxt', 'EF', 'standard', 1400.00, 2,
  ARRAY['Allt i Start', 'Månadsrapporter', 'Kvartalsgenomgång', 'Skatteplanering']),
('EF Professionell', 'För etablerade enskilda firmor', 'EF', 'professional', 2100.00, 3,
  ARRAY['Allt i Växande', 'KPI-uppföljning', 'Prognoser', 'Månadsgenomgång', 'Strategisk rådgivning']);