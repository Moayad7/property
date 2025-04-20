
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'مركز العقارات السوري - سوق العقارات الرائد في سوريا',
  description = 'أكبر سوق للعقارات الجديدة والمستعملة في سوريا. تصفح آلاف العقارات من الوكلاء الموثوقين والبائعين الخاصين، مع خدمات التأجير وقطع الغيار.',
  canonicalUrl = 'https://syrianautohub.com/',
  ogImage = '/og-image.png',
  ogType = 'website',
  keywords = 'عقارات سوريا, بيع عقارات, شراء عقارات, عقارات مستعملة, عقارات جديدة, تأجير عقارات, قطع غيار',
}) => {
  const siteUrl = 'https://syrianautohub.com';
  const fullCanonicalUrl = canonicalUrl.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullOgImage} />
    </Helmet>
  );
};

export default SEO;
