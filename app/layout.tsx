import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";

const appSans = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-app-sans",
});

const appDisplay = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-app-display",
});

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${appSans.variable} ${appDisplay.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
