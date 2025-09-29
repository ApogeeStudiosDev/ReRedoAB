import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Phone, Mail, Building, Calendar, MessageSquare, FileText, History, Plus, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Client = Database['public']['Tables']['clients']['Row'];
type ClientStatus = Database['public']['Enums']['client_status'];
type ClientInteraction = Database['public']['Tables']['client_interactions']['Row'];
type ClientNote = Database['public']['Tables']['client_notes']['Row'];
type Booking = Database['public']['Tables']['bookings']['Row'];
type PriorityLevel = Database['public']['Enums']['priority_level'];

interface ClientDetailModalProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
  onClientUpdated: () => void;
}

export const ClientDetailModal = ({ client, isOpen, onClose, onClientUpdated }: ClientDetailModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [interactions, setInteractions] = useState<ClientInteraction[]>([]);
  const [notes, setNotes] = useState<ClientNote[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editedClient, setEditedClient] = useState<Client>(client);
  const [newNote, setNewNote] = useState({ content: '', priority: 'medium' as PriorityLevel });
  const [newInteraction, setNewInteraction] = useState({ 
    type: 'note' as Database['public']['Enums']['client_interaction_type'], 
    subject: '', 
    content: '' 
  });

  useEffect(() => {
    if (isOpen) {
      loadClientData();
    }
  }, [isOpen, client.id]);

  const loadClientData = async () => {
    setLoading(true);

    // Load interactions
    const { data: interactionsData, error: interactionsError } = await supabase
      .from('client_interactions')
      .select('*')
      .eq('client_id', client.id)
      .order('interaction_date', { ascending: false });

    if (interactionsError) {
      console.error('Error loading interactions:', interactionsError);
    } else {
      setInteractions(interactionsData || []);
    }

    // Load notes
    const { data: notesData, error: notesError } = await supabase
      .from('client_notes')
      .select('*')
      .eq('client_id', client.id)
      .order('created_at', { ascending: false });

    if (notesError) {
      console.error('Error loading notes:', notesError);
    } else {
      setNotes(notesData || []);
    }

    // Load bookings
    const { data: bookingsData, error: bookingsError } = await supabase
      .from('bookings')
      .select('*')
      .eq('client_id', client.id)
      .order('created_at', { ascending: false });

    if (bookingsError) {
      console.error('Error loading bookings:', bookingsError);
    } else {
      setBookings(bookingsData || []);
    }

    setLoading(false);
  };

  const handleSaveClient = async () => {
    const { error } = await supabase
      .from('clients')
      .update({
        company_name: editedClient.company_name,
        industry: editedClient.industry,
        company_size: editedClient.company_size,
        status: editedClient.status,
        primary_contact_name: editedClient.primary_contact_name,
        primary_contact_email: editedClient.primary_contact_email,
        primary_contact_phone: editedClient.primary_contact_phone,
        website: editedClient.website,
        address: editedClient.address,
        city: editedClient.city,
        postal_code: editedClient.postal_code,
        tags: editedClient.tags
      })
      .eq('id', client.id);

    if (error) {
      toast({
        title: "Fel vid sparande",
        description: "Kunde inte uppdatera klient.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Klient uppdaterad",
      description: "Klientinformationen har sparats.",
    });

    onClientUpdated();
  };

  const handleAddNote = async () => {
    if (!newNote.content.trim()) return;

    const { error } = await supabase
      .from('client_notes')
      .insert([{
        client_id: client.id,
        note_content: newNote.content,
        priority: newNote.priority,
        created_by: user?.id
      }]);

    if (error) {
      toast({
        title: "Fel vid tillägg",
        description: "Kunde inte lägga till anteckning.",
        variant: "destructive"
      });
      return;
    }

    setNewNote({ content: '', priority: 'medium' });
    loadClientData();
    
    toast({
      title: "Anteckning tillagd",
      description: "Anteckningen har sparats.",
    });
  };

  const handleAddInteraction = async () => {
    if (!newInteraction.subject.trim() || !newInteraction.content.trim()) return;

    const { error } = await supabase
      .from('client_interactions')
      .insert([{
        client_id: client.id,
        interaction_type: newInteraction.type,
        subject: newInteraction.subject,
        content: newInteraction.content,
        created_by: user?.id
      }]);

    if (error) {
      toast({
        title: "Fel vid tillägg",
        description: "Kunde inte lägga till interaktion.",
        variant: "destructive"
      });
      return;
    }

    setNewInteraction({ type: 'note', subject: '', content: '' });
    loadClientData();
    
    toast({
      title: "Interaktion tillagd",
      description: "Interaktionen har sparats.",
    });
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

  const getPriorityColor = (priority: PriorityLevel) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-urbanist font-bold text-xl flex items-center space-x-2">
            <Building className="w-5 h-5" />
            <span>{client.company_name}</span>
            <Badge className={getStatusColor(client.status!)}>
              {client.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="bookings">Bokningar ({bookings.length})</TabsTrigger>
            <TabsTrigger value="interactions">Interaktioner ({interactions.length})</TabsTrigger>
            <TabsTrigger value="notes">Anteckningar ({notes.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Företagsinformation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Företagsnamn</Label>
                    <Input
                      value={editedClient.company_name}
                      onChange={(e) => setEditedClient({ ...editedClient, company_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Organisationsnummer</Label>
                    <Input value={client.organization_number} disabled />
                  </div>
                  <div>
                    <Label>Bransch</Label>
                    <Input
                      value={editedClient.industry || ''}
                      onChange={(e) => setEditedClient({ ...editedClient, industry: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Företagsstorlek</Label>
                    <Input
                      value={editedClient.company_size || ''}
                      onChange={(e) => setEditedClient({ ...editedClient, company_size: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select 
                      value={editedClient.status!} 
                      onValueChange={(value) => setEditedClient({ ...editedClient, status: value as ClientStatus })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prospect">Prospekt</SelectItem>
                        <SelectItem value="active">Aktiv</SelectItem>
                        <SelectItem value="completed">Slutförd</SelectItem>
                        <SelectItem value="inactive">Inaktiv</SelectItem>
                        <SelectItem value="churned">Förlorad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kontaktinformation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Kontaktperson</Label>
                    <Input
                      value={editedClient.primary_contact_name}
                      onChange={(e) => setEditedClient({ ...editedClient, primary_contact_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>E-post</Label>
                    <Input
                      value={editedClient.primary_contact_email}
                      onChange={(e) => setEditedClient({ ...editedClient, primary_contact_email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Telefon</Label>
                    <Input
                      value={editedClient.primary_contact_phone || ''}
                      onChange={(e) => setEditedClient({ ...editedClient, primary_contact_phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Webbplats</Label>
                    <Input
                      value={editedClient.website || ''}
                      onChange={(e) => setEditedClient({ ...editedClient, website: e.target.value })}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`tel:${editedClient.primary_contact_phone}`)}
                      disabled={!editedClient.primary_contact_phone}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Ring
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`mailto:${editedClient.primary_contact_email}`)}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      E-post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button onClick={handleSaveClient} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Spara ändringar
            </Button>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-8 text-foreground/70">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-foreground/40" />
                <p>Inga bokningar för denna klient.</p>
              </div>
            ) : (
              bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{booking.contact_name}</h4>
                        <p className="text-sm text-foreground/70">{booking.email}</p>
                        <p className="text-xs text-foreground/60 mt-1">
                          {new Date(booking.created_at!).toLocaleDateString('sv-SE')}
                        </p>
                      </div>
                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="interactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Lägg till interaktion</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Typ</Label>
                    <Select 
                      value={newInteraction.type} 
                      onValueChange={(value) => setNewInteraction({ ...newInteraction, type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">E-post</SelectItem>
                        <SelectItem value="phone">Telefon</SelectItem>
                        <SelectItem value="meeting">Möte</SelectItem>
                        <SelectItem value="note">Anteckning</SelectItem>
                        <SelectItem value="follow_up">Uppföljning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Ämne</Label>
                    <Input
                      value={newInteraction.subject}
                      onChange={(e) => setNewInteraction({ ...newInteraction, subject: e.target.value })}
                      placeholder="Kortfattat ämne..."
                    />
                  </div>
                </div>
                <div>
                  <Label>Innehåll</Label>
                  <Textarea
                    value={newInteraction.content}
                    onChange={(e) => setNewInteraction({ ...newInteraction, content: e.target.value })}
                    placeholder="Detaljerad beskrivning av interaktionen..."
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddInteraction}>
                  <Plus className="w-4 h-4 mr-2" />
                  Lägg till interaktion
                </Button>
              </CardContent>
            </Card>

            {interactions.length === 0 ? (
              <div className="text-center py-8 text-foreground/70">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-foreground/40" />
                <p>Inga interaktioner registrerade ännu.</p>
              </div>
            ) : (
              interactions.map((interaction) => (
                <Card key={interaction.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{interaction.interaction_type}</Badge>
                        <span className="font-medium">{interaction.subject}</span>
                      </div>
                      <span className="text-xs text-foreground/60">
                        {new Date(interaction.interaction_date!).toLocaleString('sv-SE')}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80">{interaction.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Lägg till anteckning</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Prioritet</Label>
                  <Select 
                    value={newNote.priority} 
                    onValueChange={(value) => setNewNote({ ...newNote, priority: value as PriorityLevel })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Låg</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">Hög</SelectItem>
                      <SelectItem value="urgent">Akut</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Anteckning</Label>
                  <Textarea
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    placeholder="Skriv din anteckning här..."
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddNote}>
                  <Plus className="w-4 h-4 mr-2" />
                  Lägg till anteckning
                </Button>
              </CardContent>
            </Card>

            {notes.length === 0 ? (
              <div className="text-center py-8 text-foreground/70">
                <FileText className="w-12 h-12 mx-auto mb-4 text-foreground/40" />
                <p>Inga anteckningar än.</p>
              </div>
            ) : (
              notes.map((note) => (
                <Card key={note.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={getPriorityColor(note.priority!)}>
                        {note.priority}
                      </Badge>
                      <span className="text-xs text-foreground/60">
                        {new Date(note.created_at!).toLocaleString('sv-SE')}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 whitespace-pre-wrap">{note.note_content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};