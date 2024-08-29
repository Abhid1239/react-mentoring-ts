import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./sessionSlice";

const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
  },
});

export type rootState = ReturnType<typeof store.getState>;

export type appDispatch = typeof store.dispatch;

export default store;
