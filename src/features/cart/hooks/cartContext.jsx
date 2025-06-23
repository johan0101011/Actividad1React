import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const agregarProductoAlCarrito = (producto, cantidad) => {
    const existingIndex = carrito.findIndex(item => item.nombre === producto.title);
    let newCart = [...carrito];
    if (existingIndex >= 0) {
      newCart[existingIndex].cantidad += cantidad;
      newCart[existingIndex].precio += producto.price * cantidad;
    } else {
      newCart.push({
        nombre: producto.title,
        cantidad: cantidad,
        precio: producto.price * cantidad
      });
    }
    setCarrito(newCart);
  };

  const eliminarDelCarrito = (index) => {
    const newCart = [...carrito];
    newCart.splice(index, 1);
    setCarrito(newCart);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const itemCount = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  return (
    <CartContext.Provider value={{
      carrito,
      agregarProductoAlCarrito,
      eliminarDelCarrito,
      isCartOpen,
      toggleCart,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
