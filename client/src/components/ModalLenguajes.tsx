'use client';
import { lenguajesSelect } from '../assets/js/constantes';
import toast, { Toaster } from 'react-hot-toast';

interface FormData {
    lenguajes: string[];
}

interface Props {
    formData: FormData;
    handleCloseModal: () => void;
    toggleLenguaje: (lang: string) => void; // agrego parámetro extra para indicar si es "Libre"
}

export default function ModalLenguajes({ formData, handleCloseModal, toggleLenguaje }: Props) {

    const handleClick = () => {
        if (formData.lenguajes.length === 0) {
            toast.error('Debes seleccionar al menos un lenguaje');
            return;
        }
        toast.success('Lenguajes guardados');
        setTimeout(() => handleCloseModal(), 200);
    }
    return (
        <>

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="bg-gray-900 text-white p-6 rounded-xl w-full max-w-md shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Selecciona los lenguajes</h2>
                    <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                        {lenguajesSelect
                            .filter(({ value }) => value !== '') // Filtra los vacíos
                            .map(({ value: lang }) => (
                                <label key={lang} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        name={lang}
                                        type="checkbox"
                                        checked={formData.lenguajes.includes(lang)}
                                        onChange={() => toggleLenguaje(lang)}
                                        className="accent-blue-500"
                                    />
                                    {lang}
                                </label>
                            ))
                        }
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button onClick={handleClick} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
            <Toaster position="bottom-center" toastOptions={{ removeDelay: 3000, style: { background: 'rgb(0,0,0)', fontSize: '1.1rem', color: '#fff', borderColor: '#48e', borderRadius: '20px', borderWidth: '3px', padding: '10px 20px' } }} />
        </>
    );
}
