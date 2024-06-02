"use client";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Form, Formik, Field } from "formik";
import FormInput from "@/components/Form/FormInput";
import FormSelect from "@/components/Form/FormSelect";
import FormCheckBox from "@/components/Form/FormCheckBox";
import { addClass, getAllClasses, deleteClass } from "@/services/classService";
import { useRouter } from "next/navigation";

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
	const router = useRouter();
	const [allClasses, setAllClasses] = useState<any>();
	useEffect(() => {
		handleAllClasses();
	}, []);
	const handleAllClasses = async () => {
		try {
			const res = await getAllClasses();
			if (res) {
				// console.log(res);
				setAllClasses(res.data);
			}
		} catch (err: any) {
			const errorMessage = err?.message || "An error occurred";
			alert(errorMessage);
			setAllClasses([]);
			console.log(err);
		} finally {
		}
	};
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
				// alert("class successfully created!");
				router.refresh();
			}
		} catch (err) {
			console.log(err);
		} finally {
			setSubmitting(false);
		}
	};

	const handleDeleteClass = async (id: string) => {
		try {
			const res = await deleteClass(id);
			if (res) {
				// alert("class successfully deleted!");        
				router.refresh();
			} else {
				alert("unable to delete class atm, please try");
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
				className="text-bold text-2xl  rounded-sm cursor-pointer underline"
			>
				All Classes
			</p>
			{allClasses?.length > 0 ? (
				allClasses?.map((item: any) => (
					<div
						key={item.id}
						className="flex flex-col gap-2 text-white border border-red-200"
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
						<button
							onClick={() => {
								handleDeleteClass(item.id);
							}}
							className="border border-red-200 p-2 rounded-sm w-40 mx-auto"
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
			<p className="text-bold text-2xl mt-2 underline">Create Class</p>
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
