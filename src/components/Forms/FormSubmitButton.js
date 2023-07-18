import styles from "./FormSubmitButton.module.css";

function FormSubmitButton({ text = "Submit" }) {
  return (
    <button type="submit" className={styles[`form-button`]}>
      <p>
        {text.at(0)}
        <span>{text.slice(1)}</span>
      </p>
    </button>
  );
}

export default FormSubmitButton;
