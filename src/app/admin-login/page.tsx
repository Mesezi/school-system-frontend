"use client";
import { loginUser } from "@/services/auth/loginService";
import React from "react";
import * as yup from "yup";
import { socket } from "@/app/socket";
import { Form, Formik } from "formik";
import FormInput from "@/components/Form/FormInput";
import FormPasswordInput from "@/components/Form/FormPasswordInput";
import { useRouter } from "next/navigation";

const loginFormSchema = yup.object({
	username: yup.string().required("Enter username"),
	password: yup.string().required("Enter password"),
});

type loginTypes = yup.InferType<typeof loginFormSchema>;

const page = () => {
	const router = useRouter();
	const handleLogin = async (values: loginTypes, setSubmitting: any) => {
		try {
			const res = await loginUser(values, "admin");
			console.log(res);
			if (res) {
				console.log("logged in ooo");
				sessionStorage.setItem("schoolSystemUser", JSON.stringify(res));
				socket.connect();
				socket.emit("joinRoom", res?.user?.schoolId);
				router.push("/admin-dashboard");
			}
		} catch (err) {
			console.log(err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div>
			<Formik
				initialValues={{
					username: "",
					password: "",
				}}
				validationSchema={loginFormSchema}
				onSubmit={(values, { setSubmitting }) => {
					handleLogin(values, setSubmitting);
				}}
			>
				{({ values, setFieldValue, isSubmitting }) => {
					return (
						<Form className="space-y-2 mt-4 max-w-[400px] p-4">
							<section className="grid w-full gap-2">
								<FormInput
									id="username"
									name="username"
									placeholder="Enter username"
									label="username"
									onChange={(e) => {
										setFieldValue("username", e.target.value);
									}}
								/>

								<FormPasswordInput
									id="password"
									name="password"
									placeholder="Enter password"
									label="Password"
									onChange={(e) => {
										setFieldValue("password", e.target.value);
									}}
								/>
							</section>

							<div className="flex justify-center mt-4">
								<button
									disabled={isSubmitting}
									className="p-3 bg-green font-semibold text-white rounded-md w-full 
                              md:max-w-[15rem] flex items-center justify-center h-12 border border-red-500"
									type="submit"
								>
									Submit
								</button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default page;
