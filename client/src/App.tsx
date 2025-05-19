import Home from './components/Home';
import "./assets/js/fondo.js";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navegacion from './components/Navegacion.js';
import Perfil from './components/Perfil.js';
import Hackatones from './components/Hackatones.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Oculta Navegacion cuando la ruta es /hackatones
  const isHackatones = location.pathname === "/hackatones";

  return (
    <>
      {!isHackatones && <Navegacion />}

      <div className="overflow-hidden border border-transparent">
        <div
          className="fixed top-0 left-0 w-full h-full z-0 border-transparent border"
          id="fondo"
        ></div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/hackatones" element={<Hackatones />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
