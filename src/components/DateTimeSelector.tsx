
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
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
        <h2 className="font-sora font-bold text-2xl text-black mb-2">
          Välj datum och tid
        </h2>
        <p className="text-black/70 font-inter text-sm">
          Välj ett datum och en tid som passar dig för konsultationen
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="font-inter font-semibold mb-2 block text-sm text-black">
            Datum *
          </Label>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full justify-start text-left font-inter h-12 border-2 border-black/10 hover:border-black rounded-xl bg-white text-black"
            >
              <Calendar className="mr-2 h-4 w-4 text-black/60" />
              {selectedDate ? format(selectedDate, 'PPP', { locale: undefined }) : 'Välj datum'}
            </Button>

            {showCalendar && (
              <div className="absolute top-full left-0 mt-2 z-50 bg-white border-2 border-black/10 rounded-xl shadow-xl overflow-visible">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate || undefined}
                  onSelect={handleDateSelect}
                  disabled={isDateDisabled}
                  className="p-4 pointer-events-auto"
                  defaultMonth={new Date()}
                />
              </div>
            )}
          </div>
          <p className="text-xs text-black/60 mt-1 font-inter">
            Endast vardagar är tillgängliga
          </p>
        </div>

        {selectedDate && (
          <div>
            <Label className="font-inter font-semibold mb-2 block text-sm text-black">
              Tid *
            </Label>
            {timeSlotsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.start_time}
                    variant={selectedTime === slot.start_time ? "default" : "outline"}
                    disabled={!slot.is_available}
                    onClick={() => onTimeChange(slot.start_time)}
                    className={`h-12 text-sm font-inter rounded-xl border-2 transition-all duration-300 ${
                      selectedTime === slot.start_time
                        ? 'bg-black text-white border-black'
                        : !slot.is_available
                        ? 'opacity-50 cursor-not-allowed border-black/10'
                        : 'border-black/10 hover:border-black hover:bg-black hover:text-white'
                    }`}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {formatTimeSlot(slot.start_time, slot.end_time)}
                  </Button>
                ))}
              </div>
            )}
            {timeSlots.length === 0 && !timeSlotsLoading && (
              <p className="text-sm text-black/60 text-center py-4 font-inter">
                Inga tillgängliga tider för detta datum
              </p>
            )}
          </div>
        )}
      </div>

      {selectedDate && selectedTime && (
        <div className="bg-black rounded-xl p-6 border-2 border-black">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Calendar className="w-5 h-5 text-white" />
            <h3 className="font-sora font-semibold text-base text-white">Vald tid</h3>
          </div>
          <p className="font-inter text-sm text-white/90 text-center">
            {format(selectedDate, 'EEEE d MMMM yyyy', { locale: undefined })} kl. {selectedTime.slice(0, 5)}
          </p>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;
