import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents zooming issues on mobile inputs
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mridulsinghal.com'),
  title: {
    default: "Mridul Singhal | Full Stack Developer & Cloud Architect",
    template: "%s | Mridul Singhal"
  },
  description: "Official Portfolio of Mridul Singhal. Full Stack Developer specializing in Next.js, React, and Scalable Cloud Solutions in India.",
  keywords: [
    "Mridul Singhal",
    "Mridul",
    "Singhal",
    "Mridul Singhal Portfolio",
    "Full Stack Developer India",
    "Next.js Developer",
    "React Specialist",
    "Software Engineer"
  ],
  authors: [{ name: "Mridul Singhal", url: "https://mridulsinghal.com" }],
  creator: "Mridul Singhal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mridulsinghal.com",
    title: "Mridul Singhal - Full Stack Developer",
    description: "Building digital experiences with modern web technologies.",
    siteName: "Mridul Singhal",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Mridul Singhal" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mridul Singhal | Full Stack Developer",
    description: "Building digital experiences with modern web technologies.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: 'https://mridulsinghal.com'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mridul Singhal",
    "givenName": "Mridul",
    "familyName": "Singhal",
    "url": "https://mridulsinghal.com",
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Michelin India Pvt. Ltd."
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India"
    },
    "knowsAbout": ["React", "Next.js", "Node.js", "Cloud Computing", "Software Engineering"],
    "sameAs": [
      "https://github.com/singhalmridul",
      "https://www.linkedin.com/in/mridulsinghal/",
      "https://www.instagram.com/singhalmridul/",
      "https://twitter.com/singhalmridul"
    ]
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <GoogleAnalytics gaId="G-YV14D9TWPF" />
      </body>
    </html>
  );
}
