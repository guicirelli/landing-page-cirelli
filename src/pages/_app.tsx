import { Layout } from '@/components/commons/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';

export default function App({ Component, pageProps }: AppProps) {
  const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error(
      "Missing Publishable Key -- Get it from https://clerk.com/docs/quickstarts/nextjs"
    );
  }

  return (
    // @ts-expect-error
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} initialState={pageProps.initialState}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}
