import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Clock, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type TimeSlot = Database['public']['Tables']['time_slots']['Row'];

export const AvailabilityTab = () => {
  const { toast } = useToast();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSlot, setNewSlot] = useState({
    name: '',
    start_time: '',
    end_time: '',
    duration_minutes: 60,
    is_active: true
  });

  const weekdays = [
    { value: 1, label: 'Måndag' },
    { value: 2, label: 'Tisdag' }, 
    { value: 3, label: 'Onsdag' },
    { value: 4, label: 'Torsdag' },
    { value: 5, label: 'Fredag' },
    { value: 6, label: 'Lördag' },
    { value: 0, label: 'Söndag' }
  ];

  useEffect(() => {
    loadTimeSlots();
  }, []);

  const loadTimeSlots = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('time_slots')
      .select('*')
      .order('start_time');

    if (error) {
      toast({
        title: "Fel vid laddning",
        description: "Kunde inte ladda tidsluckor.",
        variant: "destructive"
      });
      return;
    }

    setTimeSlots(data || []);
    setLoading(false);
  };

  const handleCreateSlot = async () => {
    if (!newSlot.name || !newSlot.start_time || !newSlot.end_time) {
      toast({
        title: "Saknade uppgifter",
        description: "Fyll i alla obligatoriska fält.",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('time_slots')
      .insert([{
        name: newSlot.name,
        start_time: newSlot.start_time,
        end_time: newSlot.end_time,
        duration_minutes: newSlot.duration_minutes,
        is_active: newSlot.is_active
      }]);

    if (error) {
      toast({
        title: "Fel vid skapande",
        description: "Kunde inte skapa tidslucka.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Tidslucka skapad",
      description: "Den nya tidsluckan har lagts till.",
    });

    setNewSlot({
      name: '',
      start_time: '',
      end_time: '',
      duration_minutes: 60,
      is_active: true
    });
    
    loadTimeSlots();
  };

  const handleToggleActive = async (slotId: string, isActive: boolean) => {
    const { error } = await supabase
      .from('time_slots')
      .update({ is_active: isActive })
      .eq('id', slotId);

    if (error) {
      toast({
        title: "Fel vid uppdatering",
        description: "Kunde inte uppdatera tidslucka.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Tidslucka uppdaterad",
      description: `Tidsluckan är nu ${isActive ? 'aktiv' : 'inaktiv'}.`,
    });

    loadTimeSlots();
  };

  const handleDeleteSlot = async (slotId: string) => {
    const { error } = await supabase
      .from('time_slots')
      .delete()
      .eq('id', slotId);

    if (error) {
      toast({
        title: "Fel vid borttagning",
        description: "Kunde inte ta bort tidslucka.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Tidslucka borttagen",
      description: "Tidsluckan har tagits bort.",
    });

    loadTimeSlots();
  };

  if (loading) {
    return <div className="p-4">Laddar tillgänglighet...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Create New Time Slot */}
      <Card>
        <CardHeader>
          <CardTitle className="font-urbanist font-bold text-xl flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Skapa ny tidslucka</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="slotName" className="font-montserrat font-medium text-sm mb-2 block">
                Namn på tidslucka
              </Label>
              <Input
                id="slotName"
                value={newSlot.name}
                onChange={(e) => setNewSlot({ ...newSlot, name: e.target.value })}
                placeholder="t.ex. Förmiddagspass"
                className="bg-background/80 border-border/40"
              />
            </div>
            <div>
              <Label htmlFor="duration" className="font-montserrat font-medium text-sm mb-2 block">
                Varaktighet (minuter)
              </Label>
              <Input
                id="duration"
                type="number"
                min="15"
                step="15"
                value={newSlot.duration_minutes}
                onChange={(e) => setNewSlot({ ...newSlot, duration_minutes: parseInt(e.target.value) || 60 })}
                className="bg-background/80 border-border/40"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime" className="font-montserrat font-medium text-sm mb-2 block">
                Starttid
              </Label>
              <Input
                id="startTime"
                type="time"
                value={newSlot.start_time}
                onChange={(e) => setNewSlot({ ...newSlot, start_time: e.target.value })}
                className="bg-background/80 border-border/40"
              />
            </div>
            <div>
              <Label htmlFor="endTime" className="font-montserrat font-medium text-sm mb-2 block">
                Sluttid
              </Label>
              <Input
                id="endTime"
                type="time"
                value={newSlot.end_time}
                onChange={(e) => setNewSlot({ ...newSlot, end_time: e.target.value })}
                className="bg-background/80 border-border/40"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="activeSlot"
              checked={newSlot.is_active}
              onCheckedChange={(checked) => setNewSlot({ ...newSlot, is_active: checked })}
            />
            <Label htmlFor="activeSlot" className="font-montserrat text-sm">
              Aktiv tidslucka
            </Label>
          </div>

          <Button
            onClick={handleCreateSlot}
            className="w-full glass-button-dark-green-cta text-white font-urbanist font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Skapa tidslucka
          </Button>
        </CardContent>
      </Card>

      {/* Existing Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle className="font-urbanist font-bold text-xl flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Befintliga tidsluckor ({timeSlots.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {timeSlots.length === 0 ? (
            <div className="text-center py-8 text-foreground/70">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-foreground/40" />
              <p>Inga tidsluckor skapade ännu.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {timeSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/20"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium">
                        {slot.name || `${slot.start_time} - ${slot.end_time}`}
                      </div>
                      <div className="text-sm text-foreground/70">
                        {slot.start_time} - {slot.end_time}
                        {slot.duration_minutes && (
                          <span className="ml-2">({slot.duration_minutes} min)</span>
                        )}
                      </div>
                    </div>
                    <Badge variant={slot.is_active ? "default" : "secondary"}>
                      {slot.is_active ? "Aktiv" : "Inaktiv"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={slot.is_active}
                      onCheckedChange={(checked) => handleToggleActive(slot.id, checked)}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
