import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddExperience } from "../../actions/ProfileAction";

const AddExpi = ({ AddExperience }) => {
  const [expi, setexpi] = useState({
    jobTitle: "",
    company: "",
    location: "",
    descrition: "",
    from: "",
    to: "",
    current: false,
  });

  const { jobTitle, company, location, from, to, current, descrition } = expi;
  const [valid, setValid] = useState(false);

  const onchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setexpi({ ...expi, [name]: value });
  };
  const onchecked = (e) => {
    if (expi[from] !== "" && e.target.checked === true) {
    }
    setexpi({ ...expi, [e.target.name]: e.target.checked });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    if (
      jobTitle === "" ||
      company === "" ||
      descrition === "" ||
      from === "" ||
      (to === "" && current === false)
    ) {
      setValid(true);
    } else {
      AddExperience(expi);
      window.location.reload();
    }
  };
  const clear = () => {
    setexpi({
      jobTitle: "",
      company: "",
      location: "",
      descrition: "",
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
        id="experienceModal"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="experienceModalLabel"
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
              <div className="section add-experience">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                      <h1 className="display-4 text-center">
                        Add Your Experience
                      </h1>
                      <p className="lead text-center">
                        Add any developer/programming positions that you have
                        had in the past
                      </p>
                      <small className="d-block pb-3">* = required field</small>
                      <form onSubmit={onsubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="* Job Title"
                            name="jobTitle"
                            value={jobTitle}
                            onChange={onchange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="* Company"
                            name="company"
                            value={company}
                            onChange={onchange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Location"
                            name="location"
                            value={location}
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
                            id="current"
                            onChange={onchecked}
                          />
                          <label className="form-check-label" htmlFor="current">
                            OR Current Job
                          </label>
                        </div>
                        <div className="form-check mb-4">
                          <textarea
                            name="descrition"
                            id="descrition"
                            cols="40"
                            rows="4"
                            onChange={onchange}
                            placeholder="*JOB descrition"
                          ></textarea>
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

AddExpi.protoType = {
  AddExperience: PropTypes.func.isRequired,
};

export default connect(null, { AddExperience })(AddExpi);
