
'use client';

import { useRouter } from 'next/navigation';

// Un modal de daisyUI que se cierra volviendo atrás en el historial
export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <div className="modal modal-open" role="dialog" aria-modal="true">
            <div className="modal-box relative max-w-2xl pt-14">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-10"
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

