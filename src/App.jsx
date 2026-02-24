import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp'; // 1. Import your new SignUp component
import MainLayout from './layout/MainLayout';
import HotelEntry from './pages/HotelEntry';
import AuditCenter from './pages/AuditCenter';
import DashboardHome from './pages/DashboardHome';
import MyHotels from './pages/MyHotels';

function App() {
  // Centralized state for hotels (persisted in localStorage)
  const [hotels, setHotels] = useState(() => {
    const saved = localStorage.getItem('hotel_data');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync state to localStorage whenever hotels change
  useEffect(() => {
    localStorage.setItem('hotel_data', JSON.stringify(hotels));
  }, [hotels]);

  const addHotel = (newHotel) => {
    const hotelWithStatus = { 
      ...newHotel, 
      id: Date.now(), 
      status: 'pending', 
      reason: '' 
    };
    setHotels([...hotels, hotelWithStatus]);
  };

  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES (No Sidebar) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> {/* 2. Register the SignUp route here */}

        {/* --- PROTECTED ROUTES (Inside MainLayout with Sidebar) --- */}
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<DashboardHome hotels={hotels} />} />
          <Route path="hotel-entry" element={<HotelEntry onSave={addHotel} />} />
          <Route path="my-hotels" element={<MyHotels hotels={hotels} />} />
          <Route path="audit" element={<AuditCenter hotels={hotels} setHotels={setHotels} />} />
        </Route>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Catch-all for 404s */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;