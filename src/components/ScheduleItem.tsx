import { ChangeEvent } from "react";

const ScheduleItem = ({
	day,
	index,
	item,
	onScheduleChange,
}: {
	day: any;
	index: any;
	item: any;
	onScheduleChange: any;
}) => (
	<div className="flex gap-4 mb-4">
		<div className="flex flex-col gap-2">
			<label>Start Time</label>
			<input
				className="text-black  rounded-md
                outline-none bg-white p-2"
				type="text"
				value={item.startTime}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					onScheduleChange(day, index, "startTime", e.target.value)
				}
				placeholder="Start Time"
			/>
		</div>

		<div className="flex flex-col gap-2">
			<label>End Time</label>
			<input
				type="text"
				className="rounded-md
                outline-none bg-white text-black p-2"
				value={item.endTime}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					onScheduleChange(day, index, "endTime", e.target.value)
				}
				placeholder="End Time"
			/>
		</div>

		<div className="flex flex-col gap-2">
			<label>Subject</label>
			<input
				type="text"
				className="rounded-md
                outline-none bg-white text-black p-2"
				value={item.subject}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					onScheduleChange(day, index, "subject", e.target.value)
				}
				placeholder="Subject"
			/>
		</div>
	</div>
);

export default ScheduleItem;
