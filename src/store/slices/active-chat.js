import { createSlice } from "@reduxjs/toolkit";

const activeChatSlice = createSlice({
  name: "activeChat",
  initialState: {
    chatUser: {},
    chatId: null,
  },
  reducers: {
    setChat(state, action) {
      state.chatUser = action.payload.chatUser;
      state.chatId = action.payload.chatId;
    },
    logoutChat(state, action) {
      state.chatUser = {};
      state.chatId = null;
    },
  },
});

export const activeChatActions = activeChatSlice.actions;
export default activeChatSlice;
