import { useRef, useState, useEffect } from 'react';
import { useLazyGetPosts } from '../API/PostAPI';
import { IPost } from '../interface';

export const useInfinitePosts = () => {
  const shouldReset = useRef(true);
  const [page, setpage] = useState(1);
  const [TotalPosts, setTotalPosts] = useState(0);
  const [trigger, result] = useLazyGetPosts();

  const [posts, setPosts] = useState<
    {
      page: number;
      posts: IPost[];
    }[]
  >([
    {
      page: 1,
      posts: [],
    },
  ]);
  const [End, setEnd] = useState(false);

  useEffect(() => {
    trigger({ page: 1, limit: 10 });
  }, []);

  useEffect(() => {
    shouldReset.current = true;
    trigger({ page: 1, limit: 10 });
  }, []);

  useEffect(() => {
    if (!result.isSuccess) return;
    if (result.data?.length === 0) setEnd(true);
    if (shouldReset.current) {
      const QueryPage = result.originalArgs.page;
      setPosts([
        {
          page: QueryPage,
          posts: result.data,
        },
      ]);
      setTotalPosts(result.data.length);
      shouldReset.current = false;
    } else if (result.data && result.data?.length > 0) {
      console.log('here');
      const NewPosts = [
        {
          page: result.originalArgs.page,
          posts: result.data,
        },
      ];
      if (posts.find((p) => p.page === result.originalArgs.page)) {
        const index = posts.findIndex(
          (p) => p.page === result.originalArgs.page,
        );

        const newPosts = [...posts];
        // Replace Old Page with New Page
        const oldTotal = newPosts[index].posts.length;
        const NewTotal = NewPosts[0].posts.length;
        console.log(oldTotal - NewTotal);

        newPosts[index] = NewPosts[0];

        setTotalPosts((CurrentTotal) => CurrentTotal - (oldTotal - NewTotal));

        setPosts(newPosts);
      } else {
        setTotalPosts((currentTotal) => currentTotal + result.data.length);
        setPosts([...posts, ...NewPosts]);
      }
    }
  }, [result.data]);

  return {
    ...result,
    data: posts,
    CurrentPage: page,
    isLastPage: End,
    TotalPosts,
    fetchNextPage() {
      if (!End) {
        trigger({ page: page + 1, limit: 10 });
        setpage((prevPage: number) => prevPage + 1);
      }
    },
  };
};
