export interface AnnoucementSchema {
	id: string;
	_id: string;
	message: string;
	sender: string;
	updatedAt: string;
	createdAt: string;
}

export interface sessionSchema {
	session: string;
	term: string;
	termEndDate: string;
	_id: string;
}

export interface schoolInformationData {
	schoolAddress: string;
	schoolColor: string;
	schoolEmail: string;
	schoolGradingSystem: { exam: number; test1: number; test2: number };
	schoolLogo: string;
	schoolShortName: string;
}

export interface AllinformationSchema {
	createdAt: string;
	id: string;
	_id: string;
	schoolAnnouncements: AnnoucementSchema[];
	schoolInformation: schoolInformationData;
	schoolCalendar: any[];
	schoolName: string;
	schoolSessionAndTerm: sessionSchema;
	schoolSubjects: any;
	updatedAt: string;
}
