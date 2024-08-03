"use client";
import React from "react";
import * as yup from "yup";
import { Form, Formik } from "formik";
import FormTextArea from "@/components/Form/FormTextArea";
import { addAnnoucement } from "@/services/annoucementService";
import { authUser } from "../../../../utils";

const annoucementFormSchema = yup.object({
	message: yup.string().required("Message cannot be empty"),
	sender: yup.string(),
});
type annoucementTypes = yup.InferType<typeof annoucementFormSchema>;
function Annoucements() {
	const user = {
		firstName: authUser()?.user.firstName,
		lastName: authUser()?.user.lastName,
		role: authUser()?.user.role,
	};
	const handleAddAnnoucements = async (
		values: annoucementTypes,
		setSubmitting: any
	) => {
		console.log(values);
		setSubmitting(false);
		try {
			setSubmitting(false);
			const res = await addAnnoucement(values);
			if (res) {
				alert("annoucement successfully added!");
			}
		} catch (err) {
			console.log(err);
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<section className="px-4">
			<p className="text-bold text-2xl">Add Annoucements</p>
			<Formik
				initialValues={{
					message: "",
					sender: `${user.firstName} ${user.lastName}(${user.role})`,
				}}
				validationSchema={annoucementFormSchema}
				onSubmit={(values, { setSubmitting }) => {
					handleAddAnnoucements(values, setSubmitting);
				}}
			>
				{({ values, setFieldValue, isSubmitting }) => {
					return (
						<Form className="space-y-2 mt-4 max-w-[400px] p-4">
							<section className="grid w-full gap-2">
								<FormTextArea
									id="message"
									name="message"
									placeholder="Enter Message here"
									label="Message"
									onChange={(e) => {
										setFieldValue("message", e.target.value);
									}}
								/>
							</section>

							<div className="flex justify-center mt-4">
								<button
									disabled={isSubmitting}
									className="p-3 bg-green font-semibold text-white rounded-md w-full 
                              md:max-w-[15rem] flex items-center justify-center h-12 border border-red-500 rouned-sm cursor-pointer"
									type="submit"
								>
									Send
								</button>
							</div>
						</Form>
					);
				}}
			</Formik>

			<button className="text-xl border border-red-500 rounded-lg bg-red-500 p-1.5 mt-4">
				Delete Annoucements
			</button>
		</section>
	);
}

export default Annoucements;
