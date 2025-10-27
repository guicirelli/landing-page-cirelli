import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Metatags essenciais */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
        
        {/* Metatags Open Graph padrão */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Guilherme Cirelli" />
        
        {/* Metatags Twitter padrão */}
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body className="bg-white dark:bg-gray-900">
        {/* Formulário estático oculto para Netlify Forms detectar durante o build */}
        <form name="contato" method="POST" data-netlify="true" hidden>
          <input type="hidden" name="form-name" value="contato" />
          <input type="text" name="name" />
          <input type="email" name="email" />
          <textarea name="message"></textarea>
        </form>
        
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
