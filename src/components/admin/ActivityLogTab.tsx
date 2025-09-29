import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { History, RefreshCw, User, Calendar, Settings, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type ActivityLog = Database['public']['Tables']['activity_log']['Row'];

export const ActivityLogTab = () => {
  const { toast } = useToast();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      toast({
        title: "Fel vid laddning",
        description: "Kunde inte ladda aktivitetslogg.",
        variant: "destructive"
      });
      return;
    }

    setActivities(data || []);
    setLoading(false);
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'booking_created':
      case 'booking_updated':
        return <Calendar className="w-4 h-4" />;
      case 'client_updated':
      case 'client_created':
        return <User className="w-4 h-4" />;
      case 'time_slot_updated':
      case 'booking_limits_updated':
        return <Settings className="w-4 h-4" />;
      default:
        return <History className="w-4 h-4" />;
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'booking_created':
      case 'client_created':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'booking_updated':
      case 'client_updated':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'booking_cancelled':
      case 'booking_deleted':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatActionType = (actionType: string) => {
    const typeMap: Record<string, string> = {
      'booking_created': 'Bokning skapad',
      'booking_updated': 'Bokning uppdaterad',
      'booking_cancelled': 'Bokning avbruten',
      'client_created': 'Klient skapad',
      'client_updated': 'Klient uppdaterad',
      'time_slot_updated': 'Tidslucka uppdaterad',
      'booking_limits_updated': 'Bokningsgränser uppdaterade'
    };
    return typeMap[actionType] || actionType;
  };

  const clearOldActivities = async () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { error } = await supabase
      .from('activity_log')
      .delete()
      .lt('created_at', thirtyDaysAgo.toISOString());

    if (error) {
      toast({
        title: "Fel vid rensning",
        description: "Kunde inte rensa gamla aktiviteter.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Aktiviteter rensade",
      description: "Gamla aktiviteter (>30 dagar) har rensats.",
    });

    loadActivities();
  };

  if (loading) {
    return <div className="p-4">Laddar aktivitetslogg...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-urbanist font-bold text-xl flex items-center space-x-2">
              <History className="w-5 h-5" />
              <span>Aktivitetslogg ({activities.length})</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={loadActivities} disabled={loading}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Uppdatera
              </Button>
              <Button variant="outline" onClick={clearOldActivities}>
                <Trash2 className="w-4 h-4 mr-2" />
                Rensa gamla
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <div className="text-center py-8 text-foreground/70">
              <History className="w-12 h-12 mx-auto mb-4 text-foreground/40" />
              <p>Inga aktiviteter loggade ännu.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Åtgärd</TableHead>
                  <TableHead>Typ</TableHead>
                  <TableHead>Beskrivning</TableHead>
                  <TableHead>Datum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge className={getActionColor(activity.action_type)}>
                          <div className="flex items-center space-x-1">
                            {getActionIcon(activity.action_type)}
                            <span>{formatActionType(activity.action_type)}</span>
                          </div>
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{activity.entity_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md">
                        <p className="text-sm text-foreground/80 truncate">
                          {activity.description || 'Ingen beskrivning'}
                        </p>
                        {activity.entity_id && (
                          <p className="text-xs text-foreground/60">
                            ID: {activity.entity_id.slice(0, 8)}...
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(activity.created_at!).toLocaleDateString('sv-SE')}</div>
                        <div className="text-xs text-foreground/60">
                          {new Date(activity.created_at!).toLocaleTimeString('sv-SE', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};