# Demo Data for Pricing Packages

This document shows the pricing packages structure and test data.

## Aktiebolag (AB) Packages

### AB Bas - 1,200 kr/mån
- Löpande bokföring
- Momsdeklaration
- Arbetsgivardeklarationer
- Årsbokslut

### AB Standard - 2,400 kr/mån
- Allt i Bas
- Månadsrapporter
- Leverantörsbetalningar
- Kundfakturering

### AB Professional - 3,600 kr/mån (Most Popular)
- Allt i Standard
- KPI-uppföljning
- Budgetarbete
- Kvartalsgenomgång

### AB Premium - 4,800 kr/mån
- Allt i Professional
- Likviditetsprognoser
- Strategisk rådgivning
- Månadsgenomgång

### AB Enterprise - 6,000 kr/mån
- Allt i Premium
- Dedikerad ekonomichef
- Veckovis uppföljning
- Obegränsad rådgivning

## Enskild Firma (EF) Packages

### EF Start - 700 kr/mån
- Löpande bokföring
- Momsdeklaration
- Deklaration
- Digital hantering

### EF Växande - 1,400 kr/mån
- Allt i Start
- Månadsrapporter
- Kvartalsgenomgång
- Skatteplanering

### EF Professionell - 2,100 kr/mån
- Allt i Växande
- KPI-uppföljning
- Prognoser
- Månadsgenomgång
- Strategisk rådgivning

## Package Selection Flow

1. User visits `/priser` (pricing page)
2. User selects company type (AB or EF)
3. User clicks "Välj paket" on desired package
4. Package data is stored in localStorage
5. User is redirected to `/boka-konsultation`
6. Booking form shows selected package information
7. Package ID is included in booking submission
8. Package selection can be removed or changed from booking form