import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Panel() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}
