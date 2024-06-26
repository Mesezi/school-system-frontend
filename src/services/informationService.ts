import axios from "../../axios.config";
import { schoolInformationData, sessionSchema } from "@/interfaces/information.interface";
export const getSchoolInfo = async () => {
	const response = await axios.get("api/school/details");
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};

export const editSchoolInfo = async (data: schoolInformationData) => {
	const response = await axios.post("api/school/information", data);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};

export const editSubjects = async (data: any) => {
	const response = await axios.post("api/school/subjects", data);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};

export const editTermDate = async(data: sessionSchema)=>{
	const response = await axios.post("api/school/sessionAndTerm", data);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
}
