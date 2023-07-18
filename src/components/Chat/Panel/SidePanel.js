import styles from "./SidePanel.module.css";

function SidePanel({ children, sidePanelIsCollapsed }) {
  const classNames = `${styles.panel} ${
    sidePanelIsCollapsed ? styles.hidden : ""
  }`;

  return <aside className={classNames}>{children}</aside>;
}

export default SidePanel;
