import { UserProfile } from '@clerk/clerk-react'

export default function Perfil() {
    return (
        <section className="mt-20 flex items-center justify-center xl:py-16 py-9 w-full h-screen my-10 xl:my-0">
            <UserProfile
                appearance={{
                    variables: {
                        colorPrimary: '#fff', // Azul cielo principal
                        colorTextSecondary: '#d1edff', // Texto secundario azul claro
                        colorBackground: 'transparent', // Fondo transparente
                        colorText: '#e6f4ff', // Texto principal blanco azulado
                        colorTextOnPrimaryBackground: '#ffffff',
                        colorInputText: '#e6f4ff', // Texto en inputs
                        colorInputBackground: '#0080ff', // Fondo inputs muy transparente
                        fontSize: '16px',
                        borderRadius: '12px',
                        colorDanger: '#ff7e7e', // Rojo suave para errores
                        colorSuccess: '#7effb3', // Verde suave para éxitos
                        colorWarning: '#0080ff', // Amarillo suave para advertencias
                    },
                    elements: {
                        rootBox: {
                            width: '1200px',
                            maxWidth: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: {
                                mobile: '100vh',
                                desktop: 'auto',
                            },
                        },
                        cardBox: {
                            width: '100%',
                            backgroundColor: '#000',
                        },

                        card: {
                            boxShadow: 'none',
                            border: 'none',
                            width: '1200px',
                            maxWidth: '100%',
                            padding: {
                                mobile: '1rem',
                                desktop: '1.5rem',
                            },
                        },

                        // Header del perfil
                        profilePage__header: {
                            backgroundColor: '#ff0',
                            padding: '0',
                            marginBottom: '1.5rem',
                        },

                        // Sección del perfil
                        profileSection: {
                            backgroundColor: 'transparent',
                            padding: '0',
                            marginBottom: '3rem',
                            color: '#fff',
                            paddingInline: '2rem',
                            paddingTop: '1rem',
                            paddingBottom: '1rem',
                            borderRadius: '1rem',
                            boxShadow: '0 0 0 1px rgba(126, 200, 255, 0.3)',
                            '&:hover': {
                                boxShadow: '0 0 2px rgba(126, 200, 255, 0.5)',
                                backgroundColor: 'rgba(126, 200, 255, 0.3)',
                            },
                        },

                        // Títulos de sección
                        headerTitle: {
                            fontSize: '40px',
                            fontWeight: '600',
                            color: '#7ec8ff',
                        },

                        headerSubtitle: {
                            fontSize: {
                                mobile: '1rem',
                                desktop: '1.1rem',
                            },
                        },

                        // Textos varios
                        sectionHeaderText: {
                            fontSize: {
                                mobile: '1.2rem',
                                desktop: '1.3rem',
                            },
                            fontWeight: '500',
                        },

                        // Botones
                        button: {
                            color: '#aad4fe',
                            gap: '3rem',
                            '&:hover': {
                                backgroundColor: '#0080ff',
                                color: '#fff',
                            },
                        },

                        button__danger: {
                            backgroundColor: '#f00',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 126, 126, 0.3)',
                            },
                        },

                        // Inputs
                        formFieldInput: {
                            backgroundColor: 'rgba(126, 200, 255, 0.1)',
                            border: '1px solid rgba(126, 200, 255, 0.3)',
                            color: '#e6f4ff',
                            display: 'flex',
                            marginBottom: '2rem',
                            '&:focus': {
                                borderColor: '#7ec8ff',
                                boxShadow: '0 0 0 1px #7ec8ff',
                            },
                            '&:hover': {
                                borderColor: '#7ec8ff',
                            },
                        },

                        socialButtonsBlockButtonText__tiktok: {
                            color: '#fff',
                        },

                        // Navbar (pestañas de perfil/seguridad)
                        navbar: {
                            border: 'none',
                            gap: '2rem',
                        },

                        navbarButton: {
                            color: '#fff',
                            marginBottom: '2rem',

                            '&:hover': {
                                color: '#fff',
                                backgroundColor: '#0080ff',
                            },
                            '&[data-active="true"]': {
                                color: '#fff',
                                borderBottom: '2px solid #0080ff',
                            },
                        },
                        navbarButtons: {
                            color: '#fff',
                            marginBottom: '2rem',
                        },
                    },
                }}
            />
        </section>
    )
}