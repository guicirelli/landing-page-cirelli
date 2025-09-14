import { Layout } from '@/components/commons/Layout';
import { ThemeProvider } from '@/components/commons/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';

function App({ Component, pageProps }: AppProps) {
  const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Se não há chave do Clerk, renderiza sem autenticação
  if (!PUBLISHABLE_KEY) {
    return (
      <LanguageProvider>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <ThemeProvider>
        {/* @ts-expect-error */}
        <ClerkProvider 
          publishableKey={PUBLISHABLE_KEY} 
          initialState={pageProps.initialState}
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: '#3b82f6',
              colorBackground: '#ffffff',
              colorInputBackground: '#ffffff',
              colorInputText: '#000000',
            },
            elements: {
              modalContent: {
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                borderRadius: '0.75rem',
              },
              modalBackdrop: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }
            }
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ClerkProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
