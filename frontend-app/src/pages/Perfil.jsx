import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import Header from '../components/Header';

function Perfil() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/me')
      .then((res) => {
        setNombre(res.data.name);
        setEmail(res.data.email);
      })
      .catch((err) => console.error('Error cargando perfil:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleActualizar = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      await api.put('/perfil', {
        name: nombre,
        email,
        ...(password ? { password } : {}),
      });
      setPassword('');
      setMensaje('✅ Datos actualizados correctamente.');
    } catch (err) {
      setMensaje('❌ Error al actualizar la cuenta.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', color: '#ffffff' }}>
      <Header />

      <main style={{ maxWidth: '520px', margin: '0 auto', padding: '120px 2rem 3rem' }}>
        <div style={{ background: '#161922', padding: '2rem', borderRadius: '16px', border: '1px solid #232836' }}>
          <h1 style={{ fontSize: '24px', margin: '0 0 0.5rem' }}>Configuración de Cuenta</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '1.5rem' }}>
            Actualiza tu información personal o cambia tu contraseña.
          </p>

          {mensaje && (
            <div style={{ padding: '0.8rem', borderRadius: '8px', background: '#1e222d', marginBottom: '1.2rem', fontSize: '14px' }}>
              {mensaje}
            </div>
          )}

          {loading ? (
            <p style={{ color: '#94a3b8' }}>Cargando datos...</p>
          ) : (
            <form onSubmit={handleActualizar} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '0.4rem' }}>Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', borderRadius: '8px', border: '1px solid #2a2f3d', background: '#0f1117', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '0.4rem' }}>Correo Electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', borderRadius: '8px', border: '1px solid #2a2f3d', background: '#0f1117', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '0.4rem' }}>Nueva Contraseña (opcional)</label>
                <input
                  type="password"
                  placeholder="Dejar en blanco para no cambiar"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', borderRadius: '8px', border: '1px solid #2a2f3d', background: '#0f1117', color: '#fff' }}
                />
              </div>

              <button
                type="submit"
                style={{ marginTop: '0.5rem', background: '#0284c7', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}
              >
                Guardar Cambios
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default Perfil;
