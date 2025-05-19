export default function Hero() {
    return (
        <section className="relative  xl:h-dvh w-full overflow-hidden flex flex-col items-center justify-center xl:mb-20">
            <section className="flex flex-col items-center justify-center text-center w-full gap-8 xl:pt-3 pt-4 xl:mb-20 z-40">
                <h1
                    data-aos="fade-up"
                    data-aos-delay="400"
                    className="xl:text-7xl text-4xl font-bold xl:max-w-1/2 flex flex-col gap-3 text-wrap px-4 xl:px-0"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-pink-400 to-secondary z-20">
                        Hackathons
                    </span>{' '}
                    for Developers
                </h1>
                <p data-aos="fade-up" data-aos-delay="600" className="xl:max-w-3/5 z-20">
                    DevArena es una plataforma profesional para organizar, gestionar y participar en hackathons virtuales y
                    competencias de desarrollo. DevArena crea un espacio competitivo, colaborativo y dinámico donde las ideas se
                    transforman en soluciones reales.
                </p>
                <a
                    data-aos="fade-up"
                    data-aos-delay="800"
                    href="/"
                    className="bg-primary px-6 py-3 rounded-2xl font-bold z-40 hover:bg-blue-700 transition-colors"
                >
                    Get Started
                </a>
            </section>


            <div data-aos="zoom-in" className="absolute w-full h-auto top-1/5 flex items-end justify-center z-0 select-none">
                <img src="/src/assets/Hero2.webp" className="w-1/2 h-auto object-contain" alt="Imagen de fondo" />
            </div>
            <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="absolute w-full h-full flex items-center justify-center select-none"
            >
                <img
                    src="/src/assets/Hero.webp"
                    className="w-full h-auto object-contain opacity-25 -rotate-12 z-0"
                    alt="Imagen de fondo"
                />
            </div>
        </section>
    )
}