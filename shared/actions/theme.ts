
'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const LIGHT = 'icesi';
const DARK = 'icesi-dark';
const CONTRAST = 'icesi-contraste';

export async function toggleThemeAction(): Promise<void> {
    const store = await cookies();
    const current = store.get('theme')?.value;

    const next =
        current === LIGHT
            ? DARK
            : current === DARK
                ? CONTRAST
                : LIGHT;

    store.set('theme', next, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    revalidatePath('/', 'layout');
}
