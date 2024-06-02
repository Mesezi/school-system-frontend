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
