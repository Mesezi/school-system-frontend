import React from "react";
import { Field, ErrorMessage } from "formik";
import { BsEyeSlash, BsEye } from "react-icons/bs";

interface FieldProps {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  onChange?: (event: any) => void;
}

const FormPasswordInput: React.FC<FieldProps> = ({
  id,
  name,
  label,
  placeholder,
  onChange
}) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <div className="w-full flex flex-col items-start">
      {label && (
        <label
          htmlFor={name}
          className="font-medium text-[#111111] text-[.9rem]"
        >
          {label}
        </label>
      )}

      <Field
        id={id}
        name={name}
        placeholder={placeholder}
      
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
          <div
            className={` w-full flex h-[2.8rem] mt-1 border rounded-md
		  placeholder:text-[#6a5353] outline-none text-black bg-white ${
        meta.touched && meta.error
          ? "ring-2 ring-red-400 focus:ring-red-400"
          : "border-[#9F9F9F] hover:border-green focus:border-green"
      }
		 `}
          >
            <input
              {...field}
              type={isVisible ? "text" : "password"}
              placeholder={placeholder}
              className="w-full grow outline-0 border-0 placeholder:text-[.85rem] pl-2"
              onChange={onChange}
            />

            <span
              className="h-full min-w-[1.5rem] flex items-center justify-center cursor-pointer"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <BsEye size={18} /> : <BsEyeSlash size={18} />}
            </span>
          </div>
        )}
      </Field>

      <span className="text-red-600 text-xs w-full font-medium h-2 my-1">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

export default FormPasswordInput;
