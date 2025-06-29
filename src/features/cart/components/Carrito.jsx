import React, { useState } from 'react';
import { useCart } from '../hooks/cartContext';

function Carrito() {
  const { carrito, eliminarDelCarrito, incrementarCantidad, decrementarCantidad } = useCart();
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

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .485.379L2.89 5H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 14H4a.5.5 0 0 1-.491-.408L1.01 2H.5a.5.5 0 0 1-.5-.5zM3.14 6l1.25 6h7.22l1.25-6H3.14z"/>
          <path d="M5.5 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
        </svg> Carrito</h2>

      <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', fontSize: '24px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .485.379L2.89 5H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 14H4a.5.5 0 0 1-.491-.408L1.01 2H.5a.5.5 0 0 1-.5-.5zM3.14 6l1.25 6h7.22l1.25-6H3.14z"/>
          <path d="M5.5 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
        </svg>
      </div>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <>
            <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              Productos seleccionados: {carrito.length}
            </p>
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
              Cantidad total: {carrito.reduce((acc, producto) => acc + (producto.cantidad || 1), 0)}
            </p>
          </>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {carrito.map((producto, index) => (
              <li key={index} style={{
                backgroundColor: '#222',
                marginBottom: '10px',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                />
                <div style={{ flex: 1 }}>
                  <strong>{producto.nombre}</strong> - ${producto.precio.toLocaleString()}
                  <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <button
                      onClick={() => decrementarCantidad(index)}
                      style={{
                        backgroundColor: '#000000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      -
                    </button>
                    <span>{producto.cantidad || 1}</span>
                    <button
                      onClick={() => incrementarCantidad(index)}
                      style={{
                        backgroundColor: '#000000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(index)}
                  style={{
                    marginLeft: '10px',
                    padding: '4px 8px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    height: '30px',
                    alignSelf: 'flex-start'
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <h3>Total: ${total.toLocaleString()}</h3>

          {!mostrarConfirmacion && (
            <button
              onClick={() => setMostrarConfirmacion(true)}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#27ae60',
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Comprar
            </button>
          )}

          {mostrarConfirmacion && (
            <div style={{ marginTop: '15px' }}>
              <p>¿Estás seguro de confirmar su compra?</p>
              <button
                onClick={confirmarCompra}
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'green',
                  color: 'white',
                  marginRight: '10px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Confirmar compra
              </button>
              <button
                onClick={() => setMostrarConfirmacion(false)}
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'gray',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          )}
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
