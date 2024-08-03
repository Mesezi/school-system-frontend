import React, { Dispatch, SetStateAction } from "react";
import { Field, ErrorMessage } from "formik";

interface FieldProps {
	id: string;
	name: string;
	label?: string;
	placeholder?: string;
	type?: string;
	onChange?: (event: any) => void;
	setFormikValue?: (value: any) => void;
	setStateAction?: Dispatch<SetStateAction<any>>;
	className?: string;
	isDisabled?: boolean;
}

const FormInput: React.FC<FieldProps> = ({
	id,
	name,
	label,
	placeholder,
	type,
	onChange,
}) => {
	return (
		<div className="w-full flex flex-col items-start ">
			{label && (
				<label htmlFor={name} className="font-medium text-[white] text-[.9rem]">
					{label}
				</label>
			)}
			<Field
				id={id}
				name={name}
				placeholder={placeholder}
				type={type}
				onChange={onChange}
			>
				{({
					field,
					form: { touched, errors },
					meta,
				}: {
					field: any;
					form: any;
					meta: any;
				}) => (
					<input
						type={type}
						{...field}
						placeholder={placeholder}
						className={` w-full h-[2.8rem] mt-1 px-3 border rounded-md
					placeholder:text-[#A1A7AD] outline-none bg-white ${
						meta.touched && meta.error
							? "ring-2 ring-red-400 focus:ring-red-400"
							: "border-[#C6C5C5] hover:border-green focus:border-green font-medium"
					}
					placeholder:text-sm placeholder:font-normal text-[#6C6C6C]`}
					/>
				)}
			</Field>

			<span className="text-red-600 text-xs font-medium w-full h-2 my-1">
				<ErrorMessage name={name} />
			</span>
		</div>
	);
};

export default FormInput;
