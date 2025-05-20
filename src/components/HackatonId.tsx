import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ModalGanadorHackaton from './ModalGanadorHackaton';
import ModalParticipar from './ModalParticipar';

interface Hackaton {
    id: number;
    nombre: string;
    descripcion: string;
    start_date: string | null;
    end_date: string | null;
    lenguajes: string[];
    imagen: string | null;
    sitio: string;
    premios: string[];
    instrucciones: string;
}

interface Ganador {
    participanteid: string;
    fechaasignacion: string;
    lugar: number;
    idhack: number;
}


export default function HackatonId() {
    const API = import.meta.env.VITE_API_URL;
    const { id: idHack } = useParams<{ id: string }>();
    const [Hackaton, setHackaton] = useState<Hackaton>();
    const [isLoading, setIsLoading] = useState(true);
    const [ganadores, setGanadores] = useState<Ganador[]>([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const fetchDatosHackaton = async () => {
            try {
                const [resHackaton, resGanadores] = await Promise.all([
                    fetch(`${API}/api/hackatones/hackaton/${idHack}`),
                    fetch(`${API}/api/hackatones/ganadores/${idHack}`),

                ]);

                const [dataHackaton, dataGanadores] = await Promise.all([
                    resHackaton.json(),
                    resGanadores.json()
                ]);

                if (resHackaton.ok) {
                    setHackaton(dataHackaton);
                }

                if (resGanadores.ok) {
                    setGanadores(dataGanadores.ganadores); // Asegúrate de tener este estado: useState([])
                }

            } catch (error) {
                console.error(error);
                toast.error('Error al obtener datos del hackatón o ganadores');
            }
        };

        if (idHack) {
            fetchDatosHackaton();
        }
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);

    }, [idHack]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-full h-full min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!Hackaton) {
        return (
            <div className="flex justify-center items-center w-full h-full min-h-screen">
                <p className="text-white text-4xl font-bold bg-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-400 to-secondary">
                    Hackatón no encontrado
                </p>
            </div>
        );
    }

    const { id, nombre, descripcion, start_date, end_date, lenguajes, imagen, sitio, instrucciones, premios } = Hackaton;

    console.log(ganadores)


    return (
        <div className="flex justify-between items-center w-full flex-col min-h-screen">
            <section className="flex flex-col gap-6 text-white max-w-[1200px] w-full mx-auto z-50 my-5">
                <div className="flex flex-col gap-4 w-full bg-black z-50 p-8 rounded-3xl">
                    <section className="flex gap-6 z-50">
                        <div className="flex-1">
                            <img
                                src={imagen || 'https://cdn-icons-png.flaticon.com/512/7153/7153150.png'}
                                alt={`Hackatón ${nombre}`}
                                className="w-full max-w-md object-contain rounded-xl"
                            />
                        </div>
                        <div className="flex-2 flex flex-col gap-6 justify-center z-50">
                            <h1
                                className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-pink-400 to-secondary"
                            >
                                {nombre}
                            </h1>
                            <p className="text-2xl">
                                📅 Fecha: Del{' '}
                                {
                                    new Date(start_date ? start_date : '').toLocaleDateString('es-ES', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                }{' '}
                                al{' '}
                                {
                                    new Date(end_date ? end_date : '').toLocaleDateString('es-ES', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                }
                            </p>
                            <p className="text-2xl">🧠 Lenguajes: {lenguajes.join(', ')}</p>

                            {
                                ganadores.length === 0 ? (
                                    <ModalParticipar
                                        idHack={id}
                                        date_end={end_date as string}
                                    />
                                ) : (
                                    <div className="flex w-fit bg-black z-50  ">
                                        <p className="text-4xl font-bold bg-blue-500 px-6 py-3 rounded-3xl">
                                            Hackaton Finalizado
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    </section>

                    {
                        ganadores.length > 0 && (
                            <section className="w-full mt-6 flex gap-5 flex-col">
                                <p className="text-3xl text-blue-300">Ganadores</p>
                                <div className="text-white">
                                    <section className="flex flex-col gap-6">
                                        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>

                                            {ganadores.map((g: Ganador, idx: number) => (
                                                <ModalGanadorHackaton
                                                    key={idx}
                                                    user_id={g.participanteid}
                                                    idHack={id}
                                                    lugar={g.lugar}
                                                />
                                            ))}
                                        </div>

                                    </section>
                                </div>
                            </section>
                        )
                    }

                    <section className="w-full mt-6 flex gap-5 flex-col">
                        <p className="text-3xl text-blue-300">Descripción del hackaton</p>
                        <p className="text-white">{descripcion}</p>
                    </section>

                    <section className="w-full mt-6 flex gap-5 flex-col">
                        <p className="text-3xl text-blue-300">Instrucciones</p>
                        <p style={{ whiteSpace: 'pre-line' }}>{instrucciones}</p>
                    </section>

                    <section className="w-full mt-6 flex gap-5 flex-col">
                        <p className="text-3xl text-blue-300">Para mas informacion del patrocinador</p>
                        <a
                            href={sitio}
                            target="_blank"
                            className="text-white hover:underline transition-colors hover:text-blue-400 text-2xl break-words break-all"
                        >Link: {sitio}
                        </a>
                    </section>

                    <section className="w-full mt-6 flex gap-5 flex-col">
                        <p className="text-3xl text-blue-300">Premios</p>
                        <p style={{ whiteSpace: 'pre-line' }} className="text-white text-2xl font-bold">
                            {premios.map((premio: string, i: number) => `🏆 Premio ${i + 1}:  ${premio}`).join('\n')}
                        </p>
                    </section>
                </div>
            </section >
        </div >
    )
}