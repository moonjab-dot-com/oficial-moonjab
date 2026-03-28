import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  type?: string;
  noindex?: boolean;
}

const BASE_URL = 'https://moonjab.com';
const DEFAULT_OG_IMAGE = 'https://storage.googleapis.com/gpt-engineer-file-uploads/UTzapF8dTWUuvs1ZKjSuRUh6wJR2/social-images/social-1773758809009-IOS_Icon_MoonJab.webp';

export const SEOHead = ({
  title,
  description,
  path = '/',
  ogImage = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
}: SEOHeadProps) => {
  const url = `${BASE_URL}${path}`;
  const fullTitle = path === '/' ? title : `${title} | MoonJab`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="MoonJab" />
      <meta property="og:locale" content="es_LA" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@MoonJab" />
    </Helmet>
  );
};
