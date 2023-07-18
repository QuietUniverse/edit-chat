import { listItemsParsing } from "../../helpers";

function BulletedList(inputText) {
  const formattedInput = listItemsParsing(inputText);

  return `<ul>${formattedInput}</ul>`;
}

export default BulletedList;
