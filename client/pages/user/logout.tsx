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
		await apolloClient.resetStore();
		redirect(ctx, "/user/login");
	} catch {
		redirect(ctx, "/user/logout");
	}
	return { props: {} };
};

export default LogoutPage;
