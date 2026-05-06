import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mountain Springs Cleaning",
  description:
    "Professional home cleaning in Las Vegas. Background-checked, insured, and satisfaction guaranteed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable} style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}>
      <body style={{ fontFamily: "var(--font-nunito), Nunito, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
