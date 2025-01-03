import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './blocks/login.css'; // Importando el archivo CSS correspondiente

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar credenciales guardadas en localStorage
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      // Redirigir a la página principal si las credenciales son correctas
      navigate('/main');
    } else {
      // Mostrar un mensaje de error
      setError('Correo o contraseña incorrectos. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="page page--login">
      <header className="header header--login">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/EddieThe_Final_Frontier.jpg/800px-EddieThe_Final_Frontier.jpg"
          alt="Logo de Final Frontier"
          className="logo"
        />
      </header>

      <main className="main main--login">
        <section className="login-form">
          <h1 className="login-form__title">Inicia Sesión</h1>
          <form className="login-form__form" id="login-form" onSubmit={handleSubmit}>
            <label className="login-form__label" htmlFor="email">Correo</label>
            <input
              className="login-form__input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              required
            />
            
            <label className="login-form__label" htmlFor="password">Contraseña</label>
            <input
              className="login-form__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
            
            {error && <p className="error">{error}</p>}

            <button className="login-form__button" type="submit">Iniciar Sesión</button>
          </form>
          <p className="login-form__register">
            ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Login;
