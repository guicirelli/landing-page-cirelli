import React, { useState, useEffect } from 'react';
import { getGeneralSettings, getLinkTreeData } from '@/lib/settings';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className = "" }: FooterProps) => {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const generalSettings = getGeneralSettings();
  const linkTreeData = getLinkTreeData();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Usa a tradução diretamente do contexto ao invés de getBusinessSettings
  const businessSettings = {
    brandName: "Guilherme Cirelli Lopes",
    brandDescription: t('home.subtitle'),
    brandEmail: "guilopes.030206@gmail.com",
    brandPhone: "+55 43 99157-5781"
  };
  
  // Previne erro de hidratação renderizando placeholder até montar
  if (!mounted) {
    return (
      <footer className={`bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 ${className}`}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="h-64"></div>
        </div>
      </footer>
    );
  }

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      FaUpwork: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.491-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
        </svg>
      ),
      FaEnvelope: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
    };
    return icons[iconName] || icons.FaEnvelope;
  };

  return (
    <footer className={`bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/img/foto perfil.jpeg"
                alt={businessSettings.brandName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-bold text-gray-900 dark:text-white text-lg">
                {businessSettings.brandName}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              {businessSettings.brandDescription}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {linkTreeData.linkTree?.filter((link: any) => link.icon !== 'FaEnvelope').map((link: any, index: number) => {
                const IconComponent = getIcon(link.icon);
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                    aria-label={link.label}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  {t('navigation.about')}
                </Link>
              </li>
              <li>
                <Link href="/projetos" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  {t('navigation.projects')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  {t('navigation.blog')}
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('footer.contact')}</h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <a 
                  href="https://wa.me/5543991575781" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                >
                  {businessSettings.brandPhone}
                </a>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <a 
                  href="mailto:guilopes.030206@gmail.com" 
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  guilopes.030206@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('footer.copyright')}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              © {new Date().getFullYear()} {businessSettings.brandName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
