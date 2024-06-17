export const authUser = () => {
	const authUser =
		typeof window !== "undefined" && sessionStorage.getItem("schoolSystemUser")
			? JSON.parse(sessionStorage.getItem("schoolSystemUser") ?? "")
			: null;

	return authUser;
};

export function formatDateAndTime(isoDate: string) {
	const date = new Date(isoDate);
	const options = {
		year: "numeric" as const,
		month: "long" as const,
		day: "numeric" as const,
		hour: "numeric" as const,
		minute: "numeric" as const,
		second: "numeric" as const,
	};
	return date.toLocaleString("en-US", options);
}

export function formatDate(isoDate: string) {
	const date = new Date(isoDate);
	const options = {
		year: "numeric" as const,
		month: "long" as const,
		day: "numeric" as const,
	};
	return date.toLocaleString("en-US", options);
}

export const formatDateTimeForInput = (isoString: string) => {
	const date = new Date(isoString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const dummyTimeTable = {
	Monday: [
		{
			startTime: "10am",
			endTime: "11am",
			subject: "Maths",
		},
		{
			startTime: "11am",
			endTime: "12pm",
			subject: "Lunch",
		},
		{
			startTime: "12pm",
			endTime: "1pm",
			subject: "English",
		},
	],

	Tuesday: [
		{
			startTime: "10am",
			endTime: "11am",
			subject: "Maths",
		},
		{
			startTime: "11am",
			endTime: "12pm",
			subject: "Lunch",
		},
		{
			startTime: "12pm",
			endTime: "1pm",
			subject: "English",
		},
	],

	Wednesday: [
		{
			startTime: "10am",
			endTime: "11am",
			subject: "Maths",
		},
		{
			startTime: "11am",
			endTime: "12pm",
			subject: "Lunch",
		},
		{
			startTime: "12pm",
			endTime: "1pm",
			subject: "English",
		},
	],

	Thursday: [
		{
			startTime: "10am",
			endTime: "11am",
			subject: "Maths",
		},
		{
			startTime: "11am",
			endTime: "12pm",
			subject: "Lunch",
		},
		{
			startTime: "12pm",
			endTime: "1pm",
			subject: "English",
		},
	],

	Friday: [
		{
			startTime: "10am",
			endTime: "11am",
			subject: "Maths",
		},
		{
			startTime: "11am",
			endTime: "12pm",
			subject: "Lunch",
		},
		{
			startTime: "12pm",
			endTime: "1pm",
			subject: "English",
		},
	],
};

export const times = [
	"8am",
	"9am",
	"10am",
	"11am",
	"12pm",
	"1pm",
	"2pm",
	"3pm",
	"4pm",
	"5pm",
];
