// src/components/Tabs.jsx
import React from "react";

export default function Tabs({ currentTab }) {
  return (
    <main className="main">
      {currentTab === "potenciales" && (
        <>
          <h1>Conseguir Potenciales Seguidores</h1>
          <div className="token-info">Tokens disponibles: [CARGANDO]</div>
          {/* Aquí puedes insertar los botones de acción */}
        </>
      )}
      {currentTab === "perfil" && <h1>Mi perfil</h1>}
      {currentTab === "estadisticas" && <h1>Estadísticas</h1>}
      {currentTab === "configuracion" && <h1>Configuración</h1>}
    </main>
  );
}
