import axios from "../../../axios.config";

export const loginUser = async (data: any, type: string) => {
	let url: string;
	switch (type.toLowerCase()) {
		case "super":
			url = "/api/superAdmin/login";
			break;
		case "admin":
			url = "/api/admin/login";
			break;
		case "student":
			url = "/api/student/login";
			break;
		case "class":
			url = "/api/class/login";
			break;
		default:
			url = "";
	}
	const response = await axios.post(url, data);

	if (response.status === 200 || response.status === 201) {
		return response.data;
	}

	throw new Error(response.data.message);
};
