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
            <a href='/' className='md:size-20 size-16 z-1000 bg-primary rounded-full fixed  md:left-11/12 flex items-center bottom-5 xl:bottom-20 right-5 md:right-0 justify-center hover:bg-blue-700 transition-colors'>
                <img src={ICONOHOME} className='w-12 h-12 object-contain' alt="Icono de la Home" />

            </a>
            <div className='flex flex-col items-center justify-center max-w-laptop mx-auto px-6 xl:px-0'>
                <Hero />
                <Conocenos />
                <Servicios />
                <Contacto />
            </div >
            <Authenticacion />

        </>

    )
}