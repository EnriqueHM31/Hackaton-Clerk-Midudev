import LOGO from '../assets/images/logo.webp';
type WelcomeModalProps = {
    role?: string | null;
    onClose: () => void;
};

export default function WelcomeModal({ role, onClose }: WelcomeModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-black/40 z-50">
            <div className="bg-black border border-white/50 p-13 rounded-3xl shadow-md  text-center">
                <div className="flex items-center justify-center mb-2 gap-6">
                    <img src={LOGO} className="w-12 h-12 object-contain" />
                    <h2 className="text-4xl font-bold mb-4">¡Bienvenido a DevArena!</h2>
                </div>
                <p className="mb-6 text-2xl">Ahora ya eres un {role ? role : 'usuario'}</p>
                <button className="bg-purple-400 text-white px-4 py-2 rounded" onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}
