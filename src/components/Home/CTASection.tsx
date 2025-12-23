import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import ctaData from '../../../content/data/cta.json';

export const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {ctaData.cta.titleEmoji} {t('home.cta.title')}
        </h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          {t('home.cta.description')}
        </p>
        
        <Link
          href={ctaData.cta.link}
          onClick={() => trackEvent('click', 'CTA', 'Final CTA - Home')}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
        >
          {t('home.cta.button')} →
        </Link>

      </div>
    </section>
  );
};

