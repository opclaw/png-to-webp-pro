import type { Metadata } from 'next'
import Converter from '@/components/Converter'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'PNG to WebP Converter — Free Online Tool',
  description: 'Convert PNG images to WebP format online for free. Reduce file size by 25-80% without losing quality. No upload limits, 100% private, works in your browser.',
}

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🖼️</span>
            <span>PNG to WebP</span>
          </div>
          <nav className={styles.nav}>
            <a href="#convert">Convert</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1>
            Convert PNG to WebP
            <span className={styles.gradient}> Instantly</span>
          </h1>
          <p className={styles.subtitle}>
            Free online tool to convert PNG images to WebP format. 
            Reduce file size by up to 80% without losing quality. 
            100% private — your files never leave your browser.
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>✓ Free Forever</span>
            <span className={styles.badge}>✓ No Registration</span>
            <span className={styles.badge}>✓ Batch Convert</span>
          </div>
        </div>
      </section>

      {/* Ad Banner Top */}
      <div className={styles.adContainer}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minWidth: '300px', maxWidth: '728px', width: '100%', height: '90px' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="TOP_BANNER_SLOT"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        ></ins>
      </div>

      {/* Converter */}
      <Converter />

      {/* Ad Banner Middle */}
      <div className={styles.adContainer}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minWidth: '300px', maxWidth: '728px', width: '100%', height: '90px' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="MIDDLE_BANNER_SLOT"
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        ></ins>
      </div>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.featureGrid}>
            {[
              {
                icon: '⚡',
                title: 'Lightning Fast',
                desc: 'Client-side processing means no upload wait times. Convert images instantly in your browser.'
              },
              {
                icon: '🔒',
                title: '100% Private',
                desc: 'Your files never leave your computer. All conversion happens locally for complete security.'
              },
              {
                icon: '📉',
                title: 'Up to 80% Smaller',
                desc: 'WebP images are typically 25-80% smaller than PNG while maintaining the same visual quality.'
              },
              {
                icon: '📦',
                title: 'Batch Convert',
                desc: 'Convert up to 50 images at once and download them all as a convenient ZIP file.'
              },
              {
                icon: '🎛️',
                title: 'Quality Control',
                desc: 'Adjust compression quality from 1-100% to find the perfect balance between size and quality.'
              },
              {
                icon: '💯',
                title: 'Free Forever',
                desc: 'No hidden fees, no watermarks, no registration required. Use it as much as you need.'
              }
            ].map((feature, i) => (
              <div key={i} className={styles.feature}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks} id="how-it-works">
        <div className={styles.container}>
          <h2>How to Convert PNG to WebP</h2>
          <div className={styles.steps}>
            {[
              {
                step: '1',
                title: 'Upload PNG Files',
                desc: 'Drag and drop your PNG images into the upload area or click to browse and select files from your device.'
              },
              {
                step: '2',
                title: 'Adjust Quality (Optional)',
                desc: 'Use the quality slider to control compression. Default 85% is optimal for web use.'
              },
              {
                step: '3',
                title: 'Convert',
                desc: 'Click the Convert button and watch as your images are processed instantly in your browser.'
              },
              {
                step: '4',
                title: 'Download',
                desc: 'Download individual files or get all converted images as a ZIP archive.'
              }
            ].map((item, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepNumber}>{item.step}</div>
                <div className={styles.stepContent}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <h3>What is WebP?</h3>
              <p>
                WebP is a modern image format developed by Google that provides superior lossless and lossy 
                compression for web images. WebP images are typically <strong>25-35% smaller</strong> than 
                comparable JPEG and PNG images while maintaining the same visual quality.
              </p>
              <p>
                Smaller images mean faster website loading times, reduced bandwidth usage, and better 
                user experience. That\'s why WebP is supported by all modern browsers and recommended 
                by Google PageSpeed Insights.
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h3>PNG vs WebP Comparison</h3>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>PNG</th>
                    <th>WebP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>File Size</td>
                    <td>Large</td>
                    <td className={styles.highlight}>✓ Smaller</td>
                  </tr>
                  <tr>
                    <td>Transparency</td>
                    <td>✓ Yes</td>
                    <td>✓ Yes</td>
                  </tr>
                  <tr>
                    <td>Animation</td>
                    <td>No (APNG only)</td>
                    <td className={styles.highlight}>✓ Yes</td>
                  </tr>
                  <tr>
                    <td>Browser Support</td>
                    <td>Universal</td>
                    <td>96%+ Modern</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq} id="faq">
        <div className={styles.container}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {[
              {
                q: 'Is this PNG to WebP converter free?',
                a: 'Yes, completely free. No registration required, no watermarks, no usage limits. Convert as many images as you need.'
              },
              {
                q: 'Are my files safe and private?',
                a: 'Absolutely. All conversion happens entirely in your browser using client-side processing. Your files are never uploaded to any server, ensuring complete privacy and security.'
              },
              {
                q: 'What is the quality of converted WebP images?',
                a: 'We use an optimal 85% quality setting by default that provides the best balance between file size reduction and visual quality. You can also adjust the quality slider from 1-100% based on your specific needs.'
              },
              {
                q: 'Can I convert multiple PNG files at once?',
                a: 'Yes! Our tool supports batch conversion. You can convert up to 50 PNG files simultaneously and download them all at once as a ZIP archive.'
              },
              {
                q: 'What is WebP format?',
                a: 'WebP is a modern image format developed by Google that provides superior compression for web images. WebP images are typically 25-35% smaller than PNG and JPEG while maintaining the same visual quality.'
              },
              {
                q: 'Will WebP work on all browsers?',
                a: 'WebP is supported by 96%+ of modern browsers including Chrome, Firefox, Safari, and Edge. For older browsers, you can provide a PNG fallback.'
              },
              {
                q: 'Is there a file size limit?',
                a: 'There is no strict limit, but for best performance we recommend files under 10MB each. The tool works best with 50 or fewer files at a time.'
              }
            ].map((item, i) => (
              <div key={i} className={styles.faqItem}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div>
              <h4>PNG to WebP Converter</h4>
              <p>Free online tool to convert PNG images to WebP format.</p>
            </div>
            <div className={styles.footerLinks}>
              <a href="/privacy/">Privacy Policy</a>
              <a href="/terms/">Terms of Use</a>
              <a href="/contact/">Contact</a>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2026 PNG to WebP Converter. Free tool for web optimization.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}