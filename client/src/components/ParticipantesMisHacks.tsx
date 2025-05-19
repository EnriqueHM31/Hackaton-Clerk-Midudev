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
}

export default function ParticipantesMisHacks() {
    const { user } = useUser();
    const [participaciones, setParticipaciones] = useState<Participacion[]>([]);
    const id_usuario = user?.id;

    useEffect(() => {
        const handleAuthFlow = async () => {
            try {
                const resp = await fetch(`http://localhost:3000/api/hackatones/participaciones/idusuario?idUser=${id_usuario}`);
                const data = await resp.json();
                setParticipaciones(data);
            } catch (error) {
                console.error("Error al obtener hackatones del usuario:", error);
            }
        };

        if (id_usuario) {
            handleAuthFlow();
        }
    }, [id_usuario]); // Se vuelve a ejecutar cuando `id_usuario` esté definido

    console.log(participaciones);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 p-4 min-h-dvh max-w-laptop mx-auto">
            {participaciones.map((p, i) => (
                <Link to={`/hackaton/${p.hackathon_id}`} key={i} className="bg-black border border-green-400 rounded-2xl shadow p-6 hover:shadow-lg  z-50 flex flex-col gap-4 relative group justify-center hover:justify-start transition-all duration-300">
                    <p className="text-2xl font-bold text-green-400">Tu proyecto {p.nombre_proyecto}</p>
                    <p className="text-white text-md"><strong>Usuario: </strong>{p.username}</p>
                    <p className="text-white text-md"><strong>Repositorio: </strong> Link del repositorio</p>
                    <p className="text-white text-md">Registrado el: {p.joined_at}</p>

                    <div className="absolute w-full h-1/2 bottom-0 left-0 bg-black/80 rounded-2xl  z-100  flex justify-center items-center transform group-hover:scale-100 scale-0 transition-transform ">
                        <p className="text-green-400 text-2xl font-bold">Ver Hackaton</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
