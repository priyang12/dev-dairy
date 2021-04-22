import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddEducation } from "../../actions/ProfileAction";

const AddEdu = ({ AddEducation }) => {
  const [edu, setedu] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
  });

  const { school, degree, fieldofstudy, from, to, current } = edu;

  const [valid, setValid] = useState(false);
  const onchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setedu({ ...edu, [name]: value });
  };
  const onchecked = (e) => {
    if (edu[from] !== "" && e.target.checked === true) {
    }
    setedu({ ...edu, [e.target.name]: e.target.checked });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    console.log("here");
    if (
      school === "" ||
      degree === "" ||
      from === "" ||
      (to === "" && current === false)
    ) {
      setValid(true);
      console.log("not valid");
    } else {
      setValid(false);
      console.log("valid");
      console.log(edu);
      AddEducation(edu);
      window.location.reload();
    }
  };
  const clear = () => {
    setedu({
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
    });
    setValid(false);
  };
  return (
    <div>
      <div
        className="modal fade"
        id="educationModal"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="educationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
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
              <div className="add-education">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                      <h1 className="display-4 text-center">
                        Add Your Education
                      </h1>
                      <p className="lead text-center">
                        Add any school, bootcamp, etc that you have attended
                      </p>
                      <small className="d-block pb-3">* = required field</small>
                      <form onSubmit={onsubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="* School Or Bootcamp"
                            name="school"
                            value={school}
                            onChange={onchange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="* Degree Or Certificate"
                            name="degree"
                            value={degree}
                            onChange={onchange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Field Of Study"
                            name="fieldofstudy"
                            value={fieldofstudy}
                            onChange={onchange}
                          />
                        </div>

                        <h6>*From Date</h6>
                        <div className="form-group">
                          <input
                            type="date"
                            className="form-control form-control-lg"
                            name="from"
                            value={from}
                            onChange={onchange}
                          />
                        </div>
                        <h6>To Date</h6>
                        <div className="form-group">
                          <input
                            type="date"
                            className="form-control form-control-lg"
                            name="to"
                            value={to}
                            onChange={onchange}
                          />
                        </div>

                        <div className="form-check mb-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="current"
                            value=""
                            id="current"
                            onChange={onchecked}
                          />
                          <label className="form-check-label" htmlFor="current">
                            OR Current Place
                          </label>
                        </div>

                        <input
                          type="submit"
                          className="btn btn-info btn-block mt-4"
                        />
                        {valid ? (
                          <small
                            className="form-text mb-2"
                            style={{ color: "red" }}
                          >
                            Please Enter All the Required Fields
                          </small>
                        ) : null}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddEdu.protoType = {
  AddEducation: PropTypes.func.isRequired,
};

export default connect(null, { AddEducation })(AddEdu);
