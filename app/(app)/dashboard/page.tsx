'use client';

import { useNotificationsStore } from '@/features/notifications/store/notifications.store';

export default function DashboardPage() {
    const addNotification = useNotificationsStore((s) => s.addNotification);

    const handleNotify = () => {
        const id = Math.floor(Math.random() * 1000);
        addNotification(`Notificación #${id}`);
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Hello</h1>
            <button
                type="button"
                onClick={handleNotify}
                className="btn btn-primary btn-sm w-fit"
            >
                Crear Notificación
            </button>
        </div>
    );
}
