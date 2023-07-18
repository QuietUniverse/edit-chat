import { Link } from "react-router-dom";

import styles from "./FormRedirect.module.css";

function FormRedirect({ text = "Redirect", href = "/" }) {
  return (
    <Link to={href} className={styles.link}>
      {text}
    </Link>
  );
}

export default FormRedirect;
