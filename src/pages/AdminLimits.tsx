
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type BookingLimits = Database['public']['Tables']['booking_limits']['Row'];

const AdminLimits = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [limits, setLimits] = useState<BookingLimits | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    
    checkAdminStatus();
  }, [user, navigate]);

  const checkAdminStatus = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error || !data) {
      navigate('/admin/login');
      return;
    }

    setIsAdmin(true);
    loadLimits();
  };

  const loadLimits = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('booking_limits')
      .select('*')
      .single();

    if (error) {
      toast({
        title: "Fel vid laddning",
        description: "Kunde inte ladda bokningsgränser.",
        variant: "destructive"
      });
      return;
    }

    setLimits(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!limits) return;
    
    setSaving(true);
    const { error } = await supabase
      .from('booking_limits')
      .update({
        daily_limit: limits.daily_limit,
        weekly_limit: limits.weekly_limit,
        monthly_limit: limits.monthly_limit
      })
      .eq('id', limits.id);

    if (error) {
      toast({
        title: "Fel vid sparande",
        description: "Kunde inte spara bokningsgränser.",
        variant: "destructive"
      });
      setSaving(false);
      return;
    }

    toast({
      title: "Gränser sparade",
      description: "Bokningsgränser har uppdaterats.",
    });

    setSaving(false);
  };

  const updateLimit = (field: keyof BookingLimits, value: number) => {
    if (!limits) return;
    setLimits({ ...limits, [field]: value });
  };

  if (!isAdmin || loading) {
    return <div>Laddar...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card/60 backdrop-blur-sm border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tillbaka till Dashboard</span>
            </Button>
            <h1 className="font-urbanist font-bold text-2xl">Bokningsgränser</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-urbanist font-bold text-xl">
              Hantera bokningsgränser
            </CardTitle>
            <p className="text-foreground/70 font-montserrat text-sm">
              Sätt gränser för hur många bokningar som kan tas emot per dag, vecka och månad.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="dailyLimit" className="font-montserrat font-medium text-sm mb-2 block">
                Daglig gräns
              </Label>
              <Input
                id="dailyLimit"
                type="number"
                min="0"
                value={limits?.daily_limit || 0}
                onChange={(e) => updateLimit('daily_limit', parseInt(e.target.value) || 0)}
                className="bg-background/80 border-border/40"
              />
              <p className="text-xs text-foreground/60 mt-1">
                Maximalt antal bokningar per dag
              </p>
            </div>

            <div>
              <Label htmlFor="weeklyLimit" className="font-montserrat font-medium text-sm mb-2 block">
                Veckovis gräns
              </Label>
              <Input
                id="weeklyLimit"
                type="number"
                min="0"
                value={limits?.weekly_limit || 0}
                onChange={(e) => updateLimit('weekly_limit', parseInt(e.target.value) || 0)}
                className="bg-background/80 border-border/40"
              />
              <p className="text-xs text-foreground/60 mt-1">
                Maximalt antal bokningar per vecka
              </p>
            </div>

            <div>
              <Label htmlFor="monthlyLimit" className="font-montserrat font-medium text-sm mb-2 block">
                Månatlig gräns
              </Label>
              <Input
                id="monthlyLimit"
                type="number"
                min="0"
                value={limits?.monthly_limit || 0}
                onChange={(e) => updateLimit('monthly_limit', parseInt(e.target.value) || 0)}
                className="bg-background/80 border-border/40"
              />
              <p className="text-xs text-foreground/60 mt-1">
                Maximalt antal bokningar per månad
              </p>
            </div>

            <div className="pt-4 border-t border-border/20">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full glass-button-dark-green-cta text-white font-urbanist font-semibold flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Sparar..." : "Spara gränser"}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLimits;
