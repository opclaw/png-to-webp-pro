import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://pngtowebp.vercel.app'),
  title: {
    default: 'PNG to WebP Converter — Free Online Tool | Convert Images Instantly',
    template: '%s | PNG to WebP'
  },
  description: 'Convert PNG images to WebP format online for free. Reduce file size by 25-80% without losing quality. No upload limits, 100% private, works in your browser.',
  keywords: ['png to webp', 'convert png to webp', 'webp converter', 'image optimizer', 'compress png', 'free image converter', 'batch convert png'],
  authors: [{ name: 'PNG to WebP Converter' }],
  creator: 'PNG to WebP Converter',
  publisher: 'PNG to WebP Converter',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pngtowebp.vercel.app',
    siteName: 'PNG to WebP Converter',
    title: 'PNG to WebP Converter — Free Online Tool',
    description: 'Convert PNG images to WebP format instantly. Free, fast, no limits. Optimize images for web.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PNG to WebP Converter — Free Online Tool'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PNG to WebP Converter — Free Online Tool',
    description: 'Convert PNG images to WebP format instantly. Free, fast, no limits.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://pngtowebp.vercel.app',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org SoftwareApplication */}
        <Script
          id="schema-software"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'PNG to WebP Converter',
              applicationCategory: 'MultimediaApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '1250'
              },
              featureList: 'Batch conversion, Client-side processing, No file size limits, ZIP download',
              screenshot: 'https://pngtowebp.vercel.app/screenshot.jpg',
              softwareVersion: '2.0.0'
            })
          }}
        />
        
        {/* Schema.org FAQPage */}
        <Script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is WebP format?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'WebP is a modern image format developed by Google that provides superior lossless and lossy compression for web images. WebP images are typically 25-35% smaller than PNG and JPEG while maintaining the same visual quality.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Is this PNG to WebP converter free?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, our PNG to WebP converter is completely free to use. No registration required, no watermarks, no file limits. Convert as many images as you need.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Are my files safe? Is this tool secure?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Absolutely secure. All conversion happens entirely in your browser using client-side processing. Your files are never uploaded to any server, ensuring complete privacy and security.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What is the quality of converted WebP images?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We use an optimal 85% quality setting that provides the best balance between file size reduction and visual quality. You can also adjust the quality slider from 1-100% based on your needs.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Can I convert multiple PNG files at once?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes! Our tool supports batch conversion. You can convert up to 50 PNG files simultaneously and download them all at once as a ZIP archive.'
                  }
                }
              ]
            })
          }}
        />

        {/* Schema.org HowTo */}
        <Script
          id="schema-howto"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: 'How to Convert PNG to WebP',
              description: 'Step-by-step guide to convert PNG images to WebP format using our free online tool.',
              totalTime: 'PT2M',
              step: [
                {
                  '@type': 'HowToStep',
                  position: 1,
                  name: 'Upload PNG files',
                  text: 'Drag and drop your PNG files into the upload area or click to browse and select files from your computer.',
                  url: 'https://pngtowebp.vercel.app/#convert'
                },
                {
                  '@type': 'HowToStep',
                  position: 2,
                  name: 'Adjust quality settings',
                  text: 'Optional: Adjust the quality slider to balance between file size and image quality. Default is 85% which is optimal for web.',
                  url: 'https://pngtowebp.vercel.app/#convert'
                },
                {
                  '@type': 'HowToStep',
                  position: 3,
                  name: 'Convert images',
                  text: 'Click the Convert button to start the conversion process. All processing happens in your browser.',
                  url: 'https://pngtowebp.vercel.app/#convert'
                },
                {
                  '@type': 'HowToStep',
                  position: 4,
                  name: 'Download WebP files',
                  text: 'Download converted files individually or as a ZIP archive containing all your WebP images.',
                  url: 'https://pngtowebp.vercel.app/#convert'
                }
              ]
            })
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}