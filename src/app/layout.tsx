import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ 
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "Siddhant Gaikwad - Full Stack Developer & AI Enthusiast",
  description: "Computer Science student passionate about full-stack development, AI/ML, and system design. Building innovative solutions with modern technologies.",
  keywords: ["Siddhant Gaikwad", "Full Stack Developer", "AI ML", "React", "Node.js", "Computer Science"],
  authors: [{ name: "Siddhant Gaikwad" }],
  openGraph: {
    title: "Siddhant Gaikwad - Full Stack Developer & AI Enthusiast",
    description: "Computer Science student passionate about full-stack development, AI/ML, and system design.",
    url: "https://siddhant-gaikwad.vercel.app",
    siteName: "Siddhant Gaikwad Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddhant Gaikwad - Full Stack Developer & AI Enthusiast",
    description: "Computer Science student passionate about full-stack development, AI/ML, and system design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${poppins.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
