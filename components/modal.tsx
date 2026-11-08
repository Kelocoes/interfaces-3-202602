'use client';

import { useRouter } from 'next/navigation';

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <div className="modal modal-open" role="dialog" aria-modal="true">
            <div className="modal-box max-w-2xl">
                <button
                    type="button"
                    aria-label="Cerrar"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
                    onClick={() => router.back()}
                >
                    ✕
                </button>
                {children}
            </div>
            <div className="modal-backdrop" onClick={() => router.back()} />
        </div>
    );
}
