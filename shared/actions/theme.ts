'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const LIGHT = 'icesi';
const DARK = 'icesi-dark';

export async function toggleThemeAction() {
    const store = await cookies();
    const next = store.get('theme')?.value === DARK ? LIGHT : DARK;
    store.set('theme', next, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    revalidatePath('/', 'layout');
}
