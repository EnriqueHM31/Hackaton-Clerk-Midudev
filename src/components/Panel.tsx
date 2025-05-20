
import React, { useState, useMemo } from 'react';
import PreviewCard from './CarPrev';
import ModalLenguajes from './ModalLenguajes';
import ModalPremios from './ModalPremios';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';

export default function HackathonForm() {
    const API = import.meta.env.VITE_API_URL;
    const { user } = useUser();
    const id_usuario = user?.id;
    const preset_name = import.meta.env.VITE_CLOUD_PRESENT;
    const cloud_name = import.meta.env.VITE_CLOUD_NAME;


    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        startDate: '',
        endDate: '',
        instrucciones: '',
        imagen: null as File | null,
        lenguajes: ['JavaScript', 'Python'],
        premios: [] as string[],
        sitio: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [showPremiosModal, setShowPremiosModal] = useState(false);

    const fecha = useMemo(() => {
        return formData.startDate || formData.endDate
            ? `${formData.startDate || '...'} - ${formData.endDate || '...'}`
            : 'Fecha no definida';
    }, [formData.startDate, formData.endDate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const toggleLenguaje = (lang: string) => {
        setFormData((prev) => {
            const esLibre = lang === "Lenguaje Libre";
            const yaEsta = prev.lenguajes.includes(lang);

            // Si se hace click en "Lenguaje Libre"
            if (esLibre) {
                return {
                    ...prev,
                    lenguajes: yaEsta ? [] : [lang]  // toggle: si ya está, quitarlo; si no, dejar solo ese
                };
            }

            // Si está "Lenguaje Libre" activo, no permitir agregar otros
            if (prev.lenguajes.includes("Lenguaje Libre")) {
                return prev; // no hacer nada
            }

            // Toggle normal para otros lenguajes
            const nuevos = yaEsta
                ? prev.lenguajes.filter((l) => l !== lang)
                : [...prev.lenguajes, lang];

            return {
                ...prev,
                lenguajes: nuevos
            };
        });
    };


    const setPremios = (nuevosPremios: string[]) => {
        setFormData((prev) => ({ ...prev, premios: nuevosPremios }));
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, imagen: file }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let imageUrl = "";

        if (formData.imagen) {
            const data = new FormData();
            data.append('file', formData.imagen);
            data.append('upload_preset', preset_name);

            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                    method: 'POST',
                    body: data
                });

                const file = await response.json();
                imageUrl = file.secure_url;
            } catch (error) {
                console.error(error);
                toast.error("Error al subir la imagen");
                return;
            }
        }

        const data = {
            user_id: id_usuario,
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            start_date: formData.startDate,
            end_date: formData.endDate,
            lenguajes: formData.lenguajes,
            imagen: imageUrl,
            instrucciones: formData.instrucciones,
            premios: formData.premios,
            sitio: formData.sitio,
        };


        try {
            const res = await fetch(`${API}/api/hackatones/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(`Error al registrar: datos: ${data.message}`);
            }

            toast.success('Se ha creado el hackathon correctamente');
        } catch (error) {
            console.error(error);
            toast.error('Ocurrió un error al crear el hackathon');
        }
    };

    return (
        <>
            <div className="p-8 rounded-2xl shadow-lg w-full mb-16 flex gap-10 relative justify-center items-center">
                {/* Formulario */}
                <div className="flex-1 bg-black z-50 p-5 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-pink-400 to-secondary">
                        Crear nuevo Hackathon
                    </h2>
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre del hackathon"
                            className="p-3 border border-secondary rounded bg-black placeholder:text-white/50 text-white"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="descripcion"
                            placeholder="Descripción"
                            rows={4}
                            className="p-3 border border-secondary rounded bg-black placeholder:text-white/50 text-white resize-none"
                            value={formData.descripcion}
                            onChange={handleChange}
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <label htmlFor="startDate" className="flex flex-col gap-2 cursor-pointer relative">
                                <p className="text-secondary text-2xl font-bold">Fecha de inicio</p>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        className="p-3 border border-secondary rounded bg-black placeholder:text-white/50 text-white appearance-none w-full"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        required
                                    />
                                    {/* Ícono calendario blanco */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                </div>
                            </label>

                            <label htmlFor="endDate" className="flex flex-col gap-2 cursor-pointer relative">
                                <p className="text-secondary text-2xl font-bold">Fecha de fin</p>
                                <div className="relative">
                                    <input
                                        type="date"
                                        name="endDate"
                                        id="endDate"
                                        className="p-3 border border-secondary rounded bg-black placeholder:text-white/50 text-white appearance-none w-full"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        required
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                </div>
                            </label>
                        </div>

                        <textarea
                            name="instrucciones"
                            placeholder="Instrucciones"
                            className="p-3 border border-secondary rounded bg-black placeholder:text-white/50 text-white resize-none"
                            value={formData.instrucciones}
                            onChange={handleChange}
                            required
                        />

                        <div className="grid w-full items-center gap-3">
                            <label
                                htmlFor="picture"
                                className="text-secondary text-2xl font-bold cursor-pointer "
                            >
                                Imagen
                            </label>
                            <input
                                id="picture"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImage(e)}
                            />
                            <button
                                type="button"
                                onClick={() => document.getElementById('picture')?.click()}
                                className="flex h-10 w-full rounded-md border border-secondary bg-black px-3 py-2 text-sm text-white text-center items-center justify-center"
                            >
                                Seleccionar imagen
                            </button>
                        </div>

                        {/* Lenguajes */}
                        <div className="flex flex-col gap-4">
                            <p className="text-secondary text-2xl font-bold mb-2">Lenguajes seleccionados:</p>
                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                className="bg-black border border-secondary text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Escoge los lenguajes
                            </button>
                            <div className="flex flex-wrap gap-4">
                                {formData.lenguajes.length > 0 ? (
                                    formData.lenguajes.map((lang) => (
                                        <span
                                            key={lang}
                                            className="px-3 py-1 bg-blue-700 text-white rounded-full text-sm"
                                        >
                                            {lang}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400">Ninguno seleccionado</span>
                                )}
                            </div>
                        </div>

                        {/* Premios */}
                        <div className="flex flex-col gap-4">
                            <p className="text-secondary text-2xl font-bold mb-2">Premios</p>
                            <button
                                type="button"
                                onClick={() => setShowPremiosModal(true)}
                                className="bg-black border border-secondary text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Añadir premios
                            </button>
                            <ul className="list-disc list-inside text-white">
                                {formData.premios.length > 0 ? (
                                    formData.premios.map((premio, i) => (
                                        <li key={i} className="list-none">
                                            🏆 Premio {i + 1} : {premio}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-400 list-none">Sin premios añadidos</li>
                                )}
                            </ul>
                        </div>

                        <label htmlFor="sitio" className="flex flex-col gap-2">
                            <p className="text-secondary text-2xl font-bold">URL del patrocinador</p>
                            <input
                                type="text"
                                name="sitio"
                                id="sitio"
                                placeholder="https://www.patrocinador.com"
                                className="p-3 border border-secondary rounded bg-black placeholder:text-white/50 text-white"
                                value={formData.sitio}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <div className="relative group flex items-center justify-center w-full">
                            <button className="w-full text-center relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                                    <div className="relative z-10 flex items-center space-x-2">
                                        <span className="transition-all duration-500 group-hover:translate-x-1 w-full text-center">
                                            Crear Hackathon
                                        </span>
                                    </div>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Vista previa */}
                <PreviewCard
                    nombre={formData.nombre}
                    descripcion={formData.descripcion}
                    fecha={fecha}
                    lenguajes={formData.lenguajes}
                    imagen={formData.imagen}
                />

                {/* Modal de lenguajes */}
                {showModal && (
                    <ModalLenguajes
                        formData={formData}
                        handleCloseModal={() => setShowModal(false)}
                        toggleLenguaje={toggleLenguaje}
                    />
                )}

                {/* Modal de premios */}
                {showPremiosModal && (
                    <ModalPremios
                        premios={formData.premios}
                        handleClose={() => setShowPremiosModal(false)}
                        setPremios={setPremios}
                    />
                )}

            </div>
        </>
    );
}
