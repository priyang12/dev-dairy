import React from 'react';
import { Helmet } from 'react-helmet-async';

function MetaNewProject({
  title = 'NewProject Page',
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

export default MetaNewProject;
