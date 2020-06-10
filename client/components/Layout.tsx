import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { MeComponent } from "../generated/apolloComponents";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
	return (
		<div className="layout-container">
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<header>
				<nav>
					<ul>
						<MeComponent>
							{({ data, loading }) => {
								if (!data || loading || !data.me) {
									return (
										<>
											<li>
												<Link href="/user/register">
													<a>Register</a>
												</Link>
											</li>
											<li>
												<Link href="/user/login">
													<a>Login</a>
												</Link>
											</li>
											<li>
												<Link href="/user/password/forgot">
													<a>Forgot Password</a>
												</Link>
											</li>
										</>
									);
								}
								return (
									<>
										<li>
											<Link href="/hello">
												<a>Hello</a>
											</Link>
										</li>
										<li>
											<Link href="/user/logout">
												<a>Logout</a>
											</Link>
										</li>
									</>
								);
							}}
						</MeComponent>
					</ul>
				</nav>
			</header>
			<div className="layout-children-container">{children}</div>
			<footer>
				<hr />
				<span>typegraphql-nextjs-example-auth</span>
			</footer>
		</div>
	);
};

export default Layout;
