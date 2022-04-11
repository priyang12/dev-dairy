/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { AddLike, deletePostAction, RemoveLike } from '../actions/PostAction';
import type { AuthState, Post } from '../actions/interfaces';

type PropTypes = {
  post: Post;
};

function PostContainer({
  post: { user: PostUser, likes, _id, text, title, comments, createdAt },
}: PropTypes) {
  const { user }: AuthState = useSelector((state: any) => state.Auth);
  const dispatch = useDispatch();

  const [checkDelete, setDelete] = useState(false);
  const [checkLike, setLike] = useState(false);
  const [LikesNumber, setLikesNumber] = useState(0);

  useEffect(() => {
    if (likes.length > 0) {
      setLikesNumber(likes.length);
      likes.map((like: any) => (like.user === user._id ? setLike(true) : null));
    }
  }, [likes, user._id]);

  const addLike = () => {
    dispatch(AddLike(_id));
    setLikesNumber(LikesNumber + 1);
  };
  const removeLike = () => {
    dispatch(RemoveLike(_id));
    setLikesNumber(LikesNumber - 1);
  };
  const deletePost = () => {
    dispatch(deletePostAction(_id));
    setDelete(true);
  };
  const check = () => {
    if (checkLike) removeLike();
    else addLike();
    setLike(!checkLike);
  };
  if (checkDelete) return null;
  return (
    <div className="posts">
      <Box as="article">
        <div className="row">
          {Boolean(PostUser?.avatar) && (
            <div className="col-md-2">
              <Link to={`/profile/${user._id}`}>
                <img
                  className="rounded-circle d-md-block"
                  src={PostUser.avatar}
                  alt="avatar"
                  width={150}
                />
              </Link>
            </div>
          )}
          <div className="col-md-10">
            <p className="lead">{text}</p>
            <p className="lead">{title}</p>
            {/* eslint-disable-next-line no-underscore-dangle */}
            {PostUser._id === user.uid && (
              <div className="col">
                <div className="dropdown d-flex justify-content-end">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-label="Dropdown menu"
                    aria-expanded="false"
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      border: 'none',
                    }}
                  />
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <div className="col">
                      <div className="ml-2">
                        <div>
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={deletePost}
                          >
                            <span
                              className="hide-sm tex"
                              style={{ color: '#343a40' }}
                            >
                              Delete the Post
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <button
              type="button"
              className="btn btn-light mr-1"
              onClick={check}
              data-testid={_id}
            >
              <span className="badge badge-light">
                {checkLike ? (
                  <div>
                    <i className="text-info fas fa-thumbs-up" />
                    {LikesNumber}
                  </div>
                ) : (
                  <div>
                    <i className="text-secondary fas fa-thumbs-up" />
                    {LikesNumber}
                  </div>
                )}
              </span>
            </button>

            <Link to={`/post/${_id}`} className="btn btn-info mr-1">
              <span data-testid={`${_id}-comment-count`}>
                {comments.length}
              </span>
              Comments
            </Link>
            <p className="text-muted">{createdAt.toString()}</p>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default PostContainer;
