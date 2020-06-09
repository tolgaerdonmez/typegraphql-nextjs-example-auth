import React, { ReactElement } from "react";
import { Formik, Field } from "formik";
import Layout from "../../components/Layout";
import { InputField } from "../../components/fields/InputField";
import { RegisterComponent } from "../../generated/apolloComponents";
import Router from "next/router";

interface Props {}

function RegisterPage({}: Props): ReactElement {
	return (
		<Layout title="Register">
			<h1>Register</h1>
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
								<Field
									label="First Name"
									name="firstName"
									placeholder="firstName"
									component={InputField}
								/>
								<Field
									label="Last Name"
									name="lastName"
									placeholder="lastName"
									component={InputField}
								/>
								<Field label="Email" name="email" placeholder="email" component={InputField} />
								<Field
									label="Password"
									name="password"
									placeholder="password"
									type="password"
									component={InputField}
								/>
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
