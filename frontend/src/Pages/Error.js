import React from "react";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="display-msg">
      <h1>
        Invalid Route <Link to="/">Go Back Home</Link>{" "}
      </h1>
    </div>
  );
};

export default Error;
