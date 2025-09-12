import { Layout } from '@/components/commons/Layout';
import { ThemeProvider } from '@/components/commons/ThemeProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';

export default function App({ Component, pageProps }: AppProps) {
  const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Se não há chave do Clerk, renderiza sem autenticação
  if (!PUBLISHABLE_KEY) {
    return (
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      {/* @ts-expect-error */}
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} initialState={pageProps.initialState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ClerkProvider>
    </ThemeProvider>
  );
}
