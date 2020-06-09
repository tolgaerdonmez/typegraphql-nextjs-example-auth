import React, { ReactElement, useContext } from "react";
import { Formik, Field } from "formik";
import Layout from "../../components/Layout";
import { InputField } from "../../components/fields/InputField";
import { LoginComponent } from "../../generated/apolloComponents";
import Router from "next/router";
import { UserContext } from "../../context/User";

interface Props {}

function LoginPage({}: Props): ReactElement {
	const userContext = useContext(UserContext);

	return (
		<Layout title="Login">
			<h1>Login</h1>
			<LoginComponent>
				{login => (
					<Formik
						onSubmit={async (data, { setErrors }) => {
							const res = await login({
								variables: data,
							});
							if (res && res.data && !res.data.login) {
								setErrors({ email: "Invalid Login" });
								return;
							}
							userContext.actions.isUserLoggedIn();
							Router.push("/");
						}}
						initialValues={{ email: "", password: "" }}>
						{({ handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<Field label="Email" name="email" placeholder="email" component={InputField} />
								<Field
									label="Password"
									name="password"
									placeholder="password"
									type="password"
									component={InputField}
								/>
								<button type="submit">Login</button>
							</form>
						)}
					</Formik>
				)}
			</LoginComponent>
		</Layout>
	);
}

export default LoginPage;
