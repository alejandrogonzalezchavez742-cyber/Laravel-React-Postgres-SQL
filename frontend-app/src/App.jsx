import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <main className="login-container">
        <div className="login-background">
          <span className="glow glow-one"></span>
          <span className="glow glow-two"></span>
        </div>

        <Routes>
          {/* Ruta principal para iniciar sesión */}
          <Route path="/" element={<Login />} />
          
          {/* Ruta independiente para el registro */}
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
