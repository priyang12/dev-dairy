import { Fragment, useEffect } from "react";
import FeedItem from "../components/feedsItems";
import Send from "../components/send";
import { useSelector, useDispatch } from "react-redux";
import { GetPosts } from "../actions/PostAction";
import Spinner from "../components/spinner";

const Feeds = () => {
  const { loading } = useSelector((state: any) => state.Alert);
  const { posts } = useSelector((state: any) => state.Post);
  const dispatch = useDispatch();
  // console.log(posts[0]);
  // useEffect(() => {
  //   if (posts.length === 0) {
  //     dispatch(GetPosts());
  //   }
  // }, [posts, dispatch]);

  const Faked = [
    {
      date: 1642350791639,
      name: "priyang",
      text: "New Post asdsad as asdihasd asdhasi",
      title: "New Post",
      user: "3d5idu5RcuYWKkuuv5jVfrZHx8e2",
    },
    {
      date: 1642351238323,
      text: "New Post asdsad as asdihasd asdhasi",
      title: "Test the Post",
      user: "3d5idu5RcuYWKkuuv5jVfrZHx8e2",
    },
    {
      date: 1642351262688,
      text: "New Post asdsad as asdihasd asdhasi",
      title: "Test the Post",
      user: "3d5idu5RcuYWKkuuv5jVfrZHx8e2",
    },
    {
      date: 1642352904763,
      text: "New Post asdsad as asdihasd asdhasi",
      title: "Test the Post",
      user: "3d5idu5RcuYWKkuuv5jVfrZHx8e2",
    },
    {
      date: 1642352967556,
      text: "New Post asdsad as asdihasd asdhasi",
      title: "Test the Post",
      user: "3d5idu5RcuYWKkuuv5jVfrZHx8e2",
    },
    {
      date: 1642352985139,
      text: "New Post asdsad as asdihasd asdhasi",
      title: "Test the Post",
      user: "3d5idu5RcuYWKkuuv5jVfrZHx8e2",
    },
    {
      date: 1642353014645,
      text: "New Post asdsad as asdihasd asdhasi",
      title: "Test the Post",
      user: "3d5idu5RcuYWKkuuv5jVfrZHx8e2",
    },
    {
      date: "2022-01-16T17:13:44.562Z",

      likes: [
        {
          user: "3d5idu5RcuYWKkuuv5jVfrZHx8e2",
        },
      ],
      text: "New Post asdsad as asdihasd asdhasi",
      title: "Test the Post",
      user: "3d5idu5RcuYWKkuuv5jVfrZHx8e2",
    },
  ];
  if (loading) return <Spinner />;
  return (
    <Fragment>
      {/* <Send /> */}
      <div className='feed'>
        <div className='container'>
          <div className='mx-5 px-5 '>
            <div className='card-header bg-info text-white'>
              <a href='#SendModal' data-toggle='modal' data-target='#SendModal'>
                Say Something...
              </a>
            </div>
          </div>
          <div className='col p-3'>
            {Faked &&
              Faked.map((post: any, index: number) => (
                <FeedItem key={index} post={post} />
              ))}
          </div>
        </div>
      </div>
      )
    </Fragment>
  );
};

export default Feeds;
