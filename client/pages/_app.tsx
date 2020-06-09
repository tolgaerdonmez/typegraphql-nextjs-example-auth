import App from "next/app";
import React from "react";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { withApollo, WithApolloProps } from "next-with-apollo";
import initApollo from "../lib/initApollo";
import cookie from "cookie";
import UserContextProvider from "../context/User";
import "../sass/global.scss";

function parseCookies(req?: any, options = {}) {
	return cookie.parse(req ? req.headers.cookie || "" : document.cookie, options);
}

class MyApp extends App<WithApolloProps<any>> {
	render() {
		const { Component, pageProps, apollo } = this.props;
		return (
			<ApolloProvider client={apollo}>
				<UserContextProvider apolloClient={apollo}>
					<Component {...pageProps} apolloClient={apollo} />
				</UserContextProvider>
			</ApolloProvider>
		);
	}
}

export default withApollo(
	({ initialState, ctx }) =>
		initApollo(initialState, {
			getToken: () => parseCookies(ctx?.req).qid,
		})
	// {
	// 	getDataFromTree,
	// }
)(MyApp);
