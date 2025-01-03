import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login';
import Register from './register';
import PrincipalPage from './PrincipalPage';
// import './components/blocks/register.css';
// import './components/blocks/login.css';
// import './components/blocks/popup.css';
// import '../components/principal.css';
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
