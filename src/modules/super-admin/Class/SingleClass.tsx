"use client";
import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import Link from "next/link";
import {
	getClassInfo,
	updateTimeTable,
	updateClassSubject,
	deleteClassSubject,
	addClassSubject,
} from "@/services/classService";
import { useParams, useRouter } from "next/navigation";
import * as yup from "yup";
import { Form, Formik, Field, FieldArray, ErrorMessage } from "formik";
import {
	classSubjectData,
	SchemeOfWorkItem,
} from "@/interfaces/classInterface";
import { classData } from "./Class";
import TimeTableSchedule from "@/components/TimetableSchedule";
import AddSubjectForm from "@/components/AddSubjectForm";
import { v4 as uuidv4 } from "uuid";

interface TimetableItem {
	startTime: string;
	endTime: string;
	subject: string;
}
interface TimetableData {
	[day: string]: TimetableItem[];
}

// remove add subject, make it a standalone component and add it to add single class

const subjectFormSchema = yup.object({
	subjects: yup.array().of(
		yup.object().shape({
			name: yup.string().required("Required"),
			subjectDescription: yup.string().required("Required"),
			schemeOfWork: yup.array().of(
				yup.object().shape({
					week: yup
						.number()
						.required("Required")
						.positive("Must be a positive number")
						.integer(),
					topic: yup.string().required("Required"),
					description: yup.string().required("Required"),
				})
			),
		})
	),
});

