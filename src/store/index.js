import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/user";
import activeChatSlice from "./slices/active-chat";
import uiSlice from "./slices/ui";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    activeChat: activeChatSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
