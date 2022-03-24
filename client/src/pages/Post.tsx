import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { GetPost, PostComment } from '../actions/PostAction';
import CommentItems from '../components/CommentItems';
import Spinner from '../components/spinner';

function Post() {
  const { id }: any = useParams();
  const { loading } = useSelector((state: any) => state.Alert);
  const { post } = useSelector((state: any) => state.Post);

  useEffect(() => {
    if (post.id !== id) {
      GetPost(id);
    }
  }, [id, post]);

  const [text, settext] = useState('');

  const MakeComment = (e: any) => {
    e.preventDefault();
    PostComment({ text }, post._id);
    settext('');
  };
  if (loading) return <Spinner />;
  return (
    <div className="post">
      <div className="container">
        <div className="row m-2">
          <div className="col-sm-12">
            <div className="card card-body mb-3">
              <div className="row ">
                <div className="col-1 mw-100">
                  {/* <img
                    className='rounded-circle d-none d-md-block  '
                    src={user.avatar}
                    alt='error'
                    width='150'
                  /> */}
                  <Link to={`/profile/${post.user}`}>
                    <p
                      className="text-center"
                      style={{ color: 'black', marginBottom: '0rem' }}
                    >
                      {post.name}
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
                        value={text}
                        onChange={(e) => settext(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-dark">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {post.comments && <CommentItems postId={post.uid} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
