"use client"; // This directive ensures that this code runs only on the client-side in Next.js

import Axios from "axios";

const axios = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axios.interceptors.request.use(
	(config) => {
		// Check if window is defined before accessing sessionStorage
		const authUser =
			typeof window !== "undefined" &&
			sessionStorage.getItem("schoolSystemUser")
				? JSON.parse(sessionStorage.getItem("schoolSystemUser") ?? "")
				: null;
		config.url = config.url?.replace(/[^\x20-\x7E]/g, "");
		config.headers!["Content-Type"] = "application/json";
		if (authUser) {
			config.headers!["Authorization"] = `Bearer ${authUser?.accessToken}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(undefined, (err) => {
	const authUser =
		typeof window !== "undefined" && sessionStorage.getItem("schoolSystemUser")
			? JSON.parse(sessionStorage.getItem("schoolSystemUser") ?? "")
			: null;
	if (
		err.response?.status === 401 ||
		err.response?.data?.message === "Authentication Failed"
	) {
		sessionStorage.setItem("schoolSystemUser", JSON.stringify(null));
		window.location.reload();
	}
	return Promise.reject(err);
});

export default axios;
