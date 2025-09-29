import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Check, X, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";

type Booking = Database['public']['Tables']['bookings']['Row'];

interface BookingTableProps {
  bookings: Booking[];
  loading: boolean;
  onUpdateStatus: (bookingId: string, status: Database['public']['Enums']['booking_status']) => void;
}

export const BookingTable = ({ bookings, loading, onUpdateStatus }: BookingTableProps) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'in_progress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'rescheduled': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'no_show': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'follow_up_needed': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Väntar';
      case 'confirmed': return 'Bekräftad';
      case 'completed': return 'Slutförd';
      case 'cancelled': return 'Avbruten';
      case 'in_progress': return 'Pågår';
      case 'rescheduled': return 'Omschemalagd';
      case 'no_show': return 'Dök ej upp';
      case 'follow_up_needed': return 'Uppföljning krävs';
      default: return status;
    }
  };

  const toggleExpanded = (bookingId: string) => {
    setExpandedRow(expandedRow === bookingId ? null : bookingId);
  };

  if (loading) {
    return <div className="p-4">Laddar bokningar...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 text-foreground/70">
        Inga bokningar ännu.
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-urbanist font-bold text-xl">
          Alla bokningar ({bookings.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Företag</TableHead>
              <TableHead>Kontakt</TableHead>
              <TableHead>Bransch</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Åtgärder</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <>
                <TableRow key={booking.id} className="cursor-pointer" onClick={() => toggleExpanded(booking.id)}>
                  <TableCell className="font-medium">{booking.company_name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{booking.contact_name}</div>
                      <div className="text-foreground/60">{booking.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{booking.industry}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(booking.created_at!).toLocaleDateString('sv-SE')}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(booking.id);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {booking.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateStatus(booking.id, 'confirmed');
                          }}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateStatus(booking.id, 'completed');
                          }}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateStatus(booking.id, 'cancelled');
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRow === booking.id && (
                  <TableRow>
                    <TableCell colSpan={6} className="bg-muted/20">
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-foreground/70">Företagsstorlek</p>
                            <p className="font-medium">{booking.company_size}</p>
                          </div>
                          <div>
                            <p className="text-sm text-foreground/70">Organisationsnummer</p>
                            <p className="font-medium">{booking.organization_number}</p>
                          </div>
                          {booking.phone && (
                            <div>
                              <p className="text-sm text-foreground/70">Telefon</p>
                              <p className="font-medium">{booking.phone}</p>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-sm text-foreground/70 mb-2">Nuvarande situation</p>
                          <div className="flex flex-wrap gap-1">
                            {booking.current_situation.map((situation, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {situation}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-foreground/70 mb-2">Utmaningar</p>
                          <div className="flex flex-wrap gap-1">
                            {booking.challenges.map((challenge, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {challenge}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {booking.additional_info && (
                          <div>
                            <p className="text-sm text-foreground/70 mb-2">Ytterligare information</p>
                            <p className="text-sm bg-muted/50 p-3 rounded">{booking.additional_info}</p>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};