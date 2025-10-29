import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

const metadataConfig = {
  metadataBase: new URL("https://mystic-nfc-tarot.example/"),
  title: {
    default: "Mystic NFC Tarot",
    template: "%s • Mystic NFC Tarot"
  },
  description: "Tap a card, ask a question, receive a luminous tarot reading.",
  openGraph: {
    title: "Mystic NFC Tarot",
    description: "Tap a card, ask a question, receive a luminous tarot reading.",
    url: new URL("https://mystic-nfc-tarot.example/"),
    siteName: "Mystic NFC Tarot",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Celestial tarot interface"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mystic NFC Tarot",
    description: "Tap a card, ask a question, receive a luminous tarot reading.",
    images: [
      {
        url: "/og-image.svg",
        alt: "Celestial tarot interface"
      }
    ]
  }
} satisfies Metadata;

export const metadata: Metadata = metadataConfig;

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
