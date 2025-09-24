import { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = () => {
  // Estado para guardar los platos
  const [platos, setPlatos] = useState([]);
  const [error, setError] = useState(null);
  const [orden, setOrden] = useState('relevante');

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const response = await fetch(
          'https://free-food-menus-api-two.vercel.app/best-foods' 
        );
        if (!response.ok) {
          throw new Error('Error al obtener los platos');
        }
        const data = await response.json();
        console.log('Datos de Platos recibidos:', data); // Para ver en consola
        setPlatos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPlatos();
  }, []);

  const handleoOrdenchange = (e) => {
    setOrden(e.target.value)
  }

  const platosOrdenados = [...platos].sort((a,b) => {
    if (orden === 'Precio: Menor a mayor'){
      return a.price - b.price
    } if (orden === 'Precio: Mayor a menor') {
      return b.price - a.price
    }
    return 0;
  });

  return (
    <section className="main-content">
      <aside className="filters">
        <h2>Filtros</h2>
        <div className="filter-category">
          <h3>Categorías</h3>
          <label>
            <input type="checkbox" />
            <span>Opción 1</span>
          </label>
          <label>
            <input type="checkbox" />
            <span>Opción 2</span>
          </label>
          <label>
            <input type="checkbox" />
            <span>Opción 3</span>
          </label>
        </div>
      </aside>

      <main className="collections">
        <div className="options">
          <h2>TODOS LOS PLATOS</h2>
          <div className="sort-options">
            <label>
              Ordenar por:
              <select on onChange={handleoOrdenchange} value={orden}>
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
          ) : (
            platosOrdenados.map((plato) => (
              <div className="product-card" key={plato.id}>
                <img
                  src={plato.img}
                  alt={plato.name}
                  className="product-image"
                />
                <h3>{plato.name}</h3>
                <p>{plato.dsc}</p>
                <p>Precio: ${plato.price}</p>
                <p>Ubicación: {plato.country}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </section>
  );
};

export default ProductList;
