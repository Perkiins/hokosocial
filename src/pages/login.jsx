import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const BACKEND_URL = "https://threads-follower.onrender.com"; // Cámbialo si es necesario

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/panel");
      } else {
        setMensaje(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div style={{
      fontFamily: "'Montserrat', sans-serif",
      background: "#f3f4f6",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: 0
    }}>
      <div style={{
        background: "#fff",
        padding: 40,
        borderRadius: 10,
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: 400,
        textAlign: "center"
      }}>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 32,
          marginBottom: 25,
          color: "#111827",
          letterSpacing: "0.5px"
        }}>
          Inicia sesión
        </h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 14,
              margin: "10px 0",
              borderRadius: 6,
              border: "1px solid #cbd5e1",
              fontSize: 15
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 14,
              margin: "10px 0",
              borderRadius: 6,
              border: "1px solid #cbd5e1",
              fontSize: 15
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: 14,
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              cursor: "pointer"
            }}
          >
            Entrar
          </button>
        </form>

        <a
          href="/register"
          style={{
            display: "block",
            marginTop: 15,
            fontSize: 14,
            color: "#4b5563",
            textDecoration: "none"
          }}
        >
          ¿No tienes cuenta? Regístrate
        </a>

        {mensaje && (
          <div style={{ marginTop: 20, color: "red", fontSize: 14 }}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}
