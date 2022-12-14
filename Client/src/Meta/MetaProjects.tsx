import React from 'react';
import { Helmet } from 'react-helmet-async';

function MetaProjects({
  title = 'Projects Page',
  description = '',
  children,
}: {
  title?: string;
  description?: string;
} & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {children}
    </Helmet>
  );
}

export default MetaProjects;
