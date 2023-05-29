import Cookies from "js-cookie";
import mem from "mem";
import { axiosPrivate } from "./axios";

const refreshTokenFn = async () => {
	const token = Cookies.get("token");
	const refreshToken = Cookies.get("refreshToken");
	if (token) {
		try {
			const { status, data } = await axiosPrivate.post("auth/refresh", {
				refresh_token: refreshToken,
				access_token: token,
			});
			if (status === 200) {
				if (!data?.access_token) {
					Cookies.remove("token");
					Cookies.remove("refreshToken");
					Cookies.remove("expiration");
				}
				Cookies.set("token", data?.access_token);
				Cookies.set("refreshToken", data?.refresh_token);
				Cookies.set("expiration", data?.expiration);
				localStorage.setItem("session", JSON.stringify(data));
				return data;
			}
		} catch (e) {
			console.log(e);
			Cookies.remove("token");
			Cookies.remove("refreshToken");
			Cookies.remove("expiration");
		}
	}
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
	maxAge,
});
