'use client';

import { useNotificationsStore } from '../store/notifications.store';

export function NotificationBell() {
    const notifications = useNotificationsStore((s) => s.notifications);
    const clearAll = useNotificationsStore((s) => s.clearAll);

    return (
        <div className="dropdown dropdown-end">
            <button tabIndex={0} type="button" className="btn btn-ghost btn-sm">
                Notificaciones ({notifications.length})
            </button>

            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box w-56 p-2 shadow border border-base-200">
                {notifications.length === 0 && (
                    <li className="disabled"><a>Sin notificaciones</a></li>
                )}

                {notifications.map((msg, index) => (
                    <li key={index}><a>{msg}</a></li>
                ))}

                {notifications.length > 0 && (
                    <li>
                        <button type="button" onClick={clearAll} className="text-error font-medium">
                            Borrar todas
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}
