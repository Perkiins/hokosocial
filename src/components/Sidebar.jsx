import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();

  const navItems = [
    { path: 'terminal', label: 'Terminal' },
    // Aquí puedes añadir más pestañas en el futuro
  ];

  return (
    <div style={{
      width: '220px',
      background: '#1f2937',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 0',
    }}>
      <h2 style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '28px',
        textAlign: 'center',
        marginBottom: '30px',
      }}>
        HokoSocial
      </h2>
      {navItems.map(item => (
        <Link
          key={item.path}
          to={`/panel/${item.path}`}
          style={{
            padding: '12px 20px',
            textDecoration: 'none',
            color: location.pathname.includes(item.path) ? '#10b981' : '#fff',
            fontWeight: 'bold',
            backgroundColor: location.pathname.includes(item.path) ? '#374151' : 'transparent'
          }}
        >
          {item.label}
        </Link>
      ))}
      <button
        onClick={onLogout}
        style={{
          marginTop: 'auto',
          backgroundColor: '#ef4444',
          border: 'none',
          padding: '12px',
          margin: '20px',
          borderRadius: '6px',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Sidebar;