function SingleClass() {
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const [classData, setClassData] = useState<classData>({
		id: "",
		username: "",
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
	const [classSubjects, setClassSubjects] = useState<classSubjectData[]>([]);
	useEffect(() => {
		handleClassInfo();
	}, []);

	//get class details with id from route
	const handleClassInfo = async () => {
		try {
			const res = await getClassInfo(params.id);
			setClassData(res.data.classInformation);
			// console.log(res)
			// console.log(res.data.classInformation.timetable);
			setClassStudents(res.data.students);
			setClassTimetable(res.data.classInformation.timetable);
			setClassSubjects(res.data.classInformation.subjects);
		} catch (err: any) {
			const errorMessage = err?.message || "An error occurred";
			alert(errorMessage);
			setClassData({
				id: "",
				username: "",
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

	//listen for changes in timetable fields
	const handleTimeTableChange = useCallback(
		(day: string, index: number, field: any, value: string) => {
			setClassTimetable((prev) => {
				const updatedTimeTable = prev[day].map((item: any, i: number) =>
					i === index ? { ...item, [field]: value } : item
				);
				return { ...prev, [day]: updatedTimeTable };
			});
		},
		[]
	);

	// create a new array when you want to create new timetable schedule
	const handleAddTimetable = (day: string) => {
		setClassTimetable({
			...classTimetable,
			[day]: [
				...classTimetable[day],
				{ startTime: "", endTime: "", subject: "" },
			],
		});
	};

	// remove timetable schedule
	const handleRemoveTimeTable = (day: string, index: number) => {
		const updatedTimeTable = classTimetable[day].filter(
			(item, i) => index !== i
		);
		setClassTimetable({ ...classTimetable, [day]: updatedTimeTable });
	};

	//send updated timetable data to backend
	const handleUpdateTimetable = async () => {
		try {
			const res = await updateTimeTable(params.id, classTimetable);
			alert(res.message);
			console.log(res);
			router.refresh();
		} catch (err: any) {
			const errorMessage = err?.message || "An error occurred";
			alert(errorMessage);
			console.log(err);
		} finally {
		}
	};

	//listen for changes when editing scheme of work
	const handleSchemeChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		subjectId: string,
		weekIndex: number,
		field: keyof SchemeOfWorkItem
	) => {
		const updatedSubjects = classSubjects.map((subject) => {
			if (subject.id === subjectId) {
				const updatedSchemeOfWork = subject.schemeOfWork.map((item, index) => {
					if (index === weekIndex) {
						return { ...item, [field]: e.target.value };
					}
					return item;
				});
				return { ...subject, schemeOfWork: updatedSchemeOfWork };
			}
			return subject;
		});
		setClassSubjects(updatedSubjects);
	};

	// listen for changes when editing subject
	const handleSubjectChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		subjectId: string,
		field: keyof classSubjectData
	) => {
		const updatedSubjects = classSubjects.map((subject) => {
			if (subject.id === subjectId) {
				return { ...subject, [field]: e.target.value };
			}
			return subject;
		});
		setClassSubjects(updatedSubjects);
	};

	// send updated subject details to backend
	const handleSaveSubject = async (subjectId: string) => {
		const subjectToSave = classSubjects.find(
			(subject) => subject.id === subjectId
		);
		if (subjectToSave) {
			// Perform your API call to save the subject
			console.log("Saving subject:", subjectToSave);
			try {
				const res = await updateClassSubject(params.id, subjectId);
				console.log(res);
				alert("subject successfully updated");
				router.refresh();
			} catch (err) {}
		}
	};

	//delete subject
	const handleDeleteSubject = async (subjectId: string) => {
		// const deletedSubject = classSubjects.find((subject)=>subject._id === subjectId)
		try {
			const res = await deleteClassSubject(params.id, subjectId);
			console.log(res);
			router.refresh();
		} catch (err) {
			console.log(err);
			alert("An error occured");
		} finally {
		}

		// const updatedSubjects = classSubjects.filter(
		// 	(subject) => subject._id !== subjectId
		// );
		// setClassSubjects(updatedSubjects);
	};

	//add subject to class
	const handleCreateSubject = async (
		values: classSubjectData[],
		setSubmitting: any
	) => {
		//since your data is in an array, and api requires object, use promise.all
		setSubmitting(true);
		console.log(values);
		//remove ids that was used to track form state 
		const subjectData = values.map(({id, ...data})=>{
			return {...data}
		})

		try {
			const promises = subjectData.map((value: any) =>
				addClassSubject(value, params.id)
			);
			const responses = await Promise.all(promises);
			alert(responses[0].message)
			router.refresh();
		} catch (err) {
			console.log(err);
			alert("An error occurred");
		} finally {
		}
	};
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
						value={classData?.username}
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
					<Link href={"/admin-dashboard/class"}>Go back</Link>
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
							onRemoveScheduleItem={handleRemoveTimeTable}
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

			<section className="grid grid-cols-2 gap-8">
				<div>
					<p className="text-2xl underline mt-4 text-center">Class Subjects</p>
					<div className="">
						<h1 className="text-orange-500 underline">Subjects</h1>
						{classSubjects.map((subject) => (
							<div
								key={subject.id}
								className="mb-5 border border-blue-600 p-2.5"
							>
								<div className="flex flex-col gap-0.5">
									<label htmlFor="title">Subject Title</label>
									<input
										id="title"
										className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                                   placeholder:text-[#A1A7AD] outline-none bg-white text-black"
										type="text"
										value={subject.name}
										onChange={(e) => handleSubjectChange(e, subject.id, "name")}
										placeholder="Title"
									/>
								</div>

								<div className="flex flex-col gap-0.5">
									<label htmlFor="subjectDescription">
										Subject description
									</label>
									<textarea
										id="subjectDescription"
										className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                                 placeholder:text-[#A1A7AD] outline-none bg-white text-black"
										value={subject.subjectDescription}
										onChange={(e) =>
											handleSubjectChange(e, subject.id, "subjectDescription")
										}
										placeholder="Subject Description"
									/>
								</div>

								<h3 className="text-orange-500 underline">Scheme of Work</h3>
								{subject.schemeOfWork.map((item, index) => (
									<div key={index} className="mb-2.5 border border-orange-500">
										<div className="flex flex-col gap-0.5">
											<label htmlFor="week">Week:</label>
											<input
												id="week"
												className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                                            placeholder:text-[#A1A7AD] outline-none bg-white text-black"
												type="number"
												value={item.week}
												onChange={(e) =>
													handleSchemeChange(e, subject.id, index, "week")
												}
												placeholder="Week"
											/>
										</div>
										<div className="flex flex-col gap-0.5">
											<label htmlFor="topic">Topic:</label>
											<input
												id="topic"
												className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                                        placeholder:text-[#A1A7AD] outline-none bg-white text-black"
												type="text"
												value={item.topic}
												onChange={(e) =>
													handleSchemeChange(e, subject.id, index, "topic")
												}
												placeholder="Topic"
											/>
										</div>
										<div className="flex flex-col gap-0.5">
											<label htmlFor="description">Description:</label>
											<textarea
												id="description"
												className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                                        placeholder:text-[#A1A7AD] outline-none bg-white text-black"
												value={item.description}
												onChange={(e) =>
													handleSchemeChange(
														e,
														subject.id,
														index,
														"description"
													)
												}
												placeholder="Description"
											/>
										</div>
									</div>
								))}
								<button
									className="p-2 bg-blue-500 rounded mr-4"
									onClick={() => handleSaveSubject(subject.id)}
								>
									Save
								</button>
								<button
									className="p-2 bg-blue-500 rounded ml-4"
									onClick={() => handleDeleteSubject(subject.id)}
								>
									Delete
								</button>
							</div>
						))}
					</div>
				</div>

				<div className="">
					<p className="text-2xl underline mt-4 text-center">Add Subjects</p>
					<Formik
						initialValues={{
							subjects: [
								{
									id: uuidv4(),
									name: "",
									subjectDescription: "",
									schemeOfWork: [{ week: "", topic: "", description: "" }],
								},
							],
						}}
						validationSchema={subjectFormSchema}
						onSubmit={(values: any, { setSubmitting }) =>
							handleCreateSubject(values.subjects, setSubmitting)
						}
					>
						{({ values }) => {
							return (
								<Form>
									<AddSubjectForm subjectData={values.subjects} />
									<button
										type="submit"
										className="p-3 bg-green font-semibold text-white rounded-md w-full 
                              md:max-w-[15rem] flex items-center justify-center h-12 bg-orange-500 rouned-sm cursor-pointer mt-2"
									>
										Create Subject
									</button>
								</Form>
							);
						}}
					</Formik>
				</div>
			</section>
		</section>
	);
}

export default SingleClass;
