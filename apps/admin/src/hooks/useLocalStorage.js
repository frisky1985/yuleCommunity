import { useState, useEffect, useCallback } from 'react';
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });
    const setValue = useCallback((value) => {
        setStoredValue((prev) => {
            const next = typeof value === 'function' ? value(prev) : value;
            try {
                window.localStorage.setItem(key, JSON.stringify(next));
                window.dispatchEvent(new CustomEvent('localStorageChange', { detail: { key } }));
            }
            catch (error) {
                console.error(`Error writing localStorage key "${key}":`, error);
            }
            return next;
        });
    }, [key]);
    useEffect(() => {
        const handleStorage = (e) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    setStoredValue(JSON.parse(e.newValue));
                }
                catch {
                    // ignore parse errors
                }
            }
        };
        const handleCustom = (e) => {
            const custom = e;
            if (custom.detail?.key === key) {
                const item = window.localStorage.getItem(key);
                if (item) {
                    try {
                        setStoredValue(JSON.parse(item));
                    }
                    catch {
                        // ignore parse errors
                    }
                }
            }
        };
        window.addEventListener('storage', handleStorage);
        window.addEventListener('localStorageChange', handleCustom);
        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('localStorageChange', handleCustom);
        };
    }, [key]);
    return [storedValue, setValue];
}
