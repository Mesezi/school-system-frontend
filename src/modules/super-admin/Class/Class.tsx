"use client";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Form, Formik, Field, FieldArray, ErrorMessage } from "formik";
import FormInput from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import { addClass, getAllClasses, deleteClass } from "@/services/classService";
import { useRouter } from "next/navigation";
import { RiLoader4Fill } from "react-icons/ri";
import { classSubjectData, classSchema } from "@/interfaces/classInterface";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import AddSubjectForm from "@/components/AddSubjectForm";

// -- use chatgpt reference
// --send applications
//no situation that calls for you to be scared
//menu needs to add id and change subject to subjectDescription
//add subject is not updating scheme of work in its response
//add class subject
//refactor this code like a normal human being

export interface classData {
	id: string;
	username: string;
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
	username: yup.string().required("username cannot be empty"),
	password: yup.string().required("Enter temporary admin password"),
	type: yup
		.string()
		.oneOf(
			["", "primary", "junior-secondary", "senior-secondary"],
			"Invalid class"
		)
		.required("Select a valid class"),
	level: yup.string().required("Select level"),
	name: yup.string().required("Class name is required"),
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

function Class() {
	const router = useRouter();
	const [allClasses, setAllClasses] = useState<any>();
	useEffect(() => {
		handleAllClasses();
	}, []);

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
	const handleCreateClass = async (values: classSchema, setSubmitting: any) => {
		setSubmitting(true);
		console.log(values);
		console.log("submitted");
		try {
			setSubmitting(false);
			const res = await addClass(values);
			alert(res?.message)
			console.log(res);
			router.refresh();
		} catch (err) {
			alert("an error occured");
			console.log(err);
		} finally {
			setSubmitting(false);
		}
	};

	const handleDeleteClass = async (id: string) => {
		try {
			const res = await deleteClass(id);
			console.log(res);
			alert(res.message);
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
							<p className="underline">CLASS ID / username:</p>
							<p>{item.username}</p>
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
								<p key={index}>{subject.name},</p>
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
							<Link href={`/admin-dashboard/class/${item.id}`}>View More</Link>
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
							username: "",
							type: "",
							level: "",
							name: "",
							password: "",
							subjects: [
								{
									id: uuidv4(),
									name: "",
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
											id="username"
											name="username"
											placeholder="Enter login id for this class"
											label="username/LOGIN ID"
											onChange={(e) => {
												setFieldValue("username", e.target.value);
											}}
										/>

										<FormInput
											id="password"
											name="password"
											placeholder="Enter password"
											label="Password"
											onChange={(e) => {
												setFieldValue("password", e.target.value);
											}}
										/>

										<FormSelect label="Class type" name="type">
											<option value="">Select a class type</option>

											<option value="primary">Primary</option>
											<option value="junior-secondary">Junior Secondary</option>
											<option value="senior-secondary">Senior Secondary</option>
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

										<AddSubjectForm subjectData={values.subjects} />
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
