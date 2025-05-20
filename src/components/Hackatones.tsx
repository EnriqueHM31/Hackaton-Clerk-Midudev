import { Link } from 'react-router-dom';
import HackatonCards from './CardsHackaton';

export default function Hackatones() {
    return (

        <div className="grid grid-cols-5 grid-rows-5 gap-4 min-h-dvh">
            <div className="row-span-5 bg-black h-full w-full z-50">
                <nav className='flex flex-col justify-center items-center w-full h-full  bg-black gap-10 z-50'>
                    <Link to="/" className="text-xl font-bold hover:bg-primary transition-colors z-50 px-7 py-4 w-full">
                        Inicio
                    </Link>
                    <Link to="/participante/mis-hackatones" className="text-xl font-bold hover:bg-primary transition-colors z-50 px-7 py-4 w-full">
                        Mis Hackatones
                    </Link>

                    <Link to="/perfil" className="text-xl font-bold hover:bg-primary transition-colors z-50 px-7 py-4 w-full">
                        Mi perfil
                    </Link>

                </nav>
            </div>
            <div className="col-span-4 row-span-5 max-h-dvh overflow-y-auto">
                <HackatonCards />
            </div>
        </div>
    );
}