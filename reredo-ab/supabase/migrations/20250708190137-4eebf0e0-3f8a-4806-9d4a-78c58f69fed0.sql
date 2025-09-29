
-- Add time slots table for managing available booking times
CREATE TABLE public.time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default time slots (9 AM to 5 PM, hourly slots)
INSERT INTO public.time_slots (start_time, end_time) VALUES
  ('09:00', '10:00'),
  ('10:00', '11:00'),
  ('11:00', '12:00'),
  ('13:00', '14:00'),
  ('14:00', '15:00'),
  ('15:00', '16:00'),
  ('16:00', '17:00');

-- Update the can_book_on_date function to also check time slots
CREATE OR REPLACE FUNCTION public.can_book_on_date_time(check_date DATE, check_time TIME)
RETURNS BOOLEAN
LANGUAGE PLPGSQL
STABLE
AS $$
DECLARE
  limits RECORD;
  daily_count INTEGER;
  weekly_count INTEGER;
  monthly_count INTEGER;
  time_slot_count INTEGER;
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
    
  -- Get count for specific time slot
  SELECT COUNT(*) INTO time_slot_count
  FROM public.bookings
  WHERE booking_date::DATE = check_date
    AND booking_date::TIME = check_time
    AND status != 'cancelled';
  
  -- Check if any limits are exceeded or time slot is taken
  RETURN (daily_count < limits.daily_limit 
    AND weekly_count < limits.weekly_limit 
    AND monthly_count < limits.monthly_limit
    AND time_slot_count = 0);
END;
$$;

-- Function to get available time slots for a specific date
CREATE OR REPLACE FUNCTION public.get_available_time_slots(check_date DATE)
RETURNS TABLE (
  start_time TIME,
  end_time TIME,
  is_available BOOLEAN
)
LANGUAGE PLPGSQL
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ts.start_time,
    ts.end_time,
    public.can_book_on_date_time(check_date, ts.start_time) as is_available
  FROM public.time_slots ts
  WHERE ts.is_active = true
  ORDER BY ts.start_time;
END;
$$;

-- Enable RLS on time_slots
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;

-- Create policy for time_slots (public read access)
CREATE POLICY "Anyone can view time slots" ON public.time_slots
  FOR SELECT 
  WITH CHECK (true);

-- Create policy for admins to manage time slots
CREATE POLICY "Admins can manage time slots" ON public.time_slots
  FOR ALL 
  TO authenticated
  USING (public.is_admin(auth.uid()));
