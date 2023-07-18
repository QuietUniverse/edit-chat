import { useSelector } from "react-redux";

import Bold from "./Bold";
import Italic from "./Italic";
import Strikethrough from "./Strikethrough";
import NumberedList from "./NumberedList";
import BulletedList from "./BulletedList";
import Blockquote from "./Blockquote";
import CodeSnippet from "./CodeSnippet";

function SelectedFormatter(inputText) {
  const selectedFormatter = useSelector((state) => state.ui.selectedFormatter);
  const selectionExists = useSelector(
    (state) => state.ui.textSelection.isSelected
  );

  if (selectedFormatter === "bold") {
    return Bold(inputText);
  }

  if (selectedFormatter === "italic") {
    return Italic(inputText);
  }

  if (selectedFormatter === "strikethrough") {
    return Strikethrough(inputText);
  }

  if (selectedFormatter === "numbered-list") {
    return NumberedList(inputText);
  }

  if (selectedFormatter === "bulleted-list") {
    return BulletedList(inputText);
  }

  if (selectedFormatter === "blockquote") {
    return Blockquote(inputText);
  }

  if (selectedFormatter === "code-snippet") {
    return `<nobr>${CodeSnippet(inputText)}</nobr>`;
  }

  if (selectedFormatter === "code-block") {
    return `<pre>${CodeSnippet(inputText)}</pre>`;
  }
  return `${inputText}`;
}

export default SelectedFormatter;
