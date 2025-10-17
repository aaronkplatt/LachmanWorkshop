import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../styles/main.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Amazing Project",
  description: "A modern web application built with Next.js and Firebase. Ready to launch your next big idea.",
  openGraph: {
    title: "Your Amazing Project",
    description: "A modern web application built with Next.js and Firebase. Ready to launch your next big idea.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-project.web.app",
    siteName: "Your Project",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-project.web.app"}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Your Project Brand",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Amazing Project",
    description: "A modern web application built with Next.js and Firebase. Ready to launch your next big idea.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || "https://your-project.web.app"}/og-image.jpg`],
    creator: "@yourproject",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Uncomment the line below to enable reCAPTCHA for newsletter functionality */}
        {/* <Script src="https://www.google.com/recaptcha/api.js" strategy="beforeInteractive" /> */}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
