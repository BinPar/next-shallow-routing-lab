import React from 'react';
import App, { AppInitialProps } from 'next/app';
import type { AppProps, AppContext } from 'next/app';

const app = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />;
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
app.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps> => {
   // calls page's `getInitialProps` and fills `appProps.pageProps`
   const appProps = await App.getInitialProps(appContext);
   return { ...appProps }
}

export default app;
