import { useRef, useState, useEffect } from 'react';
import { useLazyGetPosts } from '../API/PostAPI';
import { IPost } from '../interface';

export const useInfinitePosts = () => {
  const shouldReset = useRef(true);
  const [page, setpage] = useState(2);
  const [trigger, result] = useLazyGetPosts();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [postsIds, setPostsIds] = useState<Set<string>>(new Set());
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
      // setPosts(new Set(result.data));
      setPosts(result.data);
      const ids = new Set(result.data.map((post) => post._id));
      setPostsIds(ids);
      shouldReset.current = false;
    } else if (result.data && result.data?.length > 0) {
      const NewPosts = [...posts];
      const ids = new Set(postsIds);
      result.data.forEach((post) => {
        if (ids.has(post._id)) {
          NewPosts[NewPosts.findIndex((p) => p._id === post._id)] = post;
        } else {
          ids.add(post._id);
          NewPosts.push(post);
        }
      });
      setPostsIds(ids);
      setPosts(NewPosts);
    }
  }, [result.data]);

  const DeletePost = (id: string) => {
    const NewPosts = [...posts];
    const NewPostsIds = new Set(postsIds);
    NewPostsIds.delete(id);
    NewPosts.splice(
      NewPosts.findIndex((p) => p._id === id),
      1,
    );
    setPostsIds(NewPostsIds);
    setPosts(NewPosts);
  };
  // const UpdatePost = (post: IPost) => {
  //   const NewPosts = [...posts];
  //   const NewPostsIds = new Set(postsIds);
  //   NewPostsIds.delete(post._id);
  //   NewPosts.splice(NewPosts.findIndex((p) => p._id === post._id), 1, post);
  //   setPostsIds(NewPostsIds);
  //   setPosts(NewPosts);
  // }
  // const AddPost = (post: IPost) => {
  //   const NewPosts = [...posts];
  //   const NewPostsIds = new Set(postsIds);
  //   NewPostsIds.add(post._id);
  //   NewPosts.push(post);
  //   setPostsIds(NewPostsIds);
  //   setPosts(NewPosts);
  // }

  return {
    ...result,
    data: posts,
    CurrentPage: page,
    isLastPage: End,
    fetchNextPage() {
      if (result.data?.length !== 0) {
        trigger({ page, limit: 10 });
        setpage((prevPage: number) => prevPage + 1);
      }
    },
    DeletePost,
  };
};
