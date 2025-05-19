'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface ModalPremiosProps {
    premios: string[];
    handleClose: () => void;
    setPremios: (premios: string[]) => void;
}

export default function ModalPremios({ premios, handleClose, setPremios }: ModalPremiosProps) {
    const [inputs, setInputs] = useState<string[]>(premios);

    const handleInputChange = (index: number, value: string) => {
        const nuevos = [...inputs];
        nuevos[index] = value;
        setInputs(nuevos);
    };

    const handleAdd = () => {
        setInputs([...inputs, '']);
    };

    const handleRemove = (index: number) => {
        const nuevos = [...inputs];
        nuevos.splice(index, 1);
        setInputs(nuevos);
    };

    const handleSave = () => {
        if (inputs.length === 0) {
            toast.error('Debes agregar al menos un premio');
            return;
        }

        const filtrados = inputs.filter((p) => p.trim() !== '');
        setPremios(filtrados);

        toast.success("Se han guardado los premios");

        setTimeout(() => {
            handleClose();
        }, 200);

    };

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-black/70 to-black/40 bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md space-y-4">
                <h3 className="text-xl font-bold text-white">Premios del Hackathon</h3>
                {inputs.map((premio, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={premio}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            placeholder={`Premio ${index + 1}`}
                            className="w-full p-2 rounded bg-black border border-secondary text-white"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="text-red-500 hover:text-red-300 text-xl"
                        >
                            ×
                        </button>
                    </div>
                ))}
                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
                    >
                        Agregar premio
                    </button>
                    <div className="space-x-2">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                        >
                            Guardar
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}
