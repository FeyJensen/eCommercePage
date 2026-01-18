import React from 'react';
import Button from 'react-bootstrap/Button';

export default function LoginAndCart({ showLogin, user, onLoginClick, onCartClick }) {
  return (
    <>
      {!showLogin && !user && (
        <>
          <Button className="create-btn" style={{ marginRight: '1rem' }} onClick={onLoginClick}>
            Login
          </Button>
          <Button className="create-btn" style={{ marginRight: '1rem' }} onClick={onCartClick}>
            Cart
          </Button>
        </>
      )}
    </>
  );
}
