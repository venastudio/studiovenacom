import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vena Studio",
  description: "Minimalistyczne studio produkcyjne i artystyczna agencja kreatywna.",
  icons: {
    icon: "/assets/image/VenaLogo.png",
    shortcut: "/assets/image/VenaLogo.png",
    apple: "/assets/image/VenaLogo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={`${manrope.variable} ${cormorant.variable} bg-white text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
