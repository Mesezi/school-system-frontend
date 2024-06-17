"use client";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Form, Formik, Field } from "formik";
import FormInput from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import FormCheckBox from "@/components/Form/FormCheckBox";
import { addClass, getAllClasses, deleteClass } from "@/services/classService";
import { useRouter } from "next/navigation";
import { RiLoader4Fill } from "react-icons/ri";
import TimeTable from "@/components/TimeTable";
import { updateTimeTable } from "@/services/classService";
import { times } from "../../../utils";

export interface subjectData {
	title: string;
	description: string;
	schemeOfWork: string;
}

export interface classData {
	id: string;
	userName: string;
	type: string;
	level: string;
	name: string;
	schoolId: string;
	subjects: subjectData[];
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
	subjects: yup
		.array()
		.of(yup.string())
		.min(1, "At least one subject must be selected")
		.required("At least one subject must be selected"),
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
			// console.log(res.data);
		} catch (err: any) {
			const errorMessage = err?.message || "An error occurred";
			alert(errorMessage);
			setAllClasses([]);
			console.log(err);
		} finally {
		}
	};
	const handleCreateClass = async (values: classTypes, setSubmitting: any) => {
		// setSubmitting(false);
		try {
			setSubmitting(false);
			const filteredSubjects = values.subjects.filter(
				(subject) => subject !== undefined
			) as string[];
			const res = await addClass({ ...values, subjects: filteredSubjects });

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
							{item?.subjects.map((subject: subjectData) => (
								<p key={subject.title}>{subject.title},</p>
							))}
						</div>
						<div className="flex items-center gap-4">
							<p className="underline">Class TimeTable:</p>
						</div>
						{/* time table component */}
						<TimeTable data={item.timetable} />
						{/* //time Table form, change to a component */}
						{showTimeTable && (
							<form
								onSubmit={(e) => {
									e.preventDefault();
									handleTimeTable(item.id, timeTableForm, item);
								}}
								className="p-2 border border-orange-500 flex flex-col gap-3"
							>
								<div className="input_Wrapper text-white flex flex-col gap-1">
									<label>Day</label>
									<select
										value={timeTableForm.day}
										onChange={handleChange}
										name="day"
										required={true}
										className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
									>
										<option value={"Monday"}>Monday</option>
										<option value={"Tuesday"}>Tuesday</option>
										<option value={"Wednesday"}>Wednesday</option>
										<option value={"Thursday"}>Thursday</option>
										<option value={"Friday"}>Friday</option>
									</select>
								</div>

								<div className="input_Wrapper text-white flex flex-col gap-1">
									<label>Start time</label>
									<select
										value={timeTableForm.startTime}
										onChange={handleChange}
										name="startTime"
										required={true}
										className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
									>
										{times.map((time: string) => (
											<option key={time}>{time}</option>
										))}
									</select>
								</div>
								<div className="input_Wrapper text-white flex flex-col gap-1">
									<label>End Time</label>
									<select
										value={timeTableForm.endTime}
										onChange={handleChange}
										name="endTime"
										required={true}
										className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
									>
										{times.map((time: string) => (
											<option key={time}>{time}</option>
										))}
									</select>
								</div>
								<div className="input_Wrapper text-white flex flex-col gap-1">
									<label> Subject</label>
									<input
										className="w-1/2 h-[2.8rem] mt-1 px-3 border rounded-md
                 outline-none bg-white text-black"
										type="text"
										name="subject"
										value={timeTableForm.subject}
										onChange={handleChange}
										required={true}
									/>
								</div>
								<div className="flex  items-center">
									<button
										type="submit"
										className="border border-orange-500 p-2 rounded-sm w-40 mx-auto bg-orange-500 mt-4"
									>
										Save Timetable
									</button>
									<button
										onClick={() => {
											setShowTimeTable(false);
										}}
										type="button"
										className="border border-orange-500 p-2 rounded-sm w-40 mx-auto bg-orange-500 mt-4"
									>
										Close form
									</button>
								</div>
							</form>
						)}
						{!showTimeTable && (
							<button
								onClick={() => {
									setShowTimeTable(true);
								}}
								type="button"
								className="border border-orange-500 p-2 rounded-sm w-40 mx-auto bg-orange-500"
							>
								Edit Timetable
							</button>
						)}

						<button
							type="button"
							onClick={() => {
								handleDeleteClass(item.id);
							}}
							className="border border-red-500 p-2 rounded-sm w-40 mx-auto bg-red-500"
						>
							Delete class
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
							subjects: [],
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

										<FormCheckBox label="Subjects" name="subjects">
											<label>
												<Field type="checkbox" name="subjects" value="Maths" />
												Maths
											</label>
											<label>
												<Field
													type="checkbox"
													name="subjects"
													value="English"
												/>
												English
											</label>
											<label>
												<Field
													type="checkbox"
													name="subjects"
													value="Science"
												/>
												Science
											</label>
										</FormCheckBox>
									</section>

									<div className="flex justify-center mt-4">
										<button
											// disabled={isSubmitting}
											className="p-3 bg-green font-semibold text-white rounded-md w-full 
                              md:max-w-[15rem] flex items-center justify-center h-12 border border-red-500 rouned-sm cursor-pointer"
											type="submit"
										>
											{isSubmitting ? (
												<RiLoader4Fill className="h-[2rem] w-[2rem]  animate-spin text-red-500" />
											) : (
												"Create Class"
											)}
										</button>
									</div>
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
