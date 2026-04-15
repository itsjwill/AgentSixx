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
  title: "AgentSixx | Lead Response for Real Estate",
  description: "The only TCPA-compliant Voice ISA, SMS, and email response for real estate agents. Voice ISA (Inside Sales Agent) + Lead Response + Compliance Infrastructure.",
  keywords: ["real estate lead response", "Voice ISA", "ISA replacement", "TCPA compliant", "real estate Inside Sales Agent"],
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
