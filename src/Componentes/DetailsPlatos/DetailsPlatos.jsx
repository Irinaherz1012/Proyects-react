import {useParams } from "react-router-dom"
import "./DetailsPlatos.css"
import { useState, useEffect } from "react";
import { useCart } from "../CartContext/CartContext";

const DetailsPlatos = () => {
  const {id} = useParams();
  const [plato, setPlato] = useState (null);
  const [error, setError] = useState (null);
  const {agregarAlCarrito} = useCart();
  const handleAgregarAlCarrito = () => {
    

    if (plato) {
      agregarAlCarrito({
        id: plato.id,
        img: plato.img,
        name: plato.name,
        price: plato.price,
  
      })
    }
  }

useEffect(() => {
  const fetchPlatos = async () => {
    try {
      const response = await fetch('https://free-food-menus-api-two.vercel.app/best-foods');
      if (!response.ok) throw new Error('Error al cargar los detalles del plato');
      const data = await response.json();

      const platoEncontrado = data.find((p) => p.id === id);
      if (!platoEncontrado) throw new Error('Plato no encontrado');

      setPlato(platoEncontrado);
    } catch (err) {
      setError(err.message);
    }
  };

  fetchPlatos();
}, [id]);


  if (error) {
    return <h2 className="error-message">{error}</h2>;
  }
  
  return (
    <div className="platos-details">
      {
        plato ? (
        <>
        <img src={plato.img}alt={plato.name} className="img-small"/>
        <img src={plato.img} alt={plato.name} />
        <div className="platos-info">
          <h1>{plato.name}</h1>
          <p className="price">{plato.price}</p>
          <p className="description">{plato.dsc}</p>
          <div className="size-options">
          <button>Añadir a favoritos</button>
          <button>Ver similares</button>
          <button></button>
          </div>
          <button className="add-to-cart" onClick={handleAgregarAlCarrito} >Añadir al carrito</button>
        </div>
        <p className="note">
          Delicioso plato elaborado con ingredientes frescos y de la mejor calidad, preparado siguiendo una receta tradicional con un toque moderno. Su sabor equilibrado y presentación cuidada lo convierten en una excelente opción para cualquier ocasión.

          Producto 100% artesanal, preparado al momento para garantizar frescura y sabor.
          Servicio disponible para entrega inmediata o retiro en el local.

        </p>
        </>

        ) : (
        <p>Cargando detalles del plato...</p>
        )
      }


    </div>
  )
}

export default DetailsPlatos