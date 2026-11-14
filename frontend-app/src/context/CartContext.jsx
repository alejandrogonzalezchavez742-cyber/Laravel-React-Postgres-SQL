import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

  const agregarAlCarrito = (producto) => {
    setCart((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        if (existe.cantidad >= producto.stock) {
          alert('No hay más stock disponible de este producto.');
          return prev;
        }
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ cart, agregarAlCarrito, quitarDelCarrito, vaciarCarrito, totalItems, totalPrecio }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
