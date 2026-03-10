import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Login from '../Login';

export default function Header() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div>
      <div
        className="navbar-brand"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
          position: 'relative',
          top: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '10px',
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h2
            style={{
              color: '#8d6748',
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}
          >
            Skye Eclisse
          </h2>
          <Button className="create-btn" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button className="create-btn" onClick={() => navigate('/AboutPage')}>
            About
          </Button>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {!user && (
            <Button className="create-btn" onClick={() => setShowLogin(true)}>
              Login
            </Button>
          )}
          <Button className="create-btn" onClick={() => navigate('/cart')}>
            Cart
          </Button>
        </div>
      </div>

      {showLogin && (
        <div style={{ marginTop: '1rem' }}>
          <Login
            onLogin={(userData) => {
              setUser(userData);
              setShowLogin(false);
            }}
          />
          <div style={{ marginTop: '0.5rem' }}>
            <Button variant="secondary" className="create-btn" onClick={() => setShowLogin(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
