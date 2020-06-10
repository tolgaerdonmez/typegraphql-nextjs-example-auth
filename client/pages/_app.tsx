import App from "next/app";
import React from "react";
import { withApollo } from "../lib/withApollo";
import "../sass/global.scss";

class MyApp extends App<any> {
	render() {
		const { Component, pageProps } = this.props;
		return <Component {...pageProps} />;
	}
}

export default withApollo(MyApp);
