import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function Index() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL completa apuntando a tu ruta pública de Laravel
    axios.get('http://localhost:8000/api/productos')
      .then((res) => setProductos(res.data))
      .catch((err) => console.error('Error al cargar el catálogo:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', color: '#ffffff' }}>
      {/* Barra de navegación pública */}
      <Header />

      {/* Sección de bienvenida */}
      <section style={{ textAlign: 'center', padding: '110px 2rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '0.8rem', color: '#ffffff' }}>
          Bienvenido a Nuestra Tienda
        </h1>
        <p style={{ color: '#929bb1', fontSize: '16px', lineHeight: '1.5' }}>
          Explora nuestro catálogo actualizado. Inicia sesión para gestionar tu cuenta o realizar pedidos.
        </p>
      </section>

      {/* Catálogo público de productos */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '1.5rem', borderBottom: '1px solid #2a2f3d', paddingBottom: '0.5rem' }}>
          Productos Disponibles
        </h2>

        {loading ? (
          <p style={{ color: '#929bb1' }}>Cargando productos...</p>
        ) : productos.length === 0 ? (
          <div style={{ background: '#161922', padding: '2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #2a2f3d' }}>
            <p style={{ color: '#929bb1', margin: 0 }}>Aún no hay productos publicados en el catálogo.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {productos.map((prod) => (
              <div
                key={prod.id}
                style={{
                  background: '#161922',
                  border: '1px solid #2a2f3d',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {/* Imagen del producto desde Cloudinary */}
                {prod.imagen_url ? (
                  <img
                    src={prod.imagen_url}
                    alt={prod.nombre}
                    style={{ width: '100%', height: '190px', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '190px', background: '#1e222d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#929bb1', fontSize: '14px' }}>
                    Sin imagen disponible
                  </div>
                )}

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{
                      fontSize: '12px',
                      color: '#9387ff',
                      background: 'rgba(147, 135, 255, 0.15)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                      fontWeight: '600'
                    }}>
                      {prod.categoria || 'General'}
                    </span>
                    <h3 style={{ margin: '0.9rem 0 0.4rem', fontSize: '18px' }}>{prod.nombre}</h3>
                    <p style={{ color: '#929bb1', fontSize: '14px', lineHeight: '1.4' }}>
                      {prod.descripcion || 'Sin descripción disponible.'}
                    </p>
                  </div>

                  <div style={{
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #2a2f3d',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>
                      ${Number(prod.precio).toFixed(2)}
                    </span>
                    <span style={{ fontSize: '12px', color: prod.stock > 0 ? '#4ade80' : '#ff6b6b' }}>
                      {prod.stock > 0 ? `Stock: ${prod.stock}` : 'Agotado'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Index;
