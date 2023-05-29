import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { UserState } from "../models/user";
import { fetchUser } from "./ActionCreator";

const initialState: UserState = {
	token: "",
	refreshToken: "",
	expiration: "",
	error: "",
	isLoader: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userLogout(state) {
			state.token = "";
			state.refreshToken = "";
			state.expiration = "";
			Cookies.remove("token");
			Cookies.remove("refreshToken");
			Cookies.remove("expiration");
		},
		userAutoLogin(state) {
			const token = Cookies.get("token");
			const refreshToken = Cookies.get("refreshToken");
			const expiration = Cookies.get("expiration");
			if (token !== undefined && refreshToken !== undefined && expiration !== undefined) {
				state.token = token;
				state.refreshToken = refreshToken;
				state.expiration = expiration;
			} else {
				state.token = "";
				state.refreshToken = "";
				state.expiration = "";
				Cookies.remove("token");
				Cookies.remove("refreshToken");
				Cookies.remove("expiration");
			}
		},
	},
	extraReducers: {
		[fetchUser.pending.type]: (state) => {
			state.isLoader = true;
		},
		[fetchUser.fulfilled.type]: (state, action: PayloadAction<UserState>) => {
			state.isLoader = false;
			state.token = action.payload.token;
			state.refreshToken = action.payload.refreshToken;
			state.expiration = action.payload.expiration;
		},
	},
});

export default userSlice.reducer;
