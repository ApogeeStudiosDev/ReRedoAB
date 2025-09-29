
-- Phase 4: Database Enhancements for CRM functionality

-- Extend booking status enum with more granular statuses
ALTER TYPE booking_status ADD VALUE 'in_progress';
ALTER TYPE booking_status ADD VALUE 'rescheduled';
ALTER TYPE booking_status ADD VALUE 'no_show';
ALTER TYPE booking_status ADD VALUE 'follow_up_needed';

-- Create client interaction types enum
CREATE TYPE client_interaction_type AS ENUM (
  'email', 'phone', 'meeting', 'note', 'booking_created', 
  'booking_updated', 'booking_cancelled', 'follow_up'
);

-- Create client status enum
CREATE TYPE client_status AS ENUM (
  'prospect', 'active', 'completed', 'inactive', 'churned'
);

-- Create priority enum
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create clients table
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  organization_number TEXT UNIQUE NOT NULL,
  industry TEXT,
  company_size TEXT,
  status client_status DEFAULT 'prospect',
  primary_contact_name TEXT NOT NULL,
  primary_contact_email TEXT NOT NULL,
  primary_contact_phone TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Sweden',
  tags TEXT[],
  total_bookings INTEGER DEFAULT 0,
  total_value DECIMAL(10,2) DEFAULT 0,
  last_interaction_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create client_interactions table for tracking all communications
CREATE TABLE public.client_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  interaction_type client_interaction_type NOT NULL,
  subject TEXT,
  content TEXT,
  interaction_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID, -- Admin who created this interaction
  metadata JSONB, -- For storing additional interaction data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create client_notes table for admin observations
CREATE TABLE public.client_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  note_content TEXT NOT NULL,
  is_private BOOLEAN DEFAULT true,
  priority priority_level DEFAULT 'medium',
  created_by UUID, -- Admin who created the note
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create activity_log table for tracking admin actions
CREATE TABLE public.activity_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID NOT NULL,
  action_type TEXT NOT NULL, -- 'booking_created', 'client_updated', etc.
  entity_type TEXT NOT NULL, -- 'booking', 'client', 'time_slot', etc.
  entity_id UUID, -- ID of the affected entity
  old_values JSONB, -- Previous state for updates
  new_values JSONB, -- New state for updates
  description TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create booking_templates table for common consultation types
CREATE TABLE public.booking_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER DEFAULT 60,
  questions JSONB, -- Template questions for this booking type
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add client_id to bookings table
ALTER TABLE public.bookings 
ADD COLUMN client_id UUID REFERENCES public.clients(id),
ADD COLUMN priority priority_level DEFAULT 'medium',
ADD COLUMN booking_template_id UUID REFERENCES public.booking_templates(id),
ADD COLUMN estimated_value DECIMAL(10,2),
ADD COLUMN internal_notes TEXT,
ADD COLUMN follow_up_date DATE,
ADD COLUMN consultation_type TEXT,
ADD COLUMN meeting_link TEXT,
ADD COLUMN meeting_notes TEXT;

-- Enable RLS on all new tables
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_templates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for clients
CREATE POLICY "Admins can manage clients" 
ON public.clients 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create RLS policies for client_interactions
CREATE POLICY "Admins can manage client interactions" 
ON public.client_interactions 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create RLS policies for client_notes
CREATE POLICY "Admins can manage client notes" 
ON public.client_notes 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create RLS policies for activity_log
CREATE POLICY "Admins can view activity log" 
ON public.activity_log 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "System can insert activity log" 
ON public.activity_log 
FOR INSERT 
WITH CHECK (true);

-- Create RLS policies for booking_templates
CREATE POLICY "Admins can manage booking templates" 
ON public.booking_templates 
FOR ALL 
USING (is_admin(auth.uid()));

-- Create indexes for better performance
CREATE INDEX idx_clients_organization_number ON public.clients(organization_number);
CREATE INDEX idx_clients_status ON public.clients(status);
CREATE INDEX idx_clients_last_interaction_date ON public.clients(last_interaction_date);
CREATE INDEX idx_client_interactions_client_id ON public.client_interactions(client_id);
CREATE INDEX idx_client_interactions_booking_id ON public.client_interactions(booking_id);
CREATE INDEX idx_client_interactions_type ON public.client_interactions(interaction_type);
CREATE INDEX idx_client_interactions_date ON public.client_interactions(interaction_date);
CREATE INDEX idx_client_notes_client_id ON public.client_notes(client_id);
CREATE INDEX idx_activity_log_admin_user_id ON public.activity_log(admin_user_id);
CREATE INDEX idx_activity_log_entity ON public.activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_log_created_at ON public.activity_log(created_at);
CREATE INDEX idx_bookings_client_id ON public.bookings(client_id);
CREATE INDEX idx_bookings_priority ON public.bookings(priority);
CREATE INDEX idx_bookings_follow_up_date ON public.bookings(follow_up_date);

