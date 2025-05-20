import ABOUT from "../assets/about.webp";
import LOGO from "../assets/logo.webp";
import DESAFIOS from "../assets/desafios.webp";
import PREMIOS from "../assets/premios.webp";
import COMUNIDAD from "../assets/comunidad.webp";

const BENEFICIOS = [
    { beneficio: 'Desafios', url: DESAFIOS },
    { beneficio: 'Premios', url: PREMIOS },
    { beneficio: 'Comunidad', url: COMUNIDAD },
];

const colspan = (index: number) => {
    return index === BENEFICIOS.length - 1 && BENEFICIOS.length % 2 !== 0 ? 'col-span-2' : 'col-span-1';
};



export default function Conocenos() {
    return (

        <section id="about" className="overflow-hidden flex flex-col items-center justify-center gap-8 xl:py-40 py-20">
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 xl:mt-5 xl:pb-8">
                {
                    BENEFICIOS.map(({ beneficio, url }, i) => (
                        <div
                            key={i}
                            data-aos="fade-up"
                            data-aos-delay={i * 100 + 100}
                            className={` bg-primary w-full flex items-center justify-center gap-2 border border-primary py-3 px-4 rounded-4xl text-center ${colspan(i)} xl:col-span-1`}
                        >
                            <img src={url} className="size-7 object-contain" alt="Ícono" loading="lazy" />
                            <h3 className="xl:text-xl text-lg font-bold text-white text-center">{beneficio}</h3>
                        </div>
                    ))
                }
            </div>
            <div className="w-full flex flex-col xl:flex-row items-center justify-center gap-8">
                <div className="flex-1 relative" data-aos="fade-right" data-aos-delay="200">
                    <img src={ABOUT} className="w-full h-auto object-contain" alt="Imagen de fondo" />

                    <div
                        className="absolute inset-0 items-end justify-center z-10 select-none bg-gradient-to-t from-black to-30% to-black/30 xl:flex hidden"
                    >
                        <div className="flex items-center gap-1 mb-3">
                            <img
                                src={LOGO}
                                className="size-14 object-contain"
                                alt="Logo de la empresa DevArena"
                                loading="lazy"
                            />
                            <span className="text-xl font-bold">DevArena</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col xl:gap-10 gap-6 py-6">
                    <h2
                        className="xl:text-5xl font-bold w-fit text-3xl rounded-2xl bg-primary text-white px-6 py-3"
                        data-aos="fade-left"
                        data-aos-delay="300"
                    >
                        Conocenos
                    </h2>
                    <p className="text-lg text-balance" data-aos="fade-left" data-aos-delay="400">
                        DevArena es la plataforma donde desarrolladores, diseñadores y entusiastas de la tecnología compiten en
                        hackathons virtuales para resolver desafíos reales. Participa en eventos temáticos, gana premios, mejora
                        tu portafolio y forma parte de una comunidad global de innovación.
                    </p>
                </div>
            </div>
        </section>
    )
}
