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
        <title>Portfólio | Guilherme Cirelli Lopes</title>
        <meta
          name="description"
          content="Portfólio de Guilherme Cirelli Lopes — Desenvolvedor web apaixonado por criar interfaces e soluções eficientes."
        />
      </Head>
      <div className="py-12 px-6 md:px-32 space-y-10 md:space-y-28">
        <AboutMe aboutMe={aboutMe} />
        <Projects projects={projects} />
        <section className="bg-black rounded-lg shadow-lg py-12 px-6 md:px-20 my-16 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 text-white">
 {/* Imagens à esquerda - empilhadas */}
<div className="w-full md:w-1/2 flex flex-col items-center gap-20">
  <img
    src="/img/perfil2.jpeg"
    alt="Foto de Guilherme Cirelli Lopes"
    className="rounded-full w-72 h-72 object-cover shadow-lg"
  />
  <img
    src="/img/perfil3.jpeg"
    alt="Foto de Guilherme Cirelli Lopes"
    className="rounded-full w-72 h-72 object-cover shadow-lg"
  />
</div>

  {/* Texto à direita */}
  <div className="w-full md:w-1/2 flex flex-col gap-6 text-left">
    <h2 className="text-5xl font-bold">About me</h2>
    <p className="text-lg leading-relaxed">
      My name is Guilherme Cirelli Lopes, an undergraduate student in Systems Analysis and Development at Unicesumar, passionate about web development. Known for dedication and integrity, I always strive to fulfill my commitments with excellence.
    </p>
    <p className="text-lg leading-relaxed">
      Combining study, hands-on practice, and mentorship, I quickly absorb new knowledge and deliver effective solutions. Understanding problems deeply before building solutions is something I highly value, along with clear communication and organized documentation to enhance teamwork.
    </p>
    <p className="text-lg leading-relaxed">
      Although still in the early stages of my career, I have developed solid skills in Next.js, JavaScript, and related technologies. Discipline, resilience, and continuous learning guide my growth. My goal is to keep evolving, leveraging my passion for software development to overcome challenges and create a positive impact in every project I undertake.
    </p>
  </div>
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
  return {
    props: { home },
  };
};

export default Home;
