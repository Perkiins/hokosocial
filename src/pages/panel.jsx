import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Terminal from './Terminal';

const Panel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar onLogout={handleLogout} />
      <div style={{ flex: 1, padding: '30px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="terminal" />} />
          <Route path="terminal" element={<Terminal />} />
          {/* Aquí puedes añadir más rutas de apps en el futuro */}
        </Routes>
      </div>
    </div>
  );
};

export default Panel;
