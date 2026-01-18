import React from 'react';

export default function Header() {
  return (
    <div
      className="navbar-brand"
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        position: 'relative',
        padding: '0rem',
        justifyContent: 'left'
      }}
    >
      <h2
        style={{
          color: '#8d6748',
          margin: '0',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}
      >
        Skye Eclisse
      </h2>
    </div>
  );
}
