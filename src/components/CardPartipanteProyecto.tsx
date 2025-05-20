interface Participante {
    id: number;
    user_id: string;
    username: string;
    nombre_proyecto: string;
    github_perfil: string;
    repositorio: string;
    joined_at: string;
}

interface Props {
    selected: Participante;
    setSelected: React.Dispatch<React.SetStateAction<Participante | null>>;
    formatearFecha: (fechaISO: string) => string;
}


export default function CardPartipanteProyecto({ selected, setSelected, formatearFecha }: Props) {
    return (
        <div
            className="fixed inset-0 bg-gradient-to-t from-black/80 to-black/40 bg-opacity-70 flex items-center justify-center z-50 "
            onClick={() => setSelected(null)}
        >
            <div
                className=" text-black rounded-lg max-w-5xl w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => setSelected(null)}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-xl"
                    aria-label="Cerrar modal"
                >
                    &times;
                </button>

                <div className="relative rounded-lg bg-black p-2 w-full border border-pink-400">
                    <div className="relative flex text-center gap-6">
                        <div className="flex pl-3.5 pt-3">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="-ml-0.5 mr-1.5 h-3 w-3 text-red-500/20"
                            >
                                <circle r="12" cy="12" cx="12"></circle>
                            </svg>
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="-ml-0.75 mr-1.5 h-3 w-3 text-yellow-500/20"
                            >
                                <circle r="12" cy="12" cx="12"></circle>
                            </svg>
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="-ml-0.75 mr-1.5 h-3 w-3 text-green-500/20"
                            >
                                <circle r="12" cy="12" cx="12"></circle>
                            </svg>
                        </div>
                        <span className="absolute inset-x-0 top-2 text-white font-bold text-4xl">{selected.nombre_proyecto}.tsx</span>
                    </div>

                    <div className="mt-5 space-y-1.5 px-5 pb-10 text-4xl">
                        <p className="mt-4 font-mono text-xs font-normal tracking-wide text-violet-400">
                            <span className="text-2xl text-slate-500">&lt;</span>
                            <span className="text-2xl text-pink-400">Proyecto</span>
                            <span className="text-2xl text-slate-500">&gt;</span>
                        </p>
                        <p className="ml-3 font-mono text-xs font-normal tracking-wide text-violet-400">
                            <span className="text-2xl text-slate-500">&nbsp;&lt;</span>
                            <span className="text-2xl text-pink-400">Username</span>
                            <span className="text-2xl text-slate-500">&gt;</span>
                            <span className="text-2xl relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10">
                                <span className="text-2xl relative text-blue-400">{selected.username}</span>
                            </span>
                            <span className="text-2xl text-slate-500">;&lt;/</span>
                            <span className="text-2xl text-pink-400">Username</span>
                            <span className="text-2xl text-slate-500">&gt;</span>
                        </p>
                        <p className="ml-3 font-mono text-xs font-normal leading-4 tracking-wide text-violet-400">
                            <span className="text-2xl text-slate-500">&nbsp;&lt;</span>
                            <span className="text-2xl text-pink-400">GitHub</span>
                            <span className="text-2xl text-slate-500">&gt;</span> <br />
                            <a
                                href={selected.github_perfil}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10"
                            >
                                <span className="text-2xl relative text-blue-400 hover:text-white break-words break-all">&nbsp;&nbsp;&nbsp;{selected.github_perfil}</span>
                            </a><br />
                            <span className="text-2xl text-slate-500">&nbsp;&lt;/</span>
                            <span className="text-2xl text-pink-400">GitHub</span>
                            <span className="text-2xl text-slate-500">&gt;</span>
                        </p>

                        <p className="ml-3 font-mono text-xs font-normal tracking-wide text-violet-400">
                            <span className="text-2xl text-slate-500">&nbsp;&lt;</span>
                            <span className="text-2xl text-pink-400">Repositorio</span>
                            <span className="text-2xl text-slate-500">&gt;</span><br />
                            <a
                                href={selected.github_perfil}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10"
                            >
                                <span className="text-2xl relative text-blue-400 hover:text-white break-words break-all">&nbsp;&nbsp;&nbsp;{selected.github_perfil}</span>
                            </a><br />
                            <span className="text-2xl text-slate-500">&nbsp;&lt;/</span>
                            <span className="text-2xl text-pink-400">Repositorio</span>
                            <span className="text-2xl text-slate-500">&gt;</span>
                        </p>

                        <p className="ml-3 font-mono text-xs font-normal tracking-wide text-violet-400">
                            <span className="text-2xl text-slate-500">&nbsp;&lt;</span>
                            <span className="text-2xl text-pink-400">FechaEntrega</span>
                            <span className="text-2xl text-slate-500">&gt;</span>
                            <span className="text-2xl relative inline-block px-1 before:absolute before:-inset-0.5 before:block before:rounded before:bg-blue-500/10">
                                <span className="text-2xl relative text-blue-400">{formatearFecha(selected.joined_at)}</span>
                            </span>
                            <span className="text-2xl text-slate-500">&lt;/</span>
                            <span className="text-2xl text-pink-400">FechaEntrega</span>
                            <span className="text-2xl text-slate-500">&gt;</span>
                        </p>

                        <p className="font-mono text-xs font-normal tracking-wide text-violet-400">
                            <span className="text-2xl text-slate-500">&lt;/</span>
                            <span className="text-2xl text-pink-400">Proyecto</span>
                            <span className="text-2xl text-slate-500">&gt;</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}