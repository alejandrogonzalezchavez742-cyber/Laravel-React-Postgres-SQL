import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
import AdminSidebar from '../../components/AdminSidebar';

function Dashboard() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // <--- Estado de carga
  const [stats, setStats] = useState({
    total_activos: 0,
    total_admins: 0,
    en_papelera: 0,
    ultimos_usuarios: [],
  });

  useEffect(() => {
    Promise.all([
      api.get('/me').then((res) => setAdmin(res.data)),
      api.get('/admin/stats').then((res) => setStats(res.data)),
    ])
      .catch((err) => console.error('Error cargando dashboard:', err))
      .finally(() => setLoading(false)); // <--- Apaga el esqueleto cuando termina
  }, []);

  const cardStyle = {
    backgroundColor: '#161922',
    border: '1px solid #2a2f3d',
    borderRadius: '12px',
    padding: '1.5rem',
    flex: 1,
  };

  // Estilo de las barras grises animadas (Skeleton)
  const skeletonBox = (width, height) => ({
    width,
    height,
    backgroundColor: '#232836',
    borderRadius: '6px',
    animation: 'pulse 1.5s infinite ease-in-out',
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1117', color: '#fff' }}>
      {/* Animación CSS integrada */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <AdminSidebar />

      <main style={{ flex: 1, padding: '2.5rem' }}>
        {/* Encabezado */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: '26px' }}>Panel Administrativo</h1>
          {loading ? (
            <div style={{ ...skeletonBox('260px', '18px'), marginTop: '0.6rem' }} />
          ) : (
            <p style={{ color: '#929bb1', marginTop: '0.4rem' }}>
              Bienvenido, <strong style={{ color: '#fff' }}>{admin?.name}</strong> ({admin?.email})
            </p>
          )}
        </div>

        {/* Tarjetas de Estadísticas (KPIs) */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <div style={cardStyle}>
            <span style={{ color: '#929bb1', fontSize: '14px' }}>👥 Usuarios Activos</span>
            {loading ? (
              <div style={{ ...skeletonBox('60px', '36px'), marginTop: '0.6rem' }} />
            ) : (
              <h2 style={{ fontSize: '32px', margin: '0.5rem 0 0', color: '#38bdf8' }}>
                {stats.total_activos}
              </h2>
            )}
          </div>

          <div style={cardStyle}>
            <span style={{ color: '#929bb1', fontSize: '14px' }}>🛡️ Administradores</span>
            {loading ? (
              <div style={{ ...skeletonBox('60px', '36px'), marginTop: '0.6rem' }} />
            ) : (
              <h2 style={{ fontSize: '32px', margin: '0.5rem 0 0', color: '#9387ff' }}>
                {stats.total_admins}
              </h2>
            )}
          </div>

          <div style={cardStyle}>
            <span style={{ color: '#929bb1', fontSize: '14px' }}>🗑️ En Papelera</span>
            {loading ? (
              <div style={{ ...skeletonBox('60px', '36px'), marginTop: '0.6rem' }} />
            ) : (
              <h2 style={{ fontSize: '32px', margin: '0.5rem 0 0', color: '#ff6b6b' }}>
                {stats.en_papelera}
              </h2>
            )}
          </div>
        </div>

        {/* Tabla de Últimos registros */}
        <div style={{ background: '#161922', borderRadius: '12px', border: '1px solid #2a2f3d', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '18px' }}>Últimos registros</h3>
            <Link to="/admin/usuarios" style={{ color: '#9387ff', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
              Ver todos →
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #2a2f3d', color: '#929bb1', fontSize: '13px' }}>
                <th style={{ padding: '0.75rem' }}>Nombre</th>
                <th style={{ padding: '0.75rem' }}>Correo</th>
                <th style={{ padding: '0.75rem' }}>Rol</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Muestra 3 filas fantasma mientras carga la BD
                [1, 2, 3].map((n) => (
                  <tr key={n} style={{ borderBottom: '1px solid #1e222d' }}>
                    <td style={{ padding: '0.85rem' }}><div style={skeletonBox('140px', '16px')} /></td>
                    <td style={{ padding: '0.85rem' }}><div style={skeletonBox('200px', '16px')} /></td>
                    <td style={{ padding: '0.85rem' }}><div style={skeletonBox('70px', '22px')} /></td>
                  </tr>
                ))
              ) : (
                stats.ultimos_usuarios.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #1e222d' }}>
                    <td style={{ padding: '0.75rem' }}>{u.name}</td>
                    <td style={{ padding: '0.75rem', color: '#cbd5e1' }}>{u.email}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: u.role === 'admin' ? 'rgba(147, 135, 255, 0.2)' : '#1e222d',
                        color: u.role === 'admin' ? '#9387ff' : '#929bb1'
                      }}>
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
