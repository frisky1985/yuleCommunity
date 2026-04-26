import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '../data/communityData';
export function useNotifications() {
    const [notifications, setNotifications] = useLocalStorage('yuletech-notifications', []);
    const addNotification = useCallback((notification) => {
        const newNotification = {
            ...notification,
            id: generateId('notif'),
            read: false,
            createdAt: new Date().toISOString(),
        };
        setNotifications((prev) => [newNotification, ...prev].slice(0, 100));
    }, [setNotifications]);
    const markAsRead = useCallback((id) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    }, [setNotifications]);
    const markAllAsRead = useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }, [setNotifications]);
    const unreadCount = notifications.filter((n) => !n.read).length;
    return {
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
    };
}
