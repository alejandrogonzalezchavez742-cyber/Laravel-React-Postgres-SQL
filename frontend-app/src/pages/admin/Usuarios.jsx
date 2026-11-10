import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import AdminSidebar from '../../components/AdminSidebar';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Obtener lista de usuarios desde Laravel
  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/usuarios');
      setUsuarios(res.data);
      setError('');
    } catch (err) {
      setError('No se pudieron cargar los usuarios. Verifica tus permisos de administrador.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Cambiar rol (de user a admin o viceversa)
  const cambiarRol = async (id, nuevoRol) => {
    try {
      await api.put(`/admin/usuarios/${id}/role`, { role: nuevoRol });
      cargarUsuarios(); // Recarga la tabla actualizada
    } catch (err) {
      alert('Error al actualizar el rol del usuario.');
    }
  };

  // Eliminar usuario
  const eliminarUsuario = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar a ${nombre}?`)) return;
    try {
      await api.delete(`/admin/usuarios/${id}`);
      cargarUsuarios();
    } catch (err) {
      alert('Error al eliminar el usuario.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1117', color: '#ffffff' }}>
      {/* Menú lateral administrativo */}
      <AdminSidebar />

      {/* Contenido principal */}
      <main style={{ flex: 1, padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px' }}>Gestión de Usuarios</h1>
            <p style={{ color: '#929bb1', marginTop: '0.4rem' }}>
              Administra los roles y accesos de los usuarios registrados.
            </p>
          </div>
          <span style={{ background: '#1e222d', padding: '0.5rem 1rem', borderRadius: '8px', color: '#9387ff', fontWeight: '600' }}>
            Total: {usuarios.length}
          </span>
        </div>

        {error && (
          <div style={{ background: 'rgba(255, 80, 80, 0.15)', color: '#ff8585', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <p style={{ color: '#929bb1' }}>Cargando usuarios...</p>
        ) : (
          <div style={{ background: '#161922', borderRadius: '12px', border: '1px solid #2a2f3d', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#1e222d', borderBottom: '1px solid #2a2f3d', color: '#929bb1', fontSize: '14px' }}>
                  <th style={{ padding: '1rem' }}>ID</th>
                  <th style={{ padding: '1rem' }}>Nombre</th>
                  <th style={{ padding: '1rem' }}>Correo</th>
                  <th style={{ padding: '1rem' }}>Rol</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} style={{ borderBottom: '1px solid #2a2f3d' }}>
                    <td style={{ padding: '1rem', color: '#929bb1' }}>#{usuario.id}</td>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>{usuario.name}</td>
                    <td style={{ padding: '1rem', color: '#cbd5e1' }}>{usuario.email}</td>
                    <td style={{ padding: '1rem' }}>
                      <select
                        value={usuario.role}
                        onChange={(e) => cambiarRol(usuario.id, e.target.value)}
                        style={{
                          background: usuario.role === 'admin' ? 'rgba(147, 135, 255, 0.2)' : '#1e222d',
                          color: usuario.role === 'admin' ? '#9387ff' : '#e2e8f0',
                          border: '1px solid #2a2f3d',
                          padding: '0.4rem 0.6rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: '600',
                        }}
                      >
                        <option value="user" style={{ background: '#161922', color: '#fff' }}>Usuario (user)</option>
                        <option value="admin" style={{ background: '#161922', color: '#fff' }}>Administrador (admin)</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button
                        onClick={() => eliminarUsuario(usuario.id, usuario.name)}
                        style={{
                          background: 'rgba(255, 80, 80, 0.15)',
                          color: '#ff6b6b',
                          border: '1px solid rgba(255, 80, 80, 0.3)',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: '500',
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default Usuarios;
