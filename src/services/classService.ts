import axios from "../../axios.config";
import { classSchema } from "@/interfaces/classInterface";
export const addClass = async (data: classSchema) => {
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

export const deleteClass = async (id: string)=>{
  const response = await axios.delete(`api/class/delete/${id}`);
  if (response.status === 200 || response.status === 201) {
	return response.data;
}
throw new Error(response.data.message);
}
