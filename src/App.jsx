import React, { useState } from "react";

export default function App() {
  const [page, setPage] = useState("login"); // 'login' | 'register' | 'dashboard'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("tab1");
  const [loading, setLoading] = useState(false);
  const [unfollowers, setUnfollowers] = useState([]);

  // Datos simulados para mostrar después de ejecutar el script
  const mockUnfollowers = [
    { username: "user123", profileUrl: "#" },
    { username: "fashionblogger", profileUrl: "#" },
    { username: "traveljunkie", profileUrl: "#" },
    { username: "foodieeats", profileUrl: "#" },
    { username: "sunnydays", profileUrl: "#" },
    { username: "gymmotivation", profileUrl: "#" },
  ];

  // Función que simula la ejecución del script
  const runInstagramScript = () => {
    setLoading(true);
    setTimeout(() => {
      setUnfollowers(mockUnfollowers);
      setLoading(false);
    }, 3000); // Simulamos que tarda 3 segundos
  };

  // Manejar login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setPage("dashboard");
    }
  };

  // Manejar registro
  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password) {
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      setPage("login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Login / Register */}
      {(page === "login" || page === "register") && (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md transition-transform transform hover:scale-[1.01]">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              {page === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
            </h2>

            <form onSubmit={page === "login" ? handleLogin : handleRegister}>
              <div className="mb-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Tu nombre de usuario"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
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
                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                  >
                    Regístrate
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    onClick={() => setPage("login")}
                    className="text-blue-600 hover:text-blue-800 font-medium underline"
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
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Social Insight Panel</h1>
              <button
                onClick={() => setPage("login")}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Cerrar sesión
              </button>
            </div>
          </header>

          {/* Tabs */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("tab1")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "tab1"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Quien no me sigue de vuelta (Instagram)
                </button>
                <button
                  onClick={() => setActiveTab("tab2")}
                  disabled
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "tab2"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Buscar seguidores potenciales (Threads)
                </button>
                <button
                  onClick={() => setActiveTab("tab3")}
                  disabled
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "tab3"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Quién no me sigue de vuelta (Threads)
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "tab1" && (
                <div className="bg-white shadow rounded-lg p-6 animate-fade-in">
                  <h2 className="text-xl font-semibold mb-4">Instagram Unfollowers</h2>
                  <p className="text-gray-600 mb-6">
                    Haz clic en el botón para ejecutar el script y ver quién no te sigue de vuelta.
                  </p>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                      <p className="text-gray-600">Ejecutando script... Esto puede tardar unos segundos.</p>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Username
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Perfil
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {unfollowers.length > 0 ? (
                            unfollowers.map((user, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {user.username}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                  <a href={user.profileUrl} target="_blank" rel="noopener noreferrer">
                                    Ver perfil
                                  </a>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
                                No se han ejecutado scripts aún o no hay datos disponibles.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="mt-6 flex space-x-4">
                    <button
                      onClick={runInstagramScript}
                      disabled={loading}
                      className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                      {loading ? "Procesando..." : "Ejecutar Script"}
                    </button>

                    {unfollowers.length > 0 && (
                      <button
                        onClick={() => {
                          const dataStr = JSON.stringify(unfollowers);
                          const blob = new Blob([dataStr], { type: "application/json" });
                          const url = URL.createObjectURL(blob);

                          const link = document.createElement("a");
                          link.href = url;
                          link.download = "unfollowers.json";
                          link.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Descargar JSON
                      </button>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "tab2" && (
                <div className="bg-white shadow rounded-lg p-6 text-center">
                  <h2 className="text-xl font-semibold mb-4">En desarrollo</h2>
                  <p className="text-gray-600">
                    Esta funcionalidad estará disponible próximamente. ¡Estamos trabajando en ello!
                  </p>
                </div>
              )}

              {activeTab === "tab3" && (
                <div className="bg-white shadow rounded-lg p-6 text-center">
                  <h2 className="text-xl font-semibold mb-4">En desarrollo</h2>
                  <p className="text-gray-600">
                    Esta funcionalidad estará disponible próximamente. ¡Estamos trabajando en ello!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Social Insight Panel. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
