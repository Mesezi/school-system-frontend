import axios from "../../../axios.config";

export const loginUser = async (data: any) => {
	const response = await axios.post("/api/login", data);
		
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}

	throw new Error(response.data.message);
};