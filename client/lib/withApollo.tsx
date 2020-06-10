import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import initApollo from "./initApollo";
import cookie from "cookie";
import { helloQuery } from "../graphql/user/queries/hello";
import redirect from "./redirect";
import { DefaultContext } from "../interfaces";

function parseCookies(req?: any, options = {}) {
	return cookie.parse(req ? req.headers.cookie || "" : document.cookie, options);
}

interface WithApolloProps {
	apolloClient: ApolloClient<NormalizedCacheObject>;
	apolloState: any;
	pageProps: any;
	ctx: any;
}

let globalApolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function withApollo(PageComponent: any, ssr = true) {
	const WithApollo = ({ apolloClient, apolloState, ctx, ...pageProps }: WithApolloProps) => {
		const client = apolloClient || initApolloClient(apolloState, () => parseCookies().token);
		return (
			<ApolloProvider client={client}>
				<PageComponent {...pageProps} />
			</ApolloProvider>
		);
	};

	// Set the correct displayName in development
	if (process.env.NODE_ENV !== "production") {
		const displayName = PageComponent.displayName || PageComponent.name || "Component";

		if (displayName === "App") {
			console.warn("This withApollo HOC only works with PageComponents.");
		}

		WithApollo.displayName = `withApollo(${displayName})`;
	}

	if (ssr || PageComponent.getInitialProps) {
		WithApollo.getInitialProps = async (ctx: any) => {
			const { AppTree, Component, router } = ctx;

			// Initialize ApolloClient, add it to the ctx object so
			// we can use it in `PageComponent.getInitialProp`.
			const apolloClient = (ctx.apolloClient = initApolloClient({}, () => parseCookies(ctx.req).qid));

			// Run wrapped getInitialProps methods
			let pageProps = {};
			if (PageComponent.getInitialProps) {
				pageProps = await PageComponent.getInitialProps(ctx);
			}

			// Only on the server:
			if (typeof window === "undefined") {
				// When redirecting, the response is finished.
				// No point in continuing to render
				if (ctx.res && ctx.res.finished) {
					return pageProps;
				}

				// Only if ssr is enabled
				if (ssr) {
					try {
						// Run all GraphQL queries
						const { getDataFromTree } = await import("@apollo/react-ssr");
						await getDataFromTree(
							<AppTree
								Component={Component}
								router={router}
								apolloClient={apolloClient}
								{...pageProps}
								// pageProps={{
								// 	...pageProps,
								// 	apolloClient,
								// }}
							/>
						);
					} catch (error) {
						// Prevent Apollo Client GraphQL errors from crashing SSR.
						// Handle them in components via the data.error prop:
						// https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
						// console.error("Error while running `getDataFromTree`", error);
					}

					// getDataFromTree does not call componentWillUnmount
					// head side effect therefore need to be cleared manually
					Head.rewind();
				}
			}

			// Extract query data from the Apollo store
			const apolloState = apolloClient.cache.extract();

			return {
				...pageProps,
				apolloState,
			};
		};
	}

	return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState: any, getToken: () => string) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (typeof window === "undefined") {
		return initApollo(initialState, { getToken });
		// return createApolloClient(ctx, initialState, getToken);
	}

	// Reuse client on the client-side
	if (!globalApolloClient) {
		globalApolloClient = initApollo(initialState, { getToken });
		// createApolloClient(ctx, initialState, getToken);
	}

	return globalApolloClient;
}

export function withApolloAuth(Component: any) {
	const prevInitialProps = Component.getInitialProps;
	Component.getInitialProps = async ({ apolloClient, ...ctx }: DefaultContext) => {
		console.log("in with auth get initial props");
		try {
			await apolloClient.query({ query: helloQuery });
		} catch (err) {
			if (err.message.includes("Not authenticated!")) {
				console.log("not authenticated");

				redirect(ctx, "/user/login");
			}
		}
		if (prevInitialProps) {
			await prevInitialProps(ctx);
		}
	};

	return withApollo(Component);
}
