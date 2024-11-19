      // Guarda el token en localStorage (opcional)
      // Guarda el token en localStorage (opcional)
      import React, { useState } from 'react';
      import { useDispatch } from 'react-redux';
      import { loginSuccess } from '../slices/authSlice';
      import axios from 'axios';
      import { useNavigate } from 'react-router-dom';
      
      
      const Login = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const dispatch = useDispatch();
        const navigate = useNavigate();
        
      
      
        const handleLogin = async (e) => {
          e.preventDefault();
          try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            const { token, user } = response.data;
      
            // Despacha la acción para actualizar el estado global
            dispatch(loginSuccess({ token, user }));
      
            // Guarda el token en localStorage (opcional)
            localStorage.setItem('token', token);
      
            // Redirige al componente protegido
            navigate('/register');
          } catch (err) {
            console.error(err);
            setError('Error al iniciar sesión. Verifica tus credenciales.');
          }
        };
      
        return (
          <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Ingresar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
      
        );
      };
      
      export default Login;
      






      exports.login =  (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      
        findUserByUsername(username, async (err, results) => {
          if (results.length === 0) return res.status(400).json({ message: 'Usuario no encontrado' });
      
          const user = results[0];
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });
      
          const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ token, username: user.username });
        });
      };