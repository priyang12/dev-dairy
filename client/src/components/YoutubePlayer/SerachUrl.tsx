import { Button, Box } from '@chakra-ui/react';
import { FormInput, Input, Label } from '@priyang/react-component-lib';

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
      <FormInput width="100%">
        {/* Need to Fix alert not showing in component lib */}
        <Label alert={alert}>Youtube URL</Label>
        <Input
          InputSize="large"
          type="url"
          value={urlInput}
          bg="primary.800"
          width="100%"
          onChange={(e: { target: { value: any } }) =>
            setUrlInput(e.target.value)
          }
        />
      </FormInput>
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
