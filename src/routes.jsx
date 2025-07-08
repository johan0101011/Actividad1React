import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './features/landing/pages/Home';
import InformacionProductos from './features/landing/pages/InformacionProductos';
import AuthForm from './features/auth/components/AuthForm';
import Dashboard from './features/auth/components/Dashboard';
import Pinturas from './features/landing/pages/Pinturas';
import Carrito from './features/cart/components/Carrito';
import PrivateRoute from './features/auth/components/PrivateRoute';

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
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/pinturas" element={<Pinturas />} />
      <Route path="/PINTURAS" element={<Navigate to="/pinturas" replace />} />
      <Route path="/productos" element={<InformacionProductos />} />
      <Route path="/carrito" element={<Carrito />} />
      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
      {/* Removed /register route to avoid showing full registration page with header */} 
    </Routes>
  );
};

export default AppRoutes;
