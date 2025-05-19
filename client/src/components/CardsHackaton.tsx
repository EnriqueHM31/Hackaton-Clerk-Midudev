'use client';

import { useState, useEffect } from 'react';
import { lenguajesSelect } from '../assets/js/constantes';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

interface Hackaton {
    id: number;
    nombre: string;
    descripcion: string;
    start_date?: string | null;
    end_date?: string | null;
    lenguajes: string[];
    imagen?: string | null;
    yaParticipa: boolean;
}

interface ParticipaciónHack {
    hackathon_id: number;
}


export default function HackatonesList() {
    const { user } = useUser();
    const id_usuario = user?.id;
    const [visibleCount, setVisibleCount] = useState(6);
    const [filtrar, setFiltrar] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [hackatones, setHackatones] = useState([] as Hackaton[]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resParticipaciones, resHackatones] = await Promise.all([
                    fetch(`http://localhost:3000/api/hackatones/participaciones/idusuario?idUser=${id_usuario}`),
                    fetch(`http://localhost:3000/api/hackatones/all`),
                ]);

                if (!resParticipaciones.ok) throw new Error('Error al obtener participaciones');
                if (!resHackatones.ok) throw new Error('Error al obtener hackatones');

                const dataParticipaciones = await resParticipaciones.json();
                const dataHackatones = await resHackatones.json();

                const hackatonesConParticipacion = dataHackatones.map((hackaton: Hackaton) => {
                    const participa = dataParticipaciones.some(
                        (p: ParticipaciónHack) => p.hackathon_id === hackaton.id
                    );
                    return {
                        ...hackaton,
                        yaParticipa: participa
                    };
                });

                setHackatones(hackatonesConParticipacion);



            } catch (error) {
                console.error(error);
                toast.error('Error al obtener datos desde el servidor');
            } finally {
                setIsLoading(false);
            }
        };

        if (id_usuario) {
            fetchData();
        }
    }, [id_usuario]);


    // Filtrar hackatones según lenguaje
    const hackatonesFiltrados = filtrar !== '' ? hackatones.filter((h) => h.lenguajes?.includes(filtrar)) : hackatones;

    // Hackatones que se van a renderizar según visibleCount
    let hackatonesVisibles = [];



    if (visibleCount > hackatonesFiltrados.length) {
        hackatonesVisibles = hackatonesFiltrados;
    } else {
        hackatonesVisibles = hackatonesFiltrados.slice(0, visibleCount);
    }



    // Función para mostrar más hackatones
    const handleVerMas = () => {
        setVisibleCount((prev) => Math.min(prev + 6, hackatonesFiltrados.length));
    };

    if (isLoading) {
        return (
            <div className="col-span-4 row-span-4 flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }


    function Finalizado(end_date: string) {
        return end_date
            ? new Date(end_date) < new Date()
            : false;

    }


    return (
        <main className="col-span-4 row-span-4 shadow-md flex items-center flex-col h-full z-50 gap-8 overflow-y-auto py-8 px-10">
            <div className="flex items-center justify-between w-full" data-aos="zoom-in" data-aos-delay="100">
                <h2 className="w-full text-start text-6xl font-bold bg-clip-text bg-gradient-to-r from-blue-300 via-pink-400 to-secondary text-transparent py-4">
                    Hackatones
                </h2>

                <div className="w-full flex gap-6 items-center justify-end">
                    <label className="text-white font-semibold flex items-center justify-center" htmlFor="lenguajes">
                        Filtrar por lenguaje:
                    </label>
                    <div className="relative flex items-center justify-center">
                        <select
                            className="w-full rounded-md bg-black text-white border border-primary px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 max-h-40"
                            name="lenguajes"
                            id="lenguajes"
                            value={filtrar}
                            onChange={(e) => {
                                setFiltrar(e.target.value);
                                setVisibleCount(hackatones.length);
                            }}
                        >
                            {lenguajesSelect.map((lenguaje: { value: string; label: string }) => (
                                <option key={lenguaje.value} value={lenguaje.value}>
                                    {lenguaje.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-20 w-full z-50"
                id="hackatones"
            >

                {
                    hackatonesFiltrados.length === 0 && (
                        < div className="col-span-4 row-span-4 flex items-center justify-center">
                            <p className="text-white text-4xl font-bold bg-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-400 to-secondary">
                                {filtrar
                                    ? `No hay hackatones con el lenguaje ${lenguajesSelect.find((l: { value: string; label: string; }) => l.value === filtrar)?.label || filtrar
                                    }`
                                    : 'No hay hackatones para mostrar.'}
                            </p>
                        </div>
                    )
                }
                {hackatonesVisibles.map(({ id, nombre, descripcion, start_date, end_date, lenguajes, imagen, yaParticipa }: Hackaton) => {
                    const yaFinalizado = Finalizado(end_date as string);
                    const estadoClase = yaFinalizado
                        ? 'bg-purple-900 cursor-not-allowed'
                        : yaParticipa
                            ? 'bg-blue-600 cursor-not-allowed'
                            : 'bg-gray-800 cursor-pointer hover:scale-105 active:scale-95';

                    return (
                        <Link
                            to={`/hackaton/${id}`}
                            key={id}
                            className="bg-black text-white p-6 rounded-lg w-full max-w-lg font-mono card-animada shadow-xl hover:shadow-purple-600 transition-colors duration-200 z-50"
                        >
                            <div className="flex justify-between items-center z-50">
                                <div className="flex space-x-2 text-red-500">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <p className="text-sm">bash</p>
                            </div>

                            <div className="mt-4 flex flex-col justify-between min-h-42 gap-3 z-50">
                                <div className="flex w-full justify-between items-center aspect-square max-h-56 py-1 relative">
                                    <div className="absolute w-full h-full bg-gradient-to-b from-black/50 via-transparent to-black/50 z-0"></div>
                                    {imagen ? (
                                        <img
                                            src={imagen}
                                            alt={`Imagen del hackatón ${nombre}`}
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                            <span className="text-gray-500">Sin imagen</span>
                                        </div>
                                    )}
                                </div>

                                <div className="h-full flex justify-start flex-col gap-3 z-50 min-h-[180px]">
                                    <p className="text-green-400 text-3xl font-bold text-wrap"> {nombre}</p>
                                    <p className="text-white z-50 text-wrap w-full">
                                        Del{' '}
                                        {start_date
                                            ? new Date(start_date).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })
                                            : 'Fecha no disponible'}{' '}
                                        al{' '}
                                        {end_date
                                            ? new Date(end_date).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })
                                            : 'Fecha no disponible'}
                                    </p>
                                    <p className="text-green-400 text-wrap">{lenguajes.join(', ')}</p>
                                    <p className="text-white line-clamp-2 text-wrap">{descripcion}</p>
                                </div>

                                <div className="relative group flex items-center justify-center mt-6">
                                    <button
                                        disabled={yaFinalizado}
                                        className={`relative inline-block p-px font-semibold leading-6 text-white shadow-2xl rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out ${estadoClase}`}

                                    >
                                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                        <span className={`relative z-10 block px-6 py-3 rounded-xl ${estadoClase}`}>
                                            <div className="relative z-10 flex items-center space-x-2">
                                                <span className="transition-all duration-500 group-hover:translate-x-1">
                                                    <span className="text-white font-bold">
                                                        {
                                                            yaFinalizado
                                                                ? "Finalizado"
                                                                : yaParticipa
                                                                    ? "Participando"
                                                                    : "Participar"
                                                        }
                                                    </span>
                                                </span>
                                                <svg
                                                    className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                                    aria-hidden="true"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        clipRule="evenodd"
                                                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                                        fillRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    );
                })}

                {visibleCount < hackatonesFiltrados.length && (
                    <div className="flex flex-col items-center justify-center py-6 w-full col-span-3">
                        <button
                            onClick={handleVerMas}
                            className="bg-gradient-to-b from-black/25 to-black/50 font-bold text-lg px-6 py-3 rounded-2xl border border-secondary hover:bg-purple-900/20 transition-colors duration-300"
                        >
                            Ver más...
                        </button>
                    </div>
                )}
            </div>
        </main >
    );
}
