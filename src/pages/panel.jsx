import React, { useState, useEffect, useRef } from "react";
import "../styles/panel.css";

export default function Panel() {
  const [logLines, setLogLines] = useState([]);
  const [mensajeBot, setMensajeBot] = useState("");
  const terminalRef = useRef(null);

  const fetchTerminalLog = async () => {
    try {
      const res = await fetch("https://TU_BACKEND_RENDER/panel-data");
      const data = await res.json();
      setLogLines(data.log_lines || []);
      setMensajeBot(data.mensaje_bot || "");
    } catch {
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
        <small style={{ marginBottom: 20 }}>Jona Chupas</small>
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
          <button onClick={() => {
            fetch("https://TU_BACKEND_RENDER/run_bot", { method: "POST" });
          }}>Ejecutar bot</button>
          <button onClick={() => {
            fetch("https://TU_BACKEND_RENDER/generar_cookies", { method: "POST" });
          }}>Generar cookies</button>
          <button onClick={() => {
            fetch("https://TU_BACKEND_RENDER/logout", { method: "GET" });
            // También limpia token y redirige si usas login real
          }}>Cerrar sesión</button>
        </div>

        <div className="terminal-container">
          <div className="terminal" ref={terminalRef}>
            <div className="terminal-title">[ Terminal del bot ]</div>
            {logLines.map((line, i) => <div key={i}>{line}</div>)}
            {mensajeBot && <div style={{ marginTop: 8 }}>👉 {mensajeBot}</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
