import hljs from "highlight.js";

function CodeSnippet(inputText) {
  const highlightedCode = hljs.highlightAuto(inputText).value;

  return `<code>${highlightedCode}</code>`;
}

export default CodeSnippet;
