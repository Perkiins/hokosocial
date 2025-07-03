// src/pages/login.jsx
import { useState } from 'react';
import { login } from '../utils/api';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(username, password);

    if (res.token) {
      saveToken(res.token);
      navigate('/panel');
    } else {
      alert('Login incorrecto');
    }
  };

  return (
    <div className="form-container">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Usuario" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
