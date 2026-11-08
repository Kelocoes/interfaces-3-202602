'use client';

import { useEffect, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '../types';

export function ExerciseFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const category = searchParams.get('category') ?? '';
    const urlText = searchParams.get('q') ?? '';
    const [text, setText] = useState(urlText);

    const updateParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set(key, value);
        else params.delete(key);
        startTransition(() => router.replace(`${pathname}?${params.toString()}`));
    };

    // Debounce 300 ms para no navegar en cada tecla
    useEffect(() => {
        if (text === urlText) return;
        const t = setTimeout(() => updateParam('q', text), 300);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);

    return (
        <div className="space-y-3">
            <label className="input input-bordered flex items-center gap-2">
                <span className="sr-only">Buscar ejercicio</span>
                <input
                    type="search"
                    className="grow"
                    placeholder="Buscar ejercicio o músculo"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {isPending && <span className="loading loading-spinner loading-xs" />}
            </label>
            <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
                <button
                    type="button"
                    className={`btn btn-sm ${category === '' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => updateParam('category', '')}
                >
                    Todos
                </button>
                {CATEGORIES.map((c) => (
                    <button
                        key={c.value}
                        type="button"
                        className={`btn btn-sm ${category === c.value ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => updateParam('category', c.value)}
                    >
                        {c.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
