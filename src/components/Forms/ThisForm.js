import styles from "./ThisForm.module.css";

function ThisForm({ children, onSubmitForm = undefined }) {
  return (
    <form
      className={styles[`this-form`]}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitForm();
      }}
    >
      {children}
    </form>
  );
}

export default ThisForm;
