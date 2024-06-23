"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { getClassInfo, updateTimeTable } from "@/services/classService";
import { useParams, useRouter } from "next/navigation";
import * as yup from "yup";
import { Form, Formik, Field, FieldArray, ErrorMessage } from "formik";
import { classSubjectData } from "@/interfaces/classInterface";
import { classData } from "./Class";
import { resolve } from "path/win32";

interface TimetableItem {
	startTime: string;
	endTime: string;
	subject: string;
}
interface TimetableData {
	[day: string]: TimetableItem[];
}

function SingleClass() {
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const [classData, setClassData] = useState<classData>({
		id: "",
		userName: "",
		type: "",
		level: "",
		name: "",
		schoolId: "",
		subjects: [],
		classMessages: [],
		timetable: {},
	});
	const [classTimetable, setClassTimetable] = useState<TimetableData>({});
	const [classStudents, setClassStudents] = useState<any[]>([]);
	useEffect(() => {
		handleClassInfo();
	}, []);
	const handleClassInfo = async () => {
		try {
			const res = await getClassInfo(params.id);
			setClassData(res.data.classInformation);
			// console.log(res.data.classInformation.timetable);
			setClassStudents(res.data.students);
			setClassTimetable(res.data.classInformation.timetable);
		} catch (err: any) {
			const errorMessage = err?.message || "An error occurred";
			alert(errorMessage);
			setClassData({
				id: "",
				userName: "",
				type: "",
				level: "",
				name: "",
				schoolId: "",
				subjects: [],
				classMessages: [],
				timetable: {},
			});
			setClassStudents([]);
			console.log(err);
		} finally {
		}
	};

	const handleTimeTableChange = (
		day: string,
		index: number,
		field: any,
		value: string
	) => {
		const updatedTimetable = classTimetable[day].map((item: any, i: number) =>
			i === index ? { ...item, [field]: value } : item
		);
		setClassTimetable({ ...classTimetable, [day]: updatedTimetable });
	};

	const handleAddTimetable = (day: string) => {
		setClassTimetable({
			...classTimetable,
			[day]: [
				...classTimetable[day],
				{ startTime: "", endTime: "", subject: "" },
			],
		});
	};

	const handleUpdateTimetable = async () => {
		try {
			const res = await updateTimeTable(params.id, classTimetable);
			console.log(res);
			router.refresh();
		} catch (err: any) {
			const errorMessage = err?.message || "An error occurred";
			alert(errorMessage);
			console.log(err);
		} finally {
		}
	};

	const TimeTableSchedule = ({
		day,
		schedule,
		onScheduleChange,
		onAddScheduleItem,
	}: {
		day: any;
		schedule: any;
		onScheduleChange: any;
		onAddScheduleItem: any;
	}) => (
		<div>
			<h2 className="underline text-orange-500 mt-4">
				{day.charAt(0).toUpperCase() + day.slice(1)}
			</h2>
			<div className="flex flex-col gap-3">
				{schedule.map((item: any, index: any) => (
					<ScheduleItem
						key={index}
						day={day}
						index={index}
						item={item}
						onScheduleChange={onScheduleChange}
					/>
				))}
			</div>
			<button
				className="bg-blue-500 p-1 rounded"
				onClick={() => onAddScheduleItem(day)}
			>
				Add Schedule Item
			</button>
		</div>
	);

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
	return (
		<section className="px-4">
			<form className="flex flex-col gap-4">
				<div className="input_Wrapper text-white flex flex-col gap-1">
					<label>Class Username</label>
					<input
						className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
						type="text"
						name="userName"
						value={classData?.userName}
						onChange={(e) =>
							setClassData({ ...classData, [e.target.name]: e.target.value })
						}
					/>
				</div>

				<div className="input_Wrapper text-white flex flex-col gap-1">
					<label>Class type</label>
					<input
						className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
						type="text"
						name="type"
						value={classData?.type}
						onChange={(e) =>
							setClassData({ ...classData, [e.target.name]: e.target.value })
						}
					/>
				</div>

				<div className="input_Wrapper text-white flex flex-col gap-1">
					<label>Class level</label>
					<input
						className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
						type="text"
						name="level"
						value={classData?.level}
						onChange={(e) =>
							setClassData({ ...classData, [e.target.name]: e.target.value })
						}
					/>
				</div>

				<div className="input_Wrapper text-white flex flex-col gap-1">
					<label>Class name</label>
					<input
						className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
						type="text"
						name="name"
						value={classData?.name}
						onChange={(e) =>
							setClassData({ ...classData, [e.target.name]: e.target.value })
						}
					/>
				</div>

				<button className="border border-orange-500 p-2 rounded-sm w-40  bg-orange-500">
					<Link href={"/dashboard/class"}>Go back</Link>
				</button>
			</form>
			<p className="text-2xl underline mt-4">Timetable</p>
			<div>
				<h1>Weekly Schedule</h1>
				{classTimetable && Object.keys(classTimetable).length > 0 ? (
					Object.keys(classTimetable).map((day) => (
						<TimeTableSchedule
							key={day}
							day={day}
							schedule={classTimetable[day]}
							onScheduleChange={handleTimeTableChange}
							onAddScheduleItem={handleAddTimetable}
						/>
					))
				) : (
					<p>No schedule data available.</p>
				)}
				<button
					onClick={handleUpdateTimetable}
					className="p-2 bg-orange-500  rounded mt-4"
				>
					Submit
				</button>
			</div>
		</section>
	);
}

export default SingleClass;
