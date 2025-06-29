import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Panel de Control</h1>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <div className="dashboard-content">
        <h3>Información del Usuario</h3>
        {user ? (
          <div className="user-info">
            <div className="user-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={`${user.name}'s avatar`} />
              ) : (
                <img
                  src="https://via.placeholder.com/70?text=User"
                  alt="Avatar por defecto"
                />
              )}
            </div>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Rol:</strong> {user.role}</p>
          </div>
        ) : (
          <p>No hay información del usuario disponible.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
