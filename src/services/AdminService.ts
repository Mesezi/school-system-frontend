import axios from "../../axios.config";
import { AddAdminRequest } from "@/interfaces/AdminInterface";

export const addAdmin = async (data: AddAdminRequest) => {
	const response = await axios.post("/api/admin/create", data);

	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};
