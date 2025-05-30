import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BotonPerfil from './BotonPerfil';
import { useUser } from '@clerk/clerk-react';
import ICONCLOSE from "../assets/IconClose.webp";
import ICONOMENU from "../assets/menu.webp";
import LOGO from "../assets/logo.webp";

const LINKS = [
    { texto: 'Home', url: '/' },
    { texto: 'Conócenos', url: '/#about' },
    { texto: 'Servicios', url: '/#services' },
    { texto: 'Contacto', url: '/#contacto' },
];

function LinksPorRol({ role }: { role?: string | null }) {
    if (role === 'organizador') {
        return (
            <Link
                className="text-xl hover:text-primary transition-colors z-50 font-bold"
                to="/panel"
            >
                Panel
            </Link>
        );
    }

    if (role === 'participante') {
        return (
            <Link
                className="text-xl hover:text-primary transition-colors z-50 font-bold"
                to="/hackatones"
            >
                Hackatones
            </Link>
        );
    }

    return null;
}

export default function Navegacion() {

    const { user } = useUser();

    const role = user?.publicMetadata?.role as string | null;


    // Menú responsive
    useEffect(() => {
        const menuButton = document.getElementById('menu-button');
        const menu = document.getElementById('mobile-menu');
        const img = menuButton?.querySelector('img');
        const auth = document.getElementById('mobile-auth');
        const botonperfil = document.getElementById('botonperfil');

        if (!menuButton || !menu || !img || !botonperfil) return;

        let isOpen = false;

        const toggleMenu = () => {
            isOpen = !isOpen;
            menu.classList.toggle('translate-y-0', isOpen);
            menu.classList.toggle('-translate-y-44', !isOpen);
            menu.classList.toggle('opacity-100', isOpen);
            menu.classList.toggle('opacity-0', !isOpen);
            menu.classList.toggle('pointer-events-auto', isOpen);
            menu.classList.toggle('pointer-events-none', !isOpen);
            botonperfil.classList.toggle('hidden', !isOpen);
            botonperfil.classList.toggle('flex', isOpen);

            img.src = isOpen
                ? ICONCLOSE
                : ICONOMENU;

            if (auth) {
                auth.classList.toggle('translate-y-0', isOpen);
                auth.classList.toggle('-translate-y-44', !isOpen);
                auth.classList.toggle('opacity-100', isOpen);
                auth.classList.toggle('opacity-0', !isOpen);
                auth.classList.toggle('pointer-events-auto', isOpen);
                auth.classList.toggle('pointer-events-none', !isOpen);
            }
        };

        menuButton.addEventListener('click', toggleMenu);
        return () => {
            menuButton.removeEventListener('click', toggleMenu);
        };
    }, []);


    return (
        <>

            <header
                className="w-full sticky top-0 z-100 backdrop-blur-sm xl:px-0 px-6 xl:py-3 py-2"
                id="inicio"
            >

                <div className="max-w-[1250px] mx-auto flex justify-between items-center py-3 relative">
                    {/* Logo */}
                    <div className="flex items-center justify-start gap-2 h-12 flex-1">
                        <div className="flex h-full gap-2 items-center">
                            <img
                                className="w-full h-full object-contain z-50"
                                src={LOGO}
                                alt="Logo de la empresa DevArena"
                            />
                            <h2 className="text-2xl font-bold z-50 xl:flex hidden">DevArena</h2>
                        </div>
                    </div>

                    {/* Navegación */}
                    <nav
                        id="mobile-menu"
                        className="flex-col gap-12 items-center justify-center flex-2 bg-black/70 xl:bg-transparent
                    fixed top-1/2 left-1/2 -translate-x-1/2 xl:-translate-x-0 w-11/12  z-40
                    transform transition-transform duration-500 ease-in-out
                    -translate-y-44 opacity-0 pointer-events-none backdrop-blur-3xl
                    xl:static xl:flex-row xl:items-center xl:transparent xl:backdrop-blur-2xl
                    xl:translate-y-0 xl:opacity-100 xl:pointer-events-auto
                    flex xl:flex py-6 xl:py-0 mt-48 xl:mt-0 xl:mx-0 mx-auto rounded-2xl xl:rounded-none xl:justify-center"
                    >
                        {LINKS.map((link, index) => (
                            <a
                                key={index}
                                className="text-xl font-bold hover:text-primary transition-colors z-50"
                                href={link.url}
                            >
                                {link.texto}
                            </a>
                        ))}

                        <LinksPorRol role={role} />
                    </nav>

                    {/* Botón de Perfil */}
                    <div id='botonperfil' className="xl:flex items-center justify-end gap-6 min-h-12 flex-1 z-50 hidden absolute xl:static w-full bg-black flex-col xl:flex-row xl:bg-transparent top-11/12 rounded-2xl xl:rounded-none">
                        <BotonPerfil />
                    </div>

                    {/* Botón de menú móvil */}
                    <button
                        className="xl:hidden flex items-center justify-center w-12 h-12 bg-primary rounded-2xl size-4 p-2 cursor-pointer z-50"
                        id="menu-button"
                    >
                        <img
                            src={ICONOMENU}
                            alt="Icono de menú"
                            className="w-full h-full object-contain"
                        />
                    </button>
                </div>
            </header>
        </>
    );
}
