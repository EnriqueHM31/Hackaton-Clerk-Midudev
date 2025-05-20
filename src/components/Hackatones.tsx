import { Link } from 'react-router-dom';
import HackatonCards from './CardsHackaton';

export default function Hackatones() {
    return (

        <div className="xl:grid xl:grid-cols-5 xl:grid-rows-5 flex flex-col xl:h-full z-50 gap-4 min-h-dvh">
            <div className="xl:row-span-5 bg-black xl:h-full w-full z-50 h-fit row-span-1 col-span-1">
                <nav className='xl:flex xl:flex-col grid grid-cols-1 grid-rows-2s justify-center items-center w-full xl:h-full  bg-black xl:gap-10 gap-6 z-50'>
                    <Link to="/" className="text-xl col-span-1 row-span-1 font-bold hover:bg-primary transition-colors z-50 px-7 py-4 xl:w-full w-full text-center order-1 xl:order-1">
                        Inicio
                    </Link>
                    <Link to="/participante/mis-hackatones" className="text-xl col-span-2 row-span-2  font-bold hover:bg-primary transition-colors z-50 px-7 py-4 xl:w-full w-full text-center order-3 xl:order-2">
                        Mis Hackatones
                    </Link>

                    <Link to="/perfil" className="text-xl col-span-1 row-span-1  font-bold hover:bg-primary transition-colors z-50 px-7 py-4 xl:w-full w-full text-center order-2 xl:order-3">
                        Mi perfil
                    </Link>

                </nav>
            </div>
            <div className="xl:col-span-4 xl:row-span-5 xl:max-h-dvh xl:overflow-y-auto  w-full ">
                <HackatonCards />
            </div>
        </div>
    );
}