import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/panel.css";

export default function Panel() {
  const [logLines, setLogLines] = useState([]);
  const [mensajeBot, setMensajeBot] = useState("");
  const terminalRef = useRef(null);
  const navigate = useNavigate();

  const BACKEND_URL = "https://threads-follower.onrender.com"; // cambia esto si es necesario

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // redirige si no hay sesión
    }
  }, [token, navigate]);

  const fetchTerminalLog = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/panel-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }

      const data = await res.json();
      setLogLines(data.log_lines || []);
      setMensajeBot(data.mensaje_bot || "");
    } catch {
      setMensajeBot("Error al cargar los datos.");
    }
  };

  const postToBackend = async (endpoint) => {
    try {
      const res = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch {
      alert("Error al conectar con el backend");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
          <button onClick={() => postToBackend("/run_bot")}>Ejecutar bot</button>
          <button onClick={() => postToBackend("/generar_cookies")}>Generar cookies</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
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
