import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Modern, sporty font combination
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cantt United - The Future of Football",
  description: "Official website of Cantt United. Experience the passion, the power, and the extensive training of Lahore's premier football club.",
  keywords: 'Football, Cantt United, Soccer Club, Lahore Football',
  verification: {
    google: 'googleaf2f96d2da693c18',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning={true}
        className={`${outfit.variable} ${inter.variable} antialiased bg-slate-950 text-white font-sans overflow-x-hidden`}
      >
        <Navigation />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
