import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  calculatorName?: string;
  categoryName?: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
  faqs?: Array<{ question: string; answer: string }>;
}

export const SEOManager: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  calculatorName,
  categoryName,
  breadcrumbs,
  faqs,
}) => {
  const metaTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.defaultTitle;
  const metaDescription = description || SITE_CONFIG.description;
  const fullCanonicalUrl = `${SITE_CONFIG.baseUrl}${canonicalPath}`;
  const ogImageUrl = `${SITE_CONFIG.baseUrl}/favicon.svg`;

  useEffect(() => {
    // 1. Set Title
    document.title = metaTitle;

    // Helper to update or create meta tags
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${selector}]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Primary Meta Tags
    setMetaTag('name="description"', 'name', 'description', metaDescription);
    setMetaTag('name="application-name"', 'name', 'application-name', SITE_CONFIG.name);
    setMetaTag('name="author"', 'name', 'author', SITE_CONFIG.author);
    setMetaTag('name="creator"', 'name', 'creator', SITE_CONFIG.creator);
    setMetaTag('name="publisher"', 'name', 'publisher', SITE_CONFIG.publisher);
    setMetaTag('name="robots"', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Canonical Link
    setLinkTag('canonical', fullCanonicalUrl);

    // 4. Open Graph Meta Tags
    setMetaTag('property="og:title"', 'property', 'og:title', metaTitle);
    setMetaTag('property="og:description"', 'property', 'og:description', metaDescription);
    setMetaTag('property="og:url"', 'property', 'og:url', fullCanonicalUrl);
    setMetaTag('property="og:site_name"', 'property', 'og:site_name', SITE_CONFIG.name);
    setMetaTag('property="og:type"', 'property', 'og:type', ogType);
    setMetaTag('property="og:locale"', 'property', 'og:locale', SITE_CONFIG.locale);
    setMetaTag('property="og:image"', 'property', 'og:image', ogImageUrl);

    // 5. Twitter Meta Tags
    setMetaTag('name="twitter:card"', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('name="twitter:title"', 'name', 'twitter:title', metaTitle);
    setMetaTag('name="twitter:description"', 'name', 'twitter:description', metaDescription);
    setMetaTag('name="twitter:image"', 'name', 'twitter:image', ogImageUrl);
    setMetaTag('name="twitter:creator"', 'name', 'twitter:creator', SITE_CONFIG.twitterHandle);

    // 6. JSON-LD Structured Data Injection
    const jsonLdData: any[] = [
      // Organization Schema
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.baseUrl,
        logo: `${SITE_CONFIG.baseUrl}/favicon.svg`,
        sameAs: [],
      },
      // WebSite Schema with SearchAction
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.baseUrl,
        description: SITE_CONFIG.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_CONFIG.baseUrl}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ];

    // Add WebApplication Schema for Calculator pages
    if (calculatorName) {
      jsonLdData.push({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: `${calculatorName} - ${SITE_CONFIG.name}`,
        url: fullCanonicalUrl,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: metaDescription,
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
      });
    }

    // Add BreadcrumbList Schema if breadcrumbs are present
    if (breadcrumbs && breadcrumbs.length > 0) {
      jsonLdData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: `${SITE_CONFIG.baseUrl}${b.path}`,
        })),
      });
    }

    // Add FAQPage Schema if faqs exist
    if (faqs && faqs.length > 0) {
      jsonLdData.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    // Inject JSON-LD script into head
    let scriptTag = document.querySelector('script[type="application/ld+json"][id="json-ld-schema"]') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLdData);

  }, [metaTitle, metaDescription, fullCanonicalUrl, ogType, calculatorName, categoryName, breadcrumbs, faqs]);

  return null;
};
