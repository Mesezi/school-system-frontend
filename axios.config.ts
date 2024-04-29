'use client'; // This directive ensures that this code runs only on the client-side in Next.js

import Axios from 'axios';

const axios = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Check if window is defined before accessing sessionStorage
const authUser = typeof window !== 'undefined' && sessionStorage.getItem("schoolSystemUser")
    ? JSON.parse(sessionStorage.getItem("schoolSystemUser") ?? '')
    : null;

axios.interceptors.request.use(
	(config) => {
		config.url = config.url?.replace(/[^\x20-\x7E]/g, "");
		config.headers!["Content-Type"] = "application/json";
		if (authUser) {
			config.headers!["Authorization"] = `Bearer ${authUser?.accessToken}`;
			config.headers!["x-school-id"] = `${authUser?.user.schoolId}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(undefined, (err) => {
	if (
		err.response?.status === 403 ||
		err.response?.data?.message === "Unauthorized"
	) {
		sessionStorage.setItem("schoolSystemUser", JSON.stringify(null));
		window.location.reload();
	}
	return Promise.reject(err);
});

export default axios;