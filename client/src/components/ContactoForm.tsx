'use client';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('https://formspree.io/f/mblowdea', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            toast.success('¡Mensaje enviado con éxito!');
            setFormData({ name: '', email: '', message: '' });
        } else {
            toast.error("Error al enviar el mensaje, checa tus datos");
        }
    };

    return (
        <div className="w-full z-50">
            <Toaster position="bottom-center" />
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-2">
                        <div className='col-span-1 gap-2 flex flex-col' data-aos="zoom-in" data-aos-delay="100">
                            <label htmlFor="name" className="text-sm font-bold">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border border-primary rounded-lg p-2"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className='col-span-1 gap-2 flex flex-col' data-aos="zoom-in" data-aos-delay="200">

                            <label htmlFor="email" className="text-sm font-bold">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-primary rounded-lg p-2"
                                placeholder="devarena@devarena.com"
                            />
                        </div>

                    </div>
                    <div className="col-span-2 gap-2 w-full flex flex-col" data-aos="zoom-in" data-aos-delay="300">
                        <label htmlFor="mensaje" className="text-sm font-bold">Mensaje</label>
                        <textarea
                            id="mensaje"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="border border-primary rounded-lg p-2 h-40 resize-none"
                            placeholder="Escribe tu mensaje aquí..."
                        ></textarea>
                    </div>
                    <div className="flex w-full mt-4" data-aos="zoom-in" data-aos-delay="400">
                        <button
                            type="submit"
                            className="bg-primary text-white w-full rounded-lg text-2xl py-2 font-bold"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
