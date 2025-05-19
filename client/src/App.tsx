import Home from './components/Home';
import "./assets/js/fondo.js";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navegacion from './components/Navegacion.js';
import Perfil from './components/Perfil.js';
import Hackatones from './components/Hackatones.js';
import Footer from './components/Footer.js';
import HackatonId from './components/HackatonId.js';
import ParticipantesMisHacks from './components/ParticipantesMisHacks';

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

      <div className="overflow-hidden">
        <div
          className="fixed top-0 left-0 w-full h-full z-0"
          id="fondo"
        ></div>
      </div>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/hackatones" element={<Hackatones />} />
        <Route path="/hackaton/:id" element={<HackatonId />} />
        <Route path="/participante/mis-hackatones" element={<ParticipantesMisHacks />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
