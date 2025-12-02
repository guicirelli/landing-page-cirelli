"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { Menu } from './Menu';
import { useCallback, useState } from 'react';
import { MenuIcon } from '@/components/icons/MenuIcon';
import { UserButton } from "@clerk/nextjs";
import dynamic from 'next/dynamic'; // Importar dynamic
import { CustomSignInButton } from "@/components/commons/clerk/SignInButton";
import { CustomSignOutButton } from "@/components/commons/clerk/SignOutButton";
import { useRouter } from 'next/router'; // Importar useRouter
import { ThemeToggle } from '@/components/commons/ThemeToggle';
import { LanguageSwitcher } from '@/components/commons/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { getMainMenu, getLogos } from '@/lib/settings';

// Importar SignedIn e SignedOut dinamicamente para garantir que sejam renderizados apenas no cliente
// @ts-expect-error
const SignedIn = dynamic(() => import("@clerk/nextjs").then((mod) => mod.SignedIn), { ssr: false });
// @ts-expect-error
const SignedOut = dynamic(() => import("@clerk/nextjs").then((mod) => mod.SignedOut), { ssr: false });

const roboto = Roboto({
  subsets: ['latin'],
  weight: '500',
});

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter(); // Obter o objeto router
  const { t } = useLanguage();
  const mainMenu = getMainMenu();
  const logos = getLogos();

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header
      className={`${roboto.className} bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-sm flex flex-wrap py-1.5 xs:py-2 sm:py-2.5 md:py-3 px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 justify-between items-center sticky top-0 z-20 shadow-sm gap-1.5 xs:gap-2`}
    >
      {/* Download Resume Button */}
      <div className="flex items-center flex-shrink-0">
        <a
          href="/files/Curriculo 02072025.pdf"
          download="Curriculo_Guilherme_Cirelli.pdf"
          className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 xs:py-1.5 sm:py-2 px-1.5 xs:px-2 sm:px-3 md:px-4 rounded-md xs:rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-[10px] xs:text-xs sm:text-sm"
        >
          <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="hidden xs:inline">{t('download.resume')}</span>
        </a>
      </div>

      {/* Mobile menu button */}
      <button className="p-0.5 xs:p-1 md:hidden flex-shrink-0" onClick={openMenu} aria-label="Menu">
        <MenuIcon className="fill-gray-700 dark:fill-white w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
      </button>

      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 xl:gap-2 text-xs md:text-sm lg:text-base">
        <Link
          href="/"
          className={`px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-md transition-colors duration-200 ${
            router.pathname === '/'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {t('navigation.home')}
        </Link>
        <Link
          href="/sobre"
          className={`px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-md transition-colors duration-200 ${
            router.pathname === '/sobre'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {t('navigation.about')}
        </Link>
        <Link
          href="/projetos"
          className={`px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-md transition-colors duration-200 ${
            router.pathname === '/projetos'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {t('navigation.projects')}
        </Link>
        <Link
          href="/blog"
          className={`px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-md transition-colors duration-200 ${
            router.pathname === '/blog'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {t('navigation.blog')}
        </Link>
        <Link
          href="/contato"
          className={`px-2 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-md transition-colors duration-200 ${
            router.pathname === '/contato'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {t('navigation.contact')}
        </Link>
      </nav>

      {/* Right side actions */}
      <div className="hidden md:flex items-center gap-1.5 lg:gap-3 xl:gap-4 flex-shrink-0">
        <LanguageSwitcher />
        <ThemeToggle />
        {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && (
          <>
            <SignedIn>
              <UserButton />
              <CustomSignOutButton />
            </SignedIn>
           
            <SignedOut>
              <CustomSignInButton />
            </SignedOut>
          </>
        )}
      </div>

      <Menu isVisible={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};
