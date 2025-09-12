import { Inicio } from '@/components/Home/Inicio';
import { Project, AboutMe as TAboutMe } from '@/types/Home';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link'; // Importar Link
import { getSortedPostsData, PostData } from '@/lib/posts'; // Importar funções de posts
import { useUser } from "@clerk/nextjs"; // Importar useUser
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
  const { isSignedIn } = useUser(); // Usar o hook useUser

  return (
    <>
      <Head>
        <title>{businessSettings.brandName} | Portfolio</title>
        <meta
          name="description"
          content={businessSettings.brandDescription}
        />
        <meta name="keywords" content={businessSettings.brandKeywords.join(', ')} />
        <meta property="og:title" content={`${businessSettings.brandName} | Portfolio`} />
        <meta property="og:description" content={businessSettings.brandDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={generalSettings.siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${businessSettings.brandName} | Portfolio`} />
        <meta name="twitter:description" content={businessSettings.brandDescription} />
      </Head>
      <div className="pt-0 pb-2 px-6 md:px-32 space-y-6 md:space-y-12">
        <Inicio aboutMe={aboutMe} />

        {/* Posts Section */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg py-12 px-6 md:px-20 my-16 max-w-6xl mx-auto border border-gray-200 dark:border-gray-700">
          <h2 className="text-5xl font-bold mb-8 text-center text-gray-900 dark:text-white">Posts</h2>
          <ul className="space-y-6">
            {allPostsData.map(({ slug, title, date, public: isPublic }) => (
              <li key={slug} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300">
                {!isPublic && !isSignedIn ? (
                  <div className="text-red-500 dark:text-red-400">
                    <h3 className="text-3xl font-semibold">{title} (Private)</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Please log in to view this post.</p>
                  </div>
                ) : (
                  <Link href={`/posts/${slug}`} className="block">
                    <h3 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">{title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{isPublic ? "(Public)" : "(Private - login required)"}</p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
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
      generalSettings
    },
  };
};

export default Home;
