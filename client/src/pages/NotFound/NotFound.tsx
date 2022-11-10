import { Flex, Heading, Text } from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';
import Container from '../../components/Container';
import MetaData from '../../Meta/MetaNotFound';
import { space } from '../../Theme';

type PropData = {
  heading: string;
  subheading: string;
};
interface INotFoundProps {
  data?: PropData;
}
function NotFound({ data }: INotFoundProps) {
  return (
    <Container my={space['md']}>
      <MetaData title="Sorry Not Found" />
      <Heading fontSize={space['2xl']}>
        <Flex>
          {data?.heading}
          <FaExclamationTriangle />
        </Flex>
      </Heading>
      <Text as="p" className="large">
        {data?.subheading}
      </Text>
    </Container>
  );
}

NotFound.defaultProps = {
  data: {
    heading: 'Page Not Found',
    subheading: 'Sorry, but the page requested does not exist',
  },
};

export default NotFound;
