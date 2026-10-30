import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  robots?: string;
}

const BASE_DOMAIN = 'https://desarrolloselaborados.com';
const DEFAULT_OG_IMAGE = `${BASE_DOMAIN}/og-image.jpg`;

export function useSEO({
  title,
  description,
  canonicalPath = '/',
  ogImage = DEFAULT_OG_IMAGE,
  robots = "index, follow",
}: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = description;
    }

    // Canonical
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `${BASE_DOMAIN}${canonicalPath}`;
    }

    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = robots;

    // OG Tags
    const ogTags: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:url': `${BASE_DOMAIN}${canonicalPath}`,
      'og:image': ogImage,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      const el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (el) el.content = content;
    });

    // Twitter Cards
    const twitterTags: Record<string, string> = {
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': ogImage,
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      const el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (el) el.content = content;
    });
  }, [title, description, canonicalPath, ogImage, robots]);
}
