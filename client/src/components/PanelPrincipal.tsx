import { Link } from 'react-router-dom';
import PanelControl from './Panel';


export default function PanelPrincipal() {
    return (
        <>
            <section className='max-w-laptop mx-auto'>

                <div className="flex flex-col items-start justify-end gap-6 z-50 w-full px-8">
                    <Link
                        to="/hackatonesAutor"
                        className="bg-black border border-primary font-bold text-white px-6 py-3 rounded-lg w-fit hover:bg-primary transition-colors duration-200 z-50"
                    >
                        Ver tus hackatones
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center gap-6 z-50">
                    <PanelControl />
                </div>
            </section >
        </>
    );
}