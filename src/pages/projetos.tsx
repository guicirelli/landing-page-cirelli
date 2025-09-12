import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { getBusinessSettings, getGeneralSettings } from '@/lib/settings';
import { PageSection } from '@/components/commons/PageSection';

interface ProjetosProps {
  businessSettings: any;
  generalSettings: any;
}

const Projetos = ({ businessSettings, generalSettings }: ProjetosProps) => {
  const projetos = [
    {
      id: 1,
      title: "Personal Portfolio",
      description: "This very portfolio you're seeing! Built with Next.js, TypeScript and Tailwind CSS, featuring light/dark theme system and SEO optimizations.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      image: "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Portfolio",
      github: "https://github.com/guicirelli/portfolio",
      demo: "#",
      featured: true
    },
    {
      id: 2,
      title: "Management System",
      description: "Complete business management system with dashboard, reports and inventory control. Modern and responsive interface.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      image: "https://via.placeholder.com/400x300/10b981/ffffff?text=Management",
      github: "https://github.com/guicirelli/sistema-gestao",
      demo: "#",
      featured: true
    },
    {
      id: 3,
      title: "E-commerce Platform",
      description: "Complete e-commerce platform with shopping cart, payments and admin panel.",
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
      image: "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=E-commerce",
      github: "https://github.com/guicirelli/ecommerce",
      demo: "#",
      featured: false
    },
    {
      id: 4,
      title: "RESTful API",
      description: "Robust RESTful API for user and product management, with JWT authentication and Swagger documentation.",
      technologies: ["Node.js", "Express", "JWT", "Swagger"],
      image: "https://via.placeholder.com/400x300/f59e0b/ffffff?text=API",
      github: "https://github.com/guicirelli/api-restful",
      demo: "#",
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
          title="My Projects"
          subtitle="Some of the projects I've developed to showcase my skills and passion for programming"
          vPadding="py-20"
        >
          <div className="col-span-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projetos.map((projeto) => (
                <div
                  key={projeto.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 ${
                    projeto.featured ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={projeto.image}
                      alt={projeto.title}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover"
                    />
                    {projeto.featured && (
                      <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {projeto.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {projeto.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projeto.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={projeto.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-900 dark:bg-gray-700 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        View Code
                      </a>
                      <a
                        href={projeto.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        View Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageSection>


        <PageSection
          title="Interested in Working Together?"
          subtitle="Let's create something amazing together!"
          ctaBtnText="Get in Touch"
          ctaBtnLink="/contato"
        >
          <div className="col-span-full text-center">
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  I&apos;m always open to new opportunities and challenging projects. 
                  If you have an idea or need a developer for your team, 
                  don&apos;t hesitate to get in touch!
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
