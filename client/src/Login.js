import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const url = isRegister ? 'http://localhost:3001/register' : 'http://localhost:3001/login';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {

        if (isRegister) {
          setIsRegister(false);
          setError('Registration successful! Please log in.');
        } else {
          onLogin({ data, email }); 
        }
      } else {
        setError(data.message || 'Error');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card style={{ width: '22rem', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 12px rgba(141, 103, 72, 0.08)' }}>
        <Card.Header className="text-center" style={{ background: 'none', borderBottom: 'none' }}>
          <h2 style={{ margin: 0 }}>{isRegister ? 'Register' : 'Login'}</h2>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
            />
            <Button type="submit" style={{ width: '100%', background: '#d9a47f', border: 'none', color: '#fff', marginBottom: '0.5rem' }}>
              {isRegister ? 'Register' : 'Login'}
            </Button>
            {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
          </form>
          <Button
            variant="link"
            style={{ color: '#8d6748', textDecoration: 'underline', width: '100%', marginTop: '0.5rem' }}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;