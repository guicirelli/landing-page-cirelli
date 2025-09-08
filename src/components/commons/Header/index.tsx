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

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header
      className={`${roboto.className} bg-h-blue-900 text-sm flex py-1 px-5 justify-between items-center sticky top-0 z-20`}
    >
      <button className="p-1 md:hidden" onClick={openMenu}>
        <MenuIcon className="fill-white w-10 h-10" />
      </button>
      <nav className="hidden md:flex items-center gap-4 text-md">
        <Link href="/" className={`px-4 py-2 rounded-md ${router.pathname === '/' ? 'bg-h-blue-500' : 'bg-h-blue-700'} hover:bg-h-blue-600 transition-colors duration-200`}>Home</Link>
        <Link href="/contatos" className={`px-4 py-2 rounded-md ${router.pathname === '/contatos' ? 'bg-h-blue-500' : 'bg-h-blue-700'} hover:bg-h-blue-600 transition-colors duration-200`}>Contact</Link>
      </nav>
      <div className="flex items-center gap-4">
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
