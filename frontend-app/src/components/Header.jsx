import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import '../styles/Header.css';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const { totalItems } = useCart();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);

  // Cierra el menú si haces clic fuera de él
  useEffect(() => {
    const handleClickFuera = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener('mousedown', handleClickFuera);
    return () => document.removeEventListener('mousedown', handleClickFuera);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setMenuAbierto(false);
      navigate('/login');
    }
  };

  return (
    <header className="main-header">
      <div className="header-brand">
        <Link to="/" className="header-brand-link">
          Mi Aplicación
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/carrito" className="header-cart-link">
          🛒 Carrito ({totalItems})
        </Link>

        {token ? (
          <div className="user-menu-container" ref={menuRef}>
            {/* Ícono circular de usuario */}
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className={`user-avatar-btn ${role === 'admin' ? 'admin-ring' : ''}`}
              title="Opciones de cuenta"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Menú desplegable */}
            {menuAbierto && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <span className="role-badge">
                    {role === 'admin' ? '🛡️ Administrador' : '👤 Cliente'}
                  </span>
                </div>

                {/* Opciones especiales para ADMIN */}
                {role === 'admin' && (
                  <>
                    <Link
                      to="/admin"
                      className="dropdown-item"
                      onClick={() => setMenuAbierto(false)}
                    >
                      📊 Panel Administrativo
                    </Link>
                    <Link
                      to="/admin/productos"
                      className="dropdown-item"
                      onClick={() => setMenuAbierto(false)}
                    >
                      📦 Gestionar Inventario
                    </Link>
                  </>
                )}

                {/* Opciones especiales para USUARIO NORMAL */}
                {role !== 'admin' && (
                  <Link
                    to="/mis-pedidos"
                    className="dropdown-item"
                    onClick={() => setMenuAbierto(false)}
                  >
                    🛍️ Mis Compras
                  </Link>
                )}

                {/* Configuración común para ambos */}
                <Link
                  to="/perfil"
                  className="dropdown-item"
                  onClick={() => setMenuAbierto(false)}
                >
                  ⚙️ Configuración de Cuenta
                </Link>

                <div className="dropdown-divider" />

                <button onClick={handleLogout} className="dropdown-item logout-item">
                  🚪 Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="header-link">
              Iniciar sesión
            </Link>
            <Link to="/registro" className="header-btn-register">
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
