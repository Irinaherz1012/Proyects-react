import React from "react";
import "./Cart.css";
import { useCart } from "../CartContext/CartContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Cart = () => {
  const { carrito, actualizarCantidad, eliminarDelCarrito } = useCart();
  const handleAumentarCantidad = (platoId) => {
    actualizarCantidad(platoId, 1);
  }
  const handleDisminuirCantidad = (platoId) => {
    const plato = carrito.find((item) => item.id === platoId);
    if (plato.cantidad > 1) {
      actualizarCantidad(platoId, -1);
    } else { 
    eliminarDelCarrito(platoId);
   }
 };

 
  const totalCarrito = carrito.reduce(
    (total, plato) => total + plato.price * plato.cantidad,
    0
  );
  const finalizarCompra = () => {
  const pedido = {
    fecha: new Date().toLocaleString(),
    items: carrito,
    total: carrito.reduce((acc, p) => acc + p.price * p.cantidad, 0),
  };

  const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidosGuardados.push(pedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidosGuardados));

  alert("Compra guardada ");
};



  return (
    <div className="cart-container">
      <h2>
        TU <span>CARRITO</span>
      </h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <div className="cart-header">
            <p>Plato</p>
            <p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Acción</p>
          </div>
          <ul className="cart-items">
            {carrito.map((plato) => (
              <li className="cart-item" key={plato.id}>
                <div className="plato-info">
                  <img
                    src={plato.img || "https://via.placeholder.com/150"}
                    alt=""
                    className="plato-img"
                  />
                  <span>{plato.name}</span>
                </div>
                <p>${plato.price.toFixed(2)}</p>

                <div className="quantity-controls">
                  <button className="quantity-btn"
                  onClick={()=> handleDisminuirCantidad(plato.id)}
                  >
                      -
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    readOnly
                    value={plato.cantidad}
                  />
                  <button className="quantity-btn"
                  onClick={()=> handleAumentarCantidad(plato.id)} 
                  >
                    
                    +
                    
                  </button>
                </div>
                <p>0</p>
                <p>${(plato.price * plato.cantidad).toFixed(2)}</p>
                <button className="delete-btn"
                onClick={() => eliminarDelCarrito (plato.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total del carrito: ${totalCarrito.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={finalizarCompra}>Finalizar compra</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
