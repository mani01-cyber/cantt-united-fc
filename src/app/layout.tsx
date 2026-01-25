import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Modern, sporty font combination
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";

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
  title: "United FC - The Future of Football",
  description: "Official website of United FC. Experience the passion, the power, and the extensive training of Lahore's premier football club.",
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
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
