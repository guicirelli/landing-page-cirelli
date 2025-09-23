import { OptimizedImage } from '@/components/commons/OptimizedImage';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { AboutMe as TAboutMe } from '@/types/Home';
import { trackEvent } from '@/lib/analytics';

interface AboutMeProps {
  aboutMe: TAboutMe;
}

export const Inicio = ({ aboutMe }: AboutMeProps) => {
  const { t } = useLanguage();
  const { title, description, contact, pfp, techs } = aboutMe;

  return (
    <main className="flex flex-wrap-reverse justify-center items-center gap-6 md:gap-16 py-2 text-lg text-center xl:text-left xl:flex-nowrap xl:justify-between">
      <div className="text-gray-900 dark:text-white flex flex-col items-center xl:items-start gap-4 w-full xl:w-120">
        <h1 className="text-3xl sm:text-7xl xl:leading-[5rem] text-gray-900 dark:text-white">
          <span className="block whitespace-nowrap">{t('home.title')}</span>
          <strong className="text-blue-600 dark:text-blue-400">{t('home.titleBold')}</strong>
        </h1>
        <div className="mb-8">
          <h2 className="mb-6 text-gray-700 dark:text-gray-300 text-xl">
            {t('home.subtitle')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
            <Link
              href="/contato"
              onClick={() => trackEvent('click', 'CTA', 'Lets Talk - Hero')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('cta.letsTalk')}
            </Link>
            <Link
              href="/projetos"
              onClick={() => trackEvent('click', 'CTA', 'View Projects - Hero')}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('cta.viewProjects')}
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full max-w-5xl">
          {[
            { name: t('home.technologies.nextjs'), color: "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-gray-500/25" },
            { name: t('home.technologies.react'), color: "bg-gradient-to-r from-cyan-400 to-cyan-500 text-black shadow-cyan-500/25" },
            { name: t('home.technologies.javascript'), color: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-yellow-500/25" },
            { name: t('home.technologies.nodejs'), color: "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/25" },
            { name: t('home.technologies.express'), color: "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/25" },
            { name: t('home.technologies.apis'), color: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-500/25" },
            { name: t('home.technologies.html5'), color: "bg-gradient-to-r from-orange-600 to-red-500 text-white shadow-orange-500/25" },
            { name: t('home.technologies.css3'), color: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/25" },
            { name: t('home.technologies.sql'), color: "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-500/25" },
            { name: t('home.technologies.github'), color: "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-gray-500/25" },
            { name: t('home.technologies.netlify'), color: "bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-teal-500/25" },
            { name: t('home.technologies.trello'), color: "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-blue-500/25" }
          ].map((tech, index) => (
            <div
              key={index}
              className={`px-4 py-3 rounded-lg text-center font-semibold text-sm ${tech.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              {tech.name}
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <OptimizedImage
          src={pfp.image.url}
          alt={pfp.image.alt}
          width={375}
          height={375}
          className="rounded-full shadow-2xl"
          priority
        />
        <p className="px-6 py-3.5 w-[375px] text-lg leading-tight bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg absolute -bottom-32 sm:-bottom-24 left-1/2 -translate-x-1/2 shadow-md text-center">
          <strong className="text-[21px] block mb-0.5">{t('about.education.degree')}</strong>
          <span className="text-[16px] opacity-90 inline-block">{t('about.education.degreeShort')}</span>
        </p>
      </div>
    </main>
  );
};
