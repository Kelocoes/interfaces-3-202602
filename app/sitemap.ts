
import type { MetadataRoute } from 'next';
import { EXERCISES } from '@/features/exercises/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

// Next sirve este archivo en /sitemap.xml: una lista de las páginas públicas para los buscadores
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: `${SITE_URL}/exercises`, changeFrequency: 'weekly', priority: 1 },
        ...EXERCISES.map((exercise) => ({
            url: `${SITE_URL}/exercises/${exercise.id}`,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ];
}
