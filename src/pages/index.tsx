import { AboutMe } from '@/components/Home/AboutMe';
import { Project, AboutMe as TAboutMe } from '@/types/Home';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link'; // Importar Link
import { getSortedPostsData, PostData } from '@/lib/posts'; // Importar funções de posts
import { useUser } from "@clerk/nextjs"; // Importar useUser

import homeData from '../../public/home.json';

interface HomeProps {
  home: {
    aboutMe: TAboutMe;
  };
  allPostsData: PostData[]; // Adicionar posts ao HomeProps
}

const Home = ({ home, allPostsData }: HomeProps) => {
  const { aboutMe } = home || { aboutMe: {} as TAboutMe };
  const { isSignedIn } = useUser(); // Usar o hook useUser

  return (
    <>
      <Head>
        <title>Portfólio | Guilherme Cirelli Lopes</title>
        <meta
          name="description"
          content="Portfólio de Guilherme Cirelli Lopes — Desenvolvedor web apaixonado por criar interfaces e soluções eficientes."
        />
      </Head>
      <div className="py-6 px-6 md:px-32 space-y-10 md:space-y-28">
        <AboutMe aboutMe={aboutMe} />

        {/* Seção de Posts */}
        <section className="bg-gray-800 rounded-lg shadow-lg py-12 px-6 md:px-20 my-16 max-w-6xl mx-auto text-white">
          <h2 className="text-5xl font-bold mb-8 text-center">Posts</h2>
          <ul className="space-y-6">
            {allPostsData.map(({ slug, title, date, public: isPublic }) => (
              <li key={slug} className="bg-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300">
                {!isPublic && !isSignedIn ? (
                  <div className="text-red-400">
                    <h3 className="text-3xl font-semibold">{title} (Privado)</h3>
                    <p className="text-gray-400 text-sm mt-2">Authenticate to view this post.</p>
                  </div>
                ) : (
                  <Link href={`/posts/${slug}`} className="block">
                    <h3 className="text-3xl font-semibold text-blue-300 hover:text-blue-200">{title}</h3>
                    <p className="text-gray-400 text-sm mt-2">{isPublic ? "(Public)" : "(Private - login required)"}</p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="mt-16 py-6 text-center text-white bg-h-blue-800">
        © 2025 All Rights Reserved
      </footer>
    </>
  );
};

const loadHome = async () => {
  return homeData;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const home = await loadHome();
  const allPostsData = getSortedPostsData(); // Buscar dados dos posts

  return {
    props: { 
      home,
      allPostsData 
    },
  };
};

export default Home;
