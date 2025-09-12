import { MenuCloseIcon } from '@/components/icons/MenuCloseIcon';
import { ThemeToggle } from '@/components/commons/ThemeToggle';
import { getMainMenu } from '@/lib/settings';
import Image from 'next/image';
import Link from 'next/link';

interface MenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Menu = ({ isVisible, onClose }: MenuProps) => {
  const mainMenu = getMainMenu();

  return (
    <div
      className={`${isVisible ? 'flex' : 'hidden'}
      fixed inset-0 w-full h-full bg-black bg-opacity-40 backdrop-blur-sm md:hidden
    `}
      onClick={onClose}
    >
      <div
        className="w-full bg-white dark:bg-gray-900 h-96 shadow-md py-4 px-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-5">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/img/foto perfil.jpeg"
              alt="Guilherme Cirelli Lopes"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-bold text-gray-900 dark:text-white text-lg">
              Guilherme Cirelli
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button onClick={onClose}>
              <MenuCloseIcon className="fill-gray-700 dark:fill-white w-8 h-8" />
            </button>
          </div>
        </div>
        <nav className="flex flex-col gap-5 text-xl p-5 items-center">
          {mainMenu.mainMenu?.map((item: any) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
