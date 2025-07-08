
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
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  const createProduct = async (product) => {
    const res = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Error creando producto');
    const newProduct = await res.json();
    setProductos((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (product) => {
    const res = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Error actualizando producto');
    const updatedProduct = await res.json();
    setProductos((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    return updatedProduct;
  };

  const deleteProduct = async (id) => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error eliminando producto');
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        productos,
        loading,
        error,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
