import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Register from './components/Register';
//import Dashboard from './components/Dashboard';


function App() {
  // Obtenemos el estado de autenticación desde Redux
  const { token } = useSelector((state) => state.auth);

  // Función para proteger rutas (redirige al login si no hay token)
  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registeru" element={<Register />} />
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
