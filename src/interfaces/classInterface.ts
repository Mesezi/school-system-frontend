export interface SchemeOfWorkItem {
	week: number;
	topic: string;
	description: string;
}

export interface classSubjectData {
	title: string;
	subjectDescription: string;
	schemeOfWork: SchemeOfWorkItem[];
	_id: string;
}

export interface classSchema {
	userName: string;
	type: string;
	level: string;
	name: string;
	subjects: classSubjectData[];
}
