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
