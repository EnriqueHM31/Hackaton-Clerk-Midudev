
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CardPartipanteProyecto from './CardPartipanteProyecto';

type Participante = {
    id: number;
    user_id: string;
    username: string;
    nombre_proyecto: string;
    github_perfil: string;
    repositorio: string;
    joined_at: string;
};

type Hackaton = {
    id: number;
    user_id: string;
    nombre: string;
    descripcion: string;
    start_date: string;
    end_date: string;
    lenguajes: string[]; // o string
    imagen: string;
    sitio: string;
    premios: string[];
};

type Ganador = {
    id: number;
    participanteid: string;
    lugar: number;
};

type Props = {
    idHack: string;
};

export default function ParticipantesHackaton({ idHack }: Props) {
    const { user } = useUser();
    const userId = user?.id || '';

    const [participantes, setParticipantes] = useState<Participante[]>([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Participante | null>(null);
    const [ganadores, setGanadores] = useState<{ lugar: number; participante: Participante }[]>([]);
    const [modalConfirm, setModalConfirm] = useState<{ participante: Participante; lugar: number } | null>(null);
    const [ganadoresLoading, setGanadoresLoading] = useState(false);
    const [hackaton, setHackaton] = useState<Hackaton | null>(null);
    const [ganadoresExisten, setGanadoresExisten] = useState<Ganador[]>([]);



    useEffect(() => {
        const fetchData = async () => {
            console.log(idHack);
            setLoading(true);
            try {
                const [resHackaton, resParticipantes, resGanadores] = await Promise.all([
                    fetch(`http://localhost:3000/api/hackatones/hackaton/${idHack}`),
                    fetch(`http://localhost:3000/api/hackatones/participaciones/${idHack}`),
                    fetch(`http://localhost:3000/api/hackatones/ganadores/${idHack}`)
                ]);

                const [dataHackaton, dataParticipantes, dataGanadores] = await Promise.all([
                    resHackaton.json(),
                    resParticipantes.json(),
                    resGanadores.json()
                ]);

                if (!resHackaton.ok) toast.error(dataHackaton.error || 'Error al obtener datos del hackatón');
                else setHackaton(dataHackaton);

                if (!resParticipantes.ok) toast.error(dataParticipantes.error || 'Error al obtener datos del hackatón');
                else setParticipantes(dataParticipantes);

                if (!resGanadores.ok) toast.error(dataGanadores.error || 'Error al obtener datos del hackatón');
                else {
                    if (dataGanadores.ganadores.length > 0) {
                        setGanadoresExisten(dataGanadores.ganadores);
                        setGanadoresLoading(true)
                    } else {
                        setGanadoresExisten([]);
                        setGanadoresLoading(false);
                    }
                }


            } catch (error) {
                console.error('Error al conectar con el servidor:', error);
                toast.error('Error de red al obtener los datos');
            } finally {
                setLoading(false);
            }
        };

        if (idHack && userId) {
            fetchData();
        }
    }, [userId, idHack]);



    const visibles = participantes.slice(0, visibleCount);

    const handleVerMas = () => {
        setVisibleCount((prev) => Math.min(prev + 10, participantes.length));
    };

    const formatearFecha = (fechaISO: string): string => {
        const fecha = new Date(fechaISO);
        const opciones: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'America/Mexico_City',
        };
        return fecha.toLocaleString('es-MX', opciones);
    };

    // Obtener el primer lugar libre disponible
    const obtenerLugarLibre = () => {
        const lugaresOcupados = ganadores.map((g) => g.lugar);
        const numeroPremios = hackaton?.premios.length || 0;
        for (let i = 1; i <= numeroPremios; i++) {
            if (!lugaresOcupados.includes(i)) {
                return i;
            }
        }
        return null;
    };

    // En lugar de asignar directamente, abrimos modal para confirmar
    const asignarGanador = (participante: Participante) => {
        const yaEsGanador = ganadores.find((g) => g.participante.id === participante.id);
        if (yaEsGanador) return;

        const lugarLibre = obtenerLugarLibre();
        if (!lugarLibre) {
            toast.error('Ya se asignaron todos los premios');
            return;
        }

        setModalConfirm({ participante, lugar: lugarLibre });
    };

    const confirmarAsignacion = () => {
        if (!modalConfirm) return;

        setGanadores((prev) => [...prev, { lugar: modalConfirm.lugar, participante: modalConfirm.participante }]);
        toast.success(`Ganador ${modalConfirm.lugar} asignado`);
        setModalConfirm(null);
    };

    const cancelarAsignacion = () => {
        setModalConfirm(null);
    };

    const getLugarParticipante = (id: string) => {
        if (ganadoresLoading) return null;
        const entry = ganadores.find((g) => g.participante.user_id === id);
        return entry ? entry.lugar : null;
    };

    // Quitar ganador y reordenar lugares consecutivamente
    const quitarGanador = (idParticipante: string) => {
        setGanadores((prev) => {
            const filtrados = prev.filter((g) => g.participante.user_id !== idParticipante);
            return filtrados.map((g, index) => ({
                ...g,
                lugar: index + 1,
            }));
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (ganadores.length !== hackaton?.premios.length) {
            toast.error(`Debes asignar los ${hackaton?.premios.length} ganadores antes de guardar`);
            return;
        }

        const payload = {
            idHack,
            ganadores: ganadores.map((g) => ({
                lugar: g.lugar,
                participanteId: g.participante.user_id,
            })),
        };

        try {
            const res = await fetch(`http://localhost:3000/api/hackatones/ganadores/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });


            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || 'Error al guardar los ganadores');
                return;
            }

            toast.success(data.message || 'Ganadores guardados exitosamente');
        } catch (error) {
            console.error(error);
            toast.error('Error al conectar con el servidor');
        }
    };


    if (loading) return <p className="text-white text-2xl w-full text-center mt-6">Cargando participantes...</p>;

    if (participantes.length === 0)
        return <p className="text-gray-300 text-2xl font-bold w-full text-center mt-6">No hay participantes inscritos aún.</p>;

    console.log(ganadoresLoading);
    console.log(ganadoresExisten);

    function existenGanadores(p: Participante) {
        console.log("ganadoresLoading:", ganadoresLoading);
        console.log("p.user_id:", p.user_id);
        console.log("ganadoresExisten:", ganadoresExisten);

        if (!ganadoresLoading) return null;

        const ganador = ganadoresLoading
            ? ganadoresExisten.find((g: Ganador) => g.participanteid === p.user_id)
            : null;


        console.log("ganador encontrado:", ganador);
        return ganador;
    }


    return (
        <>


            {/* LISTA DE PARTICIPANTES */}
            <section className="p-4 rounded-xl shadow-md w-full mx-auto mt-8 flex-1 text-white max-w-4xl">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-4 w-full mx-auto">
                    {visibles.map((p) => {
                        // Solo si ya cargaron ganadores, verificamos si este participante es ganador
                        const ganadorEncontrado = existenGanadores(p);


                        const lugar = ganadorEncontrado ? ganadorEncontrado.lugar : getLugarParticipante(p.user_id);

                        return (
                            <li key={p.id}>
                                <div
                                    onClick={() => setSelected(p)}
                                    className="w-full text-left p-3 border border-gray-600 rounded-md hover:bg-gray-800 transition flex justify-between items-center"
                                >
                                    <div>
                                        <p>
                                            <strong>Username:</strong> {p.username}
                                        </p>
                                    </div>
                                    <div className="ml-4">
                                        {ganadoresLoading ? (
                                            lugar ? (
                                                <span className="text-green-400 font-bold">Ganador {lugar}</span>
                                            ) : (
                                                <span className="text-gray-500">Eliminado</span>
                                            )
                                        ) : (
                                            lugar ? (
                                                <span className="text-green-400 font-bold">Ganador {lugar}</span>
                                            ) : (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        asignarGanador(p);
                                                    }}
                                                    className="text-sm px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-white"
                                                >
                                                    Elegir Ganador
                                                </button>

                                            )
                                        )}

                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                {visibleCount < participantes.length && (
                    <div className="col-span-2 flex items-center justify-center">
                        <button
                            onClick={handleVerMas}
                            className="bg-gradient-to-b from-black/25 to-black/50 font-bold text-lg px-6 py-3 rounded-2xl border border-secondary hover:bg-purple-900/20 transition-colors duration-300 z-50 mt-7"
                        >
                            Ver más
                        </button>
                    </div>
                )}
            </section >
            {ganadoresLoading === false && (
                <section className="bg-gray-900 p-6 rounded-xl max-w-4xl mx-auto mb-10 text-white">
                    <h2 className="text-3xl font-bold mb-4 text-center">Ganadores asignados</h2>
                    {ganadores.length === 0 && (
                        <p className="text-gray-400 text-center">No hay ganadores asignados aún.</p>
                    )}
                    {ganadores.length > 0 && (
                        <form
                            onSubmit={(e) => {
                                handleSubmit(e);
                            }}
                            className="space-y-4"
                        >
                            {ganadores.map(({ lugar, participante }) => (
                                <div key={participante.id} className="flex items-center gap-4">
                                    <label className="w-24 font-semibold">Ganador {lugar}:</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={participante.username}
                                        className="flex-1 bg-gray-800 text-white rounded px-3 py-2 cursor-not-allowed"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => quitarGanador(participante.user_id)}
                                        className="ml-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
                                        title="Quitar ganador"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}

                            {ganadores.length === hackaton?.premios.length && (
                                <button
                                    type="submit"
                                    className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white text-lg font-semibold mx-auto block"
                                >
                                    Enviar Ganadores
                                </button>
                            )}
                        </form>
                    )}
                </section>
            )
            }


            {/* Modal de confirmación */}
            {
                modalConfirm && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
                        onClick={cancelarAsignacion}
                    >
                        <div
                            className="bg-gray-900 rounded-xl p-6 w-full max-w-md text-white shadow-xl border border-gray-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-2xl font-bold mb-4">Confirmar ganador</h2>
                            <p className="mb-6">
                                ¿Estás seguro que deseas asignar a{' '}
                                <span className="font-semibold text-purple-400">{modalConfirm.participante.username}</span> como el{' '}
                                <span className="font-semibold">Ganador {modalConfirm.lugar}</span>?
                            </p>

                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={cancelarAsignacion}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={confirmarAsignacion}
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                selected && (
                    <CardPartipanteProyecto selected={selected} setSelected={setSelected} formatearFecha={formatearFecha} />
                )
            }
        </>
    );
};



