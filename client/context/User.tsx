import React, { Component, createContext } from "react";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import { meQuery } from "../graphql/user/queries/me";
import { MeQuery } from "../generated/apolloComponents";

interface Props {
	apolloClient: ApolloClient<NormalizedCacheObject>;
}

interface State {
	loggedIn: boolean;
}

export interface UserContextInterface {
	state: State;
	actions: { isUserLoggedIn: () => void; [key: string]: (...args: any[]) => void };
}

const initialState: State = { loggedIn: false };

export const UserContext = createContext<UserContextInterface>({ state: initialState, actions: {} as any });

export default class UserContextProvider extends Component<Props, State> {
	state = initialState;

	componentDidMount() {
		this.isUserLogged();
		this.props.apolloClient.onResetStore(this.isUserLogged);
	}

	isUserLogged = async () => {
		const { apolloClient } = this.props;
		try {
			const res = await apolloClient.query<MeQuery>({ query: meQuery });
			if (res.data.me) {
				this.setState({ loggedIn: true });
				return;
			}
			throw new Error();
		} catch (error) {
			this.setState({ loggedIn: false });
			return;
		}
	};

	render() {
		const context: UserContextInterface = { state: this.state, actions: { isUserLoggedIn: this.isUserLogged } };
		return <UserContext.Provider value={context}>{this.props.children}</UserContext.Provider>;
	}
}
