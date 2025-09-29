-- Enhance time_slots table for better admin management
ALTER TABLE public.time_slots 
ADD COLUMN name TEXT DEFAULT NULL,
ADD COLUMN description TEXT DEFAULT NULL,
ADD COLUMN duration_minutes INTEGER DEFAULT 60,
ADD COLUMN buffer_minutes INTEGER DEFAULT 0,
ADD COLUMN is_recurring BOOLEAN DEFAULT true,
ADD COLUMN days_of_week INTEGER[] DEFAULT '{1,2,3,4,5}', -- Monday to Friday
ADD COLUMN valid_from DATE DEFAULT CURRENT_DATE,
ADD COLUMN valid_until DATE DEFAULT NULL;

-- Add some useful indexes
CREATE INDEX idx_time_slots_active ON public.time_slots(is_active);
CREATE INDEX idx_time_slots_days_of_week ON public.time_slots USING GIN(days_of_week);

-- Create a table for tracking admin availability exceptions (holidays, blackout dates)
CREATE TABLE public.availability_exceptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT false,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(date)
);

-- Enable RLS on availability_exceptions
ALTER TABLE public.availability_exceptions ENABLE ROW LEVEL SECURITY;

-- Create policies for availability_exceptions
CREATE POLICY "Admins can manage availability exceptions" 
ON public.availability_exceptions 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Anyone can view availability exceptions" 
ON public.availability_exceptions 
FOR SELECT 
USING (true);

-- Add trigger for updated_at on availability_exceptions
CREATE TRIGGER update_availability_exceptions_updated_at
  BEFORE UPDATE ON public.availability_exceptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();