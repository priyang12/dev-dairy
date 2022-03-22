import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthState, PostState, Comment } from "../actions/interfaces";
import { DeleteComment } from "../actions/PostAction";

const CommentItems = ({ postId }: any) => {
  const { comments }: PostState = useSelector((state: any) => state.Post);
  const { isAuth, user }: AuthState = useSelector((state: any) => state.Auth);
  if (comments.length === 0) {
    return null;
  }
  return (
    <div className='comments p-3 m-3'>
      <h4 className='text-center'>Comments</h4>
      {comments.map((comment: Comment) => (
        <div className='card card-body mb-3'>
          <div className='row'>
            <div className='col-md-2 mw-100'>
              <Link to={`/profile/${comment.user.uid}`}>
                {/* <img src={user.avatar} alt='sd' width='100' /> */}
                <p style={{ color: "black", marginBottom: "0rem" }}>
                  {comment.user.name.toUpperCase()}
                </p>
              </Link>
            </div>

            <div className='col-md-12'>
              <p className='lead'>{comment.text}</p>
              <p className='post-date'>Posted on {comment.createdAt}</p>

              {user?.uid === comment.user.uid && (
                <button
                  onClick={() => DeleteComment(postId, comment.uid)}
                  type='button'
                  className='btn btn-danger px-5'
                >
                  <i className='fas fa-times' />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentItems;
