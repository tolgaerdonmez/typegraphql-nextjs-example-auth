import React, { ReactElement } from "react";
import { DefaultContext } from "../../../interfaces";
import { confirmUserMutation } from "../../../graphql/user/mutations/confirmUser";
import { ConfirmUserMutation, ConfirmUserMutationVariables } from "../../../generated/apolloComponents";
import Layout from "../../../components/Layout";
import redirect from "../../../lib/redirect";

export default function ConfirmPage(): ReactElement {
	return (
		<Layout>
			<h1>Cannot confirm user account, invalid token </h1>
		</Layout>
	);
}

ConfirmPage.getInitialProps = async ({ apolloClient, query: { token }, ...ctx }: DefaultContext) => {
	try {
		const { data } = await apolloClient.mutate<ConfirmUserMutation, ConfirmUserMutationVariables>({
			mutation: confirmUserMutation,
			variables: { token: token as string },
		});

		if (data?.confirmUser) {
			redirect(ctx, "/user/login");
		}
		return { props: {} };
	} catch {
		return { props: {} };
	}
};
