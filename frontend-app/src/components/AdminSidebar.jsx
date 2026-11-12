import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/logout'); // Invalida el token JWT en Laravel
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/');
    }
  };

  // Función para resaltar el enlace de la pantalla en la que estás parado
  const linkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    backgroundColor: location.pathname === path ? '#262b3d' : 'transparent',
    color: location.pathname === path ? '#ffffff' : '#929bb1',
  });

  return (
    <aside
      style={{
        width: '250px',
        minHeight: '100vh',
        backgroundColor: '#161922',
        padding: '1.5rem',
        borderRight: '1px solid #2a2f3d',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      <div>
        <h2 style={{ fontSize: '20px', marginBottom: '2rem', color: '#9387ff' }}>
          Panel Admin
        </h2>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/admin" style={linkStyle('/admin')}>
            📊 Dashboard
          </Link>
          <Link to="/admin/usuarios" style={linkStyle('/admin/usuarios')}>
            👥 Usuarios
          </Link>
          <Link to="/admin/productos" style={linkStyle('/admin/productos')}>
            📦 Productos
          </Link>

        </nav>
      </div>

      <button
        onClick={handleLogout}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#ff5050',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
        }}
      >
        Cerrar sesión
      </button>
    </aside>
  );
}

export default AdminSidebar;
