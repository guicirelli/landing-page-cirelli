import { AboutMe } from '@/components/Home/AboutMe';
import { Projects } from '@/components/Home/Projects';
import { Project, AboutMe as TAboutMe } from '@/types/Home';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import homeData from '../../public/home.json';

interface HomeProps {
  home: {
    aboutMe: TAboutMe;
    projects: Project[];
  };
}

const Home = ({ home }: HomeProps) => {
  const { projects, aboutMe } = home || { projects: [], aboutMe: {} as TAboutMe };

  return (
    <>
      <Head>
        <title>About me | Guilherme Cirelli Lopes</title>
        <meta
          name="description"
          content="Portfólio de Guilherme Cirelli Lopes — Desenvolvedor web apaixonado por criar interfaces e soluções eficientes."
        />
      </Head>
      <div className="py-12 px-6 md:px-32 space-y-10 md:space-y-28">
        <AboutMe aboutMe={aboutMe} />
        <Projects projects={projects} />
      </div>
    </>
  );
};

const loadHome = async () => {
  return homeData;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const home = await loadHome();
  return {
    props: { home },
  };
};

export default Home;
