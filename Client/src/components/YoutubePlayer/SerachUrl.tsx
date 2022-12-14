import { Button, Box } from '@chakra-ui/react';
import { FormControl, Input, Label } from '@priyang/react-component-lib';
import { assert } from '../../Theme';

function SerachUrl({ SubmitUrl, alert, urlInput, setUrlInput, Loading }: any) {
  return (
    <Box
      as="form"
      m="sm"
      display="flex"
      flexDir={['column', 'row']}
      gap="md"
      alignItems="center"
      onSubmit={SubmitUrl}
    >
      <FormControl>
        <Label alert={alert} color={assert[600]}>
          Youtube URL
        </Label>
        <Input
          InputSize="large"
          type="url"
          value={urlInput}
          color={assert[600]}
          width="100%"
          onChange={(e: { target: { value: any } }) =>
            setUrlInput(e.target.value)
          }
        />
      </FormControl>
      <Button
        w={['50%', 'fit-content']}
        type="submit"
        loadingText="Opening the Url"
        isLoading={Loading}
        alignSelf={['center', 'flex-end']}
        mb={2}
      >
        Submit
      </Button>
    </Box>
  );
}

export default SerachUrl;
