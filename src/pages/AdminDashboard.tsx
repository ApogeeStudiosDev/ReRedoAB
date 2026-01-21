
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar03Icon, UserMultipleIcon, Settings02Icon, Mail01Icon, Logout01Icon, Analytics02Icon, Clock01Icon } from "@hugeicons/react";
import { useToast } from "@/components/ui/use-toast";
import { BookingTable } from "@/components/admin/BookingTable";
import { BookingLimitsTab } from "@/components/admin/BookingLimitsTab";
import { AvailabilityTab } from "@/components/admin/AvailabilityTab";
import { ClientsTab } from "@/components/admin/ClientsTab";
import { AnalyticsTab } from "@/components/admin/AnalyticsTab";
import type { Database } from "@/integrations/supabase/types";

type Booking = Database['public']['Tables']['bookings']['Row'];

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
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
    loadBookings();
  };

  const loadBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Fel vid laddning",
        description: "Kunde inte ladda bokningar.",
        variant: "destructive"
      });
      return;
    }

    setBookings(data || []);
    setLoading(false);
  };

  const updateBookingStatus = async (bookingId: string, newStatus: Database['public']['Enums']['booking_status']) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', bookingId);

    if (error) {
      toast({
        title: "Fel vid uppdatering",
        description: "Kunde inte uppdatera bokningsstatus.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Status uppdaterad",
      description: "Bokningsstatus har uppdaterats.",
    });

    loadBookings();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };


  if (!isAdmin) {
    return <div>Laddar...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card/60 backdrop-blur-sm border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-urbanist font-bold text-2xl">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <Logout01Icon className="w-4 h-4" />
                <span>Logga ut</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Analytics02Icon className="w-4 h-4" />
              <span>Översikt</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center space-x-2">
              <Calendar03Icon className="w-4 h-4" />
              <span>Bokningar</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center space-x-2">
              <UserMultipleIcon className="w-4 h-4" />
              <span>Klienter</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Analytics02Icon className="w-4 h-4" />
              <span>Analys</span>
            </TabsTrigger>
            <TabsTrigger value="limits" className="flex items-center space-x-2">
              <Settings02Icon className="w-4 h-4" />
              <span>Gränser</span>
            </TabsTrigger>
            <TabsTrigger value="availability" className="flex items-center space-x-2">
              <Clock01Icon className="w-4 h-4" />
              <span>Tillgänglighet</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <UserMultipleIcon className="w-5 h-5" />
                    <span>Totala bokningar</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{bookings.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Calendar03Icon className="w-5 h-5" />
                    <span>Väntande bokningar</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {bookings.filter(b => b.status === 'pending').length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Mail01Icon className="w-5 h-5" />
                    <span>Bekräftade bokningar</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <BookingTable 
              bookings={bookings} 
              loading={loading}
              onUpdateStatus={updateBookingStatus}
            />
          </TabsContent>

          <TabsContent value="clients">
            <ClientsTab />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>

          <TabsContent value="limits">
            <BookingLimitsTab />
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilityTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
