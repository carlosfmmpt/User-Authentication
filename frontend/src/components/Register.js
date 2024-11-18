import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetState } from '../slices/registerSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estado del slice de registro
  const { loading, success, error } = useSelector((state) => state.register);

  // Redirigir después de un registro exitoso
  useEffect(() => {
    if (success) {
      alert('¡Registro exitoso!');
      dispatch(resetState()); // Reinicia el estado después del registro
      navigate('/login'); // Redirige al login
    }
  }, [success, dispatch, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    dispatch(registerUser({ username, password }));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Registro</h1>
      {loading && <p>Registrando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '0.5rem',
              width: '100%',
              marginBottom: '10px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '0.5rem',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Registrarse
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
};

export default Register;
