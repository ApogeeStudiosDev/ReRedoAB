import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
  endDate.setMinutes(endDate.getMinutes() + 45);

  const formatICSDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };

  const uid = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}@reredo.se`;

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

// ReRedo logo as inline SVG data URI
const logoDataUri = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTIiIGhlaWdodD0iODkiIHZpZXdCb3g9IjAgMCA5MiA4OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMC40ODQyIDEuNTAzNDJDNi43NjAyMiA2LjQ4MzAyIC0xLjIzNDU3IDE4LjQxNTEgMC4xNTYwNTUgMzEuODU1OEMxLjE1MDg1IDQxLjUxOTYgMy4yODEwNiA0NC44NDgxIDE4LjU5MzYgNjAuNzEwMUMyNi4zNTQgNjguNzQzOSAzNS41MTAyIDc4LjM3MDggMzguOTQyNSA4Mi4xMDAyQzQ0LjY5MjUgODguMzUxMSA0NS4zNjQ0IDg4LjgxIDQ3LjU2NzUgODcuOTYwN0M1Mi4wMTAyIDg2LjI0NjQgNTMuNTMxMSA4NS4xMDcgNTMuNTA1IDgzLjQ5MjhDNTMuNDc5IDgxLjg5NDUgMjguMzQzNiA1NC4zMzc5IDE5Ljk2ODYgNDYuNzI2QzEzLjI0OTggNDAuNjIyOSAxMS41MDUgMzcuMTY3NyAxMS40NDc3IDI5LjgzMDJDMTEuNDA2MSAyNC41OTc0IDExLjc5MTUgMjIuOTk5MSAxMy44OCAyOS44MDI0QzE3LjA0NjcgMTQuOTYgMjEuNjQwNCAxMi4wODUxIDI3LjMwNzEgMTEuNDA5OUM0Ny41NTE5IDguOTg4NjUgNTcuMTU2MSAzMy42NDQgNDAuMDUxOSA0NC4xMzA3QzM3LjMwNzEgNDUuODA4MiAzNS4wNTE5IDQ3LjYyMjggMzUuMDM2MyA0OC4xNjA4QzM1LjAwNSA0OS4zNTMgNjMuMDQ2NyA3Ny40OTUxIDY3LjAzMTEgODAuMjY5OEM3MC43NDk4IDgyLjg1OTggNzcuOTk0NiA4NS42ODIgODIuODY0NCA4Ni40NDE2Qzg3LjQ1ODEgODcuMTU5IDg5LjY0NTYgODUuNTM5NSA4OS42NDU2IDgxLjQyNUM4OS42NDU2IDc2Ljg5MzggODguNzkxNSA3NS45MTc5IDg0LjIzOTQgNzUuMjI2OUM3Ni4yMDI5IDc0LjAxMzYgNzIuMTE0NCA3MS40Mzk0IDYxLjY3NjkgNjEuMDI2NkM1Ni4xNzY5IDU1LjUzNTMgNTEuNjc2OSA1MC43NDU2IDUxLjY3NjkgNTAuMzgxNkM1MS42NzY5IDUwLjAxNzYgNTMuMTI0OCA0Ny41NDM3IDU0Ljg5MDQgNDQuODg1MUM2MC40MDYxIDM2LjU4NzUgNjEuNDY4NiAyOC4yMjEzIDU4LjE1MDggMTkuMjQzM0M1Mi44NjQ0IDQuOTM3NDQgMzQuNjY2NSAtMy42Mzk3MSAyMC40ODQyIDEuNTAzNDJaTTU0LjUyMDYgMC43OTY1NjZMNTIuMjcwNiAxLjc2MTg5TDU2LjcwMjkgNi4zMTQyMkM2MC4wMzExIDkuNzQyOTcgNjIuMDQ2NyAxMS4wMTk1IDY0Ljg0MzYgMTEuNDczMkM3MC41OTM2IDEyLjQwMTYgNzYuMDcyNyAxNi43NDgyIDc4LjM5NTYgMjIuMjIzNkM4MC43MjM4IDI3LjcwNDQgODAuOTAwOCAzMS44NjYzIDc5LjAzMTEgMzcuMjM2M0M3Ny4xMyA0Mi42ODU0IDczLjU4ODMgNDcuMDU4NCA2OC4yNzU4IDUwLjUxMzVDNjUuNzY1NCA1Mi4xNDM1IDYzLjcxODYgNTMuOTg0NCA2My43MTg2IDU0LjYwMTZDNjMuNzE4NiA1NS4yMTg4IDY1LjE2NjUgNTcuMTQ5NCA2Ni45NDI1IDU4Ljg5MDJDNjkuOTk5OCA2MS44OTcgNzAuMjkxNSA2MS45ODY2IDcyLjY2MTMgNjAuNzE1NEM3OC4wMzYzIDU3LjgzNTIgODQuOTczOCA1MC4zMDc4IDg3Ljk5OTggNDQuMDgzM0M5MC42NzE3IDM4LjU4NjcgOTEuMDMxMSAzNi45NTE1IDkxLjAxMDIgMzAuMzI2QzkwLjk4OTQgMjQuNTAyNCA5MC40OTk4IDIxLjY5NjEgODguODI3OSAxNy45MDg3Qzg2LjI0NDYgMTIuMDU4NyA3OS4yNjU0IDUuMTQ4NDUgNzMuMTkyNSAyLjQzMTgyQzY4LjI2NTQgMC4yMjE1OSA1Ny45NDc3IC0wLjY4MDQzNiA1NC41MjA2IDAuNzk2NTY2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+`;

