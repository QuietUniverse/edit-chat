import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    textSelection: {
      isSelected: false,
      selectionStart: undefined,
      selectionEnd: undefined,
      isBackwards: undefined,
    },
    selectedFormatter: "",
    inputText: "",
  },
  reducers: {
    setTextSelection(state, action) {
      state.textSelection.isSelected = true;
      state.textSelection.selectionStart = action.payload.selectionStart;
      state.textSelection.selectionEnd = action.payload.selectionEnd;
      state.textSelection.isBackwards = action.payload.isBackwards;
    },
    setSelectedFormatter(state, action) {
      state.selectedFormatter = action.payload.selectedFormatter;
    },
    setInput(state, action) {
      state.inputText = action.payload.inputText;
    },
    resetInput(state, action) {
      state.textSelection.isSelected = false;
      state.textSelection.selectionStart = undefined;
      state.textSelection.selectionEnd = undefined;
      state.textSelection.isBackwards = undefined;

      state.selectedFormatter = "";
      state.inputText = "";
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
