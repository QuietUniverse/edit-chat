import styles from "./Loading.module.css";

function Loading({ className, inlineStyles }) {
  return (
    <div
      className={`${styles.layout} ${className}`}
      style={{ ...inlineStyles }}
    >
      <div className={styles.bouncer}></div>
    </div>
  );
}

export default Loading;
