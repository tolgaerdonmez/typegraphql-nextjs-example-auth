import React from "react";
import { DefaultContext } from "../../interfaces";
import { logoutMutation } from "../../graphql/user/mutations/logoutMutation";
import redirect from "../../lib/redirect";

const LogoutPage = (): React.ReactElement => {
	return <></>;
};

LogoutPage.getInitialProps = async ({ apolloClient, ...ctx }: DefaultContext) => {
	try {
		await apolloClient.mutate({ mutation: logoutMutation });
		redirect(ctx, "/user/login");
		await apolloClient.resetStore();
	} catch {
		console.log("error while logging out");
	}
	return { props: {} };
};

export default LogoutPage;
