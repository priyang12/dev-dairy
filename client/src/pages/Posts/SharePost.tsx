import { Flex } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import {
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';
import { IPost } from '../../interface';

function SharePost({ post }: { post: IPost }) {
  const title = post.title;
  const shareUrl = `Description : ${post.description} \nDate : ${format(
    parseISO(post.date),
    'yyyy-MM-dd',
  )}`;

  return (
    <Flex justifyContent="space-evenly">
      <TwitterShareButton
        url={`\ndescription: ${post.description}`}
        title={`Title: ${title}`}
      >
        <TwitterIcon round={true}>Share</TwitterIcon>
      </TwitterShareButton>
      <TelegramShareButton url={title} title={shareUrl}>
        <TelegramIcon round />
      </TelegramShareButton>
    </Flex>
  );
}

export default SharePost;
