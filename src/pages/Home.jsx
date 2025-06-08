import PaintingCard from '../assets/components/PaintingCard';
import FormularioRegistro from '../formularios/FormularioRegistro';     
import { ProductProvider } from '../context/ProductContext'; 
import InformacionProductos from './InformacionProductos';            

const paintings = [
  { id: '001', title: 'La Monna Lisa', author: 'Leonardo da Vinci', year: 1503, image: '/img/monalisa.jpg' },
  { id: '002', title: 'La Joven De La Perla', author: 'Johannes Vermeer', year: 1665, image: '/img/parel.jpg' },
  { id: '003', title: 'Saturno Devora a Su Hijo', author: 'Francisco de Goya', year: 1819, image: '/img/satruno.jpg' },
  { id: '004', title: 'La noche estrellada', author: 'Vincent van Gogh', year: 1889, image: '/img/estrelladas.jpg' },
  { id: '005', title: 'Las Meninas', author: 'Diego Velázquez', year: 1656, image: '/img/las-meninas.jpg' },
  { id: '006', title: 'El Columpio', author: 'Jean-Honoré Fragonard', year: 1767, image: '/img/columpio.jpg' },
  { id: '007', title: 'El hijo del hombre', author: 'René Magritte', year: 1964, image: '/img/hijo.jpg' }
];

function Home() {
  return (
    <section className="galeria-obras">
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

      {/* Sección de productos desde la API */}
      <h2 className="titulo-principal">Productos a la Venta</h2>
      <ProductProvider>
        <InformacionProductos />
      </ProductProvider>

      {/* Formulario de registro */}
      <FormularioRegistro />
    </section>
  );
}

export default Home;

