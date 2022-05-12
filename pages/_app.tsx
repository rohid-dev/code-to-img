import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { EditorProvider } from "../src/contexts/EditorContext";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <EditorProvider>
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <title>Code to Image Converter</title>
      </Head>
      <Component {...pageProps} />
    </EditorProvider>
  );
};

export default MyApp;
