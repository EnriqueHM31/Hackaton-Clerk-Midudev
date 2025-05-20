

import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import React from 'react';

function PrivateRoute(props: { children: React.ReactNode; allowedRoles: string[] }) {
    const { children, allowedRoles } = props;
    const { user, isLoaded } = useUser();

    if (!isLoaded) return null;

    const userRole = user?.publicMetadata?.role;
    console.log(user)

    console.log(userRole);

    if (!userRole) return <Navigate to="/" replace />;

    if (allowedRoles.includes(userRole as string)) {
        return <>{children}</>;
    } else {
        return <Navigate to="/" replace />;
    }
}

export default PrivateRoute;
