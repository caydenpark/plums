/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,

        domains: [
            "api.microlink.io", // Microlink Image Preview
            "https://plums-delta.vercel.app/"
        ],
    },
};

export default nextConfig;
