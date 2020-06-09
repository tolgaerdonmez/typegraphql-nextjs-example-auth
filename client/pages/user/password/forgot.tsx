import React, { useState } from "react";
import { ForgotPasswordComponent } from "../../../generated/apolloComponents";
import Layout from "../../../components/Layout";
import { Formik, Field } from "formik";
import { InputField } from "../../../components/fields/InputField";

const ForgotPasswordPage = () => {
	const [emailSent, setEmailSent] = useState(null as null | boolean);

	return (
		<Layout title="Forgot Password?">
			<h1>Forgot Password</h1>
			{emailSent === null ? (
				<ForgotPasswordComponent>
					{forgotPassword => (
						<Formik
							onSubmit={async ({ email }, { setErrors }) => {
								setEmailSent(false);
								const res = await forgotPassword({
									variables: { email },
								});
								if (res && res.data && !res.data.forgotPassword) {
									setErrors({ email: "Invalid Login" });
									return;
								}
								setEmailSent(true);
							}}
							initialValues={{ email: "" }}>
							{({ handleSubmit }) => (
								<form onSubmit={handleSubmit}>
									<Field label="Email" name="email" placeholder="email" component={InputField} />
									<button type="submit">Forgot Password</button>
								</form>
							)}
						</Formik>
					)}
				</ForgotPasswordComponent>
			) : emailSent ? (
				<h1>Forgot password link sent to your email!</h1>
			) : (
				<h1>Loading...</h1>
			)}
		</Layout>
	);
};

export default ForgotPasswordPage;
