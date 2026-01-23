import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SelectedPackage {
  name: string;
  monthly_price: number;
  company_type: string;
  package_tier: string;
  included_services: string[];
}

interface BookingEmailRequest {
  email: string;
  name: string;
  phone?: string;
  companyName: string;
  organizationNumber: string;
  industry: string;
  companySize: string;
  currentSituation: string[];
  challenges: string[];
  additionalInfo?: string;
  selectedPackage?: SelectedPackage | null;
}

// Generate ICS calendar file content
const generateICSContent = (
  bookingData: BookingEmailRequest,
  consultationDate: Date
): string => {
  const endDate = new Date(consultationDate);
  endDate.setMinutes(endDate.getMinutes() + 45); // 45 minute consultation

  const formatICSDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };

  const uid = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@reredo.se`;

  const description = `Kostnadsfri konsultation med ReRedo AB\\n\\nFöretag: ${bookingData.companyName}\\nOrg.nr: ${bookingData.organizationNumber}\\nKontaktperson: ${bookingData.name}\\nBransch: ${bookingData.industry}\\n${bookingData.selectedPackage ? `\\nIntresserad av: ${bookingData.selectedPackage.name}` : ''}\\n\\nMötet sker via Microsoft Teams. Länk skickas separat.`;

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ReRedo AB//Booking System//SV
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(consultationDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:Konsultation med ReRedo AB - ${bookingData.companyName}
DESCRIPTION:${description}
LOCATION:Microsoft Teams (länk skickas via e-post)
ORGANIZER;CN=ReRedo AB:mailto:info@reredo.se
ATTENDEE;CN=${bookingData.name};RSVP=TRUE:mailto:${bookingData.email}
STATUS:TENTATIVE
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
};

// Generate user confirmation email HTML
const generateUserEmailHTML = (data: BookingEmailRequest): string => {
  const packageInfo = data.selectedPackage
    ? `<div style="background-color: #000; color: #fff; padding: 20px; border-radius: 12px; margin: 20px 0;">
        <p style="margin: 0 0 8px 0; font-size: 14px; opacity: 0.8;">Valt paket:</p>
        <p style="margin: 0; font-size: 20px; font-weight: bold;">${data.selectedPackage.name}</p>
        <p style="margin: 8px 0 0 0; font-size: 16px;">${data.selectedPackage.monthly_price.toLocaleString('sv-SE')} kr/mån • ${data.selectedPackage.company_type === 'AB' ? 'Aktiebolag' : 'Enskild firma'}</p>
      </div>`
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">

        <!-- Logo/Header -->
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #000; font-size: 28px; margin: 0;">ReRedo</h1>
          <p style="color: #666; margin: 8px 0 0 0;">Redovisning & Ekonomi</p>
        </div>

        <!-- Success Icon -->
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="width: 64px; height: 64px; background-color: #10b981; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 32px;">✓</span>
          </div>
        </div>

        <h2 style="color: #000; text-align: center; margin-bottom: 24px; font-size: 24px;">
          Tack för din bokningsförfrågan!
        </h2>

        <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
          Hej ${data.name},
        </p>

        <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
          Vi har mottagit din förfrågan om en kostnadsfri konsultation för <strong>${data.companyName}</strong>.
          Vi kontaktar dig inom 24 timmar för att boka en lämplig tid.
        </p>

        ${packageInfo}

        <!-- Booking Summary -->
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 12px; margin: 24px 0;">
          <h3 style="color: #000; margin: 0 0 16px 0; font-size: 16px;">Sammanfattning</h3>
          <table style="width: 100%; font-size: 14px;">
            <tr>
              <td style="color: #6b7280; padding: 4px 0;">Företag:</td>
              <td style="color: #000; padding: 4px 0; text-align: right;">${data.companyName}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; padding: 4px 0;">Org.nr:</td>
              <td style="color: #000; padding: 4px 0; text-align: right;">${data.organizationNumber}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; padding: 4px 0;">Bransch:</td>
              <td style="color: #000; padding: 4px 0; text-align: right;">${data.industry}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; padding: 4px 0;">Storlek:</td>
              <td style="color: #000; padding: 4px 0; text-align: right;">${data.companySize} anställda</td>
            </tr>
          </table>
        </div>

        <!-- What happens next -->
        <div style="margin: 24px 0;">
          <h3 style="color: #000; margin: 0 0 16px 0; font-size: 16px;">Vad händer nu?</h3>
          <ol style="color: #4a5568; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li>Vi granskar din förfrågan</li>
            <li>Vi kontaktar dig inom 24 timmar för att boka tid</li>
            <li>Du får en Teams-länk inför konsultationen</li>
            <li>30-45 min kostnadsfri genomgång av dina behov</li>
          </ol>
        </div>

        <!-- Contact Info -->
        <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 24px;">
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">
            Har du frågor? Kontakta oss:
          </p>
          <p style="color: #000; font-size: 14px; margin: 0;">
            <a href="mailto:info@reredo.se" style="color: #000; text-decoration: underline;">info@reredo.se</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            ReRedo AB • Baldersgatan 3, Göteborg • Org.nr 559497-7554
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin: 8px 0 0 0;">
            <a href="https://reredo.se" style="color: #9ca3af;">reredo.se</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Generate admin notification email HTML
const generateAdminEmailHTML = (data: BookingEmailRequest): string => {
  const packageInfo = data.selectedPackage
    ? `<tr>
        <td style="color: #6b7280; padding: 8px 0; vertical-align: top;">Valt paket:</td>
        <td style="color: #000; padding: 8px 0;"><strong>${data.selectedPackage.name}</strong> (${data.selectedPackage.monthly_price.toLocaleString('sv-SE')} kr/mån, ${data.selectedPackage.company_type})</td>
      </tr>`
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">

        <!-- Header -->
        <div style="background-color: #000; color: #fff; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
          <h1 style="margin: 0; font-size: 20px;">🔔 Ny bokningsförfrågan</h1>
          <p style="margin: 8px 0 0 0; opacity: 0.8; font-size: 14px;">${new Date().toLocaleString('sv-SE')}</p>
        </div>

        <!-- Company Info -->
        <h2 style="color: #000; font-size: 18px; margin: 0 0 16px 0;">Företagsinformation</h2>
        <table style="width: 100%; font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td style="color: #6b7280; padding: 8px 0; width: 140px;">Företagsnamn:</td>
            <td style="color: #000; padding: 8px 0;"><strong>${data.companyName}</strong></td>
          </tr>
          <tr>
            <td style="color: #6b7280; padding: 8px 0;">Org.nr:</td>
            <td style="color: #000; padding: 8px 0;">${data.organizationNumber}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; padding: 8px 0;">Bransch:</td>
            <td style="color: #000; padding: 8px 0;">${data.industry}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; padding: 8px 0;">Storlek:</td>
            <td style="color: #000; padding: 8px 0;">${data.companySize} anställda</td>
          </tr>
          ${packageInfo}
        </table>

        <!-- Contact Info -->
        <h2 style="color: #000; font-size: 18px; margin: 0 0 16px 0;">Kontaktuppgifter</h2>
        <table style="width: 100%; font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td style="color: #6b7280; padding: 8px 0; width: 140px;">Kontaktperson:</td>
            <td style="color: #000; padding: 8px 0;"><strong>${data.name}</strong></td>
          </tr>
          <tr>
            <td style="color: #6b7280; padding: 8px 0;">E-post:</td>
            <td style="color: #000; padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></td>
          </tr>
          ${data.phone ? `<tr>
            <td style="color: #6b7280; padding: 8px 0;">Telefon:</td>
            <td style="color: #000; padding: 8px 0;"><a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a></td>
          </tr>` : ''}
        </table>

        <!-- Current Situation -->
        <h2 style="color: #000; font-size: 18px; margin: 0 0 16px 0;">Nuvarande situation</h2>
        <ul style="color: #4a5568; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0 0 24px 0;">
          ${data.currentSituation.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <!-- Challenges -->
        <h2 style="color: #000; font-size: 18px; margin: 0 0 16px 0;">Utmaningar</h2>
        <ul style="color: #4a5568; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0 0 24px 0;">
          ${data.challenges.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <!-- Additional Info -->
        ${data.additionalInfo ? `
        <h2 style="color: #000; font-size: 18px; margin: 0 0 16px 0;">Ytterligare information</h2>
        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
          <p style="color: #4a5568; font-size: 14px; line-height: 1.6; margin: 0;">${data.additionalInfo}</p>
        </div>
        ` : ''}

        <!-- Action Buttons -->
        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
          <a href="mailto:${data.email}?subject=Angående din bokningsförfrågan - ReRedo"
             style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
            Svara kunden
          </a>
        </div>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingEmailRequest = await req.json();

    console.log("Received booking data:", JSON.stringify(bookingData, null, 2));

    // Generate a tentative consultation date (next business day at 10:00)
    const consultationDate = new Date();
    consultationDate.setDate(consultationDate.getDate() + 1);
    // Skip weekends
    while (consultationDate.getDay() === 0 || consultationDate.getDay() === 6) {
      consultationDate.setDate(consultationDate.getDate() + 1);
    }
    consultationDate.setHours(10, 0, 0, 0);

    // Generate ICS file content
    const icsContent = generateICSContent(bookingData, consultationDate);
    const icsBase64 = btoa(unescape(encodeURIComponent(icsContent)));

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "ReRedo AB <info@reredo.se>",
      to: [bookingData.email],
      subject: "Tack för din bokningsförfrågan - ReRedo AB",
      html: generateUserEmailHTML(bookingData),
      attachments: [
        {
          filename: "reredo-konsultation.ics",
          content: icsBase64,
          content_type: "text/calendar",
        },
      ],
    });

    console.log("User email sent:", userEmailResponse);

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "ReRedo AB <info@reredo.se>",
      to: ["info@reredo.se"],
      subject: `Ny bokningsförfrågan: ${bookingData.companyName}`,
      html: generateAdminEmailHTML(bookingData),
      reply_to: bookingData.email,
    });

    console.log("Admin email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        userEmail: userEmailResponse,
        adminEmail: adminEmailResponse,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
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
