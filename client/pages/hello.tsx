import React, { ReactElement } from "react";
import { HelloComponent } from "../generated/apolloComponents";
import Layout from "../components/Layout";

function HelloPage(): ReactElement {
	return (
		<Layout>
			<HelloComponent>
				{({ data }) => (data && data.hello ? <h1>{data.hello}</h1> : <h1>"Loading..."</h1>)}
			</HelloComponent>
		</Layout>
	);
}

export default HelloPage;
