import { useContext } from 'react';
import { ProductContext } from '../../../shared/contexts/ProductContext';
import Products from '../../../assets/components/Products';
import { useCart } from '../../cart/hooks/cartContext';

const InformacionProductos = () => {
  const { productos, loading, error } = useContext(ProductContext);
  const { agregarProductoAlCarrito } = useCart();

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div className="app-content">
      <h2 className="titulo-principal">Productos a la Venta</h2>
      <div className="gallery">
        {productos.map((p) => (
          <Products key={p.id} producto={p} agregarProductoAlCarrito={agregarProductoAlCarrito} />
        ))}
      </div>
    </div>
  );
};

export default InformacionProductos;
