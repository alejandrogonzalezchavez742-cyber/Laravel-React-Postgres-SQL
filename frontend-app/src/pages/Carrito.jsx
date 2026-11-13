import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';

function Carrito() {
  const { cart, agregarAlCarrito, quitarDelCarrito, vaciarCarrito, totalPrecio } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleFinalizarCompra = () => {
    if (!token) {
      alert('Debes iniciar sesión para completar tu compra.');
      navigate('/login');
      return;
    }

    alert('¡Pedido confirmado con éxito!');
    vaciarCarrito();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', color: '#ffffff' }}>
      <Header />

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '110px 2rem 3rem' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '0.5rem' }}>Tu Carrito de Compras</h1>
        <p style={{ color: '#929bb1', marginBottom: '2rem' }}>
          Revisa los productos seleccionados antes de confirmar tu pedido.
        </p>

        {cart.length === 0 ? (
          <div style={{ background: '#161922', padding: '3rem 2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #2a2f3d' }}>
            <p style={{ color: '#929bb1', fontSize: '16px', marginBottom: '1.5rem' }}>
              Tu carrito está vacío por el momento.
            </p>
            <Link
              to="/"
              style={{ background: '#9387ff', color: '#000', padding: '0.7rem 1.4rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Lista de productos agregados */}
            <div style={{ background: '#161922', borderRadius: '12px', border: '1px solid #2a2f3d', overflow: 'hidden' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.2rem 1.5rem',
                    borderBottom: '1px solid #2a2f3d',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                    {item.imagen_url ? (
                      <img
                        src={item.imagen_url}
                        alt={item.nombre}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    ) : (
                      <div style={{ width: '60px', height: '60px', background: '#1e222d', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#929bb1' }}>
                        Sin foto
                      </div>
                    )}
                    <div>
                      <h3 style={{ margin: '0 0 0.3rem', fontSize: '16px' }}>{item.nombre}</h3>
                      <span style={{ color: '#38bdf8', fontWeight: '600' }}>
                        ${Number(item.precio).toFixed(2)} c/u
                      </span>
                    </div>
                  </div>

                  {/* Controles de cantidad y botón de quitar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ background: '#1e222d', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '14px' }}>
                      Cant: <strong>{item.cantidad}</strong>
                    </span>

                    <button
                      onClick={() => agregarAlCarrito(item)}
                      style={{ background: '#2a2f3d', color: '#fff', border: 'none', width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      +
                    </button>

                    <span style={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'right' }}>
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </span>

                    <button
                      onClick={() => quitarDelCarrito(item.id)}
                      style={{ background: 'rgba(255, 80, 80, 0.15)', color: '#ff6b6b', border: '1px solid rgba(255, 80, 80, 0.3)', padding: '0.4rem 0.7rem', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Caja de resumen y total */}
            <div style={{ background: '#161922', padding: '1.5rem', borderRadius: '12px', border: '1px solid #2a2f3d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                onClick={vaciarCarrito}
                style={{ background: 'transparent', color: '#929bb1', border: '1px solid #2a2f3d', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
              >
                Vaciar carrito
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: '#929bb1', fontSize: '14px', display: 'block' }}>Total a pagar</span>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#4ade80' }}>
                    ${totalPrecio.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleFinalizarCompra}
                  style={{ background: '#9387ff', color: '#000', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}
                >
                  Finalizar Compra →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Carrito;
