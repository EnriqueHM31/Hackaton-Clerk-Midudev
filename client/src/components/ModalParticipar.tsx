'use client';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


interface Props {
    user_id: string;
    idHack: number;
    username: string;
}

export default function FormularioParticipacion({ user_id: id_usuario, idHack: id_hackaton, username }: Props) {
    const [abierto, setAbierto] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [participacionActiva, setParticipacionActiva] = useState(false);


    useEffect(() => {
        const fetchParticipantes = async () => {
            try {
                const res = await fetch(
                    `/api/participaciones?idHack=${encodeURIComponent(
                        id_hackaton
                    )}${id_usuario ? `&idUser=${encodeURIComponent(id_usuario)}` : ""}`
                );
                const data = await res.json();

                if (res.ok && Array.isArray(data) && data.length > 0) {
                    setParticipacionActiva(true);
                }
            } catch (error) {
                toast.error("Error al conectar con el servidor");
            }
        };

        if (id_hackaton) {
            fetchParticipantes();
        }
    }, []);


    const [participacion, setParticipacion] = useState({
        user_id: id_usuario,
        username: username,
        hackathon_id: id_hackaton,
        github_perfil: '',
        nombre_proyecto: '',
        repositorio: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setParticipacion((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/registerparticipar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(participacion),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || 'Error al registrar participación');
            } else {
                toast.success(data.message || 'Participación registrada exitosamente ✅');

                setParticipacion({
                    user_id: id_usuario,
                    username: username,
                    hackathon_id: id_hackaton,
                    github_perfil: '',
                    nombre_proyecto: '',
                    repositorio: '',
                });
                setAbierto(false);
                setDisabled(true);
            }
        } catch (err) {
            toast.error('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {
                participacionActiva ? (
                    <div className="flex w-fit bg-black z-50  ">
                        <p className="text-4xl font-bold bg-blue-500 px-6 py-3 rounded-3xl">
                            Ya estas participando
                        </p>
                    </div>
                ) : (
                    <button
                        onClick={() => setAbierto(true)}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all z-50 w-fit"
                    >
                        Participar
                    </button>
                )
            }

            {abierto && (
                <div className="fixed inset-0 bg-black/60  flex items-center justify-center px-4 z-[1000]">
                    <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-full max-w-lg relative flex flex-col gap-6">
                        <button
                            onClick={() => setAbierto(false)}
                            className="absolute top-2 right-2 text-white text-5xl font-bold hover:text-pink-500"
                        >
                            ×
                        </button>
                        <h2 className="text-3xl font-bold">Formulario de participación</h2>
                        <p className='text-sm text-white/50 font-bold'>Si es un equipo, escribe el GitHub del líder</p>

                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                name="github_perfil"
                                type="url"
                                placeholder="Perfil de GitHub (https://github.com/usuario)"
                                className="p-3 rounded bg-gray-800 text-white"
                                required
                                value={participacion.github_perfil}
                                onChange={handleChange}
                            />

                            <input
                                name="nombre_proyecto"
                                type="text"
                                placeholder="Nombre del proyecto"
                                className="p-3 rounded bg-gray-800 text-white"
                                required
                                value={participacion.nombre_proyecto}
                                onChange={handleChange}
                            />

                            <input
                                name="repositorio"
                                type="url"
                                placeholder="Link del repositorio del proyecto"
                                className="p-3 rounded bg-gray-800 text-white"
                                required
                                value={participacion.repositorio}
                                onChange={handleChange}
                            />


                            {
                                !disabled ? <button
                                    type="submit"
                                    disabled={loading}
                                    className='bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold w-fit mx-auto mt-6'
                                >
                                    {loading ? 'Registrando...' : 'Registrar Participación'}
                                </button> : <div
                                    className='bg-blue-600 text-white  rounded-2xl font-bold w-fit mx-auto mt-6 px-6 py-3 '
                                >
                                    Participando
                                </div>

                            }
                        </form>
                    </div>
                </div>
            )}
            <Toaster position="bottom-center" toastOptions={{ removeDelay: 3000, style: { background: 'rgb(0,0,0)', fontSize: '1.1rem', color: '#fff', borderColor: '#48e', borderRadius: '20px', borderWidth: '3px', padding: '10px 20px' } }} />
        </>
    );
}
