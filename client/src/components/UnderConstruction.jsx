import React from 'react';

export default function UnderConstruction() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-custom"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ textAlign: 'center', margin: '1rem 0' }}>
        <h1 style={{ color: '#8d6748', margin: '1rem 0' }}>Skye Eclisse</h1>
        <div style={{ margin: '1rem 0', color: '#b97a56', fontWeight: 'bold' }}>
          Website under construction.
          <br />
          To shop, visit:{' '}
          <a
            href="https://www.etsy.com/shop/SkyeEclisse"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#8d6748', textDecoration: 'underline' }}
          >
            https://www.etsy.com/shop/SkyeEclisse
          </a>
        </div>
      </div>
    </nav>
  );
}
