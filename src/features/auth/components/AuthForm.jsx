import React, { useState } from 'react';
import FormularioRegistro from '../../formularios/pages/FormularioRegistro';
import LoginForm from './LoginForm';
import './LoginForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

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
