import type { MetadataRoute } from 'next';
import { EXERCISES } from '@/features/exercises/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: `${SITE_URL}/exercises`, changeFrequency: 'weekly', priority: 1 },
        ...EXERCISES.map((e) => ({
            url: `${SITE_URL}/exercises/${e.id}`,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ];
}
