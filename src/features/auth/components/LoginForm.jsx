import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ setActiveSection }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await login({ email, password });
    if (!resultAction.error) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="usuario@ejemplo.com"
            className="input-dark"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Tu contraseña"
            className="input-dark"
          />
        </div>

        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>

        <div className="login-info">
          <p>Para pruebas usar:</p>
          <p>Email: john@mail.com</p>
          <p>Contraseña: changeme</p>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveSection(false); }} className="register-logo" title="Ir a registro" style={{ cursor: 'pointer', color: 'inherit', font: 'inherit', fontSize: 'inherit', textDecoration: 'underline', background: 'none', border: 'none', padding: 0 }}>
            Registrarse
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
