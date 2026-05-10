import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";

const appSans = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-app-sans",
  fallback: ["system-ui", "sans-serif"],
});

const appDisplay = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-app-display",
  fallback: ["system-ui", "sans-serif"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Professional Cleaning in Las Vegas | Mountain Springs Cleaning",
    template: "%s | Mountain Springs Cleaning",
  },
  description:
    "Professional home cleaning in Las Vegas. Background-checked, insured, and satisfaction guaranteed. Same team every visit.",
  keywords: [
    "cleaning service Las Vegas",
    "house cleaning Las Vegas",
    "maid service Las Vegas",
    "deep cleaning Las Vegas",
    "Airbnb cleaning Las Vegas",
    "move-out cleaning Las Vegas",
  ],
  icons: {
    icon: "/logo.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Mountain Springs Cleaning",
    telephone: "(702) 867-5309",
    email: "hello@mountainsprings.co",
    url: "https://mountainspringsclean.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.1699,
      longitude: -115.1398,
    },
    openingHours: ["Mo-Fr 07:00-19:00", "Sa 08:00-17:00"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 489,
    },
    priceRange: "$$",
    image: "https://mountainspringsclean.com/logo.png",
    sameAs: ["https://www.yelp.com/biz/mountain-springs-cleaning"],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${appSans.variable} ${appDisplay.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
