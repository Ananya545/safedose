import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/medicines', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setMedicines(data.data || []);
    } catch (err) {
      console.error('Error fetching medicines:', err);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div>
      <header style={{ background: '#1976d2', color: 'white', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>💊 SafeDose Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          Logout
        </button>
      </header>

      <div style={{ padding: '30px', background: '#f5f5f5', minHeight: '100vh' }}>
        <h2 style={{ marginBottom: '20px' }}>Your Medicines</h2>

        {loading ? (
          <p>Loading medicines...</p>
        ) : medicines.length === 0 ? (
          <div style={{ background: 'white', padding: '40px', borderRadius: '10px', textAlign: 'center', color: '#666' }}>
            <p>No medicines added yet.</p>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>Add medicines to start tracking expiry dates!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {medicines.map((medicine) => (
              <div
                key={medicine._id}
                style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  borderLeft: medicine.status === 'Expired' ? '5px solid #d32f2f' : medicine.status === 'Expiring Soon' ? '5px solid #ff9800' : '5px solid #4caf50'
                }}
              >
                <h3>{medicine.name}</h3>
                <p><strong>Dosage:</strong> {medicine.dosage}</p>
                <p><strong>Quantity:</strong> {medicine.quantity} {medicine.unit}</p>
                <p><strong>Expires:</strong> {new Date(medicine.expiryDate).toLocaleDateString()}</p>
                
                <div style={{ marginTop: '15px' }}>
                  <span
                    style={{
                      padding: '8px 15px',
                      borderRadius: '20px',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      background: medicine.status === 'Expired' ? '#d32f2f' : medicine.status === 'Expiring Soon' ? '#ff9800' : '#4caf50'
                    }}
                  >
                    {medicine.status === 'Expired' ? '❌ EXPIRED' : medicine.status === 'Expiring Soon' ? '⚠️ EXPIRING SOON' : '✅ SAFE'}
                  </span>
                </div>

                {medicine.daysUntilExpiry && (
                  <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                    <strong>Days left:</strong> {medicine.daysUntilExpiry > 0 ? medicine.daysUntilExpiry : 'Expired'}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;