'use client';
import { useState } from 'react';

type Props = {
    userId: string;
    onRoleAssigned: () => void;
};

export default function AssignRoleModal({ userId, onRoleAssigned }: Props) {
    const [role, setRole] = useState('participante');
    const [loading, setLoading] = useState(false);

    const assignRole = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/api/roles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role, userId }),
            });

            if (res.ok) {
                onRoleAssigned();
            } else {
                console.error('Error al asignar rol:', res);
                throw new Error('Error al asignar rol.');
            }
        } catch (error) {
            console.error("Error al asignar rol22222:", error);
            // Aquí puedes mostrar un mensaje de error al usuario si quieres
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-black/40 z-50">
            <div className="bg-black border border-white/50 p-13 rounded-3xl shadow-md  text-center">
                <h2 className="text-4xl font-bold mb-6">Selecciona tu rol</h2>
                <div className="flex justify-center gap-6 mb-6">
                    <button
                        onClick={() => setRole('participante')}
                        className={`px-6 py-2 rounded border ${role === 'participante'
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-transparent text-white border-pink-400/50 hover:bg-white/20'
                            }`}
                    >
                        Participante
                    </button>
                    <button
                        onClick={() => setRole('organizador')}
                        className={`px-6 py-2 rounded border ${role === 'organizador'
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-transparent text-white border-pink-400/50 hover:bg-white/20'
                            }`}
                    >
                        Organizador
                    </button>
                </div>
                <button
                    className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={assignRole}
                    disabled={loading || !role}
                >
                    {loading ? 'Asignando...' : 'Confirmar'}
                </button>
            </div>
        </div>
    );
}
