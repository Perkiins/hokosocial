import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('https://hokosocial.onrender.com/api/admin/users', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setUsuarios(data.usuarios || []))
      .catch(err => console.error('Error al cargar usuarios:', err));
  }, []);

  const eliminarUsuario = async (username) => {
    if (window.confirm(`¿Eliminar a ${username}?`)) {
      await fetch(`https://hokosocial.onrender.com/api/admin/delete-user/${username}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      setUsuarios(usuarios.filter(u => u.username !== username));
    }
  };

  const guardarCambios = async (user) => {
    const res = await fetch('https://hokosocial.onrender.com/api/update-user', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.id,
        tokens: user.tokens,
        rol: user.rol
      })
    });
  
    if (res.ok) {
      alert('Cambios guardados');
    } else {
      alert('Error al guardar cambios');
    }
  };
  
  return (
    <div style={{ padding: '2rem' }}>
      <h2>👑 Panel de Administración</h2>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Tokens</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>
                <input
                  type="number"
                  value={user.tokens}
                  onChange={(e) => {
                    const nuevos = [...usuarios];
                    nuevos.find(u => u.id === user.id).tokens = parseInt(e.target.value);
                    setUsuarios(nuevos);
                  }}
                />
              </td>
              <td>
                <select
                  value={user.rol}
                  onChange={(e) => {
                    const nuevos = [...usuarios];
                    nuevos.find(u => u.id === user.id).rol = e.target.value;
                    setUsuarios(nuevos);
                  }}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => eliminarUsuario(user.id)}>❌</button>
                <button onClick={() => guardarCambios(user)}>💾</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
