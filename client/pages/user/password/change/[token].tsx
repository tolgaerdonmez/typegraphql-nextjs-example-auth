import React from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ChangePasswordComponent } from "../../../../generated/apolloComponents";
import Layout from "../../../../components/Layout";
import { Formik, Field } from "formik";
import { InputField } from "../../../../components/fields/InputField";
import Router from "next/router";

interface Props {
	token?: string;
}

const ChangePasswordPage = ({ token }: Props) => {
	if (!token) {
		Router.replace("/user/password/forgot");
		return <></>;
	}

	return (
		<Layout title="Change Password">
			<h1>Change Password</h1>
			<ChangePasswordComponent>
				{changePassword => (
					<Formik
						onSubmit={async ({ password }, { setErrors }) => {
							try {
								const res = await changePassword({
									variables: { data: { password, token: token } },
								});
								if (res.data?.changePassword) {
									Router.replace("/");
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
						initialValues={{ password: "" }}>
						{({ handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<Field
									name="password"
									placeholder="new password"
									type="password"
									component={InputField}
								/>
								<button type="submit">Change Password</button>
							</form>
						)}
					</Formik>
				)}
			</ChangePasswordComponent>
		</Layout>
	);
};

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
	return { props: { token: params?.token } };
}

export default ChangePasswordPage;
