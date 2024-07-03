import axios from "../../axios.config";
import { addStudentRequest } from "@/interfaces/studentInterface";

export const addStudent = async (data: addStudentRequest) => {
	const response = await axios.post("api/student/add", data);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};
