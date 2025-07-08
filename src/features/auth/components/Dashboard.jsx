import React, { useState, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import { ProductContext } from '../../../shared/contexts/ProductContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const { productos, loading, error: productError, createProduct, updateProduct, deleteProduct } = useContext(ProductContext);

  const [mode, setMode] = useState('list'); // 'list' or 'form'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setMode('form');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await deleteProduct(id);
      // Removido alert para evitar popup
      // Puedes agregar aquí una notificación UI si deseas
    } catch (err) {
      alert('Error al eliminar producto: ' + err.message);
    }
  };

  const handleSave = async (product) => {
    try {
      if (product.id) {
        await updateProduct(product);
        alert('Producto actualizado');
      } else {
        await createProduct(product);
        alert('Producto creado');
      }
      setMode('list');
      setSelectedProduct(null);
    } catch (err) {
      alert('Error al guardar producto: ' + err.message);
    }
  };

  const handleCancel = () => {
    setMode('list');
    setSelectedProduct(null);
  };

  if (isLoading || loading) {
    return (
      <div className="dashboard-container">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error || productError) {
    return (
      <div className="dashboard-container">
        <p>Error: {error || productError}</p>
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
        {mode === 'list' && (
          <>
            <button className="btn-create" onClick={() => setMode('form')} style={{ marginTop: '20px' }}>
              Crear Nuevo Producto
            </button>
            <ProductList
              onEdit={handleEdit}
              onDelete={handleDelete}
              productos={productos}
            />
          </>
        )}
        {mode === 'form' && (
          <ProductForm
            product={selectedProduct}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
