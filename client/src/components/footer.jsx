import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  const styles = {
    footer: {
      width: '100%',
      padding: '2rem 1.5rem',
      backgroundColor: 'rgba(143, 143, 143, 0.18)',
      borderTop: '2px solid #e0d3c4',
      backdropFilter: 'blur(3px)',
      color: '#8d6748'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    topRow: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '1.5rem'
    },
    col: {
      flex: '1 1 280px',
      minWidth: '280px'
    },
    brand: {
      fontWeight: '700',
      fontSize: '1.25rem',
      letterSpacing: '0.02em'
    },
    tagline: {
      margin: '0.5rem 0 0',
      opacity: 0.9
    },
    navCol: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem'
    },
    link: {
      color: '#8d6748',
      textDecoration: 'underline'
    },
    connectCol: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem',
      alignItems: 'flex-end'
    },
    bottomBar: {
      width: '100%',
      marginTop: '1.25rem',
      fontSize: '0.9rem',
      borderTop: '1px solid #e0d3c4',
      paddingTop: '0.75rem',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.75rem'
    },
    legalLinks: {
      display: 'flex',
      gap: '1rem'
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.topRow}>
          <div style={styles.col}>
            <span style={styles.brand}>Skye Eclisse</span>
            <p style={styles.tagline}>Handmade designs and curated pieces.</p>
          </div>

          <nav aria-label="Footer navigation" style={{ ...styles.col, ...styles.navCol }}>
            <a href="/" style={styles.link}>Home</a>
            <a
              href="https://www.etsy.com/shop/SkyeEclisse"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Etsy Shop
            </a>
            <a
              href="https://www.faire.com/brand/b_ng72naav7u"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Wholesale (Faire)
            </a>
            <a href="mailto:feyviolin@gmail.com" style={styles.link}>Contact</a>
          </nav>

          <div style={{ ...styles.col, ...styles.connectCol }}>
            <span style={{ fontWeight: 600 }}>Connect</span>
            <a
              href="https://www.instagram.com/skyeeclisse/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@skyeeclisse"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              TikTok
            </a>
            <a
              href="mailto:feyviolin@gmail.com?subject=Subscribe"
              style={styles.link}
            >
              Join mailing list
            </a>
          </div>
        </div>

        <div style={styles.bottomBar}>
          <span>© {year} Skye Eclisse</span>
          <div style={styles.legalLinks}>
            <a href="/privacy" style={styles.link}>Privacy</a>
            <a href="/terms" style={styles.link}>Terms</a>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

