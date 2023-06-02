import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { UserState } from "../models/user";
import { fetchUser } from "./ActionCreator";

const initialState: UserState = {
  idInstance: "",
  apiTokenInstance: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout(state) {
      state.idInstance = "";
      state.apiTokenInstance = "";
      Cookies.remove("idInstance");
      Cookies.remove("apiTokenInstance");
    },
    userAutoLogin(state) {
      const idInstance = Cookies.get("idInstance");
      const apiTokenInstance = Cookies.get("apiTokenInstance");
      if (idInstance !== undefined && apiTokenInstance !== undefined) {
        state.idInstance = idInstance;
        state.apiTokenInstance = apiTokenInstance;
      } else {
        state.idInstance = "";
        state.apiTokenInstance = "";
        Cookies.remove("idInstance");
        Cookies.remove("apiTokenInstance");
      }
    },
  },
  extraReducers: {
    [fetchUser.fulfilled.type]: (state, action: PayloadAction<UserState>) => {
      state.apiTokenInstance = action.payload.apiTokenInstance;
      state.idInstance = action.payload.idInstance;
    },
  },
});

export default userSlice.reducer;
