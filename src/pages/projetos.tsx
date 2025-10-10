import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBusinessSettings, getGeneralSettings } from '@/lib/settings';
import { PageSection } from '@/components/commons/PageSection';

interface ProjetosProps {
  businessSettings: any;
  generalSettings: any;
}

const Projetos = ({ businessSettings, generalSettings }: ProjetosProps) => {
  const { t } = useLanguage();
  const projetos = [
    // Top 3
    {
      id: 1,
      title: "Projeto 1",
      image: "/img/projetos/placeholder.svg",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      featured: true
    },
    {
      id: 2,
      title: "Projeto 2",
      image: "/img/projetos/projeto-2.jpg",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["React", "Node.js", "Express", "MongoDB"],
      featured: true
    },
    {
      id: 3,
      title: "Projeto 3",
      image: "/img/projetos/projeto-3.jpg",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["Next.js", "PostgreSQL", "Prisma", "API REST"],
      featured: true
    },
    // Projetos 4-10
    {
      id: 4,
      title: "Projeto 4",
      image: "/img/projetos/projeto-4.jpg",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["Node.js", "Express", "JWT", "Swagger"],
      featured: false
    },
    {
      id: 5,
      title: "Projeto 5",
      image: "/img/projetos/projeto-5.jpg",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["React", "CSS3", "JavaScript", "HTML5"],
      featured: false
    },
    {
      id: 6,
      title: "Projeto 6",
      image: "/img/projetos/projeto-6.jpg",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["Next.js", "API REST", "Tailwind", "TypeScript"],
      featured: false
    },
    {
      id: 7,
      title: "Projeto 7",
      image: "/img/projetos/projeto-7.jpg",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["React", "Firebase", "Material UI", "JavaScript"],
      featured: false
    },
    {
      id: 8,
      title: "Projeto 8",
      image: "/img/projetos/projeto-8.jpg",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["Node.js", "SQL", "Express", "Bootstrap"],
      featured: false
    },
    {
      id: 9,
      title: "Projeto 9",
      image: "/img/projetos/projeto-9.jpg",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["React", "GraphQL", "Apollo", "Styled Components"],
      featured: false
    },
    {
      id: 10,
      title: "Projeto 10",
      image: "/img/projetos/placeholder.svg",
      link: "#",
      funcionalidades: [
        "Funcionalidade 1",
        "Funcionalidade 2",
        "Funcionalidade 3",
        "Funcionalidade 4"
      ],
      tecnologias: ["Next.js", "Vercel", "Netlify", "Git"],
      featured: false
    }
  ];

  return (
    <>
      <Head>
        <title>Projects | {businessSettings.brandName}</title>
        <meta
          name="description"
          content={`Check out projects developed by ${businessSettings.brandName} - Web developer specialized in modern solutions`}
        />
        <meta property="og:title" content={`Projects | ${businessSettings.brandName}`} />
        <meta property="og:description" content={`Check out projects developed by ${businessSettings.brandName} - Web developer specialized in modern solutions`} />
      </Head>

      <div className="min-h-screen">
        <PageSection
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
          vPadding="py-20"
        >
          <div className="col-span-full max-w-4xl mx-auto space-y-12">
            {projetos.map((projeto) => (
              <div
                key={projeto.id}
                id={`projeto-${projeto.id}`}
                className="scroll-mt-24"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* Lado Esquerdo - Título e Informações */}
                  <div>
                    {/* Título do Projeto */}
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                      {t('projects.projectNumber')} {projeto.id}
                    </h2>

                    <div className="space-y-6">
                      {/* Funcionalidades */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {t('projects.features')}
                        </h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          {projeto.funcionalidades.map((func, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-600 dark:text-blue-400">•</span>
                              {func}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tecnologias */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {t('projects.technologies')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {projeto.tecnologias.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lado Direito - Link e Imagem */}
                  <div>
                    {/* Link do Projeto */}
                    <div className="mb-4">
                      <a
                        href={projeto.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                      >
                        {t('projects.accessProject')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>

                    {/* Imagem do Projeto */}
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src={projeto.image}
                        alt={projeto.title}
                        width={400}
                        height={200}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Divisor */}
                {projeto.id < 10 && (
                  <hr className="mt-12 border-gray-200 dark:border-gray-700" />
                )}
              </div>
            ))}
          </div>
        </PageSection>


        <PageSection
          title={t('projects.interested.title')}
          subtitle={t('projects.interested.subtitle')}
          ctaBtnText={t('projects.interested.getInTouch')}
          ctaBtnLink="/contato"
        >
          <div className="col-span-full text-center">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  {t('projects.interested.description')}
                </p>
          </div>
        </PageSection>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<ProjetosProps> = async () => {
  const businessSettings = getBusinessSettings();
  const generalSettings = getGeneralSettings();

  return {
    props: {
      businessSettings,
      generalSettings,
    },
  };
};

export default Projetos;
