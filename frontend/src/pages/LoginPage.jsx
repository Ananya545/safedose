import React, { useState } from 'react';
import { API_URL } from '../config';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Make sure backend is running on port 5001');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>💊 SafeDose</h1>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px', boxSizing: 'border-box' }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '16px', boxSizing: 'border-box' }}
              required
            />
          </div>

          {error && <div style={{ color: '#d32f2f', marginBottom: '20px', padding: '10px', background: '#ffebee', borderRadius: '5px' }}>{error}</div>}

          <button
            type="submit"
            style={{ width: '100%', padding: '12px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Log In
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
  Don't have an account?{' '}
  <span
    onClick={() => window.location.href = '/register'}
    style={{ color: '#1976d2', cursor: 'pointer', fontWeight: 'bold' }}
  >
    Sign up here
  </span>
</p>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '14px' }}>
          💡 Test: email: test@example.com | password: test123
        </p>
      </div>
    </div>
  );
}

export default LoginPage;