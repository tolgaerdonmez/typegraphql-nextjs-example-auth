import React from "react";
import { DefaultContext } from "../../interfaces";
import { logoutMutation } from "../../graphql/user/mutations/logoutMutation";
import redirect from "../../lib/redirect";

const LogoutPage = (): React.ReactElement => {
	return <></>;
};

LogoutPage.getInitialProps = async ({ apolloClient, ...ctx }: DefaultContext) => {
	await apolloClient.mutate({ mutation: logoutMutation });
	await apolloClient.resetStore();
	redirect(ctx, "/user/login");
	return { props: {} };
};

export default LogoutPage;
