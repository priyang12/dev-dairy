import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';

function CustomFormControl({
  children,
  mb,
  alertMessage,
  ...rest
}: {
  children: React.ReactNode;
  mb?: number;
  alertMessage?: string;
  //   alert?: message;
}) {
  const childrenArray = React.Children.toArray(children);
  const [field, setalertMessage] = useState('');
  const onchange = (e: any) => {
    if (e.target.value === '') {
      setalertMessage(' is required');
    } else {
      setalertMessage('');
    }
  };

  return (
    <FormControl
      isInvalid={field !== ''}
      mb={5}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <FormLabel htmlFor="Description" color={field && 'red'}>
        Description :{' '}
      </FormLabel>
      {childrenArray.map((child: any) => {
        if (child.type === FormHelperText) {
          return !field ? (
            child
          ) : (
            <Text color="red" key={child.key}>
              {field}
            </Text>
          );
        }

        return React.cloneElement(child, {
          onChange: (e: any) => {
            onchange(e);
            child.props.onChange(e);
          },
        });

        return child;
      })}
    </FormControl>
  );
}

CustomFormControl.defaultProps = {
  mb: 5,
  alertMessage: '',
};

export default CustomFormControl;
