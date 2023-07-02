/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'placehold.jp', 'i.imgur.com', 'imgur.com'],
    },
    env: {
        // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
};

module.exports = nextConfig;
