import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html className="dark" lang="en">
      <Head>
        <script src="/scripts/darkMode.js" async />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
