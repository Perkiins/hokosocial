import React, { useState, useEffect, useRef } from "react";
import "../styles/panel.css"; // Extrae el CSS si quieres separarlo

export default function Panel() {
  const [logLines, setLogLines] = useState([]);
  const [mensajeBot, setMensajeBot] = useState("Cargando log...");
  const terminalRef = useRef(null);

  const fetchTerminalLog = async () => {
    try {
      const res = await fetch("https://TU_BACKEND_RENDER/panel-data"); // Cambia por tu endpoint real
      const data = await res.json();
      setLogLines(data.log_lines || []);
      setMensajeBot(data.mensaje_bot || "");
    } catch (err) {
      setMensajeBot("Error al cargar los datos.");
    }
  };

  useEffect(() => {
    fetchTerminalLog();
    const interval = setInterval(fetchTerminalLog, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logLines]);

  return (
    <div className="panel-body">
      <aside className="sidebar">
        <h2>MAAX 𒉭</h2>
        <small style={{ marginBottom: 20, fontFamily: "Montserrat, sans-serif" }}>Jona Chupas</small>
        <nav>
          <a href="#" className="active">Conseguir Potenciales Seguidores</a>
          <a href="#">Mi perfil</a>
          <a href="#">Estadísticas</a>
          <a href="#">Configuración</a>
        </nav>
      </aside>

      <main className="main">
        <h1>Conseguir Potenciales Seguidores</h1>
        <div className="token-info">Tokens disponibles: [Próximamente]</div>

        <div className="actions">
          <form method="POST" action="https://TU_BACKEND_RENDER/run_bot">
            <button type="submit">Ejecutar bot</button>
          </form>
          <form method="POST" action="https://TU_BACKEND_RENDER/generar_cookies">
            <button type="submit">Generar cookies</button>
          </form>
          <form method="GET" action="https://TU_BACKEND_RENDER/logout">
            <button type="submit">Cerrar sesión</button>
          </form>
        </div>

        <div className="terminal-container">
          <div className="terminal" ref={terminalRef}>
            <div className="terminal-title">[ Terminal del bot ]</div>
            {logLines.map((linea, i) => (
              <div key={i}>{linea}</div>
            ))}
            {mensajeBot && (
              <div style={{ marginTop: "8px" }}>
                👉 {mensajeBot}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
