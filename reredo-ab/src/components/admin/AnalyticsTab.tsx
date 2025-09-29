import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  Clock, 
  Mail, 
  Phone,
  Target,
  DollarSign,
  Activity,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Analytics {
  // Client Analytics
  total_clients: number;
  new_clients: number;
  active_clients: number;
  conversion_rate: number;
  avg_bookings_per_client: number;
  
  // Booking Analytics
  total_bookings: number;
  pending_bookings: number;
  confirmed_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  booking_conversion_rate: number;
  avg_response_time: string;
}

export const AnalyticsTab = () => {
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("30");

  useEffect(() => {
    loadAnalytics();
  }, [timeframe]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Load client analytics
      const { data: clientData, error: clientError } = await supabase
        .rpc('get_client_analytics', { days_back: parseInt(timeframe) });

      // Load booking analytics
      const { data: bookingData, error: bookingError } = await supabase
        .rpc('get_booking_analytics', { days_back: parseInt(timeframe) });

      if (clientError || bookingError) {
        toast({
          title: "Fel vid laddning",
          description: "Kunde inte ladda analysdata.",
          variant: "destructive"
        });
        return;
      }

      // Combine the data
      const combinedData = {
        ...clientData[0],
        ...bookingData[0],
        booking_conversion_rate: bookingData[0]?.conversion_rate || 0,
        avg_response_time: String(bookingData[0]?.avg_response_time || '0')
      };

      setAnalytics(combinedData);
    } catch (error) {
      console.error('Analytics error:', error);
      toast({
        title: "Fel vid laddning",
        description: "Kunde inte ladda analysdata.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (interval: string) => {
    if (!interval) return 'N/A';
    
    // Parse PostgreSQL interval format
    const matches = interval.match(/(\d+):(\d+):(\d+)/);
    if (matches) {
      const hours = parseInt(matches[1]);
      const minutes = parseInt(matches[2]);
      
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    }
    return interval;
  };

  if (loading) {
    return <div className="p-4">Laddar analysdata...</div>;
  }

  if (!analytics) {
    return <div className="p-4">Kunde inte ladda analysdata.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex justify-between items-center">
        <h3 className="font-urbanist font-bold text-xl">Analysöversikt</h3>
        <div className="flex items-center space-x-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Senaste 7 dagarna</SelectItem>
              <SelectItem value="30">Senaste 30 dagarna</SelectItem>
              <SelectItem value="90">Senaste 90 dagarna</SelectItem>
              <SelectItem value="365">Senaste året</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={loadAnalytics} disabled={loading}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Uppdatera
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/70">Totala klienter</p>
                <p className="text-2xl font-bold">{analytics.total_clients}</p>
                <p className="text-xs text-foreground/60">
                  +{analytics.new_clients} nya
                </p>
              </div>
              <Users className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/70">Konverteringsgrad</p>
                <p className="text-2xl font-bold">{analytics.conversion_rate}%</p>
                <p className="text-xs text-foreground/60">
                  klienter → aktiva
                </p>
              </div>
              <Target className="w-8 h-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/70">Totala bokningar</p>
                <p className="text-2xl font-bold">{analytics.total_bookings}</p>
                <p className="text-xs text-foreground/60">
                  {analytics.booking_conversion_rate}% konvertering
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/70">Svarstid</p>
                <p className="text-2xl font-bold">{formatDuration(analytics.avg_response_time)}</p>
                <p className="text-xs text-foreground/60">
                  genomsnittlig
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="font-urbanist font-bold text-lg flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Klientanalys</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Aktiva klienter</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="default">{analytics.active_clients}</Badge>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Nya klienter</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{analytics.new_clients}</Badge>
                  <Activity className="w-4 h-4 text-blue-500" />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Ø bokningar per klient</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{analytics.avg_bookings_per_client}</Badge>
                  <BarChart3 className="w-4 h-4 text-purple-500" />
                </div>
              </div>
            </div>

            <div className="border-t border-border/20 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Konverteringsgrad</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(analytics.conversion_rate, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold">{analytics.conversion_rate}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="font-urbanist font-bold text-lg flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Bokningsanalys</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Väntande</span>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                  {analytics.pending_bookings}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Bekräftade</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  {analytics.confirmed_bookings}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Slutförda</span>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  {analytics.completed_bookings}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">Avbrutna</span>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                  {analytics.cancelled_bookings}
                </Badge>
              </div>
            </div>

            <div className="border-t border-border/20 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Framgångsgrad</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(analytics.booking_conversion_rate, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold">{analytics.booking_conversion_rate}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="font-urbanist font-bold text-lg flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Prestationsinsikter</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Svarstid</span>
              </div>
              <p className="text-2xl font-bold">{formatDuration(analytics.avg_response_time)}</p>
              <p className="text-xs text-foreground/60">
                Genomsnittlig tid från bokning till svar
              </p>
            </div>

            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Effektivitet</span>
              </div>
              <p className="text-2xl font-bold">
                {Math.round((analytics.confirmed_bookings + analytics.completed_bookings) / analytics.total_bookings * 100) || 0}%
              </p>
              <p className="text-xs text-foreground/60">
                Bokningar som blir genomförda
              </p>
            </div>

            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Aktivitet</span>
              </div>
              <p className="text-2xl font-bold">{analytics.avg_bookings_per_client}</p>
              <p className="text-xs text-foreground/60">
                Genomsnittligt antal bokningar per klient
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};