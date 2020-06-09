import React, { ReactElement, DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldProps } from "formik";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
interface CustomFieldProps extends InputProps {
	label?: string;
}
export function InputField({
	field,
	form: { errors, touched },
	...props
}: FieldProps & CustomFieldProps): ReactElement {
	const errorMessage = touched[field.name] && errors[field.name];

	return (
		<div className="form-input-field">
			<label htmlFor={props.name || ""}>{props.label}</label>
			<input {...field} {...props} />
			{errorMessage && <span className="form-input-error-message">{errorMessage}</span>}
		</div>
	);
}
