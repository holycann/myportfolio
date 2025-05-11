/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://holyycan.com",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: "monthly",
    priority: 0.7,
    exclude: ["/api/*"],
};