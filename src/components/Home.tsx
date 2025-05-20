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
            <a href='/' className='size-20 bg-primary rounded-full fixed top-4/5 left-11/12 flex items-center justify-center hover:bg-blue-700 transition-colors'>
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