// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://sharifiasldev.ir',
  generateRobotsTxt: true, 
  exclude: ['/dashboard', '/dashboard/*', '/api/*'], 
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://sharifiasldev.ir/server-sitemap.xml',
    ],
  },
};