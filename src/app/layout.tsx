import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { content } from "@/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: content.site.title,
  description: content.site.description,
  keywords: [
    "Siddhant Gaikwad",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "GSAP",
  ],
  authors: [{ name: content.hero.name }],
  openGraph: {
    title: content.site.title,
    description: content.site.description,
    url: "https://siddhant-gaikwad.vercel.app",
    siteName: content.site.title,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: content.site.title,
    description: content.site.description,
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
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href={content.site.favicon} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
