import React, { ReactElement } from "react";
import { Formik, Field } from "formik";
import Layout from "../../components/Layout";
import { InputField } from "../../components/fields/InputField";
import { LoginComponent, MeQuery } from "../../generated/apolloComponents";
import Router from "next/router";
import { meQuery } from "../../graphql/user/queries/me";

interface Props {}

function LoginPage({}: Props): ReactElement {
	return (
		<Layout title="Login">
			<h1>Login</h1>
			<LoginComponent>
				{login => (
					<Formik
						onSubmit={async (data, { setErrors }) => {
							const res = await login({
								variables: data,
								update: (cache, { data }) => {
									if (!data || !data.login) {
										return;
									}

									cache.writeQuery<MeQuery>({
										query: meQuery,
										data: {
											__typename: "Query",
											me: data.login as any,
										},
									});
								},
							});
							if (res && res.data && !res.data.login) {
								setErrors({ email: "Invalid Login" });
								return;
							}
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
