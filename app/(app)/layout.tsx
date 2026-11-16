
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/auth.service';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { toggleThemeAction } from '@/shared/actions/theme';

export default function AppLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        authService.logout();
        router.replace('/login');
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-base-200">
                <header className="navbar bg-base-100 shadow-sm px-6 justify-between border-b border-base-300">
                    <nav className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className={`btn btn-ghost btn-sm ${pathname === '/dashboard' ? 'btn-active font-bold' : ''}`}
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/exercises"
                            className={`btn btn-ghost btn-sm ${pathname.startsWith('/exercises') ? 'btn-active font-bold' : ''}`}
                        >
                            Ejercicios
                        </Link>

                        <Link
                            href="/routines"
                            className={`btn btn-ghost btn-sm ${pathname.startsWith('/routines') ? 'btn-active font-bold' : ''}`}
                        >
                            Rutinas
                        </Link>
                    </nav>

                    <div className="flex items-center gap-2">
                        <form action={toggleThemeAction}>
                            <button
                                type="submit"
                                className="btn btn-ghost btn-sm"
                            >
                                Cambiar tema
                            </button>
                        </form>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="btn btn-outline btn-error btn-sm"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto p-6">
                    {children}
                </main>

                {modal}
            </div>
        </AuthGuard>
    );
}
