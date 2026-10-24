'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/features/auth/services/auth.service';
import { AuthGuard } from '@/features/auth/components/AuthGuard';

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
                    </nav>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="btn btn-outline btn-error btn-sm"
                    >
                        Cerrar Sesión
                    </button>
                </header>

                <main className="max-w-4xl mx-auto p-6">{children}</main>
            </div>
        </AuthGuard>
    );
}
