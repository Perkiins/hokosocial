// src/components/Sidebar.jsx
import React from "react";
import "./Sidebar.css"; // Puedes mover los estilos ahí o usar tailwind

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <h2>MAAX 𒉭</h2>
      <small style={{ marginBottom: 20, fontFamily: 'Montserrat, sans-serif' }}>Jona Chupas</small>
      <nav>
        <a onClick={() => onNavigate("potenciales")} className="active">Conseguir Potenciales Seguidores</a>
        <a onClick={() => onNavigate("perfil")}>Mi perfil</a>
        <a onClick={() => onNavigate("estadisticas")}>Estadísticas</a>
        <a onClick={() => onNavigate("configuracion")}>Configuración</a>
      </nav>
    </aside>
  );
}
