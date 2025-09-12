import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getBusinessSettings, getGeneralSettings } from '@/lib/settings';
import { PageSection } from '@/components/commons/PageSection';

interface SobreProps {
  businessSettings: any;
  generalSettings: any;
}

const Sobre = ({ businessSettings, generalSettings }: SobreProps) => {
  return (
    <>
      <Head>
        <title>About | {businessSettings.brandName}</title>
        <meta
          name="description"
          content={`Learn more about ${businessSettings.brandName} - ${businessSettings.brandDescription}`}
        />
        <meta property="og:title" content={`About | ${businessSettings.brandName}`} />
        <meta property="og:description" content={`Learn more about ${businessSettings.brandName} - ${businessSettings.brandDescription}`} />
      </Head>

      <div className="min-h-screen">
        <PageSection
          title="About Me"
          subtitle="Learn about my journey as a developer and my passion for technology"
          vPadding="py-20"
        >
          <div className="col-span-full">
            <div className="prose prose-lg max-w-none mx-auto">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-shrink-0">
                  <img
                    src="/img/perfil2.jpeg"
                    alt="Guilherme Cirelli Lopes"
                    className="w-64 h-64 rounded-full object-cover shadow-2xl"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Hello! I&apos;m {businessSettings.brandName}
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    I&apos;m a web developer passionate about creating digital solutions that make a difference. 
                    I&apos;m currently studying Systems Analysis and Development and always seeking to 
                    learn new technologies and methodologies.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    My passion for programming began when I discovered how to transform ideas into 
                    functional code. Since then, I&apos;ve been dedicated to developing projects that 
                    combine functionality, usability, and modern design.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        Education
                      </h3>
                      <p className="text-blue-800 dark:text-blue-200">
                        Undergraduate in Systems Analysis and Development
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
                        Specialization
                      </h3>
                      <p className="text-green-800 dark:text-green-200">
                        Full-Stack Web Development
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageSection>

        <PageSection
          title="My Skills"
          subtitle="Technologies and tools I use in my daily work"
          bgColor="bg-gray-50 dark:bg-gray-800"
        >
          <div className="col-span-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "JavaScript", level: "Advanced", color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200" },
                { name: "TypeScript", level: "Advanced", color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200" },
                { name: "React", level: "Advanced", color: "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-800 dark:text-cyan-200" },
                { name: "Next.js", level: "Advanced", color: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200" },
                { name: "Node.js", level: "Intermediate", color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200" },
                { name: "Express", level: "Intermediate", color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200" },
                { name: "Tailwind CSS", level: "Advanced", color: "bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-200" },
                { name: "CSS3", level: "Advanced", color: "bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-200" },
                { name: "HTML5", level: "Advanced", color: "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200" },
                { name: "Git", level: "Advanced", color: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200" },
                { name: "GitHub", level: "Advanced", color: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200" },
                { name: "MongoDB", level: "Intermediate", color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200" },
                { name: "PostgreSQL", level: "Intermediate", color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200" },
                { name: "Prisma", level: "Intermediate", color: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200" },
                { name: "JWT", level: "Intermediate", color: "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200" },
                { name: "REST APIs", level: "Advanced", color: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200" },
                { name: "GraphQL", level: "Basic", color: "bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-200" },
                { name: "Docker", level: "Basic", color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200" },
                { name: "AWS", level: "Basic", color: "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200" },
                { name: "Vercel", level: "Intermediate", color: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200" },
                { name: "Netlify", level: "Intermediate", color: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200" },
                { name: "Figma", level: "Intermediate", color: "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200" },
                { name: "VS Code", level: "Advanced", color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200" },
                { name: "ESLint", level: "Intermediate", color: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200" },
                { name: "Prettier", level: "Intermediate", color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200" },
              ].map((skill, index) => (
                <div key={index} className={`p-4 rounded-lg text-center ${skill.color}`}>
                  <h3 className="font-semibold text-lg mb-2">{skill.name}</h3>
                  <p className="text-sm opacity-75">{skill.level}</p>
                </div>
              ))}
            </div>
          </div>
        </PageSection>

        <PageSection
          title="Ready to Work Together?"
          subtitle="Let's create something amazing"
          ctaBtnText="View My Projects"
          ctaBtnLink="/projetos"
        >
          <div className="col-span-full">
            <div className="prose prose-lg max-w-none mx-auto text-center">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Let&apos;s Build Something Great
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  I&apos;m always excited to work on new projects and collaborate with amazing people. 
                  Whether you need a full-stack application, a modern website, or technical consulting, 
                  I&apos;m here to help bring your ideas to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contato"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Get in Touch
                  </Link>
                  <a
                    href="https://github.com/guicirelli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    View GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<SobreProps> = async () => {
  const businessSettings = getBusinessSettings();
  const generalSettings = getGeneralSettings();

  return {
    props: {
      businessSettings,
      generalSettings,
    },
  };
};

export default Sobre;
