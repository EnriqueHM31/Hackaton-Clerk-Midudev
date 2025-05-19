import Hero from './Hero'
import Conocenos from './Conocenos'
import Servicios from './Servicios'
import Contacto from './Contacto'
import "../assets/js/fondo.js";
import Footer from './Footer.js'
import Authenticacion from './Autenthication'

export default function Home() {
    return (
        <>
            <a href='/' className='size-14 bg-pink-400 rounded-full fixed top-3/4 left-11/12 flex items-center justify-center'><p>f</p></a>
            <div className='flex flex-col items-center justify-center max-w-laptop mx-auto'>
                <Hero />
                <Conocenos />
                <Servicios />
                <Contacto />
            </div >
            <Footer />
            <Authenticacion />

        </>

    )
}