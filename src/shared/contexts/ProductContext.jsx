import { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Error al obtener productos');
        const data = await res.json();
        setProductos(data.slice(5, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  return (
    <ProductContext.Provider value={{ productos, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};
