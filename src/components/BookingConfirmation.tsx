import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone, Building2, CheckCircle, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface BookingConfirmationProps {
  bookingData: {
    contactName: string;
    email: string;
    phone?: string;
    companyName: string;
    bookingDate: Date | null;
    selectedTime: string;
    selectedPackage?: {
      name: string;
      monthly_price: number;
    } | null;
  };
  onClose: () => void;
}

const BookingConfirmation = ({ bookingData, onClose }: BookingConfirmationProps) => {
  const [icsFile, setIcsFile] = useState<string>("");

  useEffect(() => {
    if (bookingData.bookingDate && bookingData.selectedTime) {
      generateICSFile();
    }
  }, [bookingData]);

  const generateICSFile = () => {
    if (!bookingData.bookingDate || !bookingData.selectedTime) return;

    const startDate = new Date(bookingData.bookingDate);
    const [hours, minutes] = bookingData.selectedTime.split(":");
    startDate.setHours(parseInt(hours), parseInt(minutes));

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 45); // 45 minutes meeting

    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ReRedo AB//Booking System//SV
BEGIN:VEVENT
UID:${Date.now()}@reredo.se
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:Konsultation med ReRedo AB
DESCRIPTION:Ekonomikonsultation med ReRedo AB\\n\\nFöretag: ${bookingData.companyName}\\nKontaktperson: ${bookingData.contactName}\\n${bookingData.selectedPackage ? `Valt paket: ${bookingData.selectedPackage.name}\\n` : ''}\\nMötet sker via Microsoft Teams. En länk skickas separat via e-post.
LOCATION:Microsoft Teams (länk skickas via e-post)
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setIcsFile(url);
  };

  const downloadICS = () => {
    if (!icsFile) return;
    const link = document.createElement("a");
    link.href = icsFile;
    link.download = "reredo-konsultation.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addToGoogleCalendar = () => {
    if (!bookingData.bookingDate || !bookingData.selectedTime) return;

    const startDate = new Date(bookingData.bookingDate);
    const [hours, minutes] = bookingData.selectedTime.split(":");
    startDate.setHours(parseInt(hours), parseInt(minutes));

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 45);

    const formatGoogleDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    };

    const details = `Ekonomikonsultation med ReRedo AB
Företag: ${bookingData.companyName}
Kontaktperson: ${bookingData.contactName}
${bookingData.selectedPackage ? `Valt paket: ${bookingData.selectedPackage.name}` : ''}
Mötet sker via Microsoft Teams. En länk skickas separat via e-post.`;

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Konsultation med ReRedo AB')}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent('Microsoft Teams')}`;

    window.open(url, '_blank');
  };

  const addToOutlookCalendar = () => {
    if (!bookingData.bookingDate || !bookingData.selectedTime) return;

    const startDate = new Date(bookingData.bookingDate);
    const [hours, minutes] = bookingData.selectedTime.split(":");
    startDate.setHours(parseInt(hours), parseInt(minutes));

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 45);

    const formatOutlookDate = (date: Date) => {
      return date.toISOString();
    };

    const body = `Ekonomikonsultation med ReRedo AB
Företag: ${bookingData.companyName}
Kontaktperson: ${bookingData.contactName}
${bookingData.selectedPackage ? `Valt paket: ${bookingData.selectedPackage.name}` : ''}
Mötet sker via Microsoft Teams. En länk skickas separat via e-post.`;

    const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent('Konsultation med ReRedo AB')}&startdt=${formatOutlookDate(startDate)}&enddt=${formatOutlookDate(endDate)}&body=${encodeURIComponent(body)}&location=${encodeURIComponent('Microsoft Teams')}`;

    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    >
      <Card className="max-w-2xl w-full shadow-2xl border-primary/20">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">
            Bokning bekräftad!
          </CardTitle>
          <p className="text-foreground/70 mt-2">
            Vi har mottagit din bokningsförfrågan och skickat en bekräftelse till din e-post.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Booking Details */}
          <div className="bg-card/50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-lg mb-3">Bokningsdetaljer</h3>

            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-foreground/80">{bookingData.companyName}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-foreground/80">{bookingData.email}</span>
            </div>

            {bookingData.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-foreground/80">{bookingData.phone}</span>
              </div>
            )}

            {bookingData.bookingDate && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-foreground/80">
                  {bookingData.bookingDate.toLocaleDateString('sv-SE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} kl. {bookingData.selectedTime}
                </span>
              </div>
            )}

            {bookingData.selectedPackage && (
              <div className="pt-3 mt-3 border-t border-border/30">
                <p className="text-sm text-foreground/60 mb-1">Valt paket:</p>
                <p className="font-semibold text-primary">
                  {bookingData.selectedPackage.name} - {bookingData.selectedPackage.monthly_price} kr/mån
                </p>
              </div>
            )}
          </div>

          {/* Calendar Actions */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Lägg till i din kalender</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                onClick={downloadICS}
                variant="outline"
                className="flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" />
                Ladda ner .ics
              </Button>
              <Button
                onClick={addToGoogleCalendar}
                variant="outline"
                className="flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Google Kalender
              </Button>
              <Button
                onClick={addToOutlookCalendar}
                variant="outline"
                className="flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Outlook
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Nästa steg</h3>
            <ol className="list-decimal list-inside space-y-2 text-foreground/80 text-sm">
              <li>Du får en bekräftelse via e-post inom några minuter</li>
              <li>En Teams-länk skickas till dig senast dagen före mötet</li>
              <li>Vi ringer upp dig på den angivna tiden för konsultationen</li>
              <li>Efter mötet får du en sammanfattning och förslag på nästa steg</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              Stäng
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookingConfirmation;