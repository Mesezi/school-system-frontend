import axios from "../../axios.config";

export const addAnnoucement = async (data: any) => {
	const response = await axios.post("/api/school/schoolAnnouncement/add", data);

	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};
