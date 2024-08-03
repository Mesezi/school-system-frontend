export interface addStudentRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	sex: string;
	dob: string;
	imageUrl: string;
	classId: string;
}

export interface StudentData extends addStudentRequest {
	createdAt: string;
	id: string;
}
