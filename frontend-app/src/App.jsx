import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Index from './pages/index';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Perfil from './pages/Perfil'; // <--- 1. Importación agregada
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Usuarios from './pages/admin/Usuarios';
import Productos from './pages/admin/Productos';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />

          {/* Ruta protegida para cualquier usuario con sesión (Admin o Cliente) */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />

          {/* Rutas administrativas protegidas (Solo Admin) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute soloAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <ProtectedRoute soloAdmin={true}>
                <Usuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/productos"
            element={
              <ProtectedRoute soloAdmin={true}>
                <Productos />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
