import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api';
import { saveToken } from '../utils/auth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(username, password);
    if (res.token) {
      saveToken(res.token);
      navigate('/panel');
    } else {
      alert(res.message || 'Error al registrarse');
    }
  };

  return (
    <div className="form-container">
      <h1>Crear cuenta</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Registrarse</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
};

export default Register;
