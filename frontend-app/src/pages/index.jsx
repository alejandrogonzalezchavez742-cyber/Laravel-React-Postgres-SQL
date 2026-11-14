import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import '../styles/index/Fondo_buscador.css';
import '../styles/index/MenuLateralCategorias.css';
import '../styles/index/TarjetaProducto.css';

function Index() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useCart();
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [agregadoId, setAgregadoId] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const categorias = ['Todas', ...new Set(productos.map((p) => p.categoria || 'General'))];

  const productosFiltrados = productos.filter((prod) => {
    const coincideTexto =
      prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (prod.descripcion && prod.descripcion.toLowerCase().includes(busqueda.toLowerCase()));
    const coincideCat =
      categoriaActiva === 'Todas' || (prod.categoria || 'General') === categoriaActiva;
    return coincideTexto && coincideCat;
  });

  const handleAgregar = (prod) => {
    agregarAlCarrito(prod);
    setAgregadoId(prod.id);
    setTimeout(() => setAgregadoId(null), 900);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/productos')
      .then((res) => setProductos(res.data))
      .catch((err) => console.error('Error al cargar el catálogo:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="store-page">
      <Header />

      <div className="top-controls-bar">
        <section className="categorias">
          {!loading && productos.length > 0 && (
            <button
              onClick={() => setMenuAbierto(true)}
              className="btn-open-drawer"
            >
              ☰ Categorías <span className="active-cat-pill">{categoriaActiva}</span>
            </button>
          )}
        </section>

        <section className="store-hero">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar producto por nombre o descripción..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </section>
      </div>


      <main className="store-main">
        {/* Botón en la orilla izquierda para abrir el menú desplegable */}

        {/* Fondo oscuro al desplegar el menú */}
        {menuAbierto && (
          <div
            className="drawer-overlay"
            onClick={() => setMenuAbierto(false)}
          />
        )}

        {/* Menú lateral desplegable de categorías */}
        <aside className={`category-drawer ${menuAbierto ? 'open' : ''}`}>
          <div className="drawer-header">
            <h3>Categorías</h3>
            <button
              onClick={() => setMenuAbierto(false)}
              className="btn-close-drawer"
            >
              ✕
            </button>
          </div>

          <div className="drawer-list">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategoriaActiva(cat);
                  setMenuAbierto(false);
                }}
                className={`drawer-item ${categoriaActiva === cat ? 'active' : ''}`}
              >
                <span>{cat}</span>
                {categoriaActiva === cat && <span>✓</span>}
              </button>
            ))}
          </div>
        </aside>

        {/* Listado de productos */}
        {loading ? (
          <p className="loading-text">Cargando catálogo...</p>
        ) : productosFiltrados.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="products-grid">
            {productosFiltrados.map((prod) => (
              <article key={prod.id} className="product-card">
                <div className="product-image-box">
                  {prod.imagen_url ? (
                    <img src={prod.imagen_url} alt={prod.nombre} className="product-img" />
                  ) : (
                    <div className="product-no-img">Sin imagen</div>
                  )}

                  <span className="product-category-tag">
                    {prod.categoria || 'General'}
                  </span>
                </div>

                <div className="product-body">
                  <div>
                    <h3 className="product-title">{prod.nombre}</h3>
                    <p className="product-desc">
                      {prod.descripcion || 'Artículo disponible en tienda.'}
                    </p>
                  </div>

                  <div className="product-footer">
                    <div className="product-meta">
                      <div>
                        <span className="price-label">Precio</span>
                        <span className="price-value">${Number(prod.precio).toFixed(2)}</span>
                      </div>

                      <span className={`stock-badge ${prod.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                        {prod.stock > 0 ? `${prod.stock} disponibles` : 'Agotado'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAgregar(prod)}
                      disabled={prod.stock <= 0}
                      className={`btn-cart ${agregadoId === prod.id ? 'added' : ''}`}
                    >
                      {agregadoId === prod.id
                        ? '✓ ¡Agregado!'
                        : prod.stock > 0
                          ? '+ Agregar al carrito'
                          : 'Sin stock'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Index;
