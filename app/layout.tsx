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
    default: "Mridul Singhal | Full-Stack Engineer & Systems Architect",
    template: "%s | Mridul Singhal"
  },
  description: "Mridul Singhal - Full-Stack Engineer & Systems Architect specializing in production systems, observability, infrastructure automation, and full-stack web development. Building scalable web applications and systems that perform at Michelin. Expertise in Next.js, React, Node.js, Splunk, and full-stack development.",
  keywords: [
    "Mridul Singhal",
    "Mridul",
    "Singhal",
    "Full-Stack Engineer",
    "Full Stack Developer",
    "Full Stack Development",
    "Full-Stack Development",
    "Systems Architect",
    "System Architecture",
    "Observability Engineer",
    "Infrastructure Automation",
    "Production Systems",
    "Web Development",
    "Website Development",
    "Web Developer",
    "Splunk Engineer",
    "Software Engineer India",
    "Michelin Engineer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Full Stack Portfolio",
    "Engineering Portfolio"
  ],
  authors: [{ name: "Mridul Singhal", url: "https://mridulsinghal.com" }],
  creator: "Mridul Singhal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mridulsinghal.com",
    title: "Mridul Singhal - Full-Stack Engineer & Systems Architect",
    description: "Full-stack engineer specializing in production systems, web development, and infrastructure automation. Building scalable systems at Michelin.",
    siteName: "Mridul Singhal Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Mridul Singhal - Full-Stack Engineer & Systems Architect" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mridul Singhal | Full-Stack Engineer & Systems Architect",
    description: "Full-stack developer building production systems with proven scale and reliability. Web development expertise in Next.js, React, Node.js.",
    images: ["/og-image.png"],
    creator: "@singhalmridul"
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
    "jobTitle": "Full-Stack Engineer & Systems Architect",
    "worksFor": {
      "@type": "Organization",
      "name": "Michelin India Pvt. Ltd."
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India"
    },
    "knowsAbout": ["Production Systems", "Observability", "Infrastructure Automation", "Splunk", "Full-Stack Development", "Full Stack Development", "System Architecture", "Web Development", "Website Development", "Next.js", "React", "Node.js", "TypeScript", "MongoDB", "PostgreSQL"],
    "alternateName": ["Mridul", "Singhal", "Mridul S"],
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
