/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // A stray lockfile in C:\Dev made Turbopack pick that as the workspace root,
  // which broke CSS hot reload. Pin it to this project.
  turbopack: { root: import.meta.dirname },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
