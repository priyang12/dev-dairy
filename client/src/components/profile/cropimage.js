import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import AvatarEditor from "react-avatar-editor";
import { UpdateProfilePic } from "../../actions/ProfileAction";
const CropImage = ({ UpdateProfilePic }) => {
  const [uploadFile, setFile] = useState(null);
  const [Editor, setEditor] = useState(null);
  const [input, setInput] = useState(null);

  const setEditorRef = (editor) => {
    setEditor(editor);
  };
  const setFileRef = (file) => {
    setInput(file);
  };

  const selectFile = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };
  //convet FILE form URL
  const DataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
  const submit = (e) => {
    e.preventDefault();
    if (Editor) {
      const url = Editor.getImageScaledToCanvas().toDataURL();
      localStorage.setItem("avatar", url);
      const CropImage = DataURLtoFile(url, uploadFile.name);
      const formData = new FormData();
      formData.append("file", CropImage);
      UpdateProfilePic(formData);
      window.location.reload();
    }
  };
  const clear = () => {
    setEditor(null);
    setFile(null);
    input.value = null;
  };
  return (
    <Fragment>
      <div
        className="modal fade"
        id="CropImageModal"
        tabIndex="-1"
        role="dialog"
        data-backdrop="static"
        data-keyboard="false"
        aria-labelledby="CropImageModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CropImageModalLabel">
                Set Profile Picture
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
                {uploadFile && (
                  <div>
                    <AvatarEditor
                      ref={setEditorRef}
                      image={uploadFile}
                      width={250}
                      height={250}
                      border={50}
                      color={[255, 255, 255, 0.6]}
                      borderRadius={100}
                      scale={1.2}
                      rotate={0}
                    />
                    <br />
                    <button className="btn btn-primary m-2" onClick={submit}>
                      submit
                    </button>
                  </div>
                )}
                <input type="file" onChange={selectFile} ref={setFileRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { UpdateProfilePic })(CropImage);
