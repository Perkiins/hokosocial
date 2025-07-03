import React, { useEffect, useState } from 'react';

function AdminPanel({ currentUser }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');

  const cargarUsuarios = async () => {
    try {
      const res = await fetch('https://hokosocial.onrender.com/api/users', {
        credentials: 'include'
      });
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      setMensaje('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
      const res = await fetch('https://hokosocial.onrender.com/api/delete-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id })
      });

      const data = await res.json();
      if (res.ok) {
        setUsuarios(usuarios.filter((u) => u.id !== id));
        setMensaje(data.message);
      } else {
        setMensaje(data.message || 'Error al eliminar');
      }
    } catch (error) {
      setMensaje('Error en la petición');
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  if (currentUser.rol !== 'admin') return null;

  return (
    <div>
      <h2>Panel de Administración 👑</h2>
      {mensaje && <p>{mensaje}</p>}
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Tokens</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.tokens}</td>
                <td>{u.rol}</td>
                <td>
                  {u.username !== currentUser.username && (
                    <button onClick={() => eliminarUsuario(u.id)}>
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPanel;
