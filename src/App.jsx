import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './layout/MainLayout';
import HotelEntry from './pages/HotelEntry';
import AuditCenter from './pages/AuditCenter';
import DashboardHome from './pages/DashboardHome';
import MyHotels from './pages/MyHotels';

function App() {
  const [hotels, setHotels] = useState(() => {
    const saved = localStorage.getItem('hotel_data');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hotel_data', JSON.stringify(hotels));
  }, [hotels]);

  const addHotel = (newHotel) => {
    const hotelWithStatus = {
      ...newHotel,
      id: Date.now(),
      status: 'pending',
      reason: '',
    };
    setHotels([...hotels, hotelWithStatus]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<MainLayout />}>
          {/* Default landing page for the dashboard */}
          <Route index element={<DashboardHome hotels={hotels} />} />
          
          <Route 
            path="hotel-entry" 
            element={<HotelEntry onSave={addHotel} />} 
          />

          <Route 
            path="my-hotels" 
            element={<MyHotels hotels={hotels} />} 
          />

          <Route 
            path="audit" 
            element={<AuditCenter hotels={hotels} setHotels={setHotels} />} 
          />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;