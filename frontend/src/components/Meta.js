import React from 'react';
import { Helmet } from 'react-helmet';
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;

Meta.defaultProps = {
  title: 'Welcome to pro shop',
  description: 'we sell at cheap price',
  keywords: 'electronics, buy electronics, pro shop',
};
