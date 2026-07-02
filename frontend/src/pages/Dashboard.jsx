import React, { useState, useEffect } from 'react';
import usePushNotifications from '../usePushNotifications';

function Dashboard() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { subscription, subscribeToPushNotifications } = usePushNotifications();

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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5001/api/medicines/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMedicines(medicines.filter(m => m._id !== id));
    } catch (err) {
      console.error('Error deleting medicine:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  // Filter medicines based on search and status
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.dosage.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (medicine.manufacturer && medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || medicine.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <header style={{ background: '#1976d2', color: 'white', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>💊 SafeDose Dashboard</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={subscribeToPushNotifications}
            style={{ padding: '10px 20px', background: '#ff9800', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}
          >
            {subscription ? '🔔 Notifications ON' : '🔕 Enable Notifications'}

          </button>
          <button 
  onClick={() => {
    new Notification('Test Message 🧪', {
      body: 'Notifications are WORKING! ✅'
    });
  }}
  style={{ padding: '10px 20px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', marginLeft: '10px' }}
>
  🧪 Test Now
</button>
          <button 
            onClick={handleLogout} 
            style={{ padding: '10px 20px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ padding: '30px', background: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2>Your Medicines</h2>
          <button 
            onClick={() => window.location.href = '/add-medicine'}
            style={{ padding: '12px 24px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
          >
            ➕ Add Medicine
          </button>
        </div>

        {/* Search and Filter Section */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>🔍 Search Medicine</label>
              <input
                type="text"
                placeholder="Search by name, dosage, or manufacturer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>📊 Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px', boxSizing: 'border-box' }}
              >
                <option value="all">All Medicines</option>
                <option value="Safe">✅ Safe</option>
                <option value="Expiring Soon">⚠️ Expiring Soon</option>
                <option value="Expired">❌ Expired</option>
              </select>
            </div>
          </div>
          
          <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
            Showing <strong>{filteredMedicines.length}</strong> of <strong>{medicines.length}</strong> medicines
          </p>
        </div>

        {loading ? (
          <p>Loading medicines...</p>
        ) : medicines.length === 0 ? (
          <div style={{ background: 'white', padding: '40px', borderRadius: '10px', textAlign: 'center', color: '#666' }}>
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>No medicines added yet.</p>
            <p style={{ fontSize: '14px', marginBottom: '20px' }}>Add medicines to start tracking expiry dates!</p>
            <button 
              onClick={() => window.location.href = '/add-medicine'}
              style={{ padding: '12px 24px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
            >
              ➕ Add Your First Medicine
            </button>
          </div>
        ) : filteredMedicines.length === 0 ? (
          <div style={{ background: 'white', padding: '40px', borderRadius: '10px', textAlign: 'center', color: '#666' }}>
            <p style={{ fontSize: '18px' }}>No medicines match your search! 🔍</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredMedicines.map((medicine) => (
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0 }}>{medicine.name}</h3>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => window.location.href = `/edit-medicine/${medicine._id}`}
                      style={{ background: '#1976d2', color: 'white', border: 'none', borderRadius: '3px', padding: '5px 10px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(medicine._id)}
                      style={{ background: '#d32f2f', color: 'white', border: 'none', borderRadius: '3px', padding: '5px 10px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                
                <p style={{ margin: '8px 0' }}><strong>Dosage:</strong> {medicine.dosage}</p>
                <p style={{ margin: '8px 0' }}><strong>Quantity:</strong> {medicine.quantity} {medicine.unit}</p>
                <p style={{ margin: '8px 0' }}><strong>Expires:</strong> {new Date(medicine.expiryDate).toLocaleDateString()}</p>
                {medicine.manufacturer && <p style={{ margin: '8px 0' }}><strong>Manufacturer:</strong> {medicine.manufacturer}</p>}
                
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

                {medicine.daysUntilExpiry !== null && (
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