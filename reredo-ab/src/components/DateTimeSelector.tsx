
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useDateAvailability } from '@/hooks/useDateAvailability';
import { useAvailableTimeSlots } from '@/hooks/useAvailableTimeSlots';

interface DateTimeSelectorProps {
  selectedDate: Date | null;
  selectedTime: string;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string) => void;
}

const DateTimeSelector = ({ selectedDate, selectedTime, onDateChange, onTimeChange }: DateTimeSelectorProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { availableDates, checkDateAvailability } = useDateAvailability();
  const { timeSlots, loading: timeSlotsLoading } = useAvailableTimeSlots(selectedDate);

  const isDateDisabled = (date: Date) => {
    // Disable past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;

    // Disable weekends
    const day = date.getDay();
    if (day === 0 || day === 6) return true;

    return false;
  };

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date) return;
    
    const isAvailable = await checkDateAvailability(date);
    if (isAvailable) {
      onDateChange(date);
      onTimeChange(''); // Reset time selection when date changes
      setShowCalendar(false);
    }
  };

  const formatTimeSlot = (startTime: string, endTime: string) => {
    const start = startTime.slice(0, 5);
    const end = endTime.slice(0, 5);
    return `${start} - ${end}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-urbanist font-bold text-lg text-foreground mb-2">
          Välj datum och tid
        </h2>
        <p className="text-foreground/70 font-montserrat text-sm">
          Välj ett datum och en tid som passar dig för konsultationen
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="font-montserrat font-medium mb-2 block text-sm">
            Datum *
          </Label>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full justify-start text-left font-normal h-10"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'PPP', { locale: undefined }) : 'Välj datum'}
            </Button>
            
            {showCalendar && (
              <div className="absolute top-full left-0 mt-1 z-50 bg-background border border-border rounded-md shadow-lg">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={handleDateSelect}
                  disabled={isDateDisabled}
                  className="p-3 pointer-events-auto"
                />
              </div>
            )}
          </div>
          <p className="text-xs text-foreground/60 mt-1">
            Endast vardagar är tillgängliga
          </p>
        </div>

        {selectedDate && (
          <div>
            <Label className="font-montserrat font-medium mb-2 block text-sm">
              Tid *
            </Label>
            {timeSlotsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.start_time}
                    variant={selectedTime === slot.start_time ? "default" : "outline"}
                    disabled={!slot.is_available}
                    onClick={() => onTimeChange(slot.start_time)}
                    className={`h-10 text-sm ${
                      selectedTime === slot.start_time 
                        ? 'bg-accent text-white' 
                        : !slot.is_available 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-accent/10'
                    }`}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {formatTimeSlot(slot.start_time, slot.end_time)}
                  </Button>
                ))}
              </div>
            )}
            {timeSlots.length === 0 && !timeSlotsLoading && (
              <p className="text-sm text-foreground/60 text-center py-4">
                Inga tillgängliga tider för detta datum
              </p>
            )}
          </div>
        )}
      </div>

      {selectedDate && selectedTime && (
        <div className="bg-accent/5 backdrop-blur-sm rounded-xl p-4 border border-accent/20">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="w-5 h-5 text-accent" />
            <h3 className="font-urbanist font-semibold text-base">Vald tid</h3>
          </div>
          <p className="font-montserrat text-sm text-foreground/80">
            {format(selectedDate, 'EEEE d MMMM yyyy', { locale: undefined })} kl. {selectedTime.slice(0, 5)}
          </p>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;
