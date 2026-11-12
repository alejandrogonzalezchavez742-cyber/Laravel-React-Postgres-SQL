import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamada pública sin necesidad de token JWT
    axios.get('http://127.0.0')
      .then((res) => setProductos(res.data))
      .catch((err) => console.error('Error al cargar el catálogo:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', color: '#fff' }}>
      <Header />

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '100px 2rem 3rem' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '0.5rem' }}>Nuestros Productos</h1>
        <p style={{ color: '#929bb1', marginBottom: '2rem' }}>
          Explora los artículos disponibles en nuestra tienda.
        </p>

        {loading ? (
          <p style={{ color: '#929bb1' }}>Cargando catálogo...</p>
        ) : productos.length === 0 ? (
          <p style={{ color: '#929bb1' }}>No hay productos disponibles por el momento.</p>
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
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{
                    fontSize: '12px',
                    color: '#9387ff',
                    background: 'rgba(147, 135, 255, 0.15)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '6px'
                  }}>
                    {prod.categoria || 'General'}
                  </span>
                  <h3 style={{ margin: '0.8rem 0 0.4rem', fontSize: '18px' }}>{prod.nombre}</h3>
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
                    {prod.stock > 0 ? `Disponibles: ${prod.stock}` : 'Agotado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Catalogo;
