import { AppProps } from "next/app";
import React from "react";
import Header from "../src/components/Header";
import SEO from "../src/components/SEO";
import { EditorProvider } from "../src/contexts/EditorContext";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <EditorProvider>
      <SEO />
      <Header />
      <Component {...pageProps} />
    </EditorProvider>
  );
};

export default MyApp;
