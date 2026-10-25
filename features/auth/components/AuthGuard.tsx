'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/shared/store/session.store';

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    // Selectores individuales de Zustand: solo re-renderizan si cambian estas propiedades
    const hasHydrated = useSessionStore((s) => s.hasHydrated);
    const isAuthenticated = useSessionStore((s) => s.token !== null);

    useEffect(() => {
        // Solo evalúa y redirige cuando la rehidratación desde localStorage ha terminado
        if (hasHydrated && !isAuthenticated) {
            router.replace('/login');
        }
    }, [hasHydrated, isAuthenticated, router]);

    // Mientras la sesión se restaura de localStorage, mostramos el estado de carga
    if (!hasHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center gap-3">
                <span className="loading loading-spinner text-primary"></span>
                <span>Verificando autorización de acceso...</span>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return <>{children}</>;
}
