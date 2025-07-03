import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const linkStyle = ({ isActive }) => ({
    display: 'block',
    padding: '12px 16px',
    color: isActive ? '#ffffff' : '#d1d5db',
    backgroundColor: isActive ? '#3b82f6' : 'transparent',
    textDecoration: 'none',
    borderRadius: '6px',
    marginBottom: '8px'
  });

  return (
    <div style={{
      width: '220px',
      backgroundColor: '#1f2937',
      color: 'white',
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ fontSize: '22px', marginBottom: '20px' }}>Hoko Panel - MAAX 𒉭</h2>
      <NavLink to="/panel/terminal" style={linkStyle}>Terminal</NavLink>
      <NavLink to="/panel/app1" style={linkStyle}>App 1</NavLink>
      <NavLink to="/panel/app2" style={linkStyle}>App 2</NavLink>
      <button onClick={handleLogout} style={{
        marginTop: '30px',
        backgroundColor: '#ef4444',
        border: 'none',
        padding: '10px 15px',
        color: 'white',
        borderRadius: '6px',
        cursor: 'pointer'
      }}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Sidebar;
