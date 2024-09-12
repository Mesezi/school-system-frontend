export interface AddAdminRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	username?: string;
	schoolName: string;
	phoneNumber: string;
	role: string;
	sex: string;
	namePrefix: string;
}
