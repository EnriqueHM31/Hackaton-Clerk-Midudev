'use client';
import React, { useState, useEffect, use } from 'react';

interface HackatonProps {
    id: number;
    user_id: string;
    nombre: string;
    descripcion: string;
    start_date: string;
    end_date: string;
    lenguajes: string;
    imagen: string;
}

interface HackatonListProps {
    hackatones: HackatonProps[];
}

const HackatonList = ({ userId }: { userId: string }) => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [hackatones, setHackatones] = useState<HackatonProps[]>([]);

    useEffect(() => {
        const fetchHackatones = async () => {
            const res = await fetch(`/api/hackatonesauth?userId=${userId}`);
            const data = await res.json();

            if (!res.ok) {
                return;
            }
            setHackatones(data.hackatones);
        };

        fetchHackatones();
    }, []);

    if (hackatones?.length === 0) {
        return <p className="text-white text-2xl text-center py-8">No has creado ningún hackatón aún.</p>;
    }

    let hackatonesVisibles = [];

    if (visibleCount > hackatones.length) {
        hackatonesVisibles = hackatones;
    } else {
        hackatonesVisibles = hackatones.slice(0, visibleCount);
    }


    const handleVerMas = () => {
        setVisibleCount((prev) => Math.min(prev + 6, hackatones.length));
    };

    console.log(typeof hackatonesVisibles[0].lenguajes);


    return (



        <section className="grid_hackatones min-h-screen mb-10 z-50">
            {hackatonesVisibles.map(({ id, nombre, descripcion, start_date, end_date, lenguajes, imagen }) => (

                <a
                    key={id}
                    href={`/organizador/hackatonAuth/${id}/${nombre}`}
                    className={`bg-black ${hackatones.length < 2 ? 'max-w-2/6' : ''} text-white p-10 px-6 rounded-lg w-full font-mono card-animada shadow-xl transition-colors duration-200 z-50 max-h-[530px]`}
                >
                    <div className="w-full">
                        <div className="flex justify-between items-center z-50">
                            <div className="flex space-x-2 text-red-500">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <p className="text-sm bg-green-600 text-black px-5 py-2 rounded-2xl font-bold">Settings</p>
                        </div>

                        <div className="mt-4 flex flex-col justify-between min-h-42 gap-3 z-50">
                            <div className="flex w-full justify-between items-center aspect-square max-h-56 py-1 relative">
                                <div className="absolute w-full h-full bg-gradient-to-b from-black/50 via-transparent to-black/50 z-0" />
                                {imagen ? (
                                    <img src={imagen} alt={`Imagen del hackatón ${nombre}`} className="w-full h-full object-contain" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>
                                )}
                            </div>
                            <div className="h-full w-full flex justify-between flex-col min-h-36 gap-3 z-50">
                                <p className="text-green-400 text-3xl font-bold break-words break-all">{nombre}</p>
                                <p className="text-white z-50 text-wrap w-full break-words break-all">
                                    Del{' '}
                                    {new Date(start_date).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}{' '}
                                    al{' '}
                                    {new Date(end_date).toLocaleDateString('es-ES', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </p>
                                <p className="text-green-400 w-full break-words break-all">{Object.values(lenguajes).join(', ')}</p>
                                <p className="text-white line-clamp-2 break-words break-all">{descripcion}</p>
                            </div>
                        </div>
                    </div>
                </a>
            ))}

            {visibleCount < hackatones.length && (
                <div className="flex flex-col items-center justify-center py-6 w-full col-span-3 z-50">
                    <button
                        onClick={handleVerMas}
                        className="bg-gradient-to-b from-black/25 to-black/50 font-bold text-lg px-6 py-3 rounded-2xl border border-secondary hover:bg-purple-900/20 transition-colors duration-300 z-50"
                    >
                        Ver más...
                    </button>
                </div>
            )}
        </section>
    );
};

export default HackatonList;
