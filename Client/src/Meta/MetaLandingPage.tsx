import React from 'react';
import { Helmet } from 'react-helmet-async';

function MetaLandingPage({
  title = '• Dev Dairy',
  description = 'Dev Dairy is a web app for need to keep track of all your side projects and all the progress that has been made for the project and to store work session.',
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

export default MetaLandingPage;
