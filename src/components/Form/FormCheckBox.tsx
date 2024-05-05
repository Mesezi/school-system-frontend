import React from "react";
import { useField } from "formik";

interface multigroupCheckBox {
	label: string;
	id?: string;
	name: string;
	children: React.ReactNode;
}
function FormCheckBox({ ...props }: multigroupCheckBox) {
	const [field, meta] = useField({ ...props, type: "checkbox" });
	return (
		<div role="group" className="flex flex-col gap-2">
			<label
				htmlFor={props.name || props.id}
				className="font-medium text-[white] text-[.9rem]"
			>
				{props.label}
			</label>
			{props.children}
			{meta.touched && meta.error ? (
				<div className="text-red-600 text-xs font-medium w-full h-2 my-1">
					{meta.error}
				</div>
			) : null}
		</div>
	);
}

export default FormCheckBox;
