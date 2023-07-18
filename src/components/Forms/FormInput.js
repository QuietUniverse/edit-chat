import React from "react";

import styles from "./FormInput.module.css";

const FormInput = React.forwardRef(
  (
    {
      type = "text",
      label = "Label",
      id = crypto.randomUUID(),
      className = "",
    },
    ref
  ) => {
    return (
      <div className={`${styles[`form-input`]} ${className}`}>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} ref={ref} />
      </div>
    );
  }
);

export default FormInput;
