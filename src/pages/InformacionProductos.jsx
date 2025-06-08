import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import Products from '../assets/components/Products';

const InformacionProductos = () => {
  const { productos, loading, error } = useContext(ProductContext);

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div className="gallery">
      {productos.map((p) => (
        <Products key={p.id} producto={p} />
      ))}
    </div>
  );
};

export default InformacionProductos;
