import { ResultInterface } from "@/interfaces/ResultInterface";
import axios from "../../axios.config";

export const addResult = async (data: ResultInterface, studentId: string) => {
	const response = await axios.post(
		`/api/student/result/create/${studentId}`,
		data
	);

	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};

export const bulkUpload = async (data: any) => {
	const response = await axios.post("/api/result/bulk-upload", data);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};
