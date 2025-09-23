import { Inicio } from '@/components/Home/Inicio';
import { Project, AboutMe as TAboutMe } from '@/types/Home';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link'; // Importar Link
import { getSortedPostsData, PostData } from '@/lib/posts'; // Importar funções de posts
import { useUser } from "@clerk/nextjs"; // Importar useUser
import { useLanguage } from '@/contexts/LanguageContext';
import { getBusinessSettings, getGeneralSettings } from '@/lib/settings';

import homeData from '../../public/home.json';

interface HomeProps {
  home: {
    aboutMe: TAboutMe;
  };
  allPostsData: Array<{
    slug: string;
    title: string;
    date: string;
    author: string;
    public: boolean;
  }>;
  businessSettings: any;
  generalSettings: any;
}

const Home = ({ home, allPostsData, businessSettings, generalSettings }: HomeProps) => {
  const { aboutMe } = home || { aboutMe: {} as TAboutMe };
  const { t } = useLanguage();
  const { isSignedIn } = useUser(); // Usar o hook useUser

  return (
    <>
      <Head>
        {/* SEO básico */}
        <title>Guilherme Cirelli — Desenvolvedor Full Stack | Next.js, React, Node.js</title>
        <meta
          name="description"
          content="Desenvolvedor Full Stack especializado em Next.js, React e Node.js. Criação de aplicações web modernas, responsivas e escaláveis. Veja meu portfolio e entre em contato."
        />
        <meta name="keywords" content="desenvolvedor full stack, next.js, react, node.js, typescript, desenvolvimento web" />
        <link rel="canonical" href={generalSettings.siteUrl} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Guilherme Cirelli — Desenvolvedor Full Stack" />
        <meta property="og:description" content="Desenvolvimento de aplicações web modernas com Next.js, React e Node.js. Veja meu portfolio de projetos." />
        <meta property="og:url" content={generalSettings.siteUrl} />
        <meta property="og:image" content={`${generalSettings.siteUrl}/img/og-image.jpg`} />
        <meta property="og:image:alt" content="Portfolio Guilherme Cirelli - Desenvolvedor Full Stack" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:title" content="Guilherme Cirelli — Desenvolvedor Full Stack" />
        <meta name="twitter:description" content="Desenvolvimento de aplicações web modernas com Next.js, React e Node.js. Veja meu portfolio de projetos." />
        <meta name="twitter:image" content={`${generalSettings.siteUrl}/img/twitter-image.jpg`} />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "name": "Guilherme Cirelli",
                  "jobTitle": "Desenvolvedor Full Stack",
                  "url": generalSettings.siteUrl,
                  "image": `${generalSettings.siteUrl}/img/perfil.jpeg`,
                  "sameAs": [
                    "https://github.com/seu-github",
                    "https://linkedin.com/in/seu-linkedin"
                  ],
                  "knowsAbout": [
                    "Next.js",
                    "React",
                    "Node.js",
                    "TypeScript",
                    "Desenvolvimento Web Full Stack"
                  ]
                },
                {
                  "@type": "WebSite",
                  "name": "Portfolio Guilherme Cirelli",
                  "url": generalSettings.siteUrl,
                  "description": "Portfolio profissional de Guilherme Cirelli, desenvolvedor Full Stack especializado em Next.js, React e Node.js",
                  "inLanguage": "pt-BR"
                }
              ]
            })
          }}
        />
      </Head>
      <div className="pt-0 pb-2 px-6 md:px-32 space-y-6 md:space-y-12">
        <Inicio aboutMe={aboutMe} />

        {/* Posts Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg py-12 px-6 md:px-20 my-16 max-w-6xl mx-auto border border-gray-200 dark:border-gray-700">
          <h2 className="text-5xl font-bold mb-8 text-center text-gray-900 dark:text-white">{t('home.posts.title')}</h2>
          <ul className="space-y-6">
            {allPostsData.map(({ slug, title, date, public: isPublic }) => (
              <li key={slug} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                {!isPublic && !isSignedIn ? (
                  <div className="text-red-500 dark:text-red-400">
                    <h3 className="text-3xl font-semibold">{title} ({t('home.project.private')})</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{t('home.project.loginRequired')}</p>
                  </div>
                ) : (
                  <Link href={`/posts/${slug}`} className="block">
                    <h3 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">{title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{isPublic ? `(${t('home.project.public')})` : t('home.project.loginRequiredLabel')}</p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          {/* CTA Section */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t('projects.interested.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              {t('projects.interested.description')}
            </p>
            <Link
              href="/contato"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('cta.startProject')}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

const loadHome = async () => {
  return homeData;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const home = await loadHome();
  const allPostsData = getSortedPostsData(); // Buscar dados dos posts
  const businessSettings = getBusinessSettings();
  const generalSettings = getGeneralSettings();

  return {
    props: { 
      home,
      allPostsData,
      businessSettings,
      generalSettings,
    },
  };
};

export default Home;
