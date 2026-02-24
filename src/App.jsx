import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './layout/MainLayout';
import HotelEntry from './pages/HotelEntry';
import AuditCenter from './pages/AuditCenter';


const DashboardRedirect = () => {
  const userRole = localStorage.getItem('userRole');
  if (userRole === 'admin') {
    return <Navigate to="/dashboard/audit" replace />;
  }
  return <Navigate to="/dashboard/hotel-entry" replace />;
};

function App() {
  const [hotels, setHotels] = useState([]);

  const addHotel = (newHotel) => {
    const hotelWithStatus = {
      ...newHotel,
      id: Date.now(),
      status: 'pending',
    };
    setHotels([...hotels, hotelWithStatus]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<MainLayout />}>
          {/* Use the helper component as the index */}
          <Route index element={<DashboardRedirect />} />
          
          <Route 
            path="hotel-entry" 
            element={<HotelEntry onSave={addHotel} />} 
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