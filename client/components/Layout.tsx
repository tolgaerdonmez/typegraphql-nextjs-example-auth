import React, { ReactNode, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import { UserContext } from "../context/User";
import styled from "styled-components";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Container = styled.div`
	background-color: #fafafa;
`;

const Layout = ({ children, title = "This is the default title" }: Props) => {
	const userContext = useContext(UserContext);

	return (
		<Container>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<header>
				<nav>
					{!userContext.state.loggedIn ? (
						<>
							{" | "}
							<Link href="/user/register">
								<a>Register</a>
							</Link>
							{" | "}
							<Link href="/user/login">
								<a>Login</a>
							</Link>
							{" | "}
							<Link href="/user/password/forgot">
								<a>Forgot Password</a>
							</Link>
						</>
					) : (
						<>
							{" | "}
							<Link href="/hello">
								<a>Hello</a>
							</Link>
							{" | "}
							<Link href="/user/logout">
								<a>Logout</a>
							</Link>
						</>
					)}
				</nav>
			</header>
			{children}
			<footer>
				<hr />
				<span>I'm here to stay (Footer)</span>
			</footer>
		</Container>
	);
};

export default Layout;
