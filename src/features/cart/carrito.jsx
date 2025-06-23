import React, { useState } from 'react';

function Carrito({ carrito, eliminarDelCarrito }) {
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
      <h2>🛒 Carrito</h2>

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
                borderRadius: '8px'
              }}>
                <strong>{producto.nombre}</strong> - ${producto.precio.toLocaleString()}
                <button
                  onClick={() => eliminarDelCarrito(index)}
                  style={{
                    marginLeft: '10px',
                    padding: '4px 8px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
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