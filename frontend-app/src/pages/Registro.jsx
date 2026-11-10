import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
function Registro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      localStorage.setItem('token', response.data.access_token);
      alert('¡Cuenta creada con éxito!');
      navigate('/'); // Redirige al login tras registrarse
    } catch (err) {
      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('No se pudo conectar con el servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

    return (
    <>
      <Header />
      <main className="login-container">
        <section className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" style={{ width: '32px', height: '32px', color: '#ffffff' }}>
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
            </div>
            <h1>Crear cuenta</h1>
            <p>Completa tus datos para registrarte.</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <div className="input-container">
                <span className="input-icon">👤</span>
                <input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <div className="input-container">
                <span className="input-icon">✉</span>
                <input
                  id="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-container">
                <span className="input-icon">🔑</span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password_confirmation">Confirmar contraseña</label>
              <div className="input-container">
                <span className="input-icon">🔒</span>
                <input
                  id="password_confirmation"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Repite tu contraseña"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <span style={{ color: '#ff8585', fontSize: '13px', marginBottom: '15px', display: 'block', textAlign: 'center' }}>
                ⚠️ {error}
              </span>
            )}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarme'}
              {!loading && <span> →</span>}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#929bb1' }}>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/" style={{ color: '#9387ff', fontWeight: '600', textDecoration: 'underline' }}>
              Inicia sesión
            </Link>
          </div>

          <div className="login-footer">
            <span>© 2026 Tu Aplicación</span>
            <span>Acceso seguro</span>
          </div>
        </section>
      </main>
    </>
  );
}

export default Registro;

