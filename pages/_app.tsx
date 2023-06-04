import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { fetcher } from '@/utils/fetcher';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    styles: {
      global: {
        '#__next': {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
  });
  return (
    <SWRConfig value={{ fetcher }}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  );
}
