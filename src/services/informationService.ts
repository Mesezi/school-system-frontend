import axios from "../../axios.config";
export const getSchoolInfo = async () => {
	const response = await axios.get("api/school/details");
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};
