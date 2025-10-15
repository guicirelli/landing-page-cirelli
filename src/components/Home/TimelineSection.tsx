import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import timelineData from '../../../content/data/timeline.json';

export const TimelineSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {timelineData.titleEmoji} {t('home.timeline.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('home.timeline.subtitle')}
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {timelineData.timeline.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0 w-24 pt-1">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                  {t(item.dateKey)}
                </span>
              </div>
              <div className="flex-1 pb-2 border-l-2 border-blue-200 dark:border-blue-800 pl-6 relative">
                <div className="absolute -left-2 top-2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-900"></div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t(item.titleKey)}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 font-semibold text-lg transition-all duration-200"
          >
            {t('home.timeline.viewAll')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

