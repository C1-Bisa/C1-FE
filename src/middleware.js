export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/test-api/:path*',
        '/akun/:path*',
        '/reset-password/:path/:path',
        '/history/:path',
        '/notifikasi/:path',
        '/order/:path',
        '/order/:path/:path',
        '/order/:path/:path/:path',
    ],
};
