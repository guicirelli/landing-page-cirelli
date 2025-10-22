import { Inicio } from '@/components/Home/Inicio';
import { AboutSection } from '@/components/Home/AboutSection';
import { ServicesSection } from '@/components/Home/ServicesSection';
import { FeaturedProjects } from '@/components/Home/FeaturedProjects';
import { TechStack } from '@/components/Home/TechStack';
import { TimelineSection } from '@/components/Home/TimelineSection';
import { CTASection } from '@/components/Home/CTASection';
import { Project, AboutMe as TAboutMe } from '@/types/Home';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getSortedPostsData, PostData } from '@/lib/posts';
import { useUser } from "@clerk/nextjs";
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
      <div className="w-full">
        {/* Hero Section */}
        <Inicio />

        {/* Services Section */}
        <ServicesSection />

        {/* About Section */}
        <AboutSection />

        {/* Featured Projects */}
        <FeaturedProjects />

        {/* Tech Stack */}
        <TechStack />

        {/* Timeline Section */}
        <TimelineSection />

        {/* CTA Final */}
        <CTASection />
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
