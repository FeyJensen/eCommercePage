import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Header({ showLogin, user, onLoginClick, onCartClick }) {
  const navigate = useNavigate();

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
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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
        <Button
          className="create-btn"
          onClick={() => navigate('/')}
        >
          Home
        </Button>
        <Button
          className="create-btn"
          onClick={() => navigate('/AboutPage')}
        >
          About
        </Button>
      </div>
      
      {!showLogin && !user && (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button
            className="create-btn"
            onClick={onLoginClick}
          >
            Login
          </Button>
          <Button
            className="create-btn"
            onClick={onCartClick}
          >
            Cart
          </Button>
        </div>
      )}
    </div>
  );
}
