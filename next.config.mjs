/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
      },
    experimental: {
      serverComponentsExternalPackages: ['bcrypt'],
    },
};

export default nextConfig;
