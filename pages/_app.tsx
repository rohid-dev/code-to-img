import { AppProps } from "next/app";
import React from "react";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
