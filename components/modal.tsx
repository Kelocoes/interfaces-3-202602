'use client';

import { useRouter } from 'next/navigation';

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <div className="modal modal-open" role="dialog" aria-modal="true">
            <div className="modal-box max-w-2xl">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    aria-label="Cerrar"
                >
                    ✕
                </button>
                {children}
            </div>
            <div className="modal-backdrop" onClick={() => router.back()} />
        </div>
    );
}