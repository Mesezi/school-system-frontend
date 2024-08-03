import axios from "../../axios.config";
import { addStudentRequest } from "@/interfaces/studentInterface";

export const addStudent = async (data: addStudentRequest) => {
	const response = await axios.post("api/student/add", data);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};

export const getAllStudents = async () => {
	const response = await axios.get("api/student/all");
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};

export const getSingleStudent = async (id: string) => {
	const response = await axios.get(`api/student/${id}`);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};

export const updateStudentDetails = async (id: string, data: any) => {
	const response = await axios.put(`api/student/update/${id}`, data);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};


export const deleteStudent = async (id: string,)=>{
    const response = await axios.delete(`api/student/delete/${id}`);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
}