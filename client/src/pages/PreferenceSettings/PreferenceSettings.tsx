import {
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Flex,
  Input,
  Button,
} from '@chakra-ui/react';

function PreferenceSettings() {
  const SaveSettings = (e: any) => {
    e.preventDefault();
    const PgImage = e.target.elements.PostsBGImage.value;
    const AuthImage = e.target.elements.AuthBGImage.value;
    // TODO URl validation
    // TODO Language  and TImezone

    localStorage.setItem('PostImage', PgImage);
    localStorage.setItem('AuthImage', AuthImage);
  };
  return (
    <Flex
      as="form"
      onSubmit={SaveSettings}
      gap={5}
      direction="column"
      className="card"
      p={5}
      minH="60vh"
    >
      <Heading fontSize="4xl">PreferenceSettings</Heading>
      <FormControl>
        <FormLabel>
          <Heading fontSize="2xl">Language</Heading>
        </FormLabel>
        <Input
          type="text"
          placeholder="Language"
          name="language"
          value="English"
          onChange={() => {}}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <Heading fontSize="2xl">Timezone</Heading>
        </FormLabel>
        <Input
          type="text"
          placeholder="Timezone"
          name="timezone"
          value="Asia/Kolkata"
          onChange={() => {}}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="PostsBGImage">
          <Heading fontSize="2xl">Posts BG Image</Heading>
        </FormLabel>
        <Input
          type="text"
          defaultValue={localStorage.getItem('PostImage') || ''}
          placeholder="Add Image URL"
          name="PostsBGImage"
          onChange={() => {}}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="AuthBGImage">
          <Heading fontSize="2xl">Auth BG Image</Heading>
        </FormLabel>
        <Input
          type="text"
          defaultValue={localStorage.getItem('AuthImage') || ''}
          placeholder="Add Image URL"
          name="AuthBGImage"
          onChange={() => {}}
        />
      </FormControl>
      <FormControl as={Flex} m={5} alignItems="center">
        <Switch id="dark-mode" size="lg" />
        <FormLabel htmlFor="dark-mode" my={0} mx={2} fontSize="2xl">
          Dark Mode
        </FormLabel>
      </FormControl>
      <Button colorScheme="green" variant="outline" type="submit">
        <Heading fontSize="2xl">Save</Heading>
      </Button>
    </Flex>
  );
}
export default PreferenceSettings;
