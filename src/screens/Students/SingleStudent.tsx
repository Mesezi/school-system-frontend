"use client";
import React, {
	useState,
	useEffect,
	ChangeEvent,
	useCallback,
	useContext,
} from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import FormInput from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import { validationSchema } from "./AddStudent";
import { RiLoader4Fill } from "react-icons/ri";
import {
	getSingleStudent,
	updateStudentDetails,
} from "@/services/studentService";
import { StudentData } from "@/interfaces/studentInterface";
import { formatDateTimeForInput } from "../../../utils";
import { ClassContext } from "@/Providers/ClassContext";

function SingleStudent() {
    // excess renders 
	const allClasses = useContext(ClassContext); 
	useEffect(() => {
		handleStudentData();
	}, []);
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const [studentData, setStudentData] = useState<Partial<StudentData>>({});

	const handleStudentData = async () => {
		try {
			const res = await getSingleStudent(params.id);
			setStudentData(res.data);
		} catch (err: any) {
			console.log(err);
			alert(err.message);
		}
	};

	const handleStudentUpdate = async (
		values: Partial<StudentData>,
		setSubmitting: any
	) => {
		try {
			const res = await updateStudentDetails(params.id, values);
			console.log(res);
			alert(res.message);
			setSubmitting(false);
			router.refresh();
		} catch (err: any) {
			console.log(err);
			alert(err.message);
			setSubmitting(false);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<section className="p-2 ">
			<p className="text-center underline text-orange-500 text-lg">
				Edit details
			</p>
			<Formik
				enableReinitialize
				validationSchema={validationSchema(false)}
				initialValues={{
					email: studentData.email || "",
					// password: "",
					firstName: studentData.firstName || "",
					lastName: studentData.lastName || "",
					sex: studentData.sex || "",
					dob: formatDateTimeForInput(studentData.dob || "") || "",
					imageUrl: studentData.imageUrl || "",
					classId: studentData.classId || "",
				}}
				onSubmit={(values, { setSubmitting }) => {
					handleStudentUpdate(values, setSubmitting);
				}}
			>
				{({ isSubmitting, setFieldValue }) => (
					<Form className="flex flex-col gap-2 w-[20rem]">
						<FormInput
							id="email"
							name="email"
							label="Email address"
							type="email"
							onChange={(e) => {
								setFieldValue("email", e.target.value);
							}}
						/>
						{/* <FormInput
							id="password"
							name="password"
							label="Password"
							type="password"
							onChange={(e) => {
								setFieldValue("password", e.target.value);
							}}
						/> */}

						<FormInput
							id="firstName"
							name="firstName"
							label="First Name"
							type="text"
							onChange={(e) => {
								setFieldValue("firstName", e.target.value);
							}}
						/>

						<FormInput
							id="lastName"
							name="lastName"
							label="Last Name"
							type="text"
							onChange={(e) => {
								setFieldValue("lastName", e.target.value);
							}}
						/>

						<FormSelect label="Gender" id="sex" name="sex">
							<option value="">Select gender </option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</FormSelect>

						<FormSelect label="Current Class" id="classId" name="classId">
							{allClasses.length &&
								allClasses.map((item) => (
									<option key={item.id} value={item.id}>
										{item.name}
									</option>
								))}
						</FormSelect>

						<FormInput
							id="dob"
							name="dob"
							label="Date of birth"
							type="datetime-local"
							onChange={(e) => {
								setFieldValue("dob", e.target.value);
							}}
						/>
						<FormInput
							id="imageUrl"
							name="imageUrl"
							label="Upload image"
							type="file"
							onChange={(e) => {
								setFieldValue("imageUrl", e.target.value);
							}}
						/>
						<button
							className="bg-orange-900 p-2 rounded text-white flex justify-center"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<RiLoader4Fill size={25} className="animate-spin text-white" />
							) : (
								"Edit"
							)}
						</button>
					</Form>
				)}
			</Formik>
		</section>
	);
}

export default SingleStudent;
