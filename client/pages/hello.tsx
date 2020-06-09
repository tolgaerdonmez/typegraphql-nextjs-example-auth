import React, { ReactElement } from "react";
import { MeComponent } from "../generated/apolloComponents";
import Layout from "../components/Layout";

function HelloPage(): ReactElement {
	return (
		<Layout>
			<MeComponent>
				{({ data, loading }) => (!loading && data?.me ? <h1>Hello {data?.me.name}</h1> : <h1>Loading...</h1>)}
			</MeComponent>
		</Layout>
	);
}

export default HelloPage;
