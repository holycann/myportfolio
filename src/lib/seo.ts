export const defaultMeta = {
  title: 'Muhamad Ramadhan - Fullstack Developer & Automation Engineer',
  description: 'Portfolio of Muhamad Ramadhan, showcasing Fullstack development skills and crypto trading expertise.',
  url: 'https://holyycan.com',
  image: '/images/hero.png',
  type: 'website',
  siteName: 'Muhamad Ramadhan Portfolio',
  twitterHandle: '@muhamadramadhan',
  robots: 'index, follow',
  locale: 'en_US',
  author: 'Muhamad Ramadhan',
  keywords: 'Fullstack Developer, Portfolio, Golang, Node.js, Crypto, Indonesia, Web Developer, Next.js, React, Tailwind',
  themeColor: '#0A0A0A',
  viewport: 'width=device-width, initial-scale=1',
};

export function generateSeoMeta({
  title = defaultMeta.title,
  description = defaultMeta.description,
  url = defaultMeta.url,
  image = defaultMeta.image,
  type = defaultMeta.type,
  siteName = defaultMeta.siteName,
  twitterHandle = defaultMeta.twitterHandle,
  robots = defaultMeta.robots,
  locale = defaultMeta.locale,
  author = defaultMeta.author,
  keywords = defaultMeta.keywords,
  themeColor = defaultMeta.themeColor,
  viewport = defaultMeta.viewport,
  canonical,
  publishedTime,
  modifiedTime,
  structuredData,
}: Partial<typeof defaultMeta> & {
  canonical?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object;
} = {}) {
  const meta = [
    { name: 'description', content: description },
    { name: 'robots', content: robots },
    { name: 'author', content: author },
    { name: 'keywords', content: keywords },
    { name: 'theme-color', content: themeColor },
    { name: 'viewport', content: viewport },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:site_name', content: siteName },
    { property: 'og:locale', content: locale },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:site', content: twitterHandle },
    { name: 'twitter:creator', content: twitterHandle },
  ];
  if (publishedTime) {
    meta.push({ property: 'article:published_time', content: publishedTime });
  }
  if (modifiedTime) {
    meta.push({ property: 'article:modified_time', content: modifiedTime });
  }
  return { meta, structuredData };
}

export function generateJsonLd(structuredData: object) {
  return {
    __html: JSON.stringify(structuredData),
  };
} 