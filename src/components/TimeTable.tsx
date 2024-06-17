import React from "react";
//understand this component
function TimeTable({ data }: { data: any }) {
	const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	const times = [
		"8am - 9am",
		"9am - 10am",
		"10am - 11am",
		"11am - 12pm",
		"12pm - 1pm",
		"1pm - 2pm",
		"2pm - 3pm",
		"3pm - 4pm",
		"4pm - 5pm",
	];

	const findSubject = (dayData: any, time: string) => {
		// console.log(dayData);
		const period = dayData?.find(
			(p: any) =>
				p.startTime === time.split(" - ")[0] ||
				p.endTime === time.split(" - ")[1]
		);
		return period ? period.subject : "--";
	};
	return (
		<table>
			<thead>
				<tr>
					<th>Day / Hour</th>
					{times.map((time) => (
						<th key={time}>{time}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{/* //map over objects and get my array of object */}
				{days.map((day) => (
					<tr key={day}>
						<td>{day}</td>
						{times.map((time) => (
							<td key={time}>{findSubject(data[day], time)}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default TimeTable;
