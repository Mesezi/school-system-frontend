"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormInput from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import { RiLoader4Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { AddAdminRequest } from "@/interfaces/AdminInterface";
import { useAppSelector } from "@/lib/hook";
import { addAdmin } from "@/services/AdminService";

export const validationSchema = () => {
	return yup.object({
		email: yup.string().email().required("Enter email address"),
		firstName: yup.string().required("Enter first name"),
		lastName: yup.string().required("Enter last name"),
		username: yup.string().required("Enter username"),
		password: yup.string().notRequired(),
		sex: yup
			.string()
			.oneOf(["male", "female"], "Sex must be either male or female")
			.required("Sex is required"),
		schoolName: yup.string().required("Enter school name"),
		role: yup.string().required("Select your role"),
		namePrefix: yup.string().required("Select your name prefix"),
		phoneNumber: yup.string().required("Enter your phone number"),
	});
};

function Admin() {
	const router = useRouter();
	const data = useAppSelector((state) => state.information);
	const handleAddAdmin = async (data: AddAdminRequest, setSubmitting: any) => {
		console.log(data);
		try {
			const response = await addAdmin(data);
			console.log(response);
			router.refresh();
			alert(response.message);
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
				<p className="text-orange-500 mb-2">
					Welcome Super Admin, Create Admin here
				</p>
				<Formik
					enableReinitialize
					validationSchema={validationSchema}
					initialValues={{
						email: "",
						password: "",
						firstName: "",
						lastName: "",
						username: "",
						sex: "",
						schoolName: data?.information?.schoolInformation.schoolShortName,
						role: "",
						namePrefix: "",
						phoneNumber: "",
					}}
					onSubmit={(values, { setSubmitting }) => {
						handleAddAdmin(values, setSubmitting);
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

							<FormInput
								id="username"
								name="username"
								label="User Name"
								type="text"
								onChange={(e) => {
									setFieldValue("username", e.target.value);
								}}
							/>

							<FormInput
								id="schoolName"
								name="schoolName"
								label="School Name"
								isDisabled={true}
								type="text"
								onChange={(e) => {
									setFieldValue("schoolName", e.target.value);
								}}
							/>

							<FormSelect label="Gender" id="sex" name="sex">
								<option value="">Select gender </option>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</FormSelect>

							<FormInput
								id="phoneNumber"
								name="phoneNumber"
								label="Phone Number"
								type="text"
								onChange={(e) => {
									setFieldValue("phoneNumber", e.target.value);
								}}
							/>

							<FormSelect label="Role" id="role" name="role">
								<option value="">Select role </option>
								<option value="Principal">Principal</option>
								<option value="vice-principal">Vice Principal</option>
								<option value="Headmaster"> Head Master</option>
							</FormSelect>

							<FormSelect label="Name Prefix" id="namePrefix" name="namePrefix">
								<option value="">Select prefix</option>
								<option value="Mr">Mr</option>
								<option value="Mrs">Mrs</option>
								<option value="Miss">Miss</option>
							</FormSelect>

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

export default Admin;
