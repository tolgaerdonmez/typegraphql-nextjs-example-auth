import React from "react";
import { DefaultContext } from "../../interfaces";
import { logoutMutation } from "../../graphql/user/mutations/logoutMutation";
import redirect from "../../lib/redirect";
import { withApollo } from "../../lib/withApollo";

const LogoutPage = (): React.ReactElement => {
	return <></>;
};

LogoutPage.getInitialProps = async ({ apolloClient, ...ctx }: DefaultContext) => {
	try {
		await apolloClient.mutate({ mutation: logoutMutation });
		await apolloClient.resetStore();
		redirect(ctx, "/user/login");
	} catch (err) {
		console.log("error while logging out", err);
	} finally {
		return { props: {} };
	}
};

export default withApollo(LogoutPage);
