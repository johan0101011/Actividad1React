import React from 'react';
import { useCart } from '../../features/cart/hooks/cartContext';
import { useNavigate } from 'react-router-dom';

function Header({ activeSection, setActiveSection }) {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    if (section === 'registro') {
      navigate('/login'); // Navigate to login page where registration is handled
    } else if (section === 'pinturas') {
      setActiveSection('pinturas');
      navigate('/'); // Navigate to home page
    } else if (section === 'productos') {
      setActiveSection('productos');
      navigate('/'); // Navigate to home page to show products section
    }
  };

  return (
    <header id="cabecera" style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '10px 20px', backgroundColor: '#222', color: '#eee' }}>
      <div id="logo" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => { setActiveSection('pinturas'); navigate('/'); }}>
        <img src="/img/ARTLINE.png" alt="logo" width="40px" style={{ marginRight: '10px' }} />
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>ARTLINE</h1>
      </div>
      <nav id="menu" style={{ marginLeft: 'auto' }}>
        <ul style={{ fontSize: '16px', display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
          <li style={{ margin: '0 10px' }}>
            <button
              className={activeSection === 'pinturas' ? 'active' : ''}
              onClick={() => handleSectionClick('pinturas')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: 'inherit' }}
            >
              PINTURAS
            </button>
          </li>
          <li style={{ margin: '0 10px' }}>
            <button
              className={activeSection === 'productos' ? 'active' : ''}
              onClick={() => handleSectionClick('productos')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: 'inherit' }}
            >
              PRODUCTOS
            </button>
          </li>
          <li style={{ margin: '0 10px' }}>
            <button
              className={activeSection === 'registro' ? 'active' : ''}
              onClick={() => handleSectionClick('registro')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: 'inherit' }}
              title="Ir a registro"
            >
              REGISTRO
            </button>
          </li>
        </ul>
      </nav>

      <div
        style={{ position: 'relative', cursor: 'pointer', fontSize: '24px', marginLeft: '20px' }}
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
