import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "AgentSixx - Intelligent Real Estate Lead System",
  description: "The only TCPA-compliant Intelligent Outreach system for real estate agents. Intelligent Voice + Lead Response + Compliance Infrastructure.",
  keywords: ["real estate", "intelligent automation", "lead generation", "TCPA compliant", "ISA replacement"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-zinc-950 text-zinc-100`}
        style={{ backgroundColor: '#09090b', color: '#fafafa' }}
      >
        {children}
      </body>
    </html>
  );
}
