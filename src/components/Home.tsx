import Hero from './Hero'
import Conocenos from './Conocenos'
import Servicios from './Servicios'
import Contacto from './Contacto'
import "../assets/js/fondo.js";
import Authenticacion from './Autenthication'
import ICONOHOME from "../assets/IconHome.webp";

export default function Home() {
    return (
        <>
            <a href='/' className='size-14 bg-pink-500 rounded-full fixed top-3/4 left-11/12 flex items-center justify-center'>
                <img src={ICONOHOME} className='w-12 h-12 object-contain' alt="Icono de la Home" />

            </a>
            <div className='flex flex-col items-center justify-center max-w-laptop mx-auto'>
                <Hero />
                <Conocenos />
                <Servicios />
                <Contacto />
            </div >
            <Authenticacion />

        </>

    )
}