import Head from 'next/head';
import React from 'react';
import config from '../../config.json';
import '../styles/global.css';

const App = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickAnywhere = () => {
    if (inputRef.current) {
      // inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          key="viewport"
          maximum-scale="1"
        />
        <title>{config.title}</title>
        <meta name="author" content={config.name} />
        <meta name="description" content={config.description} />

        <meta property="og:title" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={config.homepage} />
        <meta property="og:description" content={config.description} />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/PROxZIMA/proxzima.github.io/gh-pages/ogImage.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="./apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="./apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="./apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="./apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="./apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="./apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="./apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="./apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="./apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="./android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="./favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="./favicon-16x16.png"
        />
        <link rel="manifest" href="./manifest.json" />
        <meta name="msapplication-TileColor" content="#282A36" />
        <meta name="msapplication-TileImage" content="./ms-icon-144x144.png" />
        <meta name="theme-color" content="#282A36" />
      </Head>

      <div
        className="text-light-foreground dark:text-dark-foreground min-w-max text-xs md:min-w-full md:text-base"
        onClick={onClickAnywhere}
      >
        <main className="bg-light-background dark:bg-dark-background w-full h-full p-2">
          <Component {...pageProps} inputRef={inputRef} />
        </main>
      </div>
    </>
  );
};

export default App;
