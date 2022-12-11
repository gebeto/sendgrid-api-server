/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: "/v3/mail/send",
        destination: "/api/mails",
      },
    ];
  },
};

module.exports = nextConfig;
