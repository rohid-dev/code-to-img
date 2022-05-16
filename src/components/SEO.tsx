import Head from "next/head";
import Script from "next/script";
import React from "react";

const TITLE = "Code to Image Converter";
const DESCRIPTION =
  "Code to Image converter is a beautifully designed application that helps you generate beautiful and customizable images of your code snippets. This is built for the developer by the developer. If you want to share your code with anyone or on any social media this is the application you need.";
const URL = "https://codetoimg.com";

const SEO = () => {
  return (
    <>
      {/* Google Analytics */}
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
      {/* END Google Analytics */}

      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="codetoimg, codeimg, image, code, developer, developer tool, image generator, code snippets, snippets, code to image, converter, image converter, convert code to images, code to img, code image"
        />

        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rohidisdev" />
        <meta name="twitter:creator" content="@rohidisdev" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={`${URL}/twitter-card.png`} />
        <meta name="twitter:image:alt" content={TITLE} />
        {/* END TWITTER */}

        {/* FACEBOOK */}
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={`${URL}/facebook-card.png`} />
        <meta property="og:image:alt" content={TITLE} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={TITLE} />
        {/* END FACEBOOK */}

        {/* GOOGLE */}
        <meta itemProp="name" content={TITLE} />
        <meta itemProp="description" content={DESCRIPTION} />
        <meta itemProp="image" content={`${URL}/google-card.png`} />
        {/* END GOOGLE */}

        {/* ROBOTS */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="msnbot" content="index, follow" />
        <meta name="yandexbot" content="index, follow" />
        <meta name="baiduspider" content="index, follow" />
        <meta name="sosospider" content="index, follow" />
        <meta name="slurp" content="index, follow" />
        <meta name="ia_archiver" content="index, follow" />
        <meta name="nutch" content="index, follow" />
        <meta name="spider" content="index, follow" />
        <meta name="crawler" content="index, follow" />
        <meta name="robot" content="index, follow" />
        <meta name="bot" content="index, follow" />
        <meta name="crawling" content="index, follow" />
        <meta name="crawl" content="index, follow" />
        <meta name="crawlable" content="index, follow" />
        <meta name="crawlability" content="index, follow" />
        <meta name="crawlability_rank" content="index, follow" />
        {/* END ROBOTS */}
      </Head>
    </>
  );
};

export default SEO;
