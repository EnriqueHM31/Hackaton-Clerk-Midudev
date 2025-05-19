import ContactForm from './ContactoForm';
import { Toaster } from 'react-hot-toast';
export default function Contacto() {
    return (

        <section id="contacto" className="xl:py-40 flex xl:flex-row flex-col items-center justify-center gap-10">
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
                <img src="/src/assets/Contact.webp" className="w-full h-auto" alt="Imagen de fondo" loading="lazy" />
            </div>
            <Toaster
                position="bottom-center"
                toastOptions={{
                    removeDelay: 3000,
                    style: {
                        background: 'rgb(0,0,0)',
                        fontSize: '1.1rem',
                        color: '#fff',
                        borderColor: '#48e',
                        borderRadius: '20px',
                        borderWidth: '3px',
                        padding: '10px 20px',
                    },
                }}
            />
        </section>


    )
}