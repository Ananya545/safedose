import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';
function EditMedicine() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    quantity: '',
    unit: 'tablet',
    expiryDate: '',
    manufacturer: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  useEffect(() => {
    fetchMedicine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchMedicine = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/medicines`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      const medicine = data.data.find(m => m._id === id);
      
      if (medicine) {
        setFormData({
          name: medicine.name,
          dosage: medicine.dosage,
          quantity: medicine.quantity,
          unit: medicine.unit,
          expiryDate: medicine.expiryDate.split('T')[0],
          manufacturer: medicine.manufacturer || ''
        });
      }
    } catch (err) {
      setError('Error fetching medicine: ' + err.message);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/medicines/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          quantity: parseInt(formData.quantity)
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('Medicine updated successfully!');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        setError(data.message || 'Failed to update medicine');
      }
    } catch (err) {
      setError('Server error: ' + err.message);
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</div>;
  }

  return (
    <div>
      <header style={{ background: '#1976d2', color: 'white', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>✏️ Edit Medicine</h1>
        <button onClick={() => window.location.href = '/dashboard'} style={{ padding: '10px 20px', background: '#fff', color: '#1976d2', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          Back to Dashboard
        </button>
      </header>

      <div style={{ padding: '30px', background: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '10px', maxWidth: '500px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit}>
            {error && <div style={{ color: '#d32f2f', marginBottom: '20px', padding: '10px', background: '#ffebee', borderRadius: '5px' }}>{error}</div>}
            {success && <div style={{ color: '#388e3c', marginBottom: '20px', padding: '10px', background: '#e8f5e9', borderRadius: '5px' }}>{success}</div>}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Medicine Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Dosage *</label>
              <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Unit *</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
                >
                  <option value="tablet">Tablet</option>
                  <option value="capsule">Capsule</option>
                  <option value="mg">mg</option>
                  <option value="ml">ml</option>
                  <option value="injection">Injection</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Expiry Date * (IMPORTANT!)</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              style={{ width: '100%', padding: '12px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              💾 Update Medicine
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditMedicine;