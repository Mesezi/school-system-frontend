import axios from "../../../axios.config";

export const loginUser = async (data: any, type: string) => {
	if (type === "super") {
		const response = await axios.post("/api/superAdmin/login", data);

		if (response.status === 200 || response.status === 201) {
			return response.data;
		}

		throw new Error(response.data.message);
	} else if (type === "admin") {
		const response = await axios.post("/api/admin/login", data);

		if (response.status === 200 || response.status === 201) {
			return response.data;
		}

		throw new Error(response.data.message);
	} else {
		const response = await axios.post("/api/student/login", data);

		if (response.status === 200 || response.status === 201) {
			return response.data;
		}

		throw new Error(response.data.message);
	}
};
