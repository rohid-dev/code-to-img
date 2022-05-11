import { AppProps } from "next/app";
import React from "react";
import { EditorProvider } from "../src/contexts/EditorContext";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <EditorProvider>
      <Component {...pageProps} />;
    </EditorProvider>
  );
};

export default MyApp;
