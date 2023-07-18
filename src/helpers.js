export const listItemsParsing = (inputText) => {
  let splitListItems = inputText.split(/\n/);

  if (splitListItems.length > 1 && splitListItems.at(-1) === "") {
    splitListItems = splitListItems.slice(0, splitListItems.length - 1);
  }

  const formattedInput = splitListItems.reduce((accliEl, currliEl) => {
    return accliEl + `<li>${currliEl}</li>`;
  }, "");

  return formattedInput;
};

// export const getCaretPosition = () => {
//   const sel = document.getSelection();
//   sel.modify("extend", "backward", "paragraphboundary");
//   const pos = sel.toString().length;
//   if (sel.anchorNode !== undefined) sel.collapseToEnd();
// };
