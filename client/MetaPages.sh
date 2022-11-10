#! /bin/bash

# variables
Path="src/Pages"
MetaPath="src/Meta"

# get names of files in path

# Index Page Boilerplate
Meta() {
    echo "import React from 'react';
import { Helmet } from 'react-helmet-async';

function Meta$2({
  title = \"$2 Page\",
  description = '',
  children,
}: {
  title?: string;
  description?: string;
} & React.ComponentPropsWithoutRef<'div'>) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name=\"description\" content={description} />}
      {children}
    </Helmet>
  );
}

export default Meta$2;
" >>$1
}

for entry in "$Path"/*; do
    echo "$entry"
    touch "$MetaPath/Meta$(basename "$entry").tsx"
    Meta "$MetaPath/Meta$(basename "$entry").tsx" $(basename "$entry") 

done
