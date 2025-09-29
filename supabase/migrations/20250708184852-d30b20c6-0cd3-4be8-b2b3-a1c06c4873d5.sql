
-- Create enum for booking status
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- Create enum for admin roles
CREATE TYPE admin_role AS ENUM ('admin', 'super_admin');

-- Create bookings table to store all booking form submissions
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  organization_number TEXT NOT NULL,
  industry TEXT NOT NULL,
  company_size TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  current_situation TEXT[] NOT NULL,
  challenges TEXT[] NOT NULL,
  additional_info TEXT,
  status booking_status DEFAULT 'pending',
  booking_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create booking_limits table to manage daily/weekly/monthly limits
CREATE TABLE public.booking_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_limit INTEGER DEFAULT 2,
  weekly_limit INTEGER DEFAULT 10,
  monthly_limit INTEGER DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default booking limits
INSERT INTO public.booking_limits (daily_limit, weekly_limit, monthly_limit) 
VALUES (2, 10, 30);

-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role admin_role DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Create email_templates table for automatic email notifications
CREATE TABLE public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default email template for booking confirmation
INSERT INTO public.email_templates (name, subject, html_content, text_content) VALUES 
('booking_confirmation', 'Tack för din bokningsförfrågan - ReRedo', 
'<h1>Tack för din bokningsförfrågan!</h1><p>Vi har mottagit din förfrågan om en kostnadsfri konsultation. Vi kontaktar dig inom 24 timmar för att boka en lämplig tid.</p><p>Med vänliga hälsningar,<br>ReRedo Team</p>',
'Tack för din bokningsförfrågan! Vi har mottagit din förfrågan om en kostnadsfri konsultation. Vi kontaktar dig inom 24 timmar för att boka en lämplig tid. Med vänliga hälsningar, ReRedo Team');

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = $1
  );
$$;

-- RLS Policies for bookings (admins can access all, others can only insert)
CREATE POLICY "Anyone can insert bookings" ON public.bookings
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can view all bookings" ON public.bookings
  FOR SELECT 
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update bookings" ON public.bookings
  FOR UPDATE 
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- RLS Policies for booking_limits (admins only)
CREATE POLICY "Admins can manage booking limits" ON public.booking_limits
  FOR ALL 
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- RLS Policies for admin_users (admins only)
CREATE POLICY "Admins can manage admin users" ON public.admin_users
  FOR ALL 
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- RLS Policies for email_templates (admins only)
CREATE POLICY "Admins can manage email templates" ON public.email_templates
  FOR ALL 
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Function to get booking counts for date range
CREATE OR REPLACE FUNCTION public.get_booking_counts(
  start_date DATE,
  end_date DATE
)
RETURNS TABLE (
  date DATE,
  count BIGINT
)
LANGUAGE SQL
STABLE
AS $$
  SELECT 
    date_trunc('day', created_at)::DATE as date,
    COUNT(*) as count
  FROM public.bookings
  WHERE created_at::DATE BETWEEN start_date AND end_date
    AND status != 'cancelled'
  GROUP BY date_trunc('day', created_at)::DATE
  ORDER BY date;
$$;

-- Function to check if booking is allowed for a specific date
CREATE OR REPLACE FUNCTION public.can_book_on_date(check_date DATE)
RETURNS BOOLEAN
LANGUAGE PLPGSQL
STABLE
AS $$
DECLARE
  limits RECORD;
  daily_count INTEGER;
  weekly_count INTEGER;
  monthly_count INTEGER;
  week_start DATE;
  month_start DATE;
BEGIN
  -- Get current limits
  SELECT daily_limit, weekly_limit, monthly_limit 
  INTO limits
  FROM public.booking_limits 
  LIMIT 1;
  
  -- Calculate date ranges
  week_start := date_trunc('week', check_date)::DATE;
  month_start := date_trunc('month', check_date)::DATE;
  
  -- Get daily count
  SELECT COUNT(*) INTO daily_count
  FROM public.bookings
  WHERE created_at::DATE = check_date
    AND status != 'cancelled';
  
  -- Get weekly count
  SELECT COUNT(*) INTO weekly_count
  FROM public.bookings
  WHERE created_at::DATE >= week_start
    AND created_at::DATE <= check_date
    AND status != 'cancelled';
  
  -- Get monthly count
  SELECT COUNT(*) INTO monthly_count
  FROM public.bookings
  WHERE created_at::DATE >= month_start
    AND created_at::DATE <= check_date
    AND status != 'cancelled';
  
  -- Check if any limits are exceeded
  RETURN (daily_count < limits.daily_limit 
    AND weekly_count < limits.weekly_limit 
    AND monthly_count < limits.monthly_limit);
END;
$$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_bookings_updated_at 
  BEFORE UPDATE ON public.bookings 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_booking_limits_updated_at 
  BEFORE UPDATE ON public.booking_limits 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at 
  BEFORE UPDATE ON public.admin_users 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at 
  BEFORE UPDATE ON public.email_templates 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
