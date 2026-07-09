import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setProfile(data.data);
      } else {
        setError('Could not load profile');
      }
    } catch (err) {
      setError('Server error: ' + err.message);
    }
    setLoading(false);
  };

  const notificationsEnabled = typeof Notification !== 'undefined' && Notification.permission === 'granted';

  return (
    <div>
      <header style={{ background: '#1976d2', color: 'white', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>👤 My Profile</h1>
        <button onClick={() => window.location.href = '/dashboard'} style={{ padding: '10px 20px', background: '#fff', color: '#1976d2', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          Back to Dashboard
        </button>
      </header>

      <div style={{ padding: '30px', background: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '10px', maxWidth: '450px', margin: '0 auto' }}>
          {loading ? (
            <p>Loading profile...</p>
          ) : error ? (
            <div style={{ color: '#d32f2f', padding: '10px', background: '#ffebee', borderRadius: '5px' }}>{error}</div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#1976d2',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 'bold'
                }}>
                  {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#888', fontWeight: 'bold' }}>NAME</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '16px' }}>{profile.name}</p>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#888', fontWeight: 'bold' }}>EMAIL</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '16px' }}>{profile.email}</p>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#888', fontWeight: 'bold' }}>PHONE</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '16px' }}>{profile.phone || 'Not added'}</p>
              </div>

              <div>
                <p style={{ margin: 0, fontSize: '13px', color: '#888', fontWeight: 'bold' }}>NOTIFICATIONS</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '16px' }}>
                  {notificationsEnabled ? (
                    <span style={{ color: '#4caf50', fontWeight: 'bold' }}>🔔 Enabled</span>
                  ) : (
                    <span style={{ color: '#999' }}>🔕 Not enabled</span>
                  )}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;