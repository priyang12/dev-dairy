#! /bin/bash

# variables
Path="src/Pages"

# get names of files in path

# Index Page Boilerplate
index() {
    echo "import ${1} from './${1}.tsx';" >>$Path/index.tsx
    echo "export default ${1};" >>$Path/index.tsx
}

for entry in "$Path"/*; do
    echo "$entry"
    # create a folder for each file and remove .js extension
    mkdir -p "$Path/$(basename "$entry" .tsx)"
    touch "$Path/$(basename "$entry" .tsx)/index.tsx"
    # create a file for each file and remove .js extension
    mv "$entry" "$Path/$(basename "$entry" .tsx)/$(basename "$entry" .tsx).tsx"
    touch "$Path/$(basename "$entry" .tsx)/index.tsx"
    index $(basename "$entry" .tsx)

done
