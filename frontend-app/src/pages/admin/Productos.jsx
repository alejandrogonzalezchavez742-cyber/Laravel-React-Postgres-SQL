import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import AdminSidebar from '../../components/AdminSidebar';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [editId, setEditId] = useState(null);

  // Campos del formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState(null);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/productos');
      setProductos(res.data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const limpiarFormulario = () => {
    setEditId(null);
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setStock('');
    setCategoria('');
    setImagen(null);
    const fileInput = document.getElementById('input-imagen');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('stock', stock);
    formData.append('categoria', categoria);
    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      if (editId) {
        formData.append('_method', 'PUT');
        await api.post(`/admin/productos/${editId}`, formData);
      } else {
        await api.post('/admin/productos', formData);
      }
      limpiarFormulario();
      cargarProductos();
    } catch (err) {
      const detalle = err.response?.data?.message || 'Error al guardar el producto.';
      alert(detalle);
      console.error('Errores exactos de Laravel:', err.response?.data?.errors);
    } finally {
      setGuardando(false);
    }
  };

  const seleccionarParaEditar = (prod) => {
    setEditId(prod.id);
    setNombre(prod.nombre);
    setDescripcion(prod.descripcion || '');
    setPrecio(prod.precio);
    setStock(prod.stock);
    setCategoria(prod.categoria || '');
    setImagen(null);
  };

  const eliminarProducto = async (id, nombreProd) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${nombreProd}"?`)) return;
    try {
      await api.delete(`/admin/productos/${id}`);
      cargarProductos();
    } catch (err) {
      alert('Error al eliminar el producto.');
    }
  };

  const inputStyle = {
    background: '#1e222d',
    border: '1px solid #2a2f3d',
    color: '#fff',
    padding: '0.6rem 0.8rem',
    borderRadius: '6px',
    flex: 1,
    minWidth: '150px',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f1117', color: '#fff' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '2.5rem' }}>
        <h1 style={{ margin: '0 0 0.5rem', fontSize: '24px' }}>Gestión de Productos</h1>
        <p style={{ color: '#929bb1', marginBottom: '2rem' }}>
          Agrega, edita o administra el inventario y las imágenes en Cloudinary.
        </p>

        {/* Formulario para Crear / Editar con Imagen */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#161922',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #2a2f3d',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input type="text" placeholder="Nombre del producto" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={inputStyle} />
            <input type="text" placeholder="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)} style={inputStyle} />
            <input type="number" step="0.01" placeholder="Precio ($)" value={precio} onChange={(e) => setPrecio(e.target.value)} required style={{ ...inputStyle, maxWidth: '140px' }} />
            <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required style={{ ...inputStyle, maxWidth: '120px' }} />
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <input type="text" placeholder="Descripción breve (opcional)" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} style={inputStyle} />

            <input
              id="input-imagen"
              type="file"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0])}
              style={{ color: '#929bb1', fontSize: '14px' }}
            />

            <button
              type="submit"
              disabled={guardando}
              style={{ background: '#9387ff', color: '#000', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              {guardando ? 'Subiendo...' : editId ? 'Actualizar' : '+ Agregar'}
            </button>

            {editId && (
              <button
                type="button"
                onClick={limpiarFormulario}
                style={{ background: '#2a2f3d', color: '#fff', border: 'none', padding: '0.6rem 1rem', borderRadius: '6px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Tabla de Productos */}
        <div style={{ background: '#161922', borderRadius: '12px', border: '1px solid #2a2f3d', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#1e222d', borderBottom: '1px solid #2a2f3d', color: '#929bb1', fontSize: '14px' }}>
                <th style={{ padding: '1rem' }}>Imagen</th>
                <th style={{ padding: '1rem' }}>Producto</th>
                <th style={{ padding: '1rem' }}>Categoría</th>
                <th style={{ padding: '1rem' }}>Precio</th>
                <th style={{ padding: '1rem' }}>Stock</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ padding: '1.5rem', textAlign: 'center', color: '#929bb1' }}>Cargando inventario...</td></tr>
              ) : productos.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '1.5rem', textAlign: 'center', color: '#929bb1' }}>No hay productos registrados aún.</td></tr>
              ) : (
                productos.map((prod) => (
                  <tr key={prod.id} style={{ borderBottom: '1px solid #2a2f3d' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      {prod.imagen_url ? (
                        <img
                          src={prod.imagen_url}
                          alt={prod.nombre}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #2a2f3d' }}
                        />
                      ) : (
                        <div style={{ width: '48px', height: '48px', background: '#1e222d', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#929bb1' }}>
                          Sin foto
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>{prod.nombre}</td>
                    <td style={{ padding: '1rem', color: '#929bb1' }}>{prod.categoria || 'General'}</td>
                    <td style={{ padding: '1rem', color: '#38bdf8', fontWeight: '600' }}>${Number(prod.precio).toFixed(2)}</td>
                    <td style={{ padding: '1rem' }}>{prod.stock} uds.</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button
                        onClick={() => seleccionarParaEditar(prod)}
                        style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', marginRight: '0.5rem' }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarProducto(prod.id, prod.nombre)}
                        style={{ background: 'rgba(255, 80, 80, 0.15)', color: '#ff6b6b', border: '1px solid rgba(255, 80, 80, 0.3)', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        Eliminar
                      </button>
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

export default Productos;
