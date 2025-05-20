import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Participacion {
    id: number;
    user_id: string;
    username: string;
    nombre_proyecto: string;
    github_perfil: string;
    repositorio: string;
    joined_at: string;
    hackathon_id: number;
    ganaste: boolean;
    correo?: string;
}

interface Ganador {
    participanteid: string;
    fechaasignacion: string;
    lugar: number;
    idhack: number;
}

interface ParticipacionExtendida extends Participacion {
    ganaste: boolean;
}

export default function ParticipantesMisHacks() {
    const API = import.meta.env.VITE_API_URL;
    const { user } = useUser();
    const [participaciones, setParticipaciones] = useState<Participacion[]>([]);
    const id_usuario = user?.id;

    useEffect(() => {
        const fetchDatosUsuario = async () => {
            try {
                const [participacionesResp, ganadosResp] = await Promise.all([
                    fetch(
                        `${API}/api/hackatones/participaciones/idusuario?idUser=${id_usuario}`
                    ),
                    fetch(
                        `${API}/api/hackatones/ganados/idusuario?idUser=${id_usuario}`
                    ),
                ]);

                const [participacionesData, ganadosData] = await Promise.all([
                    participacionesResp.json(),
                    ganadosResp.json(),
                ]);

                const datosExtendidos: ParticipacionExtendida[] = await Promise.all(
                    participacionesData.map(async (p: Participacion) => {
                        const gano = ganadosData.some(
                            (g: Ganador) => g.idhack === p.hackathon_id
                        );
                        let correo;

                        if (gano) {
                            try {
                                const correoResp = await fetch(
                                    `${API}/api/users/correo/${p.hackathon_id}`
                                );
                                const correoData = await correoResp.json();
                                correo = correoData.email;
                            } catch (e) {
                                console.error(
                                    `Error al obtener el correo del dueño del hackatón ${p.hackathon_id}`,
                                    e
                                );
                            }
                        }

                        return {
                            ...p,
                            ganaste: gano,
                            correo,
                        };
                    })
                );

                setParticipaciones(datosExtendidos);
            } catch (error) {
                console.error("Error al obtener datos del usuario:", error);
            }
        };

        if (id_usuario) {
            fetchDatosUsuario();
        }
    }, [id_usuario]);

    function Ganaste(yaganaste: boolean) {
        return yaganaste
            ? {
                contenedor: "border-pink-400 hover:shadow-pink-400",
                texto: "text-pink-400",
                text_mensaje: "text-green-400",
            }
            : {
                contenedor: "border-green-400 hover:shadow-green-400",
                texto: "text-green-400",
                text_mensaje: "text-pink-400",
            };
    }

    function fecha(joined_at: Date) {
        const fecha = new Date(joined_at);
        return fecha.toLocaleDateString("es-ES");
    }

    return (
        <section className="flex flex-col items-center justify-center gap-6 w-full">
            <h2 className="text-center text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-pink-400 to-secondary">
                Tus Hackatones
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-4 min-h-dvh max-w-laptop mx-auto">
                {participaciones.map((p, i) => {
                    const colores = Ganaste(p.ganaste);

                    return (
                        <div className="relative w-full group h-fit">
                            <Link
                                to={`/hackaton/${p.hackathon_id}`}
                                key={i}
                                className={`shadow-lg bg-black border rounded-2xl p-6 hover:shadow-lg z-50 flex flex-col gap-4 relative justify-start transition-all duration-300 min-h-80 max-h-80 ${colores.contenedor
                                    } border-${colores.texto.split("-")[1]}-400`}
                            >
                                <p className={`text-3xl font-bold break-words break-all ${colores.texto}`}>
                                    Proyecto {p.nombre_proyecto}
                                </p>
                                <p className="text-white text-md break-words break-all">
                                    <strong className={`${colores.texto}`}>Usuario: </strong>
                                    {p.username}
                                </p>
                                <p className="text-white text-md break-words break-all">
                                    <strong className={`${colores.texto}`}>Repositorio: </strong>
                                    {p.repositorio}
                                </p>
                                <p className="text-white text-md break-words break-all">
                                    <strong className={`${colores.texto}`}>Participaste:</strong>{" "}
                                    {fecha(new Date(p.joined_at))}
                                </p>
                            </Link>

                            <div
                                className="absolute w-full h-1/2 bottom-0 left-0 bg-black/80 rounded-2xl z-50 flex justify-center items-center transform group-hover:scale-100 scale-0 transition-transform"
                                onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al Link
                            >
                                <div
                                    className={`${colores.text_mensaje} text-xl font-bold flex items-center justify-center px-6 text-wrap flex-col`}
                                >
                                    {
                                        p.correo && p.ganaste ? (
                                            <>

                                                <p>¡Ya ganaste este hackatón! 🎉</p>
                                                <a
                                                    href={`mailto:${p.correo}`}
                                                    className="text-sm hover:underline hover:text-pink-300"
                                                    onClick={(e) => e.stopPropagation()} // También evita propagación en el clic
                                                >
                                                    Contactar por correo
                                                </a>
                                            </>

                                        ) : (
                                            <p>Visita y revisa el hackaton💭</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
