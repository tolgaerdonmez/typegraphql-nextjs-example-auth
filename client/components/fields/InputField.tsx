import React, { ReactElement, DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldProps } from "formik";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function InputField({ field, form: { errors, touched }, ...props }: FieldProps & InputProps): ReactElement {
	const errorMessage = touched[field.name] && errors[field.name];

	return (
		<div>
			<input {...field} {...props} />
			{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
		</div>
	);
}
