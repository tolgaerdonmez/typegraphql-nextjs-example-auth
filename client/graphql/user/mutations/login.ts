import { gql } from "apollo-boost";

export const loginMutaton = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			name
			email
		}
	}
`;
