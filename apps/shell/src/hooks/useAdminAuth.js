import { useState, useEffect } from 'react';
export function useAdminAuth() {
    const [authState, setAuthState] = useState({
        isAdmin: false,
        isLoggedIn: false,
    });
    useEffect(() => {
        const adminSession = localStorage.getItem('adminSession');
        if (adminSession) {
            try {
                const session = JSON.parse(adminSession);
                setAuthState({
                    isAdmin: session.isAdmin || false,
                    isLoggedIn: session.isLoggedIn || false,
                });
            }
            catch {
                setAuthState({ isAdmin: false, isLoggedIn: false });
            }
        }
    }, []);
    const logout = () => {
        localStorage.removeItem('adminSession');
        setAuthState({ isAdmin: false, isLoggedIn: false });
        window.location.href = '/admin/login';
    };
    return {
        ...authState,
        logout,
    };
}
