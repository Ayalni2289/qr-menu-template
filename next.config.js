/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // Sunucusuz, tamamen statik export (Cloudflare Pages / Vercel için ideal)
  images: {
    unoptimized: true,        // Statik export'ta Next/Image optimizasyon sunucusu olmadığı için şart
  },
  trailingSlash: true,
};

module.exports = nextConfig;