const logoDataUriBlack = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTIiIGhlaWdodD0iODkiIHZpZXdCb3g9IjAgMCA5MiA4OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMC40ODQyIDEuNTAzNDJDNi43NjAyMiA2LjQ4MzAyIC0xLjIzNDU3IDE4LjQxNTEgMC4xNTYwNTUgMzEuODU1OEMxLjE1MDg1IDQxLjUxOTYgMy4yODEwNiA0NC44NDgxIDE4LjU5MzYgNjAuNzEwMUMyNi4zNTQgNjguNzQzOSAzNS41MTAyIDc4LjM3MDggMzguOTQyNSA4Mi4xMDAyQzQ0LjY5MjUgODguMzUxMSA0NS4zNjQ0IDg4LjgxIDQ3LjU2NzUgODcuOTYwN0M1Mi4wMTAyIDg2LjI0NjQgNTMuNTMxMSA4NS4xMDcgNTMuNTA1IDgzLjQ5MjhDNTMuNDc5IDgxLjg5NDUgMjguMzQzNiA1NC4zMzc5IDE5Ljk2ODYgNDYuNzI2QzEzLjI0OTggNDAuNjIyOSAxMS41MDUgMzcuMTY3NyAxMS40NDc3IDI5LjgzMDJDMTEuNDA2MSAyNC41OTc0IDExLjc5MTUgMjIuOTk5MSAxMy44OCAyOS44MDI0QzE3LjA0NjcgMTQuOTYgMjEuNjQwNCAxMi4wODUxIDI3LjMwNzEgMTEuNDA5OUM0Ny41NTE5IDguOTg4NjUgNTcuMTU2MSAzMy42NDQgNDAuMDUxOSA0NC4xMzA3QzM3LjMwNzEgNDUuODA4MiAzNS4wNTE5IDQ3LjYyMjggMzUuMDM2MyA0OC4xNjA4QzM1LjAwNSA0OS4zNTMgNjMuMDQ2NyA3Ny40OTUxIDY3LjAzMTEgODAuMjY5OEM3MC43NDk4IDgyLjg1OTggNzcuOTk0NiA4NS42ODIgODIuODY0NCA4Ni40NDE2Qzg3LjQ1ODEgODcuMTU5IDg5LjY0NTYgODUuNTM5NSA4OS42NDU2IDgxLjQyNUM4OS42NDU2IDc2Ljg5MzggODguNzkxNSA3NS45MTc5IDg0LjIzOTQgNzUuMjI2OUM3Ni4yMDI5IDc0LjAxMzYgNzIuMTE0NCA3MS40Mzk0IDYxLjY3NjkgNjEuMDI2NkM1Ni4xNzY5IDU1LjUzNTMgNTEuNjc2OSA1MC43NDU2IDUxLjY3NjkgNTAuMzgxNkM1MS42NzY5IDUwLjAxNzYgNTMuMTI0OCA0Ny41NDM3IDU0Ljg5MDQgNDQuODg1MUM2MC40MDYxIDM2LjU4NzUgNjEuNDY4NiAyOC4yMjEzIDU4LjE1MDggMTkuMjQzM0M1Mi44NjQ0IDQuOTM3NDQgMzQuNjY2NSAtMy42Mzk3MSAyMC40ODQyIDEuNTAzNDJaTTU0LjUyMDYgMC43OTY1NjZMNTIuMjcwNiAxLjc2MTg5TDU2LjcwMjkgNi4zMTQyMkM2MC4wMzExIDkuNzQyOTcgNjIuMDQ2NyAxMS4wMTk1IDY0Ljg0MzYgMTEuNDczMkM3MC41OTM2IDEyLjQwMTYgNzYuMDcyNyAxNi43NDgyIDc4LjM5NTYgMjIuMjIzNkM4MC43MjM4IDI3LjcwNDQgODAuOTAwOCAzMS44NjYzIDc5LjAzMTEgMzcuMjM2M0M3Ny4xMyA0Mi42ODU0IDczLjU4ODMgNDcuMDU4NCA2OC4yNzU4IDUwLjUxMzVDNjUuNzY1NCA1Mi4xNDM1IDYzLjcxODYgNTMuOTg0NCA2My43MTg2IDU0LjYwMTZDNjMuNzE4NiA1NS4yMTg4IDY1LjE2NjUgNTcuMTQ5NCA2Ni45NDI1IDU4Ljg5MDJDNjkuOTk5OCA2MS44OTcgNzAuMjkxNSA2MS45ODY2IDcyLjY2MTMgNjAuNzE1NEM3OC4wMzYzIDU3LjgzNTIgODQuOTczOCA1MC4zMDc4IDg3Ljk5OTggNDQuMDgzM0M5MC42NzE3IDM4LjU4NjcgOTEuMDMxMSAzNi45NTE1IDkxLjAxMDIgMzAuMzI2QzkwLjk4OTQgMjQuNTAyNCA5MC40OTk4IDIxLjY5NjEgODguODI3OSAxNy45MDg3Qzg2LjI0NDYgMTIuMDU4NyA3OS4yNjU0IDUuMTQ4NDUgNzMuMTkyNSAyLjQzMTgyQzY4LjI2NTQgMC4yMjE1OSA1Ny45NDc3IC0wLjY4MDQzNiA1NC41MjA2IDAuNzk2NTY2WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+`;

// Generate user confirmation email HTML
const generateUserEmailHTML = (data: BookingEmailRequest): string => {
  const packageInfo = data.selectedPackage
    ? `<div style="background-color: #000; color: #fff; padding: 24px; border-radius: 16px; margin: 28px 0;">
        <p style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.7;">Valt paket</p>
        <p style="margin: 0; font-size: 22px; font-weight: 700;">${data.selectedPackage.name}</p>
        <p style="margin: 10px 0 0 0; font-size: 15px; opacity: 0.85;">${data.selectedPackage.monthly_price.toLocaleString('sv-SE')} kr/mån · ${data.selectedPackage.company_type === 'AB' ? 'Aktiebolag' : 'Enskild firma'}</p>
      </div>`
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #000;">

      <!-- Black Header -->
      <div style="background-color: #000; padding: 32px 20px; text-align: center;">
        <img src="${logoDataUri}" alt="ReRedo" width="46" height="44" style="display: inline-block;" />
        <p style="color: #fff; font-size: 13px; margin: 12px 0 0 0; opacity: 0.6;">Redovisning & Ekonomi</p>
      </div>

      <!-- White Content -->
      <div style="background-color: #fff; padding: 48px 40px; max-width: 560px; margin: 0 auto;">

        <h1 style="color: #000; font-size: 28px; font-weight: 700; margin: 0 0 24px 0; line-height: 1.3;">
          Tack för din bokningsförfrågan!
        </h1>

        <p style="color: #000; font-size: 16px; line-height: 1.7; margin: 0 0 20px 0;">
          Hej ${data.name},
        </p>

        <p style="color: #444; font-size: 16px; line-height: 1.7; margin: 0 0 32px 0;">
          Vi har mottagit din förfrågan om en kostnadsfri konsultation för <strong style="color: #000;">${data.companyName}</strong>. Vi kontaktar dig inom 24 timmar för att boka en lämplig tid.
        </p>

        ${packageInfo}

        <!-- Summary Box -->
        <div style="background-color: #f8f8f8; padding: 24px; border-radius: 16px; margin: 28px 0;">
          <h3 style="color: #000; margin: 0 0 20px 0; font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Sammanfattning</h3>
          <table style="width: 100%; font-size: 15px; border-collapse: collapse;">
            <tr>
              <td style="color: #666; padding: 8px 0; border-bottom: 1px solid #eee;">Företag</td>
              <td style="color: #000; padding: 8px 0; text-align: right; font-weight: 500; border-bottom: 1px solid #eee;">${data.companyName}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0; border-bottom: 1px solid #eee;">Org.nr</td>
              <td style="color: #000; padding: 8px 0; text-align: right; border-bottom: 1px solid #eee;">${data.organizationNumber}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0; border-bottom: 1px solid #eee;">Bransch</td>
              <td style="color: #000; padding: 8px 0; text-align: right; border-bottom: 1px solid #eee;">${data.industry}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 8px 0;">Storlek</td>
              <td style="color: #000; padding: 8px 0; text-align: right;">${data.companySize} anställda</td>
            </tr>
          </table>
        </div>

        <!-- Next Steps -->
        <div style="margin: 32px 0;">
          <h3 style="color: #000; margin: 0 0 20px 0; font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Vad händer nu?</h3>
          <table style="width: 100%; font-size: 15px;">
            <tr>
              <td style="color: #000; padding: 10px 0; vertical-align: top; width: 28px; font-weight: 600;">1.</td>
              <td style="color: #444; padding: 10px 0;">Vi granskar din förfrågan</td>
            </tr>
            <tr>
              <td style="color: #000; padding: 10px 0; vertical-align: top; font-weight: 600;">2.</td>
              <td style="color: #444; padding: 10px 0;">Vi kontaktar dig inom 24 timmar för att boka tid</td>
            </tr>
            <tr>
              <td style="color: #000; padding: 10px 0; vertical-align: top; font-weight: 600;">3.</td>
              <td style="color: #444; padding: 10px 0;">Du får en Teams-länk inför konsultationen</td>
            </tr>
            <tr>
              <td style="color: #000; padding: 10px 0; vertical-align: top; font-weight: 600;">4.</td>
              <td style="color: #444; padding: 10px 0;">30-45 min kostnadsfri genomgång av dina behov</td>
            </tr>
          </table>
        </div>

        <!-- Contact -->
        <div style="border-top: 1px solid #eee; padding-top: 28px; margin-top: 32px;">
          <p style="color: #666; font-size: 14px; margin: 0 0 8px 0;">
            Har du frågor? Kontakta oss:
          </p>
          <p style="margin: 0;">
            <a href="mailto:info@reredo.se" style="color: #000; font-size: 15px; font-weight: 500; text-decoration: none;">info@reredo.se</a>
          </p>
        </div>

      </div>

      <!-- Black Footer -->
      <div style="background-color: #000; padding: 32px 20px; text-align: center;">
        <p style="color: #666; font-size: 13px; margin: 0 0 8px 0;">
          ReRedo AB · Baldersgatan 3, Göteborg · Org.nr 559497-7554
        </p>
        <p style="margin: 0;">
          <a href="https://reredo.se" style="color: #888; font-size: 13px; text-decoration: none;">reredo.se</a>
        </p>
      </div>

    </body>
    </html>
  `;
};

