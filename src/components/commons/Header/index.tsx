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
      className={`${roboto.className} bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-sm flex py-3 px-5 justify-between items-center sticky top-0 z-20 shadow-sm`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image
          src={logos.mainLogo}
          alt="Guilherme Cirelli Lopes"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-bold text-gray-900 dark:text-white text-lg">
          Guilherme Cirelli
        </span>
      </div>

      {/* Mobile menu button */}
      <button className="p-1 md:hidden" onClick={openMenu}>
        <MenuIcon className="fill-gray-700 dark:fill-white w-8 h-8" />
      </button>

      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center gap-2 text-md">
        {mainMenu.mainMenu?.map((item: any) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              router.pathname === item.href
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right side actions */}
      <div className="hidden md:flex items-center gap-4">
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
