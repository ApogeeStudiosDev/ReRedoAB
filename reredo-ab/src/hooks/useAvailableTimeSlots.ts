
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TimeSlot {
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export const useAvailableTimeSlots = (selectedDate: Date | null) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedDate) {
      setTimeSlots([]);
      return;
    }

    const fetchTimeSlots = async () => {
      setLoading(true);
      setError(null);

      try {
        const dateString = selectedDate.toISOString().split('T')[0];
        
        // Call the get_available_time_slots function directly
        const { data, error } = await supabase
          .from('time_slots')
          .select('*')
          .eq('is_active', true)
          .order('start_time');

        if (error) {
          console.error('Error fetching time slots:', error);
          setError('Failed to fetch available time slots');
          return;
        }

        // For each time slot, check if it's available using can_book_on_date_time
        const slotsWithAvailability = await Promise.all(
          (data || []).map(async (slot) => {
            const { data: isAvailable, error: availabilityError } = await supabase
              .rpc('can_book_on_date_time', { 
                check_date: dateString, 
                check_time: slot.start_time 
              });

            if (availabilityError) {
              console.error('Error checking availability:', availabilityError);
              return {
                start_time: slot.start_time,
                end_time: slot.end_time,
                is_available: false
              };
            }

            return {
              start_time: slot.start_time,
              end_time: slot.end_time,
              is_available: isAvailable || false
            };
          })
        );

        setTimeSlots(slotsWithAvailability);
      } catch (err) {
        console.error('Error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDate]);

  return { timeSlots, loading, error };
};
