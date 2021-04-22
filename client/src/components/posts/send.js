import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { AddPost } from "../../actions/PostAction";
const Send = ({ AddPost }) => {
  const [text, setpost] = useState("");
  const onsubmit = (e) => {
    e.preventDefault();
    AddPost({ text });
    window.location.reload();
  };

  const onchange = (e) => {
    setpost(e.target.value);
  };
  const clear = () => {
    setpost("");
  };

  return (
    <Fragment>
      <div
        className="modal fade"
        id="SendModal"
        tabIndex="-1"
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
                      rows="4"
                      value={text}
                      onChange={onchange}
                    ></textarea>
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
    </Fragment>
  );
};

export default connect(null, { AddPost })(Send);
