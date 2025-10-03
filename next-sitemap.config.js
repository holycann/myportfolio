/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://itsrama.kawasan.digital",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: "monthly",
    priority: 0.7,
    exclude: ["/api/*"],
};