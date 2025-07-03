import React, { useState, useEffect } from "react";

const API_LOGIN = "https://jwt-auth-api-k2r3.onrender.com/api/login";
const API_REGISTER = "https://jwt-auth-api-k2r3.onrender.com/api/register";
const API_UNFOLLOWERS = "https://jwt-auth-api-k2r3.onrender.com/api/unfollowers";

export default function App() {
  const [page, setPage] = useState("login"); // login | register | dashboard
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("tab1");
  const [loading, setLoading] = useState(false);
  const [unfollowers, setUnfollowers] = useState([]);

  // Verifica si ya hay token al cargar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setPage("dashboard");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setPage("dashboard");
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      alert("Error de red");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        setPage("login");
      } else {
        alert(data.message || "Error al registrarse");
      }
    } catch (err) {
      alert("Error de red");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername("");
    setPassword("");
    setPage("login");
  };

  const runInstagramScript = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_UNFOLLOWERS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUnfollowers(data.unfollowers || []);
      } else {
        alert(data.message || "Error al obtener datos");
      }
    } catch (err) {
      alert("Error de red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Login/Register */}
      {(page === "login" || page === "register") && (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              {page === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
            </h2>
            <form onSubmit={page === "login" ? handleLogin : handleRegister}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Tu nombre de usuario"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Tu contraseña"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                {page === "login" ? "Acceder" : "Registrarse"}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              {page === "login" ? (
                <>
                  ¿No tienes cuenta?{" "}
                  <button
                    onClick={() => setPage("register")}
                    className="text-blue-600 underline"
                  >
                    Regístrate
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    onClick={() => setPage("login")}
                    className="text-blue-600 underline"
                  >
                    Inicia sesión
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Dashboard */}
      {page === "dashboard" && (
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Social Insight Panel</h1>
              <button onClick={handleLogout} className="text-red-600">
                Cerrar sesión
              </button>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 mt-6">
            <nav className="flex space-x-8 border-b">
              <button
                onClick={() => setActiveTab("tab1")}
                className={`py-2 ${
                  activeTab === "tab1" ? "border-b-2 border-blue-500" : ""
                }`}
              >
                Quién no me sigue (Instagram)
              </button>
              <button disabled className="text-gray-400 py-2">Buscar seguidores (Threads)</button>
              <button disabled className="text-gray-400 py-2">Quién no me sigue (Threads)</button>
            </nav>

            <div className="mt-6">
              {activeTab === "tab1" && (
                <div className="bg-white p-6 rounded shadow">
                  <h2 className="text-xl font-semibold mb-4">Instagram Unfollowers</h2>
                  <p className="text-gray-600 mb-4">
                    Haz clic en el botón para ejecutar el script y ver quién no te sigue de vuelta.
                  </p>
                  {loading ? (
                    <p className="text-blue-600">Procesando...</p>
                  ) : (
                    <>
                      <button
                        onClick={runInstagramScript}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Ejecutar Script
                      </button>
                      {unfollowers.length > 0 && (
                        <div className="mt-4 overflow-auto max-h-96">
                          <table className="w-full text-left">
                            <thead>
                              <tr>
                                <th className="border px-4 py-2">Usuario</th>
                                <th className="border px-4 py-2">Perfil</th>
                              </tr>
                            </thead>
                            <tbody>
                              {unfollowers.map((u, i) => (
                                <tr key={i}>
                                  <td className="border px-4 py-2">{u.username}</td>
                                  <td className="border px-4 py-2">
                                    <a
                                      href={u.profileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline"
                                    >
                                      Ver perfil
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
