import '@root/fonts.css';
import '@root/global.css';

import * as React from 'react';

import Providers from '@components/Providers';

function MyApp({ Component, pageProps }) {
  return (
    <Providers viewer={pageProps.viewer} sessionKey={pageProps.sessionKey}>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;
