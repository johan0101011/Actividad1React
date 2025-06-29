import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './features/landing/pages/Home';
import InformacionProductos from './features/landing/pages/InformacionProductos';
import AuthForm from './features/auth/components/AuthForm';
import Dashboard from './features/auth/components/Dashboard';

const AppRoutes = ({ activeSection, setActiveSection }) => {
  return (
    <Routes>
      <Route path="/" element={
        <Home
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      } />
      <Route path="/informacion-productos" element={<InformacionProductos />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Removed /register route to avoid showing full registration page with header */}
      {/* <Route path="/register" element={<FormularioRegistro />} /> */}
    </Routes>
  );
};

export default AppRoutes;
