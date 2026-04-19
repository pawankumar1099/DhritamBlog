import { Outfit, Playfair_Display, Poppins, Merriweather } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ['400','500','600','700'],
  variable: '--font-outfit'
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ['400','500','600','700'],
  variable: '--font-playfair'
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['300','400','500','600','700'],
  variable: '--font-poppins'
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ['300','400','700'],
  variable: '--font-merriweather'
});

export const metadata = {
  title: "Dhritam Blog | Latest Insights, Trends & Stories",
  description: "Discover the latest insights, trends, and stories in our blog. Stay informed and inspired with expert content on lifestyle, startup, technology, health, and wellness.",
  keywords: ["blog", "insights", "trends", "stories", "lifestyle", "startup", "technology", "health", "wellness"],
  authors: [{ name: "Pawan K. Sharma" }],
  creator: "Pawan K. Sharma",
  publisher: "Dhritam",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blog.dhritam.com",
    title: "Dhritam Blog",
    description: "Discover the latest insights, trends, and stories in our blog. Stay informed and inspired with expert content.",
    siteName: "Dhritam Blog",
    images: [
      {
        url: "https://blog.dhritam.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Dhritam Blog Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhritam Blog",
    description: "Discover the latest insights, trends, and stories in our blog.",
  },
  alternates: {
    canonical: "https://blog.dhritam.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org JSON-LD for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Dhritam Blog',
              description: 'Discover the latest insights, trends, and stories in our blog',
              url: 'https://blog.dhritam.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://blog.dhritam.com/?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        
        {/* Schema.org JSON-LD for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Dhritam',
              url: 'https://blog.dhritam.com',
              logo: 'https://blog.dhritam.com/logo.png',
              description: 'Dhritam Blog - Insights, Trends & Stories',
              sameAs: [
                'https://www.linkedin.com/company/dhritam/',
              ],
              contact: {
                '@type': 'ContactPoint',
                contactType: 'Customer Support',
                url: 'https://blog.dhritam.com',
              },
            }),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${playfair.variable} ${poppins.variable} ${merriweather.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
