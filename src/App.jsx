import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Ensure these paths match your folder structure exactly!
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MainLayout from './layout/MainLayout';
import HotelEntry from './pages/HotelEntry';
import AuditCenter from './pages/AuditCenter';
import DashboardHome from './pages/DashboardHome';
import MyHotels from './pages/MyHotels';

function App() {
  const [lang, setLang] = useState('en');
  const [hotels, setHotels] = useState(() => {
    const saved = localStorage.getItem('hotel_data');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hotel_data', JSON.stringify(hotels));
  }, [hotels]);

  return (
    <Router>
      <Routes>
        {/* Pass props to Login and SignUp */}
        <Route path="/login" element={<Login lang={lang} setLang={setLang} />} />
        <Route path="/signup" element={<SignUp lang={lang} setLang={setLang} />} />

        {/* The Dashboard Parent Route */}
        <Route path="/dashboard" element={<MainLayout lang={lang} setLang={setLang} />}>
          <Route index element={<DashboardHome hotels={hotels} lang={lang} />} />
          <Route path="hotel-entry" element={<HotelEntry onSave={(h) => setHotels([...hotels, h])} lang={lang} />} />
          <Route path="my-hotels" element={<MyHotels hotels={hotels} lang={lang} />} />
          <Route path="audit" element={<AuditCenter hotels={hotels} setHotels={setHotels} lang={lang} />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;