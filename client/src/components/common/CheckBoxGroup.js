import React from "react";
import classnames from "classnames";

export default ({ label, name, onChange, disabled, checked }) => {
  return (
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor={name}>
        {label}
      </label>
      <div className="col-sm-10">
        <input
          disabled={disabled}
          checked={checked}
          type="checkbox"
          name={name}
          className="checkbox-inline"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
