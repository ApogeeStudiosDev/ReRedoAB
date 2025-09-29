
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useDateAvailability = () => {
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const checkDateAvailability = async (date: Date): Promise<boolean> => {
    try {
      const dateString = date.toISOString().split('T')[0];
      
      // Check if any time slot is available for this date
      const { data: timeSlots, error } = await supabase
        .from('time_slots')
        .select('start_time')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching time slots:', error);
        return false;
      }

      // Check if at least one time slot is available
      for (const slot of timeSlots || []) {
        const { data: isAvailable, error: availabilityError } = await supabase
          .rpc('can_book_on_date_time', { 
            check_date: dateString, 
            check_time: slot.start_time 
          });

        if (!availabilityError && isAvailable) {
          return true;
        }
      }

      return false;
    } catch (err) {
      console.error('Error:', err);
      return false;
    }
  };

  const preloadDateAvailability = async (startDate: Date, endDate: Date) => {
    setLoading(true);
    const availableDatesSet = new Set<string>();

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      // Skip weekends
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        const isAvailable = await checkDateAvailability(currentDate);
        if (isAvailable) {
          availableDatesSet.add(currentDate.toISOString().split('T')[0]);
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setAvailableDates(availableDatesSet);
    setLoading(false);
  };

  return { availableDates, loading, checkDateAvailability, preloadDateAvailability };
};
