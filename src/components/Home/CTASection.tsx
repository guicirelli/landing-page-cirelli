import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import ctaData from '../../../content/data/cta.json';

export const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Decoração de fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-purple-100/20 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20"></div>
      <div className="max-w-4xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 text-center relative z-10">
        <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-5 md:mb-6">
          {ctaData.cta.titleEmoji} {t('home.cta.title')}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-7 md:mb-8 leading-relaxed px-2 sm:px-0">
          {t('home.cta.description')}
        </p>
        
        <Link
          href={ctaData.cta.link}
          onClick={() => trackEvent('click', 'CTA', 'Final CTA - Home')}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-3.5 md:py-4 px-6 sm:px-8 md:px-10 rounded-lg text-base sm:text-lg transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
        >
          {t('home.cta.button')} →
        </Link>

      </div>
    </section>
  );
};

