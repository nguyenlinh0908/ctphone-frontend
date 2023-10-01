/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env:{
        API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    },
    images:{
        domains:['shopdunk.com']
    }
}

module.exports = nextConfig
