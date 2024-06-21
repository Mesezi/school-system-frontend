export interface classSubjectData {
	title: string;
	description: string;
	schemeOfWork: { week: number; topic: string; description: string };
}

export interface classSchema {
	userName: string;
	type: string;
	level: string;
	name: string;
	subjects: classSubjectData[];
}
