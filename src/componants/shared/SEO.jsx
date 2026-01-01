import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Earthmoving Equipment Rental',
  description = 'Reliable earthmovers rental services with modern machines and skilled operators for your construction projects.',
  keywords = 'earthmoving equipment rental, excavator rental, construction equipment, heavy machinery rental',
  image = '/images/og-image.jpg',
  url = window?.location?.href || 'https://earthmoversrental.com'
}) => {
  return (
    <Helmet>
      <title>{title} | EarthMovers Rental</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={`${title} | EarthMovers Rental`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | EarthMovers Rental`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;