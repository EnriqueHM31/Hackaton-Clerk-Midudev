import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import ModalRol from './ModalRol';
import WelcomeModal from './ModalWelcom';

export default function AuthRolContenido() {

    const API = import.meta.env.VITE_API_URL;
    const { isLoaded, user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null); // <- estado para guardar el rol

    useEffect(() => {
        if (!isLoaded || !user || !user.id) return;

        const roleFromMetadata = user.publicMetadata?.role ?? null;
        setUserRole(roleFromMetadata as string); // <- actualiza el estado con el rol

        if (roleFromMetadata) {
            setShowModal(false);
            return;
        } else {
            setShowModal(true);
        }

        const handleAuthFlow = async () => {
            try {
                const registerRes = await fetch(`${API}/api/users`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: user.id,
                        name: user.fullName,
                        email: user.primaryEmailAddress?.emailAddress,
                        created_at: Math.floor(Date.now() / 1000),
                    }),
                });
                if (!registerRes.ok) {
                    throw new Error('Error al registrar usuario');
                }

                await registerRes.json();
                setShowModal(true);
            } catch (err) {
                console.error(err);
            }
        };

        handleAuthFlow();
    }, [isLoaded, user]);

    const handleRoleAssigned = async () => {
        await user?.reload(); // <- recarga el usuario desde Clerk
        const updatedRole = user?.publicMetadata?.role ?? null;
        setUserRole(updatedRole as string); // <- actualiza el estado
        setShowModal(false);
        setShowWelcomeModal(true);
    };

    const closeWelcomeModal = () => {
        setShowWelcomeModal(false);
    };

    if (!user) return null;

    return (
        <>
            {showModal && <ModalRol userId={user.id} onRoleAssigned={handleRoleAssigned} />}

            {showWelcomeModal && userRole && <WelcomeModal role={userRole} onClose={closeWelcomeModal} />}
        </>
    );
}