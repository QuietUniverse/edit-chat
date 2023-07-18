import Formatter from "./Formatter";

import styles from "./OtherFormatters.module.css";

function Otherformatters() {
  return (
    <div className={styles.layout}>
      <Formatter
        svgLink="/sprite.svg#bold"
        viewBox="-2 0 26 24"
        dataFormatter="bold"
      />
      <Formatter
        svgLink="/sprite.svg#italic"
        viewBox="-4 0 28 24"
        dataFormatter="italic"
      />
      <Formatter
        svgLink="/sprite.svg#strikethrough"
        strokeOnly={true}
        viewBox="0 0 20 24"
        dataFormatter="strikethrough"
      />
      <Formatter svgLink="/sprite.svg#attach" viewBox="0 -7 24 24" />
      <Formatter
        svgLink="/sprite.svg#numbered-list"
        viewBox="0 -2 24 24"
        dataFormatter="numbered-list"
      />
      <Formatter
        svgLink="/sprite.svg#bulleted-list"
        viewBox="0 -2 24 24"
        dataFormatter="bulleted-list"
      />
      <Formatter
        svgLink="/sprite.svg#blockquote"
        strokeOnly={true}
        viewBox="0 -2 24 24"
        dataFormatter="blockquote"
      />
      <Formatter
        svgLink="/sprite.svg#code-snippet"
        viewBox="0 -2 24 24"
        dataFormatter="code-snippet"
      />
      <Formatter svgLink="/sprite.svg#code-block" dataFormatter="code-block" />
    </div>
  );
}

export default Otherformatters;
