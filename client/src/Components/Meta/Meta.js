import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To ShopPoint',
  description: 'We sell the best products for cheap',
  keywords: 'clothes, buy readyMadeClothes, cheap latest clothes',
};

export default Meta;