// Generate admin notification email HTML
const generateAdminEmailHTML = (data: BookingEmailRequest): string => {
  const packageInfo = data.selectedPackage
    ? `<tr>
        <td style="color: #666; padding: 12px 0; border-bottom: 1px solid #eee;">Valt paket</td>
        <td style="color: #000; padding: 12px 0; text-align: right; border-bottom: 1px solid #eee;"><strong>${data.selectedPackage.name}</strong> · ${data.selectedPackage.monthly_price.toLocaleString('sv-SE')} kr/mån · ${data.selectedPackage.company_type}</td>
      </tr>`
    : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #000;">

      <!-- Black Header -->
      <div style="background-color: #000; padding: 32px 20px; text-align: center;">
        <img src="${logoDataUri}" alt="ReRedo" width="46" height="44" style="display: inline-block;" />
        <p style="color: #fff; font-size: 13px; margin: 12px 0 0 0; opacity: 0.6;">Admin Notification</p>
      </div>

      <!-- White Content -->
      <div style="background-color: #fff; padding: 48px 40px; max-width: 560px; margin: 0 auto;">

        <!-- Alert Header -->
        <div style="background-color: #000; color: #fff; padding: 24px; border-radius: 16px; margin-bottom: 32px;">
          <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700;">Ny bokningsförfrågan</h1>
          <p style="margin: 0; opacity: 0.7; font-size: 14px;">${new Date().toLocaleString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>

        <!-- Company Info -->
        <h2 style="color: #000; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 16px 0;">Företagsinformation</h2>
        <table style="width: 100%; font-size: 15px; margin-bottom: 32px; border-collapse: collapse;">
          <tr>
            <td style="color: #666; padding: 12px 0; border-bottom: 1px solid #eee;">Företagsnamn</td>
            <td style="color: #000; padding: 12px 0; text-align: right; font-weight: 600; border-bottom: 1px solid #eee;">${data.companyName}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 12px 0; border-bottom: 1px solid #eee;">Org.nr</td>
            <td style="color: #000; padding: 12px 0; text-align: right; border-bottom: 1px solid #eee;">${data.organizationNumber}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 12px 0; border-bottom: 1px solid #eee;">Bransch</td>
            <td style="color: #000; padding: 12px 0; text-align: right; border-bottom: 1px solid #eee;">${data.industry}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 12px 0; border-bottom: 1px solid #eee;">Storlek</td>
            <td style="color: #000; padding: 12px 0; text-align: right; border-bottom: 1px solid #eee;">${data.companySize} anställda</td>
          </tr>
          ${packageInfo}
        </table>

        <!-- Contact Info -->
        <h2 style="color: #000; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 16px 0;">Kontaktuppgifter</h2>
        <table style="width: 100%; font-size: 15px; margin-bottom: 32px; border-collapse: collapse;">
          <tr>
            <td style="color: #666; padding: 12px 0; border-bottom: 1px solid #eee;">Kontaktperson</td>
            <td style="color: #000; padding: 12px 0; text-align: right; font-weight: 600; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="color: #666; padding: 12px 0; border-bottom: 1px solid #eee;">E-post</td>
            <td style="color: #000; padding: 12px 0; text-align: right; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}" style="color: #000; text-decoration: underline;">${data.email}</a></td>
          </tr>
          ${data.phone ? `<tr>
            <td style="color: #666; padding: 12px 0;">Telefon</td>
            <td style="color: #000; padding: 12px 0; text-align: right;"><a href="tel:${data.phone}" style="color: #000; text-decoration: underline;">${data.phone}</a></td>
          </tr>` : ''}
        </table>

        <!-- Current Situation -->
        <h2 style="color: #000; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 16px 0;">Nuvarande situation</h2>
        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 12px; margin-bottom: 32px;">
          ${data.currentSituation.map(item => `<p style="color: #333; font-size: 14px; margin: 0 0 8px 0; padding-left: 16px; position: relative;">• ${item}</p>`).join('')}
        </div>

        <!-- Challenges -->
        <h2 style="color: #000; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 16px 0;">Utmaningar</h2>
        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 12px; margin-bottom: 32px;">
          ${data.challenges.map(item => `<p style="color: #333; font-size: 14px; margin: 0 0 8px 0; padding-left: 16px;">• ${item}</p>`).join('')}
        </div>

        ${data.additionalInfo ? `
        <!-- Additional Info -->
        <h2 style="color: #000; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 16px 0;">Ytterligare information</h2>
        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 12px; margin-bottom: 32px;">
          <p style="color: #333; font-size: 14px; line-height: 1.6; margin: 0;">${data.additionalInfo}</p>
        </div>
        ` : ''}

        <!-- Action Button -->
        <div style="margin-top: 32px;">
          <a href="mailto:${data.email}?subject=Angående din bokningsförfrågan - ReRedo AB"
             style="display: inline-block; background-color: #000; color: #fff; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-size: 15px; font-weight: 600;">
            Svara kunden →
          </a>
        </div>

      </div>

      <!-- Black Footer -->
      <div style="background-color: #000; padding: 32px 20px; text-align: center;">
        <p style="color: #666; font-size: 13px; margin: 0;">
          ReRedo AB · Admin Notification
        </p>
      </div>

    </body>
    </html>
  `;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const bookingData: BookingEmailRequest = req.body;

    console.log('Received booking data:', JSON.stringify(bookingData, null, 2));

    // Generate a tentative consultation date (next business day at 10:00)
    const consultationDate = new Date();
    consultationDate.setDate(consultationDate.getDate() + 1);
    while (consultationDate.getDay() === 0 || consultationDate.getDay() === 6) {
      consultationDate.setDate(consultationDate.getDate() + 1);
    }
    consultationDate.setHours(10, 0, 0, 0);

    // Generate ICS file content
    const icsContent = generateICSContent(bookingData, consultationDate);
    const icsBase64 = Buffer.from(icsContent).toString('base64');

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: 'ReRedo AB <info@reredo.se>',
      to: [bookingData.email],
      subject: 'Tack för din bokningsförfrågan - ReRedo AB',
      html: generateUserEmailHTML(bookingData),
      attachments: [
        {
          filename: 'reredo-konsultation.ics',
          content: icsBase64,
          content_type: 'text/calendar',
        },
      ],
    });

    console.log('User email sent:', userEmailResponse);

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: 'ReRedo AB <info@reredo.se>',
      to: ['info@reredo.se'],
      subject: `Ny bokningsförfrågan: ${bookingData.companyName}`,
      html: generateAdminEmailHTML(bookingData),
      reply_to: bookingData.email,
    });

    console.log('Admin email sent:', adminEmailResponse);

    return res.status(200).json({
      success: true,
      userEmail: userEmailResponse,
      adminEmail: adminEmailResponse,
    });
  } catch (error: any) {
    console.error('Error sending booking emails:', error);
    return res.status(500).json({ error: error.message });
  }
}
