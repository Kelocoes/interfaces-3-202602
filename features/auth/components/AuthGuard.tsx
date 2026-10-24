'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { session } from '@/shared/lib/session';

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!session.isAuthenticated()) {
            router.replace('/login');
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center gap-3">
                <span className="loading loading-spinner text-primary"></span>
                <span>Verificando autorización...</span>
            </div>
        );
    }

    return <>{children}</>;
}
