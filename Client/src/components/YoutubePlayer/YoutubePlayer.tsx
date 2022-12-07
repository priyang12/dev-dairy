import React from 'react';
import { toast } from 'react-toastify';
import { Box, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { AiFillYoutube } from 'react-icons/ai';
import ReactPlayer from 'react-player/youtube';
import Container from '../Container';
import Spinner from '../spinner';
import SerachUrl from './SerachUrl';

function YoutubePlayer() {
  const [Show, setShow] = React.useState(false);
  const [url, setUrl] = React.useState(
    'https://www.youtube.com/watch?v=pzEP7SEeW8s&ab_channel=AllTypeLofiSongs',
  );
  const [urlInput, setUrlInput] = React.useState('');
  const [Loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState('');
  const SubmitUrl = (e: any) => {
    e.preventDefault();
    if (
      urlInput.length > 0 &&
      urlInput.includes('https://www.youtube.com/watch?v=') &&
      url !== urlInput
    ) {
      setUrl(urlInput);
      setUrlInput('');
      setLoading(true);
    }

    if (
      urlInput.length === 0 ||
      !urlInput.includes('https://www.youtube.com/watch?v=')
    ) {
      setAlert('Please enter a valid url');
      // Remove toast in later commit
      toast.warning('Please enter a valid url', {
        autoClose: 3000,
      });
    }
    if (url === urlInput) {
      setAlert('This url is already playing');
      // Remove toast in later commit
      toast.warning('This url is already playing', {
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {!Show && (
        <Box position="fixed" right="5%" bottom="0" zIndex={2}>
          <IconButton
            aria-label="Show-Player"
            onClick={() => setShow(true)}
            bg="red"
          >
            <AiFillYoutube />
          </IconButton>
        </Box>
      )}
      <Box
        p="md"
        position="fixed"
        bottom={0}
        zIndex="20"
        bg="primary.700"
        borderRadius="2xl"
        width="100%"
        height={['90%', 'auto']}
        transition="all 0.3s ease-in-out"
        transform={Show ? 'translateY(0)' : 'translateY(100%)'}
      >
        <Container>
          <IconButton
            aria-label="Close-YoutubePlayer"
            onClick={() => setShow(false)}
          >
            <CloseIcon />
          </IconButton>
          <SerachUrl
            SubmitUrl={SubmitUrl}
            alert={alert}
            urlInput={urlInput}
            setUrlInput={setUrlInput}
            Loading={Loading}
          />
          {Loading && <Spinner />}
          <ReactPlayer
            url={url}
            onBuffer={() => setLoading(true)}
            onBufferEnd={() => setLoading(false)}
            width="100%"
            controls
          />
        </Container>
      </Box>
    </>
  );
}

export default YoutubePlayer;
