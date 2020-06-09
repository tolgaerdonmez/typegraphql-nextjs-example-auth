import React, { ReactElement, useEffect } from "react";
import Router from "next/router";

export default function index(): ReactElement {
	useEffect(() => {
		Router.replace("/user/password/forgot");
	}, []);
	return <></>;
}
