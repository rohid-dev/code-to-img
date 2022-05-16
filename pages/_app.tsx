import { AppProps } from "next/app";
import React from "react";
import SEO from "../src/components/SEO";
import { EditorProvider } from "../src/contexts/EditorContext";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <EditorProvider>
      <SEO />
      <Component {...pageProps} />
    </EditorProvider>
  );
};

export default MyApp;
