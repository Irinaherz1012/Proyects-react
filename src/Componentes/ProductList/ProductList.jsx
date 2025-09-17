import { useEffect, useState } from 'react';
import './ProductList.css';

const ProductList = () => {
  const ProductList = () => {
    const [productos, setProductos ] = useState([]);
    const [error, setError] = useState(null)
    
    useEffect(() => {
      const fecthProductos = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          if (!response.ok) {
            throw new Error('Error al obtener los productos');
          }
          const data = await response.json();
          setProductos(data)
        } catch (err) {
             setError(err.message)
        }

     }
     fecthProductos();
    }, []);

  }
  return (
    <section className="main-content">
      <aside className="filters">
        <h2>Filtros</h2>
        <div className="filter-category">
          <h3>Categorías</h3>
          <label>
            <input type="checkbos"/>
            <span>Hombres</span>
          </label>
          <label>
            <input type="checkbos"/>
            <span>mujeres</span>
          </label>
          <label>
            <input type="checkbos"/>
            <span>niños</span>
          </label>
        </div>

        <div className="filter-category">
          <h3>Categorías</h3>
          <label>
            <input type="checkbos"/>
            <span>Hombres</span>
          </label>
          <label>
            <input type="checkbos"/>
            <span>mujeres</span>
          </label>
          <label>
            <input type="checkbos"/>
            <span>niños</span>
          </label>
        </div>

        <div className="filter-category">
          <h3>tipo de producto</h3>
          <label>
            <input type="checkbos"/>
            <span>Hombres</span>
          </label>
          <label>
            <input type="checkbos"/>
            <span>mujeres</span>
          </label>
          <label>
            <input type="checkbos"/>
            <span>niños</span>
          </label>
        </div>
      </aside> 
      <main className="collections">
        <div className="options">
          <h2>TODAS LAS COLECCIONES</h2>
          <div className="sort-options">
            <label>
              Ordenar por:
              <select>
                <option>Relevante</option>
                <option>Precio: Menor a mayor</option>
                <option>Precio: Mayor a menor</option>
              </select>
            </label>
          </div>
        </div>

        <div className="products">
          {error ? (
            <p className="error-message">{error}</p>
          ):(
            productos.map((producto) => (
              <div className="product-card" key= {producto.id}>
                <img src={producto.image} 
                 alt={producto.image}
                 className="product-image"/>

                 <h3>{producto.nombre}</h3>
                 <p>{producto.precio}</p>
              </div>
            ))
          )}

        </div>


      </main>

      </section>
  )
}

export default ProductList