import axios from "../../axios.config";
import { addClassInterface } from "@/interfaces/classInterface";
export const addClass = async (data: addClassInterface) => {
	const response = await axios.post("/api/class/create", data);

	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};

export const getAllClasses = async () => {
	const response = await axios.get("api/class/all");

	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};
