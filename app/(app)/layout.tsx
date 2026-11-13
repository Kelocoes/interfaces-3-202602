'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/auth.service';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { NotificationBell } from '@/features/notifications/components/NotificationBell';
import { useSessionStore } from '@/shared/store/session.store';
import { toggleThemeAction } from '@/shared/actions/theme';

const LINKS = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/exercises', label: 'Ejercicios' },
    { href: '/routines', label: 'Rutinas' },
];

export default function AppLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode; // lo que muestre el espacio paralelo @modal
}) {
    const pathname = usePathname();
    const router = useRouter();

    // Restaurar la sesión de localStorage una sola vez al montar el layout
    useEffect(() => {
        useSessionStore.persist.rehydrate();
    }, []);

    const handleLogout = () => {
        authService.logout();
        router.replace('/login');
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-base-200">
                <header className="navbar bg-base-100 shadow-sm px-6 justify-between border-b border-base-300">
                    <nav className="flex items-center gap-4">
                        {LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`btn btn-ghost btn-sm ${pathname.startsWith(link.href) ? 'btn-active font-bold' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        {/* Botón de tema: un formulario cuya acción es una Server Action */}
                        <form action={toggleThemeAction}>
                            <button type="submit" className="btn btn-ghost btn-sm">Cambiar tema</button>
                        </form>

                        {/* Campana de notificaciones reactiva de DaisyUI */}
                        <NotificationBell />

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="btn btn-outline btn-error btn-sm"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto p-6">{children}</main>
                {modal}
            </div>
        </AuthGuard>
    );
}