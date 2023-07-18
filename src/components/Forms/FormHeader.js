import styles from "./FormHeader.module.css";

function FormHeader({ text = "" }) {
  return (
    <h2 className={styles[`form-header`]}>
      {text.at(0)}
      <span>{text.slice(1)}</span>
    </h2>
  );
}

export default FormHeader;
