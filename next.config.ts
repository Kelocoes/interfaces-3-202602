
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        // Next solo optimiza imágenes de los dominios que declares aquí
        remotePatterns: [{ protocol: 'https', hostname: 'placehold.co' }],
    },
};

export default nextConfig;
