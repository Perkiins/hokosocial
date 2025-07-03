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
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.rol}</td>
              <td>{user.tokens}</td>
              <td><button onClick={() => eliminarUsuario(user.username)}>❌</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
