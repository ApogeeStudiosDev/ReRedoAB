
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  email: string;
  name: string;
  companyName: string;
  bookingDate?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, companyName, bookingDate }: BookingEmailRequest = await req.json();

    const formatBookingDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleString('sv-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    const bookingDateText = bookingDate 
      ? `<p style="color: #4a5568; margin-bottom: 16px; font-weight: bold;">
          Bokad tid: ${formatBookingDate(bookingDate)}
        </p>`
      : '';

    const emailResponse = await resend.emails.send({
      from: "ReRedo <onboarding@resend.dev>",
      to: [email],
      subject: "Tack för din bokningsförfrågan - ReRedo",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2d3748; margin-bottom: 20px;">Tack för din bokningsförfrågan!</h1>
          <p style="color: #4a5568; margin-bottom: 16px;">Hej ${name},</p>
          <p style="color: #4a5568; margin-bottom: 16px;">
            Vi har mottagit din förfrågan om en kostnadsfri konsultation för ${companyName}. 
            ${bookingDate ? 'Vi bekräftar din bokning och kontaktar dig inom 24 timmar.' : 'Vi kontaktar dig inom 24 timmar för att boka en lämplig tid.'}
          </p>
          ${bookingDateText}
          <p style="color: #4a5568; margin-bottom: 16px;">
            Under konsultationen kommer vi att:
          </p>
          <ul style="color: #4a5568; margin-bottom: 16px;">
            <li>Lära känna ditt företag och era behov</li>
            <li>Diskutera era nuvarande utmaningar</li>
            <li>Föreslå skräddarsydda lösningar</li>
            <li>Svara på alla era frågor</li>
          </ul>
          <p style="color: #4a5568; margin-bottom: 16px;">
            Har du några frågor innan vårt möte kan du kontakta oss på denna e-post.
          </p>
          <p style="color: #4a5568; margin-bottom: 8px;">Med vänliga hälsningar,</p>
          <p style="color: #4a5568; font-weight: bold;">ReRedo Team</p>
        </div>
      `,
    });

    console.log("Booking confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
