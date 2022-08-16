import { useRef, useState, useEffect, useMemo } from 'react';
import { useGetPostsQuery, useLazyGetPosts } from '../API/PostAPI';

export const useInfinitePosts = () => {
  const shouldReset = useRef(true);
  const [page, setpage] = useState(2);
  const [trigger, result] = useLazyGetPosts();
  const [End, setEnd] = useState(false);

  useEffect(() => {
    trigger({ page: 1, limit: 10 });
  }, []);

  useEffect(() => {
    shouldReset.current = true;
    trigger({ page: 1, limit: 10 });
  }, []);

  const combined = useMemo(() => {
    const arr = new Array(10 * (page + 1));
    if (result.data?.length === 0) setEnd(true);

    for (const data of [result.data]) {
      if (data) {
        for (const item of data) {
          arr.push(item);
        }
      }
    }
    return arr;
  }, [result]);

  return {
    ...result,
    data: combined,
    CurrentPage: page,
    isLastPage: End,
    fetchNextPage() {
      if (result.data?.length !== 0) {
        trigger({ page, limit: 10 });
        setpage((prevPage: number) => prevPage + 1);
      }
    },
  };
};
