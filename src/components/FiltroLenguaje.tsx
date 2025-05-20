
import { lenguajesSelect } from '../assets/js/constantes';

interface FiltroLenguajesProps {
    onFiltrar: (lenguaje: string) => void;
}

const FiltroLenguajes: React.FC<FiltroLenguajesProps> = ({ onFiltrar }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFiltrar(e.target.value);
    };

    return (
        <div className="w-full px-6 mt-6 overflow-y-auto min-h-[200px] bg-black">
            <label className="text-white font-semibold mb-4 block">Filtrar por lenguaje:</label>
            <div className="relative">
                <select
                    className="w-full rounded-md bg-black text-white border border-primary px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 max-h-40"
                    onChange={handleChange}
                >
                    {
                        lenguajesSelect.map((lenguaje) => (
                            <option key={lenguaje.value} value={lenguaje.value}>
                                {lenguaje.label}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
};

export default FiltroLenguajes;
