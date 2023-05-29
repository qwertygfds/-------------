import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { memoizedRefreshToken } from "./refreshToken";

axios.defaults.baseURL = process.env.REACT_APP_HOST;

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

axios.interceptors.request.use(
	async (config) => {
		const token = Cookies.get("token");
		if (token) {
			config.headers = {
				...config.headers,
				authorization: `Bearer ${token}`,
			};
		}

		return config;
	},
	(error) => Promise.reject(error)
);

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const config = error?.config;

		if (error?.response?.status === 403 && !config?.sent) {
			config.sent = true;

			const result = await memoizedRefreshToken();

			if (result?.token) {
				config.headers = {
					...config.headers,
					authorization: `Bearer ${result?.token}`,
				};
			}
			return axios(config);
		}
		return Promise.reject(error);
	}
);

export const axiosPrivate = axios;

export const axiosBaseQuery =
	(): BaseQueryFn<
		{
			url: string;
			method: AxiosRequestConfig["method"];
			data?: AxiosRequestConfig["data"];
			params?: AxiosRequestConfig["params"];
		},
		unknown,
		unknown
	> =>
	async ({ url, method, data, params }) => {
		try {
			const result = await axiosPrivate({ url: url, method, data, params });
			return { data: result.data };
		} catch (axiosError) {
			let err = axiosError as AxiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};
