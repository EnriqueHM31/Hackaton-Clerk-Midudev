import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Hackaton = {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: string;
    end_date: string;
    lenguajes: string[] | string;
    imagen: string;
    sitio: string;
};

type Props = {
    id: string;
    onDeleted?: () => void;
};

const SettingsHack = ({ id: id, onDeleted }: Props) => {
    const API = import.meta.env.VITE_API_URL;
    const [showModal, setShowModal] = useState(false);
    const [expandedDesc, setExpandedDesc] = useState(false);
    const [hackaton, setHackaton] = useState<Hackaton | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (hackaton?.descripcion && hackaton?.descripcion.length <= 100) {
            setExpandedDesc(true); // Mostrar todo si es corto
        } else {
            setExpandedDesc(false); // Mostrar recortado si es largo
        }
    }, [hackaton?.descripcion]);

    useEffect(() => {
        if (!id) return;

        const fetchHackaton = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API}/api/hackatones/hackaton/${id}`);
                const data = await res.json();


                if (res.ok && data) {

                    setHackaton(data,);
                } else {
                    toast.error('Hackatón no encontrado.');
                    setHackaton(null);
                }
            } catch (error) {
                console.error(error);
                toast.error('Error al obtener datos del hackatón.');
                setHackaton(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchHackaton();
        }

    }, [id]);

    const handleEliminar = async () => {
        if (!hackaton) return;

        try {
            const res = await fetch(`${API}/api/hackatones/eliminar/hackaton?id=${hackaton.id}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || 'No se pudo eliminar');
                return;
            }

            toast.success(data.message || 'Hackatón eliminado correctamente ✅');
            onDeleted?.();
            setShowModal(false);

            setTimeout(() => {
                window.location.href = '/hackatonesAutor';
            }, 1000);
        } catch {
            toast.error('Error al conectar con el servidor.');
        }
    };

    if (loading) {
        return <p className="text-center py-10 font-bold text-4xl text-pink-300 min-h-dvh">Cargando hackatón...</p>;
    }

    if (!hackaton) {
        return <p className=" text-center py-10 font-bold text-4xl text-red-400 min-h-dvh">No se encontró el hackatón.</p>;
    }


    return (
        <>
            <div className="relative p-4 rounded-xl w-full my-4 z-50 flex gap-5 text-white max-w-full xl:flex-row flex-col">
                <div className="flex-1 w-full">
                    <img
                        src={hackaton.imagen}
                        alt={hackaton.nombre}
                        className="w-full h-full object-cover rounded-md mb-4"
                    />
                </div>
                <div className="flex-2 flex flex-col gap-4 w-full max-w-full xl:max-w-4/6">
                    <div className="flex gap-3 items-center justify-between flex-col xl:flex-row">
                        <div className="flex gap-3 items-center w-full xl:max-w-2/3 order-2 xl:order-1">
                            <span className="text-secondary font-bold text-xl ">Nombre: </span>
                            <h2 className="text-lg font-bold  break-words break-all line-clamp-1 max-w-2/3 w-full">{hackaton.nombre}</h2>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700  font-semibold rounded-lg order-1 xl:order-2s"
                        >
                            Eliminar Hackatón
                        </button>
                    </div>

                    <div className="flex gap-4 xl:items-center py-1 xl:flex-row flex-col ">
                        <span className="text-secondary font-bold text-xl ">Duración: </span>
                        <p className="text-lg font-bold  break-words break-all">
                            Del{' '}
                            {new Date(hackaton.fecha).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}{' '}
                            al{' '}
                            {new Date(hackaton.end_date).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                    </div>

                    <div className="flex gap-4 xl:items-center py-1 xl:flex-row flex-col">
                        <span className="text-secondary font-bold text-xl ">Lenguajes: </span>
                        <p className="text-lg  font-bold break-words break-all">
                            {Array.isArray(hackaton.lenguajes)
                                ? hackaton.lenguajes.join(', ')
                                : hackaton.lenguajes ?? ''}
                        </p>
                    </div>

                    <div className="flex gap-4 py-1 flex-col">
                        <span className="text-secondary font-bold text-xl ">Patrocinador: </span>
                        <a
                            href={hackaton.sitio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg  font-bold hover:underline hover:text-blue-400 break-words break-all"
                        >
                            {hackaton.sitio}
                        </a>
                    </div>

                    <div className="flex gap-4 py-1 flex-col">
                        <span className="text-secondary font-bold text-xl">Descripción:</span>
                        <p className="text-lg font-bold break-words break-all">
                            {expandedDesc
                                ? hackaton.descripcion
                                : hackaton.descripcion.length > 100
                                    ? hackaton.descripcion.slice(0, 100) + "..."
                                    : hackaton.descripcion}
                        </p>
                        {hackaton.descripcion.length > 100 && (
                            <button
                                onClick={() => setExpandedDesc(!expandedDesc)}
                                className="text-blue-500 hover:underline mt-1 self-start"
                            >
                                {expandedDesc ? "Ver menos" : "Ver más"}
                            </button>
                        )}
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-gradient-to-b to-black/60 from-black/30 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-black rounded-xl p-6 w-full max-w-md text-center">
                            <h3 className="text-xl font-bold mb-4 text-white">¿Eliminar este hackatón?</h3>
                            <p className="mb-6 text-blue-400">Esta acción no se puede deshacer.</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-black font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleEliminar}
                                    className="px-4 py-2 rounded-md bg-primary hover:bg-primary text-white font-semibold"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>


        </>
    );
};

export default SettingsHack;
