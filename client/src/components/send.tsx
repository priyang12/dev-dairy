import { useState } from 'react';
import { AddPost } from '../actions/PostAction';

function Send() {
  const dispatch = useDispatch();
  const [text, setpost] = useState('');
  const onsubmit = (e: any) => {
    e.preventDefault();
    const post = {
      text,
      title: 'New Post',
      user: '3d5idu5RcuYWKkuuv5jVfrZHx8e2',
      date: Date.now(),
    };
    dispatch(AddPost(post));
    window.location.reload();
  };

  const onchange = (e: any) => {
    setpost(e.target.value);
  };
  const clear = () => {
    setpost('');
  };

  return (
    <div
      className="modal fade"
      id="SendModal"
      tabIndex={-1}
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
      aria-labelledby="SendModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="SendModalLabel">
              Say something
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={clear}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="card-body">
              <form onSubmit={onsubmit}>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="ADD a post"
                    rows={4}
                    value={text}
                    onChange={onchange}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Send;
