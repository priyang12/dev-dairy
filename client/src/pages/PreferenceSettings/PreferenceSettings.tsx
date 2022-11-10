import {
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Flex,
  Input,
  Button,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import MetaData from '../../Meta/MetaPreferenceSettings';

function PreferenceSettings() {
  const [Loading, setLoading] = useState(false);

  const SaveSettings = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const PgImage = e.target.elements.PostsBGImage.value;
    const AuthImage = e.target.elements.AuthBGImage.value;

    localStorage.setItem('PostImage', PgImage);
    localStorage.setItem('AuthImage', AuthImage);
    setTimeout(() => {
      setLoading(false);
      toast.success('Setting is Saved', {
        closeButton: true,
        autoClose: 3000,
      });
    }, 2000);
  };

  return (
    <Flex
      as="form"
      onSubmit={SaveSettings}
      gap={5}
      direction="column"
      className="glass"
      p={5}
      minH="60vh"
    >
      <Heading fontSize="4xl">Preference Settings</Heading>
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
          <Heading fontSize="2xl">Posts BG Unsplash Image ID</Heading>
        </FormLabel>

        <InputGroup size="sm">
          <InputLeftAddon children="https://source.unsplash.com/" />
          <Input
            type="text"
            defaultValue={localStorage.getItem('PostImage') || ''}
            placeholder="Unsplash image Id ex - aiKyJ6rHCP4"
            name="PostsBGImage"
            onChange={() => {}}
          />
          <InputRightAddon children=".com" />
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="AuthBGImage">
          <Heading fontSize="2xl">Auth BG Unsplash Image ID</Heading>
        </FormLabel>
        <InputGroup size="sm">
          <InputLeftAddon children="https://source.unsplash.com/" />
          <Input
            type="text"
            defaultValue={localStorage.getItem('AuthImage') || ''}
            placeholder="Unsplash image Id ex - aiKyJ6rHCP4"
            name="AuthBGImage"
            onChange={() => {}}
          />
          <InputRightAddon children=".com" />
        </InputGroup>
      </FormControl>
      <FormControl as={Flex} m={5} alignItems="center">
        <Switch id="dark-mode" size="lg" />
        <FormLabel htmlFor="dark-mode" my={0} mx={2} fontSize="2xl">
          Dark Mode
        </FormLabel>
      </FormControl>
      <Button
        colorScheme="green"
        variant="outline"
        type="submit"
        isLoading={Loading}
        loadingText="Saving Setting"
      >
        <Heading fontSize="2xl">Save</Heading>
      </Button>
    </Flex>
  );
}
export default PreferenceSettings;
