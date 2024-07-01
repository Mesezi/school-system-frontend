import React, { ChangeEvent } from "react";
import ScheduleItem from "./ScheduleItem";

const TimeTableSchedule = ({
	day,
	schedule,
	onScheduleChange,
	onAddScheduleItem,
	onRemoveScheduleItem,
}: {
	day: any;
	schedule: any;
	onScheduleChange: any;
	onAddScheduleItem: any;
	onRemoveScheduleItem: any;
}) => (
	<div>
		<h2 className="underline text-orange-500 mt-4">
			{day.charAt(0).toUpperCase() + day.slice(1)}
		</h2>
		<div className="flex flex-col gap-3">
			{schedule.map((item: any, index: number) => (
				<div key={index} className="flex gap-4 items-center">
					<ScheduleItem
						key={index}
						day={day}
						index={index}
						item={item}
						onScheduleChange={onScheduleChange}
					/>
					<button
						className="bg-blue-500 h-12 rounded w-48 grow-0"
						onClick={() => onRemoveScheduleItem(day, index)}
					>
						Remove schedule Item
					</button>
				</div>
			))}
		</div>
		<div className="flex items-center gap-4">
			<button
				className="bg-blue-500 p-1 rounded"
				onClick={() => onAddScheduleItem(day)}
			>
				Add schedule Item
			</button>
		</div>
	</div>
);

export default TimeTableSchedule;
