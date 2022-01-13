import { Fragment } from "react";

// eslint-disable-next-line
export default () => (
  <Fragment>
    <img
      src={require("../Assets/spinner.gif")}
      style={{ width: "200px", margin: "auto", display: "block" }}
      alt='loading...'
    />
  </Fragment>
);
