'use client';

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Participacion {
    id: number;
    user_id: string;
    username: string;
    nombre_proyecto: string;
    github_perfil: string;
    repositorio: string;
    joined_at: string;
}

export default function ModalGanadorHackaton({ user_id, idHack, lugar, }: { user_id: string; idHack: number; lugar: number; }) {
    const API = import.meta.env.VITE_API_URL;

    const [ganadoresBD, setGanadoresBD] = useState<Participacion[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchGanadores = async () => {
            try {
                const res = await fetch(`${API}/api/hackatones/participaciones?idHack=${idHack}&idUser=${user_id}`
                );
                const data = await res.json();

                if (res.ok) {
                    console.log(data.result);
                    setGanadoresBD(data.result);
                }
            } catch (error) {
                console.error(error);
                toast.error("Error al conectar con el servidor");
            }
        };

        if (idHack && modalOpen) {
            fetchGanadores();
        }
    }, [idHack, user_id, modalOpen]);

    return (
        <>
            {/* Botón para abrir la modal */}
            <button onClick={() => setModalOpen(true)} className="flex items-center justify-between bg-gradient-to-r from-black via-blue-800 to-blue-700 rounded-xl px-4 py-2 shadow-lg text-white hover:via-black transition-colors duration-200 ease-in-out hover:border-primary border border-black">
                <div className="flex items-center space-x-4">
                    <div className="bg-white text-purple-700 font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg shadow-md">
                        {lugar}
                    </div>
                    <div className="px-4 py-2 flex flex-col items-start ">
                        <span className="text-2xl font-bold">Ganador {lugar}</span>
                        <span>Ver Ganador</span>
                    </div>
                </div>
            </button>


            {/* Modal */}
            {modalOpen && (
                <div
                    className="fixed inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/50 z-50 flex justify-center items-center px-5 xl:px-0"
                    onClick={() => setModalOpen(false)} // Cierra modal al hacer click fuera
                >
                    <article
                        className="bg-gray-900 rounded-xl p-6 w-full xl:max-w-1/2 text-white shadow-xl border border-gray-700 max-h-dvh"
                        onClick={(e) => e.stopPropagation()} // Evita cierre al hacer click dentro
                    >
                        {/* Botón cerrar */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white font-bold text-2xl"
                            aria-label="Cerrar modal"
                        >
                            &times;
                        </button>

                        {/* Lista de ganadores */}
                        {ganadoresBD.length === 0 ? (
                            <section className="text-center text-gray-400 mt-6">
                                Ocurrio un error con la informacion del ganador
                            </section>
                        ) : (
                            ganadoresBD.map((ganador) => (
                                <div key={ganador.id} className="bg-gray-900 w-full rounded-lg flex flex-col">
                                    <div className="flex p-2 gap-1">
                                        <div className="circle">
                                            <span className="bg-red-500 inline-block center w-3 h-3 rounded-full"></span>
                                        </div>
                                        <div className="circle">
                                            <span className="bg-yellow-500 inline-block center w-3 h-3 rounded-full"></span>
                                        </div>
                                        <div className="circle">
                                            <span className="bg-green-500 box inline-block center w-3 h-3 rounded-full"></span>
                                        </div>
                                    </div>
                                    <div className="card__content flex flex-col gap-2">
                                        <div className="mx-auto flex justify-center items-center bg-black px-6 py-3 rounded-2xl w-fit">
                                            <h2 className="text-lg xl:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-pink-400 to-secondary ">Ganador {lugar}</h2>
                                        </div>
                                        <div className="card__body flex flex-col gap-2">
                                            <div className="flex flex-col gap-2">
                                                <p className="text-md xl:text-2xl text-pink-400 font-bold">Proyecto:</p>
                                                <span className="text-sm xl:text-xl">{ganador.nombre_proyecto}</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <p className="text-md xl:text-2xl text-pink-400 font-bold">Nombre de usuario:</p>
                                                <span className="text-sm xl:text-xl">{ganador.username}</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <p className="text-md xl:text-2xl text-pink-400 font-bold">Github:</p>
                                                <a className="text-sm xl:text-xl hover:text-blue-400 text-white transition-colors break-words break-all" href={ganador.github_perfil} target="_blank" rel="noopener noreferrer">
                                                    {ganador.github_perfil}
                                                </a>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <p className="text-md xl:text-2xl text-pink-400 font-bold">Repositorio:</p>
                                                <a className="text-sm xl:text-xl hover:text-blue-400 text-white transition-colors break-words break-all" href={ganador.repositorio} target="_blank" rel="noopener noreferrer">
                                                    {ganador.repositorio}
                                                </a>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            ))
                        )}
                        {/* Botón para enviar ganadores */}
                    </article>
                </div >
            )
            }
        </>
    );
}
