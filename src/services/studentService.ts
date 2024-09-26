import axios from "../../axios.config";
import { addStudentRequest } from "@/interfaces/studentInterface";

export const addStudent = async (data: addStudentRequest) => {
	const response = await axios.post("api/student/add", data);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};

export const getAllStudents = async (queries = {}) => {
	const baseUrl =
		"https://school-system-backend-42tr.onrender.com/api/student/all";
	const queryString = new URLSearchParams(queries).toString();
	// Append query string to base URL if there are any queries
	const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
	const response = await axios.get(fullUrl);
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

export const deleteStudent = async (id: string) => {
	const response = await axios.delete(`api/student/delete/${id}`);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};
