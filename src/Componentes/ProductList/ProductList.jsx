import { useState, useEffect } from 'react';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [platos, setPlatos] = useState([]);
  const [error, setError] = useState(null);
  const [orden, setOrden] = useState('Relevante');
  const [filtros, setFiltros] = useState({ country: [], rate: [] });
  const [paises, setPaises] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const response = await fetch('https://free-food-menus-api-two.vercel.app/best-foods');
        if (!response.ok) throw new Error('Error al obtener los platos');
        const data = await response.json();
        setPlatos(data);

        
        const paisesUnicos = [...new Set(data.map(plato => plato.country).filter(Boolean))];
        setPaises(paisesUnicos);

      } catch (err) {
        setError(err.message);
      }
    };
    fetchPlatos();
  }, []);

  const toggleFiltros = (tipoFiltro, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [tipoFiltro]: prev[tipoFiltro].includes(valor)
        ? prev[tipoFiltro].filter((item) => item !== valor)
        : [...prev[tipoFiltro], valor],
    }));
  };

  const handleOrdenChange = (e) => setOrden(e.target.value);

  const platosFiltrados = platos.filter((plato) => {
    const matchCountry =
      filtros.country.length === 0 || filtros.country.includes(plato.country);
    const matchRate =
      filtros.rate.length === 0 || filtros.rate.includes(String(plato.rate));
    return matchCountry && matchRate;
  });

  const platosOrdenados = [...platosFiltrados].sort((a, b) => {
    if (orden === 'Precio: Menor a mayor') return a.price - b.price;
    if (orden === 'Precio: Mayor a menor') return b.price - a.price;
    return 0;
  });

  const handleImageClick = (id) => {
    navigate(`/plato/${id}`);
  }

  return (
    <section className="main-content">
      <aside className="filters">
        <h2>Filtros</h2>

        <div className="filters-country">
          <h3>País</h3>
          {paises.length > 0 ? (
            paises.map((pais) => (
              <label key={pais}>
                <input
                  type="checkbox"
                  onChange={() => toggleFiltros('country', pais)}
                  checked={filtros.country.includes(pais)}
                />
                <span>{pais}</span>
              </label>
            ))
          ) : (
            <p>Cargando países...</p>
          )}
        </div>
        <div className="filters-rate">
          <h3>Tasa</h3>
          {[5, 4, 3].map((valor) => (
            <label key={valor}>
              <input
                type="checkbox"
                onChange={() => toggleFiltros('rate', String(valor))}
                checked={filtros.rate.includes(String(valor))}
              />
              <span>{valor}</span>
            </label>
          ))}
        </div>
      </aside>

      <main className="collections">
        <div className="options">
          <h2>TODOS LOS PLATOS</h2>
          <div className="sort-options">
            <label>
              Ordenar por:
              <select onChange={handleOrdenChange} value={orden}>
                <option>Relevante</option>
                <option>Precio: Menor a mayor</option>
                <option>Precio: Mayor a menor</option>
              </select>
            </label>
          </div>
        </div>

        <div className="platos">
          {error ? (
            <p className="error-message">{error}</p>
          ) : platosFiltrados.length > 0 ? (
            platosOrdenados.map((plato) => (
              <div className="platos-card" key={plato.id}>
                <img
  src={plato.img || 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=60'}
  alt={plato.name}
  className="platos-image"
  onClick={() => handleImageClick(plato.id)}
  onError={(e) => {
    if (e.target.src.includes('unsplash.com')) return;
    e.target.src = 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=60';
  }}
/>

                <h3>{plato.name}</h3>
                <p>{plato.dsc}</p>
                <p>Precio: ${plato.price}</p>
                <p>Ubicación: {plato.country}</p>
                <p>Tasa: {plato.rate}</p>
              </div>
            ))
          ) : (
            <p className="no-results">
              No hay platos que coinciden con los filtros seleccionados
            </p>
          )}
        </div>
      </main>
    </section>
  );
};

export default ProductList;
