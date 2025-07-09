import React, { useState } from 'react';
import { useCart } from '../hooks/cartContext';
import { useAuth } from '../../auth/hooks/useAuth';
import './Carrito.css';

function Carrito({ setActiveSection }) {
  const { carrito, eliminarDelCarrito, incrementarCantidad, decrementarCantidad } = useCart();
  const { logout } = useAuth();

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);

  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);

  const confirmarCompra = () => {
    setMostrarExito(true);
    setMostrarConfirmacion(false);
  };

  const cerrarExito = () => {
    setMostrarExito(false);
  };

  const handleLogout = () => {
    logout();
    setActiveSection('productos');
    window.scrollTo(0, 0);
  };

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .485.379L2.89 5H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 14H4a.5.5 0 0 1-.491-.408L1.01 2H.5a.5.5 0 0 1-.5-.5zM3.14 6l1.25 6h7.22l1.25-6H3.14z"/>
            <path d="M5.5 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
          </svg> Carrito
        </h2>
        <button className="carrito-close-button" onClick={handleLogout}>
          Cerrar
        </button>
      </div>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <nav className="carrito-nav">
            <p className="carrito-stats">
              Productos seleccionados: {carrito.length}
            </p>
            <p className="carrito-stats">
              Cantidad total: {carrito.reduce((acc, producto) => acc + (producto.cantidad || 1), 0)}
            </p>

            <ul className="carrito-products-list">
              {carrito.map((producto, index) => (
                <li key={index} className="carrito-product-item">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="carrito-product-image"
                  />
                  <div className="carrito-product-info">
                    <div className="carrito-product-name">
                      <strong>{producto.nombre}</strong> - ${producto.precio.toLocaleString()}
                    </div>
                    <div className="carrito-quantity-controls">
                      <button
                        onClick={() => decrementarCantidad(index)}
                        className="carrito-quantity-button"
                      >
                        -
                      </button>
                      <span>{producto.cantidad || 1}</span>
                      <button
                        onClick={() => incrementarCantidad(index)}
                        className="carrito-quantity-button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => eliminarDelCarrito(index)}
                    className="carrito-remove-button"
                    aria-label={`Eliminar ${producto.nombre} del carrito`}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="carrito-total">Total: ${total.toLocaleString()}</h3>

            {!mostrarConfirmacion && (
              <button
                onClick={() => setMostrarConfirmacion(true)}
                className="carrito-buy-button"
              >
                Comprar
              </button>
            )}

            {mostrarConfirmacion && (
              <div className="carrito-confirmation">
                <p>¿Estás seguro de confirmar su compra?</p>
                <button
                  onClick={confirmarCompra}
                  className="carrito-confirm-button"
                >
                  Confirmar compra
                </button>
                <button
                  onClick={() => setMostrarConfirmacion(false)}
                  className="carrito-cancel-button"
                >
                  Cancelar
                </button>
              </div>
            )}
          </nav>
        </>
      )}

      {/* Modal de éxito */}
      {mostrarExito && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3 style={{ marginBottom: '15px' }}>✅ ¡ Compra  exitosa!</h3>
            <button
              onClick={cerrarExito}
              style={{
                padding: '8px 16px',
                backgroundColor: '#27ae60',
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000
  },
  modal: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#333',
    boxShadow: '0 0 15px rgba(0,0,0,0.5)'
  }
};

export default Carrito;
