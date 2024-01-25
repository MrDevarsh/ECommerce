import React from "react";

const Error = ({ message }) => {
  return (
    <div className="alert alert-danger rounded text-center">
      <strong>Error:</strong> {message}
    </div>
  );
};

export default Error;
