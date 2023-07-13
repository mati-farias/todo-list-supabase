import Layout from '@/components/Layout';
import { DarkThemeProvider } from '@/contexts/darkThemeContext';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <DarkThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DarkThemeProvider>
    </SessionProvider>
  );
}
