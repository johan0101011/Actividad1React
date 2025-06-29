import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FormularioRegistro from '../../formularios/pages/FormularioRegistro';
import LoginForm from './LoginForm';
import './LoginForm.css';

const AuthForm = () => {
  const location = useLocation();
  // Check if navigation state indicates to show registration form
  const initialIsLogin = location.state?.initialIsLogin !== undefined
    ? location.state.initialIsLogin
    : true;

  const [isLogin, setIsLogin] = useState(initialIsLogin);

  return (
    <div className="auth-container">
      {isLogin ? (
        <LoginForm setActiveSection={setIsLogin} />
      ) : (
        <div className="registro-container">
          <FormularioRegistro
            onBack={() => setIsLogin(true)}
          />
        </div>
      )}
    </div>
  );
};

export default AuthForm;
