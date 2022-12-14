#! /bin/bash

# variables
Path="src/Pages"

# Take User Input for Creating Page or deleting Page
echo "Enter 1 to create Page"
echo "Enter 2 to delete Page"
read choice

Rfce() {
    # Write the Page Name
    echo "import React from 'react';" >>$Path/$1/$1.tsx
    echo " " >>$Path/$1/$1.tsx
    echo "function $1() {" >>$Path/$1/$1.tsx
    echo "    return ( " >>$Path/$1/$1.tsx
    echo "        <div>" >>$Path/$1/$1.tsx
    echo "           $1" >>$Path/$1/$1.tsx
    echo "        </div>" >>$Path/$1/$1.tsx
    echo "    )" >>$Path/$1/$1.tsx
    echo "}" >>$Path/$1/$1.tsx
    echo "export default $1" >>$Path/$1/$1.tsx
}

Test() {
    # Test Boilerplate
    echo "import { render, screen } from '../../test-utils';" >>$Path/$1/$1.test.tsx
    echo "import '@testing-library/jest-dom/extend-expect';" >>$Path/$1/$1.test.tsx
    echo "import $1 from './$1';" >>$Path/$1/$1.test.tsx
    echo " " >>$Path/$1/$1.test.tsx
    echo "    it('should render without crashing', () => {" >>$Path/$1/$1.test.tsx
    echo "        render(<$1 />);" >>$Path/$1/$1.test.tsx
    echo "    });" >>$Path/$1/$1.test.tsx
    
}

Index() {
    # index.tsx
    echo "import ${1} from './$1';" >>$Path/$1/index.tsx
    echo " " >>$Path/$1/index.tsx
    echo "export default ${1};" >>$Path/$1/index.tsx
}

# if user input is 1 then create Page

if [ "$choice" -eq 1 ]; then
    echo "Creating Page"
    read -p "Enter Page Name: " NAME

    if [ -z "$NAME" ]; then
        echo "You did not Page Name"
    else

        echo "Page Name: $NAME"


        if [ ! -d "$Path/$NAME" ]; then
            # touch src/Pages/Form/{Form.js,Form.test.js,Form.css}
            mkdir -p $Path/$NAME
            
            # Write in BoilerPlate
            Rfce $NAME
            Test $NAME
            Index $NAME

            echo "Page Created"
        else
            echo "Page Already Exists"
        fi

    fi

else

    echo "Deleting Page"
    read -p "Enter Page Name: " NAME
    rm -rf $Path/$NAME
fi
