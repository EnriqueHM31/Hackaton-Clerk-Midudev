import Home from './components/Home'
import "./assets/js/fondo.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navegacion from './components/Navegacion.js';


function App() {

  <>

  </>

  return (
    <BrowserRouter>
      <Navegacion />
      <div className='overflow-hidden border border-transparent'>
        <div className='fixed top-0 left-0 w-full h-full z-0 border-transparent border ' id='fondo'></div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
