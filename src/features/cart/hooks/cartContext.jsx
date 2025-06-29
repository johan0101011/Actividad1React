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
        precio: producto.price * cantidad,
        imagen: producto.image // Added image property
      });
    }
    setCarrito(newCart);
  };

  const eliminarDelCarrito = (index) => {
    const newCart = [...carrito];
    newCart.splice(index, 1);
    setCarrito(newCart);
  };

  // New function to incrementar cantidad
  const incrementarCantidad = (index) => {
    const newCart = [...carrito];
    newCart[index].cantidad += 1;
    // Update price accordingly (assuming precio is total price for that product)
    const unitPrice = newCart[index].precio / (newCart[index].cantidad - 1);
    newCart[index].precio = unitPrice * newCart[index].cantidad;
    setCarrito(newCart);
  };

  // New function to decrementar cantidad
  const decrementarCantidad = (index) => {
    const newCart = [...carrito];
    if (newCart[index].cantidad > 1) {
      newCart[index].cantidad -= 1;
      const unitPrice = newCart[index].precio / (newCart[index].cantidad + 1);
      newCart[index].precio = unitPrice * newCart[index].cantidad;
      setCarrito(newCart);
    } else {
      // If quantity is 1, remove the product from cart
      newCart.splice(index, 1);
      setCarrito(newCart);
    }
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
      incrementarCantidad,
      decrementarCantidad,
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
