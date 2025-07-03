// src/pages/Panel.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Panel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>¡Bienvenido a HokoSocial!</h1>
      <p style={styles.subtitle}>Estás autenticado con éxito.</p>
      <button onClick={handleLogout} style={styles.button}>Cerrar sesión</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '80px',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    fontSize: '28px',
    color: '#10b981'
  },
  subtitle: {
    fontSize: '16px',
    color: '#374151',
    marginBottom: '20px'
  },
  button: {
    backgroundColor: '#ef4444',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default Panel;
