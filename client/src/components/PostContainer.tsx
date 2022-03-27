import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { AddLike, RemoveLike, DeletePost } from "../actions/PostAction";
import type { Post } from '../actions/interfaces';

type PropTypes = {
  post: Post;
};

function PostContainer({ post: { likes, uid, text, title } }: PropTypes) {
  const { user } = useSelector((state: any) => state.auth);

  const [checkDelete, setDelete] = useState(false);
  const [checkLike, setLike] = useState(false);
  const [LikesNumber, setLikesNumber] = useState(0);

  useEffect(() => {
    if (likes.length > 0) {
      setLikesNumber(likes.length);
      likes.map((like: any) => {
        if (like.user === uid) {
          setLike(true);
        }
        return true;
      });
    }
  }, [setLike, uid, likes]);

  const addLike = () => {
    // AddLike(uid);
  };
  const removeLike = () => {
    // RemoveLike(uid);
  };
  const deletePost = () => {
    // DeletePost(uid);
    setDelete(true);
  };
  const check = () => {
    if (checkLike) {
      removeLike();
      setLikesNumber((LikesNumber) => LikesNumber - 1);
    }
    if (!checkLike) {
      addLike();
      setLikesNumber((LikesNumber) => LikesNumber + 1);
    }
    setLike(!checkLike);
  };

  return (
    <>
      {checkDelete ? null : (
        <div className="posts">
          <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-2">
                {/* <Link to={`/profile/${user._id}`}>
                  <img
                    className='rounded-circle d-none d-md-block'
                    src={user.avatar}
                    alt='error'
                    height='150'
                  />
                  <p className='text-center mb-1' style={{ color: "black" }}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </p>
                </Link> */}
              </div>

              <div className="col-md-10">
                <p className="lead ">{text}</p>
                <p className="lead ">{title}</p>
                {uid === user.uid && (
                  <div className="col">
                    <div className="dropdown d-flex justify-content-end">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
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
                >
                  <span className="badge badge-light">
                    {checkLike ? (
                      <div>
                        <i className="text-info fas fa-thumbs-up" />{' '}
                        {LikesNumber}
                      </div>
                    ) : (
                      <div>
                        <i className="text-secondary fas fa-thumbs-up" />{' '}
                        {LikesNumber}
                      </div>
                    )}
                  </span>
                </button>

                <Link to={`/post/${uid}`} className="btn btn-info mr-1">
                  Comments
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostContainer;
