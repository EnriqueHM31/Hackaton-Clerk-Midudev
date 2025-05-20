import ContactForm from './ContactoForm';
import CONTACT from "../assets/Contact.webp";


export default function Contacto() {
    return (

        <section id="contacto" className="xl:py-40 flex xl:flex-row flex-col items-center justify-center gap-10 mb-10 xl:mb-0">
            <div className="flex-1 flex flex-col gap-4 w-full">
                <h2
                    className="xl:text-5xl font-bold w-fit text-3xl rounded-2xl bg-primary text-white px-6 py-3"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                >
                    Contacto
                </h2>

                <p data-aos="zoom-in" data-aos-delay="200">
                    Cualquier duda, comentario o sugerencia puedes enviarnos un mensaje
                </p>

                <ContactForm />
            </div>
            <div className="flex-1 relative items-center justify-center xl:flex hidden" data-aos="fade-left" data-aos-delay="100">
                <img src={CONTACT} className="w-11/12 h-auto" alt="Imagen de fondo" loading="lazy" />
            </div>
        </section>


    )
}