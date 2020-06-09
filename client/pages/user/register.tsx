import React, { ReactElement } from "react";
import { Formik, Field } from "formik";
import Layout from "../../components/Layout";
import { InputField } from "../../components/fields/InputField";
import { RegisterComponent } from "../../generated/apolloComponents";
import Router from "next/router";

interface Props {}

function RegisterPage({}: Props): ReactElement {
	return (
		<Layout>
			<RegisterComponent>
				{register => (
					<Formik
						onSubmit={async (data, { setErrors }) => {
							try {
								const res = await register({
									variables: {
										data,
									},
								});
								if (res) {
									Router.push("/user/check-email");
								}
							} catch (err) {
								const errors: { [key: string]: string } = {};
								err.graphQLErrors[0].extensions.exception.validationErrors.forEach(
									(validationErr: any) => {
										Object.values(validationErr.constraints).forEach((message: any) => {
											errors[validationErr.property] = message;
										});
									}
								);
								setErrors(errors);
							}
						}}
						initialValues={{ email: "", firstName: "", lastName: "", password: "" }}>
						{({ handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<Field name="firstName" placeholder="firstName" component={InputField} />
								<Field name="lastName" placeholder="lastName" component={InputField} />
								<Field name="email" placeholder="email" component={InputField} />
								<Field name="password" placeholder="password" type="password" component={InputField} />
								<button type="submit">Register</button>
							</form>
						)}
					</Formik>
				)}
			</RegisterComponent>
		</Layout>
	);
}

export default RegisterPage;
