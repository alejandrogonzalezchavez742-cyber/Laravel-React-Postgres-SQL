import { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom'; // <-- 1. Importamos useNavigate
import Header from '../components/Header';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados para saber si hay un error específico en cada campo
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate(); // <-- 2. Inicializamos el navegador

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError(false);
    setPasswordError(false);
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/login',
        { email, password }
      );

      // Guardamos el JWT y el rol del usuario
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('role', response.data.user.role);

      // 3. Redirigimos según el rol
      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/perfil');
      }

    } catch (err) {
      if (err.response?.data?.message) {
        setEmailError(true);
        setPasswordError(true);
        setError('El correo electrónico o la contraseña que ingresaste no son correctos.');
      } else {
        setError('No se pudo conectar con el servidor. Verifica tu conexión.');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Header />
      <main className="login-container" style={{ paddingTop: '80px' }}>

        <div className="login-background">
          <span className="glow glow-one"></span>
          <span className="glow glow-two"></span>
        </div>

        <section className="login-card">

          <div className="login-header">
            <div className="login-logo">
              <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" style={{ width: '32px', height: '32px', color: '#000000' }}>
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
            </div>

            <h1>Bienvenido de nuevo</h1>
          </div>

          <form onSubmit={handleLogin}>

            {/* CAMPO DE CORREO ELECTRÓNICO */}
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <div
                className="input-container"
                style={{
                  borderColor: emailError ? '#ff5050' : '',
                  boxShadow: emailError ? '0 0 0 3px rgba(255, 80, 80, 0.15)' : ''
                }}
              >
                <span className="input-icon">✉</span>
                <input
                  id="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                    setError('');
                  }}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* CAMPO DE CONTRASEÑA */}
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div
                className="input-container"
                style={{
                  borderColor: passwordError ? '#ff5050' : '',
                  boxShadow: passwordError ? '0 0 0 3px rgba(255, 80, 80, 0.15)' : ''
                }}
              >
                <span className="input-icon">🔑</span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                    setError('');
                  }}
                  required
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>

              {error && (
                <span style={{ color: '#ff8585', fontSize: '13px', marginTop: '12px', display: 'block', textAlign: 'center', lineHeight: '140%' }}>
                  ⚠️ {error}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              {!loading && <span> →</span>}
            </button>

          </form>

          {/* ENLACE DIRECTO AL REGISTRO */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#929bb1' }}>
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" style={{ color: '#9387ff', fontWeight: '600', textDecoration: 'underline' }}>
              Regístrate aquí
            </Link>
          </div>

          <div className="login-footer">
            <span>© 2026  Aplicación</span>
            <span>Acceso seguro</span>
          </div>

        </section>

      </main>
    </>
  );
}

export default App;
