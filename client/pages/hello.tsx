import React, { ReactElement } from "react";
import { MeComponent } from "../generated/apolloComponents";
import Layout from "../components/Layout";

function HelloPage(): ReactElement {
	return (
		<Layout>
			<MeComponent>{({ data }) => <h1>Hello {data?.me.name}</h1>}</MeComponent>
		</Layout>
	);
}

export default HelloPage;
