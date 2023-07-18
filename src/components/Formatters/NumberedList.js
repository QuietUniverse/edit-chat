import { listItemsParsing } from "../../helpers";

function NumberedList(inputText) {
  const formattedInput = listItemsParsing(inputText);

  return `<ol>${formattedInput}</ol>`;
}

export default NumberedList;
