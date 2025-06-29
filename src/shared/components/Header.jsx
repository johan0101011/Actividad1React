import React from 'react';
import { useCart } from '../../features/cart/hooks/cartContext';

function Header({ activeSection, setActiveSection }) {
  const { itemCount } = useCart();

  return (
    <header id="cabecera" style={{ position: 'relative' }}>
      <div id="logo">
        <img src="/img/ARTLINE.png" alt="logo" width="110px" />
      </div>
      <h1>ARTLINE</h1>
      <nav id="menu">
        <ul style={{ fontSize: '16px' }}>
          <li>
            <button
              className={activeSection === 'pinturas' ? 'active' : ''}
              onClick={() => setActiveSection('pinturas')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: 'inherit' }}
            >
              PINTURAS
            </button>
          </li>
          <li>
            <button
              className={activeSection === 'productos' ? 'active' : ''}
              onClick={() => setActiveSection('productos')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: 'inherit' }}
            >
              PRODUCTOS
            </button>
          </li>
          <li>
            <button
              className={activeSection === 'registro' ? 'active' : ''}
              onClick={() => setActiveSection('registro')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: 'inherit' }}
              title="Ir a registro"
            >
              REGISTRO
            </button>
          </li>
          {/* <li><a href="#">AUTORES</a></li>
          <li><a href="#">BIOGRAFÍAS</a></li> */}
        </ul>
      </nav>

      <div
        style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', fontSize: '24px' }}
        onClick={() => setActiveSection('carrito')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-cart"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .485.379L2.89 5H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 14H4a.5.5 0 0 1-.491-.408L1.01 2H.5a.5.5 0 0 1-.5-.5zM3.14 6l1.25 6h7.22l1.25-6H3.14z" />
          <path d="M5.5 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
        {itemCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            {itemCount}
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
