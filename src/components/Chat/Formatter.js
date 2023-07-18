import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../../store/slices/ui";
import styles from "./Formatter.module.css";

function Formatter({
  svgLink,
  height = "60%",
  width = "60%",
  viewBox = "0 0 24 24",
  strokeOnly = false,
  dataFormatter,
}) {
  const selectedFormatter = useSelector((state) => state.ui.selectedFormatter);
  const dispatch = useDispatch();

  function handleToggleFormatter() {
    dispatch(
      uiActions.setSelectedFormatter({
        selectedFormatter:
          selectedFormatter === dataFormatter ? "" : dataFormatter,
      })
    );
  }

  return (
    <div
      role="button"
      className={`${styles.formatter} ${
        strokeOnly ? styles[`stroke-only`] : ""
      } ${
        selectedFormatter === dataFormatter ? styles[`formatter-hover`] : ""
      }`}
      onClick={handleToggleFormatter}
    >
      <svg height={height} width={width} viewBox={viewBox}>
        <use href={svgLink} />
      </svg>
    </div>
  );
}

export default Formatter;
