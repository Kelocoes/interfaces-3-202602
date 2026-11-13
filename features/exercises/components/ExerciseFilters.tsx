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

    useEffect(() => {
        if (text === urlText) return;
        const timer = setTimeout(() => updateParam('q', text), 300);
        return () => clearTimeout(timer);
    }, [text]);

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="input input-bordered flex w-full items-center gap-2 sm:max-w-xs">
                <span className="sr-only">Buscar ejercicio</span>
                <input
                    type="search"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Buscar ejercicio o músculo"
                    className="grow"
                />
                {isPending && <span className="loading loading-spinner loading-xs" />}
            </label>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
                <button
                    type="button"
                    onClick={() => updateParam('category', '')}
                    className={`btn btn-sm ${category === '' ? 'btn-primary' : 'btn-outline'}`}
                >
                    Todos
                </button>
                {CATEGORIES.map((c) => (
                    <button
                        key={c.value}
                        type="button"
                        onClick={() => updateParam('category', c.value)}
                        className={`btn btn-sm ${category === c.value ? 'btn-primary' : 'btn-outline'}`}
                    >
                        {c.label}
                    </button>
                ))}
            </div>
        </div>
    );
}