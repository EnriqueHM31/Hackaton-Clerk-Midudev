import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

interface Participacion {
    id: number;
    user_id: string;
    username: string;
    nombre_proyecto: string;
    github_perfil: string;
    repositorio: string;
    joined_at: string;
}

export default function ParticipantesMisHacks() {
    const { user } = useUser();
    const [participaciones, setParticipaciones] = useState<Participacion[]>([]);
    const id_usuario = user?.id;

    useEffect(() => {
        const handleAuthFlow = async () => {
            try {
                const resp = await fetch(`http://localhost:3000/api/hackatones/hackaton/${id_usuario}`);
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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {participaciones.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl shadow p-4 border border-gray-200 hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2">{p.nombre_proyecto}</h2>
                    <p className="text-gray-700"><strong>Usuario:</strong> {p.username}</p>
                    <p className="text-gray-700"><strong>GitHub:</strong> <a href={p.github_perfil} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{p.github_perfil}</a></p>
                    <p className="text-gray-700"><strong>Repositorio:</strong> <a href={p.repositorio} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{p.repositorio}</a></p>
                    <p className="text-gray-500 text-sm mt-2">Registrado el: {new Date(p.joined_at).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}
