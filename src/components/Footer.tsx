import ICONFACEBOOK from "../assets/IconFacebook.png";
import ICONLINKEDIN from "../assets/IconLinkedin.png";
import ICONTWITTER from "../assets/IconTwitter.png";
import ICONYOUTUBE from "../assets/IconYouTube.png";
import LOGO from "../assets/logo.webp";


export default function Footer() {
    return (

        <footer className={`w-full flex flex-col items-center justify-center gap-10 overflow-hidden bg-black z-40`}>
            <div className="flex justify-between items-center mx-auto w-full h-full xl:py-6 py-9 bg-black z-50">
                <div
                    className="flex xl:justify-between xl:flex-row flex-col justify-center items-center mx-auto w-full max-w-[1200px] h-full xl:gap-0 gap-10"
                >
                    <div className="flex items-center flex-col xl:flex-row gap-2 z-50">
                        <div className="flex items-center gap-2">
                            <img src={LOGO} alt="Logo" className="size-10" loading="lazy" />
                            <h2 className="text-xl font-bold text-white">DevArena</h2>
                        </div>
                        <a href="/" className="text-xl text-white hover:underline transition-all text-center"
                        >Terminos y Condiciones</a
                        >
                    </div>

                    <div className="flex gap-3 xl:order-2 order-1 z-50">
                        <a
                            className="size-10 rounded-full bg-black flex items-center justify-center hover:border-secondary transition-colors hover:shadow-secondary hover:shadow-lg border border-white/50"
                            href="/"><img src={ICONFACEBOOK} loading="lazy" alt="Icono para facebook" />
                        </a>
                        <a
                            className="size-10 rounded-full bg-black flex items-center justify-center hover:border-secondary transition-colors hover:shadow-secondary hover:shadow-lg border border-white/50"
                            href="/"><img src={ICONLINKEDIN} loading="lazy" alt="Icono para linkedin" /></a>
                        <a
                            className="size-10 rounded-full bg-black flex items-center justify-center hover:border-secondary transition-colors hover:shadow-secondary hover:shadow-lg border border-white/50"
                            href="/"><img src={ICONTWITTER} loading="lazy" alt="Icono para twitter" /></a>
                        <a
                            className="size-10 rounded-full bg-black flex items-center justify-center hover:border-secondary transition-colors hover:shadow-secondary hover:shadow-lg border border-white/50"
                            href="/"><img src={ICONYOUTUBE} loading="lazy" alt="Icono para youtube" /></a>
                    </div>
                </div>
            </div>
        </footer>

    )
}