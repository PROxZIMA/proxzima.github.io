import React from 'react';
import '../styles/global.css';
import config from '../../config.json';
import Head from 'next/head';
import Script from 'next/script';


const App = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickAnywhere = () => {
    // inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    inputRef.current.focus({ preventScroll: true });
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
      </Head>

      <Script strategy="beforeInteractive" src="/scripts/darkMode.js" />

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
