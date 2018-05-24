import React from "react";
import classnames from "classnames";

export default ({ label, value, name, onChange, onBlur, error }) => {
  return (
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor={name}>
        {label}
      </label>
      <div className="col-sm-10">
        <input
          type="text"
          name={name}
          className={classnames("form-control", { "input-is-invalid": error })}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
      </div>
    </div>
  );
};
