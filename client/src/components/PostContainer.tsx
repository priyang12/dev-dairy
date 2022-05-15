import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, GridItem } from '@chakra-ui/react';
import type { IPost } from '../interface';

type PropTypes = {
  post: IPost;
};

function PostContainer({ post }: PropTypes) {
  const { user }: any = useSelector((state: any) => state.User);

  const dispatch = useDispatch();

  const deletePost = () => {
    // dispatch(deletePostAction(_id));
  };

  return (
    <GridItem bgColor="gray.500" color="#fff" p={10} borderRadius={20}>
      <Box as="article">
        <div className="row">
          {/* {Boolean(PostUser?.avatar) && (
            <div className="col-md-2">
              <Link to={`/profile/${user?.uid}`}>
                <img
                  className="rounded-circle d-md-block"
                  src={PostUser.avatar}
                  alt="avatar"
                  width={150}
                />
              </Link>
            </div>
          )} */}
          <div className="col-md-10">
            <p className="lead">{post.title}</p>
            <p className="lead">{post.description}</p>
            {post.user._id === user._id && (
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

            <p className="text-muted">{post.date.toString()}</p>
          </div>
        </div>
      </Box>
    </GridItem>
  );
}

export default PostContainer;
