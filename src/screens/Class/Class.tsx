"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { Form, Formik, Field } from "formik";
import FormInput from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import FormCheckBox from "@/components/Form/FormCheckBox";
import { addClass, getAllClasses } from "@/services/classService";

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
	const [allClasses, setAllClasses] = useState();
	const handleCreateClass = async (values: classTypes, setSubmitting: any) => {
		console.log(values);
		setSubmitting(false);
		try {
			setSubmitting(false);
			const filteredSubjects = values.subjects.filter(
				(subject) => subject !== undefined
			) as string[];
			const res = await addClass({ ...values, subjects: filteredSubjects });
			console.log(res);
			if (res) {
				alert("class successfully created!");
			}
		} catch (err) {
			console.log(err);
		} finally {
			setSubmitting(false);
		}
	};

	const handleAllClasses = async () => {
		try {
			const res = await getAllClasses();
			if (res) {
				console.log(res);
				setAllClasses(res.data);
			}
		} catch (err) {
			console.log(err);
		} finally {
		}
	};
	return (
		<section className="px-4">
			<p
				onClick={handleAllClasses}
				className="text-bold text-2xl border border-red-500 rounded-sm cursor-pointer"
			>
				View all Class
			</p>
			<p className="text-bold text-2xl mt-4">Create Class</p>
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
						<Form className="space-y-2 mt-4 max-w-[400px] p-4">
							<section className="grid w-full gap-1">
								<FormInput
									id="userName"
									name="userName"
									placeholder="Enter Username"
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
										<Field type="checkbox" name="subjects" value="English" />
										English
									</label>
									<label>
										<Field type="checkbox" name="subjects" value="Science" />
										Science
									</label>
								</FormCheckBox>
							</section>

							<div className="flex justify-center mt-4">
								<button
									disabled={isSubmitting}
									className="p-3 bg-green font-semibold text-white rounded-md w-full 
                              md:max-w-[15rem] flex items-center justify-center h-12 border border-red-500 rouned-sm cursor-pointer"
									type="submit"
								>
									Create Class
								</button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</section>
	);
}

export default Class;
