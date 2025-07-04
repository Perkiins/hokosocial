import React, { useEffect, useState } from 'react';
import '../styles/panel.css';
import AdminPanel from './Admin';

const Panel = () => {
  const [tokens, setTokens] = useState(null);
  const [log, setLog] = useState([]);
  const [mensajeBot, setMensajeBot] = useState('');
  const [user, setUser] = useState(null); // username y rol

  // Obtener datos del usuario autenticado
  const [rol, setRol] = useState('user'); // nuevo estado
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://hokosocial.onrender.com/api/user-data', {
          credentials: 'include'
        });
        const data = await res.json();
        setTokens(data.tokens || 0);
        setRol(data.rol || 'user'); // guardar el rol
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };
  
    fetchData();
  }, []);

  // Cargar log del bot periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('https://hokosocial.onrender.com/api/log', {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          setLog(data.log_lines || []);
          setMensajeBot(data.mensaje_bot || '');
        })
        .catch(err => console.error('Error al cargar log:', err));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Funciones de acción
  const ejecutarBot = async () => {
    try {
      const res = await fetch('https://hokosocial.onrender.com/api/run-bot', {
        method: 'POST',
        credentials: 'include'
      });
      const data = await res.json();

      if (data.tokens_restantes !== undefined) {
        setTokens(data.tokens_restantes);
      }

      if (data.message) {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error al ejecutar el bot:', err);
    }
  };

  const generarCookies = () => {
    fetch('https://hokosocial.onrender.com/api/generar-cookies', {
      method: 'POST',
      credentials: 'include'
    });
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    alert('Sesión cerrada');
    window.location.href = '/login';
  };
  return (
    <div className="panel-wrapper">
      <aside className="sidebar">
        <h2>MAAX 𒉭</h2>
        <small>{user?.username || '...'}</small>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
        <nav>
          <a href="#" className="active">Conseguir Potenciales Seguidores</a>
          {/* Este botón solo si el user es admin */}
          {user?.rol === 'admin' && (
            <button onClick={() => setActive("admin")}>👑 Panel Admin</button>
          )}
        </nav>
      </aside>

      <main className="main">
        <h1>Conseguir Potenciales Seguidores</h1>
        <div className="token-info">Tokens disponibles: {tokens}</div>

        <div className="actions">
          <button onClick={ejecutarBot}>Ejecutar bot</button>
          <button onClick={generarCookies}>Generar cookies</button>
        </div>

        <div className="terminal-container">
          <div className="terminal">
            <div className="terminal-title">[ Terminal del bot ]</div>
            {log.map((linea, idx) => (
              <div key={idx}>{linea}</div>
            ))}
            {mensajeBot && <div>👉 {mensajeBot}</div>}
          </div>
        </div>

        {/* Solo visible para admin */}
        {active === "admin" && user?.rol === 'admin' && (
          <Admin currentUser={user} />
        )}
      </main>
    </div>
  );
};

export default Panel;
