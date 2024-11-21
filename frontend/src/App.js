import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logout } from './slices/authSlice';
import axios from 'axios';
import { useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
//import Dashboard from './components/Dashboard';


function App() {
  // Obtenemos el estado de autenticación desde Redux
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {

      // Opcional: Verifica si el token sigue siendo válido
      axios
        .get('http://localhost:5000/api/auth/validateToken', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const { user } = response.data;
          dispatch(loginSuccess({ token, user }));
        })
        .catch(() => {
          dispatch(logout());
          localStorage.removeItem('token');
        });
    }
  }, [dispatch]);


  // Función para proteger rutas (redirige al login si no hay token)
   const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
  
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <Register />

              </ProtectedRoute>
            }
          />
         
          {/* Ruta predeterminada */}
          <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
