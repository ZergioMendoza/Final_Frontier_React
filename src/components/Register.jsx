import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/blocks/register.css'; // Importando el archivo CSS correspondiente

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden. Intenta de nuevo.');
      return;
    }

    // Guardar las credenciales en localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // Redirigir al formulario de inicio de sesión
    navigate('/login');
  };

  return (
    <div className="page page--register">
      <header className="header header--register">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/EddieThe_Final_Frontier.jpg/800px-EddieThe_Final_Frontier.jpg"
          alt="Logo de Final Frontier"
          className="logo"
        />
      </header>

      <main className="main main--register">
        <section className="register-form">
          <h1 className="register-form__title">Regístrate</h1>
          <form className="register-form__form" id="register-form" onSubmit={handleSubmit}>
            <label className="register-form__label" htmlFor="email">Correo</label>
            <input
              className="register-form__input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              required
            />

            <label className="register-form__label" htmlFor="password">Contraseña</label>
            <input
              className="register-form__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crea una contraseña"
              required
            />

            <label className="register-form__label" htmlFor="confirm-password">Confirmar Contraseña</label>
            <input
              className="register-form__input"
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              required
            />

            {error && <p className="error">{error}</p>}

            <button className="register-form__button" type="submit">Registrarse</button>
          </form>

          <p className="register-form__login">
            ¿Ya tienes cuenta? <a href="#/login">Inicia sesión aquí</a>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Register;
