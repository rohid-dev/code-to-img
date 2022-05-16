import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import React from "react";
import { EditorProvider } from "../src/contexts/EditorContext";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <EditorProvider>
      <Script
        strategy="lazyOnload"
        src={`
        https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}
      `}
      />
      <Script strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
        `}
      </Script>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <title>Code to Image Converter</title>
      </Head>
      <Component {...pageProps} />
    </EditorProvider>
  );
};

export default MyApp;