-- Add triggers for updated_at columns
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_client_notes_updated_at
  BEFORE UPDATE ON public.client_notes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_booking_templates_updated_at
  BEFORE UPDATE ON public.booking_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to sync client data from bookings
CREATE OR REPLACE FUNCTION public.sync_client_from_booking()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update client information from booking
  INSERT INTO public.clients (
    company_name, 
    organization_number, 
    industry, 
    company_size,
    primary_contact_name,
    primary_contact_email,
    primary_contact_phone
  )
  VALUES (
    NEW.company_name,
    NEW.organization_number,
    NEW.industry,
    NEW.company_size,
    NEW.contact_name,
    NEW.email,
    NEW.phone
  )
  ON CONFLICT (organization_number) 
  DO UPDATE SET
    company_name = EXCLUDED.company_name,
    primary_contact_name = EXCLUDED.primary_contact_name,
    primary_contact_email = EXCLUDED.primary_contact_email,
    primary_contact_phone = EXCLUDED.primary_contact_phone,
    industry = EXCLUDED.industry,
    company_size = EXCLUDED.company_size,
    total_bookings = clients.total_bookings + 1,
    last_interaction_date = now(),
    updated_at = now();

  -- Link the booking to the client
  UPDATE public.bookings 
  SET client_id = (
    SELECT id FROM public.clients 
    WHERE organization_number = NEW.organization_number
  )
  WHERE id = NEW.id;

  -- Create interaction record
  INSERT INTO public.client_interactions (
    client_id,
    booking_id,
    interaction_type,
    subject,
    content
  )
  SELECT 
    c.id,
    NEW.id,
    'booking_created',
    'Ny bokning skapad',
    'Bokning skapad för ' || NEW.company_name
  FROM public.clients c
  WHERE c.organization_number = NEW.organization_number;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to sync client data when booking is created
CREATE TRIGGER sync_client_on_booking_insert
  AFTER INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_client_from_booking();

-- Create function to log admin activities
CREATE OR REPLACE FUNCTION public.log_admin_activity(
  p_admin_user_id UUID,
  p_action_type TEXT,
  p_entity_type TEXT,
  p_entity_id UUID DEFAULT NULL,
  p_old_values JSONB DEFAULT NULL,
  p_new_values JSONB DEFAULT NULL,
  p_description TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.activity_log (
    admin_user_id,
    action_type,
    entity_type,
    entity_id,
    old_values,
    new_values,
    description
  )
  VALUES (
    p_admin_user_id,
    p_action_type,
    p_entity_type,
    p_entity_id,
    p_old_values,
    p_new_values,
    p_description
  );
END;
$$ LANGUAGE plpgsql;

-- Create analytics functions
CREATE OR REPLACE FUNCTION public.get_client_analytics(days_back INTEGER DEFAULT 30)
RETURNS TABLE(
  total_clients BIGINT,
  new_clients BIGINT,
  active_clients BIGINT,
  conversion_rate NUMERIC,
  avg_bookings_per_client NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM public.clients) as total_clients,
    (SELECT COUNT(*) FROM public.clients WHERE created_at >= current_date - days_back) as new_clients,
    (SELECT COUNT(*) FROM public.clients WHERE status = 'active') as active_clients,
    (SELECT 
      CASE 
        WHEN COUNT(*) > 0 THEN 
          ROUND((COUNT(*) FILTER (WHERE status != 'prospect'))::NUMERIC / COUNT(*)::NUMERIC * 100, 2)
        ELSE 0 
      END
      FROM public.clients
    ) as conversion_rate,
    (SELECT 
      CASE 
        WHEN COUNT(DISTINCT client_id) > 0 THEN 
          ROUND(COUNT(*)::NUMERIC / COUNT(DISTINCT client_id)::NUMERIC, 2)
        ELSE 0 
      END
      FROM public.bookings WHERE client_id IS NOT NULL
    ) as avg_bookings_per_client;
END;
$$ LANGUAGE plpgsql;

-- Create function to get booking analytics
CREATE OR REPLACE FUNCTION public.get_booking_analytics(days_back INTEGER DEFAULT 30)
RETURNS TABLE(
  total_bookings BIGINT,
  pending_bookings BIGINT,
  confirmed_bookings BIGINT,
  completed_bookings BIGINT,
  cancelled_bookings BIGINT,
  conversion_rate NUMERIC,
  avg_response_time INTERVAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_bookings,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_bookings,
    COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed_bookings,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_bookings,
    COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled_bookings,
    CASE 
      WHEN COUNT(*) > 0 THEN 
        ROUND((COUNT(*) FILTER (WHERE status IN ('confirmed', 'completed')))::NUMERIC / COUNT(*)::NUMERIC * 100, 2)
      ELSE 0 
    END as conversion_rate,
    AVG(updated_at - created_at) FILTER (WHERE status != 'pending') as avg_response_time
  FROM public.bookings 
  WHERE created_at >= current_date - days_back;
END;
$$ LANGUAGE plpgsql;
