import { OptimizedImage } from '@/components/commons/OptimizedImage';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackEvent } from '@/lib/analytics';
import heroData from '../../../content/data/hero.json';

export const Inicio = () => {
  const { t } = useLanguage();
  const { badge, photo } = heroData.hero;

  return (
    <section className="flex py-12 overflow-x-hidden lg:items-center lg:min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-8 lg:gap-20 py-8 lg:py-0">
          {/* Photo - Second on mobile, First on desktop */}
          <div className="flex w-full justify-center lg:w-auto lg:order-2 mb-4">
            <div className="relative w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] lg:w-[400px] lg:h-[400px]">
              <OptimizedImage
                src={photo.url}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="rounded-full shadow-2xl ring-4 sm:ring-8 ring-blue-100 dark:ring-blue-900 w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Content - First on mobile */}
          <div className="flex-1 text-center lg:text-left lg:order-1">
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              <span className="block text-gray-600 dark:text-gray-300 text-xl sm:text-3xl font-medium mb-1 sm:mb-2">
                {t('home.title')}
              </span>
              <strong className="text-blue-600 dark:text-blue-400">
                {t('home.titleBold')}
              </strong>
            </h1>

            <p className="text-base sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('home.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="/contato"
                onClick={() => trackEvent('click', 'CTA', 'Lets Talk - Hero')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
              >
                {t('cta.letsTalk')} →
              </Link>
              <Link
                href="/projetos"
                onClick={() => trackEvent('click', 'CTA', 'View Projects - Hero')}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
              >
                {t('cta.viewProjects')}
              </Link>
            </div>

            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
              {badge.icon && <span className="text-3xl">{badge.icon}</span>}
              <div className="text-left">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  {t(badge.textKey)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
