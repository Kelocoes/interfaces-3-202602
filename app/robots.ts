
import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

// Next sirve este archivo en /robots.txt: le dice a los buscadores qué pueden visitar
export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: '*', allow: '/', disallow: ['/dashboard', '/routines'] },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
