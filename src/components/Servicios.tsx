
import { Services_List } from '../mooks/Services.json';

const ANIMACIONES_CARDS_SERVICES = ['fade-right', 'fade-up', 'fade-left'];

export default function Servicios() {
    return (
        <section id="services" className="w-full flex flex-col items-center justify-center gap-16 xl:py-40 py-20 overflow-hidden">
            <div className="flex flex-col justify-center xl:gap-10 gap-6">
                <h2
                    data-aos="zoom-in"
                    data-aos-delay="100"
                    className="xl:text-5xl font-bold w-fit text-3xl rounded-2xl bg-primary text-white px-6 py-3"
                >
                    Beneficios
                </h2>
                <p data-aos="zoom-in" data-aos-delay="200" className="text-xl">
                    Desarrolladores de todos los niveles pueden participar en hackathons y competencias de desarrollo virtuales.
                    Desde la organización hasta la evaluación, DevArena proporciona una plataforma completa para que empresas,
                    universidades o comunidades tecnológicas lancen sus propios retos y descubran talento real.
                </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {
                    Services_List.map(({ id, titulo, descripcion }) => (
                        <div
                            key={id}
                            data-aos={ANIMACIONES_CARDS_SERVICES[id]}
                            data-aos-delay={(id % ANIMACIONES_CARDS_SERVICES.length) * 100 + 300}
                            className="flex flex-col items-center justify-center border border-primary rounded-2xl hover:shadow-lg transition-shadow duration-300 gap-2 xl:min-h-[300px] min-h-[350px]"
                        >
                            <div className="w-full bg-primary px-4 flex-1 flex rounded-tl-2xl rounded-tr-2xl justify-center items-center">
                                <h2 className="text-2xl font-bold">{titulo}</h2>
                            </div>
                            <div className="flex-2 flex justify-center h-full items-center">
                                <p className="px-4">{descripcion}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}