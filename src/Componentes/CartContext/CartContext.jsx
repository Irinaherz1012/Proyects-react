import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  
  const agregarAlCarrito = (plato) => {
    setCarrito((carritoAnterior) => {
      const existe = carritoAnterior.find((item) => item.id === plato.id);
      if (existe) {
        return carritoAnterior.map((item) =>
          item.id === plato.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...carritoAnterior, { ...plato, cantidad: 1 }];
    });
  };


  const actualizarCantidad = (id, cambio) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(item.cantidad + cambio, 1) }
          : item
      )
    );
  };

  
  const eliminarDelCarrito = (id) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.filter((item) => item.id !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
