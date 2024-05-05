import React from "react";
import {  useField } from "formik";

interface selectProps {
	label: string;
	id?: string;
	name: string;
	children: React.ReactNode;
}

function FormSelect({ ...props }: selectProps) {
	const [field, meta] = useField(props);
	return (
		<div className="w-full flex flex-col items-start">
			<label
				htmlFor={props.name || props.id}
				className="font-medium text-[white] text-[.9rem]"
			>
				{props.label}
			</label>
			<select 
				className={` w-full h-[2.8rem] mt-1 px-3 border rounded-md
                placeholder:text-[#A1A7AD] outline-none bg-white ${
                    meta.touched && meta.error
                        ? "ring-2 ring-red-400 focus:ring-red-400"
                        : "border-[#C6C5C5] hover:border-green focus:border-green font-medium"
                }
                placeholder:text-sm placeholder:font-normal text-[#6C6C6C]`}
				{...field}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<div className="text-red-600 text-xs font-medium w-full h-2 my-1">
					{meta.error}
				</div>
			) : null}
		</div>
	);
}

export default FormSelect;
