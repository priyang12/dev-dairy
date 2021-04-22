import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DeleteExperience, DeleteEducation } from "../../actions/ProfileAction";

const DashBoardItems = ({ field, DeleteExperience, DeleteEducation }) => {
  const onDelete = () => {
    if (field.company) {
      DeleteExperience(field._id);
    } else {
      console.log(field._id);
      DeleteEducation(field._id);
    }
  };
  return (
    <tr>
      <td>{field.company || field.school}</td>
      <td>{field.degree || field.title}</td>
      <td>
        {field.from.slice(0, 10)}-{field.to.slice(0, 10) || field.current}
      </td>
      <td>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};
DashBoardItems.propTypes = {
  DeleteExperience: PropTypes.func.isRequired,
  DeleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { DeleteExperience, DeleteEducation })(
  DashBoardItems
);
