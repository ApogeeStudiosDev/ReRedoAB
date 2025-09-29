import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Phone, Mail, Building, Search, Filter, Users, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ClientDetailModal } from "./ClientDetailModal";
import type { Database } from "@/integrations/supabase/types";

type Client = Database['public']['Tables']['clients']['Row'];
type ClientStatus = Database['public']['Enums']['client_status'];

export const ClientsTab = () => {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "all">("all");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('last_interaction_date', { ascending: false, nullsFirst: false });

    if (error) {
      toast({
        title: "Fel vid laddning",
        description: "Kunde inte ladda klienter.",
        variant: "destructive"
      });
      return;
    }

    setClients(data || []);
    setLoading(false);
  };

  const getStatusColor = (status: ClientStatus) => {
    switch (status) {
      case 'prospect': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'churned': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: ClientStatus) => {
    switch (status) {
      case 'prospect': return 'Prospekt';
      case 'active': return 'Aktiv';
      case 'completed': return 'Slutförd';
      case 'inactive': return 'Inaktiv';
      case 'churned': return 'Förlorad';
      default: return status;
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.primary_contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.primary_contact_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getClientStats = () => {
    return {
      total: clients.length,
      prospects: clients.filter(c => c.status === 'prospect').length,
      active: clients.filter(c => c.status === 'active').length,
      completed: clients.filter(c => c.status === 'completed').length,
    };
  };

  const stats = getClientStats();

  if (loading) {
    return <div className="p-4">Laddar klienter...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-foreground/70">Totalt</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-foreground/70">Prospekt</p>
                <p className="text-2xl font-bold">{stats.prospects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-foreground/70">Aktiva</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Badge className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-foreground/70">Slutförda</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="font-urbanist font-bold text-xl flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Klienthantering ({filteredClients.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  placeholder="Sök efter företag, kontakt eller e-post..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/80 border-border/40"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-foreground/60" />
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ClientStatus | "all")}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla status</SelectItem>
                  <SelectItem value="prospect">Prospekt</SelectItem>
                  <SelectItem value="active">Aktiv</SelectItem>
                  <SelectItem value="completed">Slutförd</SelectItem>
                  <SelectItem value="inactive">Inaktiv</SelectItem>
                  <SelectItem value="churned">Förlorad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredClients.length === 0 ? (
            <div className="text-center py-8 text-foreground/70">
              <Users className="w-12 h-12 mx-auto mb-4 text-foreground/40" />
              <p>{searchTerm || statusFilter !== "all" ? "Inga klienter matchar filtren." : "Inga klienter ännu."}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Företag</TableHead>
                  <TableHead>Kontakt</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bransch</TableHead>
                  <TableHead>Bokningar</TableHead>
                  <TableHead>Senaste kontakt</TableHead>
                  <TableHead>Åtgärder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{client.company_name}</div>
                        <div className="text-xs text-foreground/60">{client.organization_number}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{client.primary_contact_name}</div>
                        <div className="text-foreground/60">{client.primary_contact_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(client.status!)}>
                        {getStatusText(client.status!)}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.industry || '-'}</TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{client.total_bookings}</div>
                        <div className="text-xs text-foreground/60">
                          {client.total_value && `${client.total_value} kr`}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {client.last_interaction_date 
                        ? new Date(client.last_interaction_date).toLocaleDateString('sv-SE')
                        : 'Ingen kontakt'
                      }
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedClient(client)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {client.primary_contact_phone && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(`tel:${client.primary_contact_phone}`)}
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(`mailto:${client.primary_contact_email}`)}
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Client Detail Modal */}
      {selectedClient && (
        <ClientDetailModal
          client={selectedClient}
          isOpen={!!selectedClient}
          onClose={() => setSelectedClient(null)}
          onClientUpdated={loadClients}
        />
      )}
    </div>
  );
};