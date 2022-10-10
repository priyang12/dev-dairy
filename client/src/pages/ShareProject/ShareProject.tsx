import {
  Button,
  Flex,
  Heading,
  Skeleton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDeleteSharedToken, useGetToken } from '../../API/ShareProjectAPI';
import Container from '../../components/Container';
import Project from './Project';
import ShareModal from './ShareModal';
import { format, parseISO } from 'date-fns';
import { useApiToast } from '../../Hooks/useApiToast';

function ShareLinkComponent({
  token,
  ExpireDate,
}: {
  token: string;
  ExpireDate: string;
}) {
  const { id } = useParams<{ id: string }>();
  const [DeleteTokenFn, DeleteResult] = useDeleteSharedToken();
  useApiToast({
    Result: DeleteResult,
    successMessage: 'Token Deleted',
    ErrorMessage: 'Failed to delete token',
  });

  return (
    <>
      <Flex alignItems="flex-start" gap={5}>
        <Heading fontSize="2xl">Share Link</Heading>{' '}
        <CopyToClipboard text={`http://localhost:3000/share/${token}`}>
          <Button w={['100%', 'auto']}>
            Copy
            <Tooltip hasArrow label="Click to Copy" closeDelay={300}>
              <span>📋</span>
            </Tooltip>
          </Button>
        </CopyToClipboard>
      </Flex>
      <Flex gap="lg" alignItems="center" py="sm" flexDir={['column', 'row']}>
        <Text
          w="100%"
          p={3}
          border="2px solid"
          borderColor="primary.500"
          textOverflow="ellipsis"
        >
          http://localhost:3000/share/{token}
        </Text>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="flex-start"
        flexDir={['column', 'row']}
        pb="lg"
      >
        <Button
          colorScheme="red"
          w={['100%', 'auto']}
          onClick={() => DeleteTokenFn(id as string)}
        >
          Delete Token
        </Button>
        <Text ml="auto">
          ExpireDate : {format(parseISO(ExpireDate), "yyyy-MM-dd' 'HH:mm")}
        </Text>
      </Flex>
    </>
  );
}

function ShareLinkLoading({
  isLoading,
  TokenResponse,
}: {
  isLoading: boolean;
  TokenResponse: any;
}) {
  return (
    <Skeleton isLoaded={!isLoading} height="2rem">
      {TokenResponse?.token ? (
        <ShareLinkComponent
          token={TokenResponse.token}
          ExpireDate={TokenResponse.expirationTime}
        />
      ) : (
        <ShareModal />
      )}
    </Skeleton>
  );
}
function ShareProject() {
  const { id } = useParams<{ id: string }>();
  const { data: TokenResponse, isLoading } = useGetToken(id as string);

  return (
    <Container my="lg">
      <Heading fontSize="4xl">Share Project</Heading>
      <Project />
      <ShareLinkLoading isLoading={isLoading} TokenResponse={TokenResponse} />
    </Container>
  );
}
export default ShareProject;
