import React from 'react';

export default function ShopBanner({ header, right }) {
  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        height: '380px',
        paddingTop: '80px'
      }}
    >
      <img
        src="images/header.png"
        alt="Shop Banner"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'block',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: 'scale(1.1)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '1rem',
          top: '1rem',
          zIndex: 10,
          left: 0,
          right: 0,
          padding: '0 1rem'
        }}
      >
        {header}
      </div>
      <div
        style={{
          position: 'absolute',
          right: '1rem',
          top: '1rem',
          zIndex: 10
        }}
      >
        {right}
      </div>
    </div>
  );
}
