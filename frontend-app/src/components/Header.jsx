import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Lee el JWT guardado en tu Login o Registro

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Envía el JWT al backend para invalidarlo
          },
        }
      );
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      localStorage.removeItem('token'); // Borra el token del navegador
      navigate('/'); // Te manda de vuelta al Login
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        boxSizing: 'border-box',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2.5rem',
        backgroundColor: '#161922',
        borderBottom: '1px solid #2a2f3d',
        color: '#ffffff',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
        <Link to="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
          Mi Aplicación
        </Link>
      </div>

      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {token ? (
          <>
            <Link to="/perfil" style={{ color: '#e2e8f0', textDecoration: 'none' }}>
              Mi Perfil
            </Link>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#ff5050',
                color: '#ffffff',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/" style={{ color: '#e2e8f0', textDecoration: 'none' }}>
              Iniciar sesión
            </Link>
            <Link
              to="/registro"
              style={{
                backgroundColor: '#9387ff',
                color: '#000000',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );

}

export default Header;
