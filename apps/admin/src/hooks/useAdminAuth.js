import { useState, useEffect, useCallback } from 'react';
const ADMIN_AUTH_KEY = 'yuletech-admin-auth';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours
function getStoredAuth() {
    try {
        const raw = localStorage.getItem(ADMIN_AUTH_KEY);
        if (!raw)
            return null;
        const parsed = JSON.parse(raw);
        return parsed;
    }
    catch {
        return null;
    }
}
function isAuthValid(state) {
    if (!state)
        return false;
    const now = Date.now();
    return now - state.loggedInAt < SESSION_DURATION_MS;
}
export function useAdminAuth() {
    const [isAdmin, setIsAdmin] = useState(() => {
        const stored = getStoredAuth();
        return isAuthValid(stored);
    });
    useEffect(() => {
        const stored = getStoredAuth();
        setIsAdmin(isAuthValid(stored));
        const interval = setInterval(() => {
            const current = getStoredAuth();
            if (!isAuthValid(current)) {
                setIsAdmin(false);
                localStorage.removeItem(ADMIN_AUTH_KEY);
            }
        }, 60000); // check every minute
        return () => clearInterval(interval);
    }, []);
    const login = useCallback((username, password) => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            const state = { loggedInAt: Date.now() };
            localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(state));
            setIsAdmin(true);
            return true;
        }
        return false;
    }, []);
    const logout = useCallback(() => {
        localStorage.removeItem(ADMIN_AUTH_KEY);
        setIsAdmin(false);
    }, []);
    return { isAdmin, login, logout };
}
