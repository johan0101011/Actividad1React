import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './features/landing/pages/Home';
import InformacionProductos from './features/landing/pages/InformacionProductos';

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
    </Routes>
  );
};

export default AppRoutes;
