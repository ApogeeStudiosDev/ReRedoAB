import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  type?: string;
  breadcrumbs?: BreadcrumbItem[];
  faqItems?: FAQItem[];
  serviceSchema?: {
    name: string;
    description: string;
    price?: string;
  };
  noindex?: boolean;
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://www.reredo.se/og-image.jpg",
  type = "website",
  breadcrumbs,
  faqItems,
  serviceSchema,
  noindex = false
}: SEOProps) => {
  const fullTitle = `${title} | ReRedo AB`;
  const siteUrl = "https://www.reredo.se";
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  // Generate BreadcrumbList schema
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteUrl}${item.url}`
    }))
  } : null;

  // Generate FAQ schema
  const faqSchema = faqItems && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // Generate Service schema
  const serviceSchemaData = serviceSchema ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceSchema.name,
    "provider": {
      "@type": "Organization",
      "name": "ReRedo AB",
      "url": siteUrl
    },
    "description": serviceSchema.description,
    "areaServed": {
      "@type": "Country",
      "name": "Sweden"
    },
    ...(serviceSchema.price && { "offers": {
      "@type": "Offer",
      "price": serviceSchema.price,
      "priceCurrency": "SEK"
    }})
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />

      {/* Language */}
      <meta httpEquiv="content-language" content="sv-SE" />
      <html lang="sv" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:site_name" content="ReRedo AB" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="author" content="ReRedo AB" />
      <meta name="publisher" content="ReRedo AB" />
      <meta name="theme-color" content="#000000" />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://www.reredo.se" />

      {/* Structured Data - Breadcrumbs */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Structured Data - FAQ */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* Structured Data - Service */}
      {serviceSchemaData && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
