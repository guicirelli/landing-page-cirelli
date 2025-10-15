import { useLanguage } from '@/contexts/LanguageContext';
import technologiesData from '../../../content/data/technologies.json';

export const TechStack = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {technologiesData.titleEmoji} {t('home.techStack.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('home.techStack.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {technologiesData.technologies.map((tech) => (
            <div
              key={tech.id}
              className={`px-6 py-4 rounded-xl text-center font-semibold text-sm ${tech.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-default`}
            >
              {t(tech.nameKey)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

