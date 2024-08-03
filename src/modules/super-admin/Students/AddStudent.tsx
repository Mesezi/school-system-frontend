"use client";
import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { addStudentRequest } from "@/interfaces/studentInterface";
import * as yup from "yup";
import FormInput from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import { addStudent } from "@/services/studentService";
import { RiLoader4Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { ClassContext } from "@/Providers/ClassContext";

export const validationSchema = (isPasswordRequired: boolean) => {
	return yup.object({
		email: yup.string().email().required("Enter email address"),
		password: isPasswordRequired
			? yup.string().required("Enter password")
			: yup.string().notRequired(),
		firstName: yup.string().required("Enter first name"),
		lastName: yup.string().required("Enter last name"),
		sex: yup
			.string()
			.oneOf(["male", "female"], "Sex must be either male or female")
			.required("Sex is required"),
		dob: yup.string().required("Enter date of birth"),
		classId: yup.string().required("Select your current class"),
	});
};

function AddStudent() {
	//get class from context
	const allClasses = useContext(ClassContext);
	// console.log(allClasses)
	const router = useRouter();

	const handleAddStudent = async (
		data: addStudentRequest,
		setSubmitting: any
	) => {
		try {
			const res = await addStudent(data);
			console.log(res);
			router.refresh();
			alert(res.message);
			setSubmitting(false);
		} catch (err: any) {
			console.log(err);
			alert(err.message);
			setSubmitting(false);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<section className="p-2">
			<main>
				<p className="text-orange-500 mb-2">Welcome Admin, Add new student</p>
				<Formik
					validationSchema={validationSchema}
					initialValues={{
						email: "",
						password: "",
						firstName: "",
						lastName: "",
						sex: "",
						dob: "",
						imageUrl: "",
						classId: "",
					}}
					onSubmit={(values, { setSubmitting }) => {
						handleAddStudent(values, setSubmitting);
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
							<FormInput
								id="password"
								name="password"
								label="Password"
								type="password"
								onChange={(e) => {
									setFieldValue("password", e.target.value);
								}}
							/>

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
								<option value="">Select class </option>
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
								type="date"
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
								className="bg-orange-500 p-2 rounded text-white flex justify-center"
								type="submit"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<RiLoader4Fill
										size={25}
										className="animate-spin text-white"
									/>
								) : (
									"Submit"
								)}
							</button>
						</Form>
					)}
				</Formik>
			</main>
		</section>
	);
}

export default AddStudent;
