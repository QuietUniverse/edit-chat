import Card from "../UI/Card";

import styles from "./FormContainer.module.css";

function FormContainer({ children }) {
  return <Card className={styles.container}>{children}</Card>;
}

export default FormContainer;
