import React from 'react';
import PaintingCard from '../../../assets/components/PaintingCard';
import FormularioRegistro from '../../formularios/FormularioRegistro';
import { ProductProvider } from '../../../shared/contexts/ProductContext';
import InformacionProductos from './InformacionProductos';
import Carrito from '../../cart/components/Carrito';
import LoginForm from '../../auth/components/LoginForm';

const paintings = [
  { id: '01', title: 'La Monna Lisa', author: 'Leonardo da Vinci', year: 1503, image: '/img/monalisa.jpg' },
  { id: '02', title: 'La Joven De La Perla', author: 'Johannes Vermeer', year: 1665, image: '/img/parel.jpg' },
  { id: '03', title: 'Saturno Devora a Su Hijo', author: 'Francisco de Goya', year: 1819, image: '/img/satruno.jpg' },
  { id: '04', title: 'La noche estrellada', author: 'Vincent van Gogh', year: 1889, image: '/img/estrelladas.jpg' },
  { id: '05', title: 'Las Meninas', author: 'Diego Velázquez', year: 1656, image: '/img/las-meninas.jpg' },
  { id: '06', title: 'El Columpio', author: 'Jean-Honoré Fragonard', year: 1767, image: '/img/columpio.jpg' },
  { id: '07', title: 'El hijo del hombre', author: 'René Magritte', year: 1964, image: '/img/hijo.jpg' },
  { id: '08', title: 'American Gothic', author: 'Grant Wood', year: 1930, image: '/img/american-gothic.jpg' },
  { id: '10', title: 'El Grito', author: 'Edvard Munch', year: 1893, image: '/img/el-grito.jpg' },
  { id: '11', title: 'Impresión, sol naciente', author: 'Claude Monet', year: 1872, image: '/img/impresion-sol-naciente.jpg' },
  { id: '12', title: 'A Bar at the Folies-Bergère', author: 'Édouard Manet', year: 1882, image: '/img/bar-folies-bergere.jpg' },
  { id: '13', title: 'La Novia Renuente', author: 'Jean-Pierre Alexandre Antigna', year: 1866, image: '/img/la-novia-renuente.jpg' },
];

function Home({ activeSection, setActiveSection }) {
  return (
    <section className="galeria-obras">
      {activeSection === 'pinturas' && (
        <>
          <h1 className="titulo-principal">ARTE A TRAVÉS DE LA HISTORIA</h1>
          <div className="gallery">
            {paintings.map((p) => (
              <PaintingCard
                key={p.id}
                id={p.id}
                title={p.title}
                image={p.image}
                author={p.author}
                year={p.year}
              />
            ))}
          </div>
        </>
      )}

      {activeSection === 'productos' && (
        <>
          
          <ProductProvider>
            <InformacionProductos />
          </ProductProvider>
        </>
      )}

      {activeSection === 'carrito' && (
        <Carrito setActiveSection={setActiveSection} />
      )}

      {activeSection === 'registro' && (
        <>
          <FormularioRegistro />
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={() => setActiveSection('login')}
              style={{
                backgroundColor: '#d32f2f',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Iniciar Sesión
            </button>
          </div>
        </>
      )}

      {activeSection === 'login' && (
        <LoginForm />
      )}
    </section>
  );
}

export default Home;
