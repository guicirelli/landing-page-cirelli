import { getBusinessSettings, getGeneralSettings, getLinkTreeData } from '@/lib/settings';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className = "" }: FooterProps) => {
  const { t } = useLanguage();
  const { language } = useLanguage();
  const businessSettings = getBusinessSettings();
  const generalSettings = getGeneralSettings();
  const linkTreeData = getLinkTreeData();

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      FaLinkedin: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      FaGithub: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
