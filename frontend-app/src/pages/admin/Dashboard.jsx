import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import AdminSidebar from '../../components/AdminSidebar';

function Dashboard() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    api.get('/me')
      .then((res) => setAdmin(res.data))
      .catch((err) => console.error('No autorizado:', err));
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1117', color: '#fff' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '2.5rem' }}>
        <h1>Bienvenido al Panel Administrativo</h1>
        {admin ? (
          <p style={{ color: '#929bb1', marginTop: '0.5rem' }}>
            Sesión verificada con JWT como: <strong>{admin.name}</strong> ({admin.email})
          </p>
        ) : (
          <p>Verificando credenciales...</p>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
