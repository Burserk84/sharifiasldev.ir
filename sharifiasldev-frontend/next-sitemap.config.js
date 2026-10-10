// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.sharifiasldev.ir',
  generateRobotsTxt: true,
  exclude: ['/dashboard', '/dashboard/*', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      // Runtime-generated routes (see src/app/*/route.ts)
      'https://www.sharifiasldev.ir/server-sitemap.xml',
      'https://www.sharifiasldev.ir/attachment-sitemap.xml',
    ],
  },
};
