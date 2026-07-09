import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

function CalendarView() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/medicines`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setMedicines(data.data || []);
    } catch (err) {
      console.error('Error fetching medicines:', err);
    }
    setLoading(false);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getMedicinesForDay = (day) => {
    return medicines.filter(m => {
      const exp = new Date(m.expiryDate);
      return exp.getFullYear() === year && exp.getMonth() === month && exp.getDate() === day;
    });
  };

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const today = new Date();
  const isToday = (day) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  const selectedDayMedicines = selectedDay ? getMedicinesForDay(selectedDay) : [];

  return (
    <div>
      <header style={{ background: '#1976d2', color: 'white', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>📅 Expiry Calendar</h1>
        <button onClick={() => window.location.href = '/dashboard'} style={{ padding: '10px 20px', background: '#fff', color: '#1976d2', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          Back to Dashboard
        </button>
      </header>

      <div style={{ padding: '30px', background: '#f5f5f5', minHeight: '100vh' }}>
        {loading ? (
          <p>Loading calendar...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ background: 'white', borderRadius: '10px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <button onClick={goToPrevMonth} style={{ padding: '8px 14px', background: '#f0f0f0', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>◀</button>
                <h2 style={{ margin: 0 }}>{monthName} {year}</h2>
                <button onClick={goToNextMonth} style={{ padding: '8px 14px', background: '#f0f0f0', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>▶</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '8px' }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '12px', color: '#888', padding: '5px 0' }}>{d}</div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                {calendarCells.map((day, idx) => {
                  if (day === null) return <div key={idx} />;
                  const dayMeds = getMedicinesForDay(day);
                  const hasExpired = dayMeds.some(m => m.status === 'Expired');
                  const hasExpiringSoon = dayMeds.some(m => m.status === 'Expiring Soon');

                  return (
                    <div
                      key={idx}
                      onClick={() => dayMeds.length > 0 && setSelectedDay(day)}
                      style={{
                        aspectRatio: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        cursor: dayMeds.length > 0 ? 'pointer' : 'default',
                        background: selectedDay === day ? '#1976d2' : isToday(day) ? '#e3f2fd' : 'transparent',
                        color: selectedDay === day ? 'white' : '#333',
                        border: isToday(day) && selectedDay !== day ? '2px solid #1976d2' : '1px solid transparent',
                        fontWeight: isToday(day) ? 'bold' : 'normal',
                        fontSize: '14px',
                        position: 'relative'
                      }}
                    >
                      {day}
                      {dayMeds.length > 0 && (
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          marginTop: '2px',
                          background: hasExpired ? '#d32f2f' : hasExpiringSoon ? '#ff9800' : '#4caf50'
                        }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ marginTop: 0 }}>
                {selectedDay ? `Expiring on ${monthName} ${selectedDay}` : 'Click a marked day'}
              </h3>
              {selectedDayMedicines.length === 0 ? (
                <p style={{ color: '#888', fontSize: '14px' }}>No medicines selected. Click a day with a colored dot to see details.</p>
              ) : (
                selectedDayMedicines.map(m => (
                  <div key={m._id} style={{ padding: '12px', borderRadius: '8px', background: '#f5f5f5', marginBottom: '10px' }}>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{m.name}</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#666' }}>{m.dosage} · {m.quantity} {m.unit}</p>
                    <span style={{
                      display: 'inline-block',
                      marginTop: '6px',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      color: 'white',
                      background: m.status === 'Expired' ? '#d32f2f' : m.status === 'Expiring Soon' ? '#ff9800' : '#4caf50'
                    }}>
                      {m.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarView;