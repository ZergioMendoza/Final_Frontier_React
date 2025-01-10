
import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import PrincipalPage from './PrincipalPage';
import '../styles.css';

function App() {
  const isAuthenticated = localStorage.getItem('email');  // Verifica si el usuario está logueado

  return (
    <Router>
      <Routes>
        {/* Ruta para login */}
        <Route path="/login" element={<Login />} />
        {/* Ruta para registro */}
        <Route path="/register" element={<Register />} />
        {/* Ruta para la página principal - Solo accesible si el usuario está logueado */}
        <Route
          path="/main"
          element={isAuthenticated ? <PrincipalPage /> : <Navigate to="/login" />}
        />
        {/* Ruta por defecto */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
