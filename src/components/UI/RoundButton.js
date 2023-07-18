import styles from "./RoundButton.module.css";

function RoundButton({
  svgLink = "",
  classNames = "",
  viewBox = "0 0 24 24",
  height = "50%",
  width = "50%",
  onClick,
}) {
  return (
    <button
      type="button"
      className={`${styles[`btn`]} ${classNames}`}
      onClick={onClick}
    >
      <svg height={height} width={width} viewBox={viewBox}>
        <use href={svgLink} />
      </svg>
    </button>
  );
}

export default RoundButton;
