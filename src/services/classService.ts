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

export const getClassInfo = async (id: string) => {
	const response = await axios.get(`api/class/${id}`);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};

export const updateTimeTable = async (id: string, data: any) => {
	const response = await axios.post(`api/class/update-timetable/${id}`, data);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};

export const deleteClass = async (id: string) => {
	const response = await axios.delete(`api/class/delete/${id}`);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};

export const updateClassSubject = async (
	classId: string,
	subjectId: string
) => {
	const response = await axios.put(
		`api/class/subjects/update/${classId}/${subjectId}`
	);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};

export const deleteClassSubject = async (
	classId: string,
	subjectId: string
) => {
	const response = await axios.delete(
		`api/class/subjects/delete/${classId}/${subjectId}`
	);
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	throw new Error(response.data.message);
};
