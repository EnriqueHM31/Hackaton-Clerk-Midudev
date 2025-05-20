import { useState } from "react";
import {
    SignUpButton,
    SignedOut,
    SignInButton,
    SignOutButton,
    UserButton,
    useUser,
} from "@clerk/clerk-react";
import ICONOPROGRAMADOR from "../assets/IconProgramador.webp";



export default function BotonPerfil() {
    const { isSignedIn, user } = useUser();
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);

    let username = "";
    if (user?.username?.length !== undefined) {
        username =
            user?.username?.length > 15
                ? `${user.username.slice(0, 15)}...`
                : user?.username || user?.firstName || "Usuario";
    }

    // Mostrar modal para elegir rol si no tiene metadata role
    return (
        <>
            {isSignedIn ? (
                <>

                    <button
                        onClick={toggleMenu}
                        aria-haspopup="true"
                        aria-expanded={open}
                        aria-controls="menu-perfil"
                        className="text-white px-4 py-2 font-bold rounded-2xl flex items-center gap-2 transition-colors"
                    >
                        <img
                            src={ICONOPROGRAMADOR}
                            alt="Icono de programador"
                            className="w-full h-full object-contain"
                        />
                        <p className="text-xl">Perfil</p>
                    </button>

                    {open && (
                        <div
                            id="menu-perfil"
                            className="absolute top-full xl:right-1/12 right-0 xl:mt-2 bg-black/70 backdrop-blur-sm rounded-xl p-4 flex flex-col gap-4 w-64 z-50"
                        >
                            <div className="flex flex-col items-start gap-3">
                                <div className="flex items-center gap-3">
                                    <UserButton userProfileUrl="/perfil" />
                                    <span className="text-white font-bold">{username}</span>
                                </div>
                                <SignOutButton>
                                    <button className="w-full bg-primary text-white px-4 py-2 font-bold rounded-xl">
                                        Cerrar sesión
                                    </button>
                                </SignOutButton>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <SignedOut>
                    <div className="flex xl:flex-row flex-col xl:mt-0 gap-6 xl:gap-4 p-4 rounded-2xl xl:p-0 xl:rounded-none ">
                        <SignUpButton mode="modal">
                            <button className="bg-black text-blue-300 px-4 py-2 font-bold rounded-xl border border-primary">
                                Registrarse
                            </button>
                        </SignUpButton>

                        <SignInButton mode="modal">
                            <button className="bg-primary text-white px-4 py-2 font-bold rounded-xl">
                                Iniciar Sesión
                            </button>
                        </SignInButton>
                    </div>
                </SignedOut>
            )}
        </>
    );
}
