'use client';
import { useEffect, useState } from 'react';

export default function PreviewCard({
    nombre,
    descripcion,
    fecha,
    lenguajes,
    imagen,
}: {
    nombre: string;
    descripcion: string;
    fecha: string;
    lenguajes: string[];
    imagen: string | File | null;
}) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!imagen) {
            setImageUrl(null);
            return;
        }

        if (typeof imagen === 'string') {
            setImageUrl(imagen);
            return;
        }

        const objectUrl = URL.createObjectURL(imagen);
        setImageUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl); // Limpieza segura
        };
    }, [imagen]);

    return (
        <div className="flex-1 bg-black z-50 p-5 rounded-2xl h-fit max-w-1/2">
            <h2 className="text-2xl font-bold text-green-400">Previsualización</h2>
            <div className="bg-black p-6 rounded-lg w-full font-mono shadow-xl z-50 ">
                <div className="flex justify-between items-center bg-black z-50">
                    <div className="flex space-x-2 text-red-500">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <p className="text-sm">bash</p>
                </div>

                <div className="mt-4 flex flex-col justify-between min-h-42 gap-3">
                    <div className="flex w-full justify-between items-center aspect-square max-h-56 py-1 relative">
                        <div className="absolute w-full h-full bg-gradient-to-b from-black/50 via-transparent to-black/50 z-0"></div>
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={`Imagen del hackatón ${nombre}`}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-800 text-gray-400">
                                Sin imagen
                            </div>
                        )}
                    </div>

                    <div className="h-full flex justify-between flex-col min-h-36 gap-3">
                        <p className="text-green-400 text-3xl font-bold break-words break-all">{nombre || 'Nombre del Hackathon'}</p>
                        <p className="text-white break-words break-all">{fecha}</p>
                        <p className="text-green-400 font-bold">{lenguajes.join(', ')}</p>
                        <p className="text-white line-clamp-2 break-words break-all">
                            {descripcion || 'Descripción del hackathon...'}
                        </p>
                    </div>

                    <div className="relative group flex items-center justify-center mt-6">
                        <button className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                                <div className="relative z-10 flex items-center space-x-2">
                                    <span className="transition-all duration-500 group-hover:translate-x-1">
                                        Participar
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
            </div>
        </div>
    );
}
