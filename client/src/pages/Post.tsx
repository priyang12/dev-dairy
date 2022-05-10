import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import type {
  AlertState,
  AuthState,
  Comment,
  PostState,
} from '../actions/interfaces';
import { GetPost, PostComment } from '../actions/PostAction';
import CommentItems from '../components/CommentItems';
import Spinner from '../components/spinner';

function Post() {
  const { id }: any = useParams();
  const [Comment, setComment] = useState('');
  const { loading }: AlertState = useSelector((state: any) => state.Alert);
  const { user }: AuthState = useSelector((state: any) => state.Auth);
  const { post }: PostState = useSelector((state: any) => state.Post);

  const Fetch = post?._id !== id;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (Fetch) {
      dispatch(GetPost(id));
    }
  }, [id, dispatch, Fetch]);

  const MakeComment = (e: any) => {
    e.preventDefault();
    const NewComment: Comment = {
      commentingUser: true,
      text: Comment,
      user: {
        name: user?.name,
        uid: user?.uid,
        photoURL: user?.photoURL,
      },
      _id: '',
    };
    dispatch(PostComment(id, NewComment));
    setComment('');
  };

  if (loading) return <Spinner />;

  if (!post) return <h1>Post Not Found</h1>;
  console.log(post.comments);
  return (
    <div className="post">
      <div className="container">
        <div className="row m-2">
          <div className="col-sm-12">
            <div className="card card-body mb-3">
              <div className="row ">
                <div className="col-1 mw-100">
                  <Link to={`/profile/${post.user}`}>
                    <p
                      className="text-center"
                      style={{ color: 'black', marginBottom: '0rem' }}
                    >
                      {post.user.name.toUpperCase()}
                    </p>
                  </Link>
                </div>
                {/* <div className="col-md-1"></div> */}
                <div className=" col-md-9 ">
                  <p className="lead">{post.text}</p>
                </div>
              </div>
            </div>

            <div className="post-form mb-3">
              <div className="card card-info">
                <div className="card-header bg-info text-white">Comment</div>
                <div className="card-body">
                  <form onSubmit={MakeComment}>
                    <div className="form-group">
                      <input type="text" name="title" id="title" />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control form-control-lg"
                        placeholder="Make a comment"
                        value={Comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-dark">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {post.comments.length > 0 ? (
              <CommentItems
                comments={post.comments}
                postUserId={post.user._id}
              />
            ) : (
              <h4 className="text-center">No Comments</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
