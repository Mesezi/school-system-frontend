"use client";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Form, Formik, Field, FieldArray, ErrorMessage } from "formik";
import FormInput from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import FormCheckBox from "@/components/Form/FormCheckBox";
import { addClass, getAllClasses, deleteClass } from "@/services/classService";
import { useRouter } from "next/navigation";
import { RiLoader4Fill } from "react-icons/ri";
import { updateTimeTable } from "@/services/classService";
import { times } from "../../../utils";
import { classSubjectData, classSchema } from "@/interfaces/classInterface";
import Link from "next/link";

// -- use chatgpt reference
// --send applications
//no situation that calls for you to be scared
//menu needs to add id and change subject to subjectDescription

export interface classData {
	id: string;
	userName: string;
	type: string;
	level: string;
	name: string;
	schoolId: string;
	subjects: classSubjectData[];
	classMessages: string[];
	timetable: any;
}

interface TimeTableForm {
	day: string;
	startTime: string;
	endTime: string;
	subject: string;
}

const initialFormState: TimeTableForm = {
	day: "Monday",
	startTime: "",
	endTime: "",
	subject: "",
};

const createClassFormSchema = yup.object({
	userName: yup.string().required("Username cannot be empty"),
	type: yup
		.string()
		.oneOf(
			["", "Primary", "Junior Secondary", "Senior Secondary"],
			"Invalid class"
		)
		.required("Select a valid class"),
	level: yup.string().required("Select level"),
	name: yup.string().required("Class name is required"),
	subjects: yup.array().of(
		yup.object().shape({
			title: yup.string().required("Required"),
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
type classTypes = yup.InferType<typeof createClassFormSchema>;

function Class() {
	const [showTimeTable, setShowTimeTable] = useState<boolean>(false);
	const [timeTableForm, setTimeTableForm] =
		useState<TimeTableForm>(initialFormState);
	const router = useRouter();
	const [allClasses, setAllClasses] = useState<any>();
	useEffect(() => {
		handleAllClasses();
	}, []);

	const handleChange = (e: any) => {
		setTimeTableForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleTimeTable = async (
		id: string,
		data: TimeTableForm,
		prevData: classData
	) => {
		console.log(prevData);
		let requestData = { ...prevData.timetable };
		// if data exists, push else replace
		if (requestData[data.day]) {
			requestData[data.day].push({
				startTime: data.startTime,
				endTime: data.endTime,
				subject: data.subject,
			});
		} else {
			requestData[data.day] = [
				{
					startTime: data.startTime,
					endTime: data.endTime,
					subject: data.subject,
				},
			];
		}

		console.log(requestData);
		try {
			const res = await updateTimeTable(id, requestData);
			router.refresh();
			alert("Time table updated successfully");
		} catch (err) {
			alert("An error occured while updating timetable");
			console.log(err);
		}
	};

	const handleAllClasses = async () => {
		try {
			const res = await getAllClasses();
			setAllClasses(res.data);
			console.log(res.data);
		} catch (err: any) {
			const errorMessage = err?.message || "An error occurred";
			alert(errorMessage);
			setAllClasses([]);
			console.log(err);
		} finally {
		}
	};
	const handleCreateClass = async (values: classSchema, setSubmitting: any) => {
		setSubmitting(true);
		console.log(values);
		console.log("submitted");
		setSubmitting(false);
		try {
			setSubmitting(false);
			const res = await addClass(values);
			router.refresh();
		} catch (err) {
			console.log(err);
		} finally {
			setSubmitting(false);
		}
	};

	const handleDeleteClass = async (id: string) => {
		try {
			const res = await deleteClass(id);
			router.refresh();
		} catch (err) {
			alert("unable to delete class atm, please try again");
			console.log(err);
		} finally {
		}
	};

	return (
		<section className="px-4">
			<p
				onClick={handleAllClasses}
				className="text-bold text-2xl  rounded-sm cursor-pointer underline"
			>
				All Classes
			</p>
			{allClasses?.length > 0 ? (
				allClasses?.map((item: classData) => (
					<div
						key={item.id}
						className="flex flex-col gap-2 text-white border border-red-500"
					>
						<div className="flex items-center gap-4">
							<p className="underline">CLASS ID / USERNAME:</p>
							<p>{item.userName}</p>
						</div>
						<div className="flex items-center gap-4">
							<p className="underline">TYPE:</p>
							<p>{item.type}</p>
						</div>
						<div className="flex items-center gap-4">
							<p className="underline">LEVEL:</p>
							<p>{item.level}</p>
						</div>
						<div className="flex items-center gap-4">
							<p className="underline">Class Name:</p>
							<p>{item.name}</p>
						</div>
						<div className="flex items-center gap-4">
							<p className="underline">Class Subjects:</p>
							{item?.subjects.map((subject: classSubjectData, index) => (
								<p key={index}>{subject.title},</p>
							))}
						</div>
						<div className="flex items-center gap-4">
							<p className="underline">Class TimeTable:</p>
						</div>

						<button
							type="button"
							onClick={() => {
								handleDeleteClass(item.id);
							}}
							className="border border-red-500 p-2 rounded-sm w-40 mx-auto bg-red-500"
						>
							Delete class
						</button>

						<button
							type="button"
							className="border border-orange-500 p-2 rounded-sm w-40 mx-auto bg-orange-500"
						>
							<Link href={`/dashboard/class/${item.id}`}>View More</Link>
						</button>
					</div>
				))
			) : (
				<p className="text-red-500">
					ooops! it seems like you have not registered your classes!
				</p>
			)}

			<div className=" grid grid-cols-2">
				<div>
					<p className="text-bold text-2xl mt-4 underline">Create Class</p>
					<Formik
						initialValues={{
							userName: "",
							type: "",
							level: "",
							name: "",
							subjects: [
								{
									title: "",
									subjectDescription: "",
									schemeOfWork: [{ week: "", topic: "", description: "" }],
								},
							],
						}}
						validationSchema={createClassFormSchema}
						onSubmit={(values: any, { setSubmitting }) =>
							handleCreateClass(values, setSubmitting)
						}
					>
						{({ values, setFieldValue, isSubmitting }) => {
							return (
								<Form className="space-y-2 max-w-[400px] p-4">
									<section className="grid w-full gap-1">
										<FormInput
											id="userName"
											name="userName"
											placeholder="Enter login id for this class"
											label="Username/LOGIN ID"
											onChange={(e) => {
												setFieldValue("userName", e.target.value);
											}}
										/>

										<FormSelect label="Class type" name="type">
											<option value="">Select a class type</option>

											<option value="Primary">Primary</option>
											<option value="Junior Secondary">Junior Secondary</option>
											<option value="Senior Secondary">Senior Secondary</option>
										</FormSelect>

										<FormSelect label=" Level" name="level">
											<option value="">Select class level </option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
										</FormSelect>

										<FormInput
											id="name"
											name="name"
											placeholder="Enter class name"
											label="Class Name"
											onChange={(e) => {
												setFieldValue("name", e.target.value);
											}}
										/>

										<FieldArray name="subjects">
											{({ insert, remove, push }) => (
												<div className="">
													<h3 className="text-lg text-orange-500 underline">
														Subjects
													</h3>
													{values.subjects.length > 0 &&
														values.subjects.map((subject: any, index: any) => (
															<div
																key={index}
																className="flex gap-4 flex-col border-blue-500 border p-4 my-2"
															>
																<div className="flex flex-col">
																	<label htmlFor={`subjects.${index}.title`}>
																		Subject Name
																	</label>
																	<Field
																		className="w-full h-[2.8rem] mt-1 px-3 border rounded-md
					placeholder:text-[#A1A7AD] outline-none bg-white text-black"
																		name={`subjects.${index}.title`}
																	/>
																	<ErrorMessage
																		className="text-red-500"
																		name={`subjects.${index}.title`}
																		component="div"
																	/>
																</div>

																<div className="flex flex-col">
																	<label
																		htmlFor={`subjects.${index}.subjectDescription`}
																	>
																		Subject Description
																	</label>
																	<Field
																		className="w-full h-[2.8rem] mt-1 px-3 border rounded-md
					placeholder:text-[#A1A7AD] outline-none bg-white text-black"
																		name={`subjects.${index}.subjectDescription`}
																	/>
																	<ErrorMessage
																		className="text-red-500"
																		name={`subjects.${index}.subjectDescription`}
																		component="div"
																	/>
																</div>

																<FieldArray
																	name={`subjects.${index}.schemeOfWork`}
																>
																	{({
																		insert: insertWeek,
																		remove: removeWeek,
																		push: pushWeek,
																	}) => (
																		<div className="">
																			<h4 className="underline text-orange-500">
																				Scheme of Work
																			</h4>
																			{subject.schemeOfWork.length > 0 &&
																				subject.schemeOfWork.map(
																					(week: any, weekIndex: any) => (
																						<div
																							key={weekIndex}
																							className="flex flex-col gap-4 border-orange-500 border p-2 m-2"
																						>
																							<div className="flex flex-col">
																								<label
																									htmlFor={`subjects.${index}.schemeOfWork.${weekIndex}.week`}
																								>
																									Week No
																								</label>
																								<Field
																									className="w-full h-[2.8rem] mt-1 px-3 border rounded-md
																								placeholder:text-[#A1A7AD] outline-none bg-white text-black"
																									name={`subjects.${index}.schemeOfWork.${weekIndex}.week`}
																									type="number"
																								/>
																								<ErrorMessage
																									name={`subjects.${index}.schemeOfWork.${weekIndex}.week`}
																									component="div"
																									className="text-red-500"
																								/>
																							</div>

																							<div className="flex flex-col">
																								<label
																									htmlFor={`subjects.${index}.schemeOfWork.${weekIndex}.topic`}
																								>
																									Topic Title
																								</label>
																								<Field
																									className="w-full h-[2.8rem] mt-1 px-3 border rounded-md
																								placeholder:text-[#A1A7AD] outline-none bg-white text-black"
																									name={`subjects.${index}.schemeOfWork.${weekIndex}.topic`}
																								/>
																								<ErrorMessage
																									name={`subjects.${index}.schemeOfWork.${weekIndex}.topic`}
																									component="div"
																									className="text-red-500"
																								/>
																							</div>

																							<div className="flex flex-col">
																								<label
																									htmlFor={`subjects.${index}.schemeOfWork.${weekIndex}.description`}
																								>
																									Topic Description
																								</label>
																								<Field
																									className="w-full h-[2.8rem] mt-1 px-3 border rounded-md
																								placeholder:text-[#A1A7AD] outline-none bg-white text-black"
																									name={`subjects.${index}.schemeOfWork.${weekIndex}.description`}
																								/>
																								<ErrorMessage
																									name={`subjects.${index}.schemeOfWork.${weekIndex}.description`}
																									component="div"
																									className="text-red-500"
																								/>
																							</div>

																							<button
																								className="bg-red-500 p-1 rounded"
																								type="button"
																								onClick={() =>
																									removeWeek(weekIndex)
																								}
																							>
																								Remove Week
																							</button>
																						</div>
																					)
																				)}
																			<button
																				className=" bg-orange-500 p-1 mt-2 rounded w-full"
																				type="button"
																				onClick={() =>
																					pushWeek({
																						week: "",
																						topic: "",
																						description: "",
																					})
																				}
																			>
																				Add Week
																			</button>
																		</div>
																	)}
																</FieldArray>

																<button
																	className="bg-red-500 p-1 mt-2 rounde"
																	type="button"
																	onClick={() => remove(index)}
																>
																	Remove Subject
																</button>
															</div>
														))}
													<button
														className="p-1 bg-blue-500 rounded mt-2 w-full"
														type="button"
														onClick={() =>
															push({
																title: "",
																subjectDescription: "",
																schemeOfWork: [
																	{ week: "", topic: "", description: "" },
																],
															})
														}
													>
														Add Subject
													</button>
												</div>
											)}
										</FieldArray>
									</section>

									{/* <div className="flex justify-center mt-4"> */}
									<button
										type="submit"
										className="p-3 bg-green font-semibold text-white rounded-md w-full 
                              md:max-w-[15rem] flex items-center justify-center h-12 bg-orange-500 rouned-sm cursor-pointer mt-2"
									>
										{isSubmitting ? (
											<RiLoader4Fill className="h-[2rem] w-[2rem]  animate-spin text-red-500" />
										) : (
											"Create Class"
										)}
									</button>
									{/* </div> */}
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>
		</section>
	);
}

export default Class;
