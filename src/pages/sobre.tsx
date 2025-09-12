import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
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
          subtitle=""
          vPadding="py-20"
        >
          <div className="col-span-full">
            <div className="prose prose-lg max-w-none mx-auto">
              {/* Education and Specialization blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

              <div className="flex flex-col lg:flex-row gap-12 items-start">
                <div className="flex-shrink-0 flex flex-col gap-8">
                  <Image
                    src="/img/perfil2.jpeg"
                    alt="Guilherme Cirelli Lopes"
                    width={256}
                    height={256}
                    className="w-64 h-64 rounded-full object-cover shadow-2xl"
                  />
                  <Image
                    src="/img/perfil3.jpeg"
                    alt="Guilherme Cirelli Lopes working"
                    width={256}
                    height={256}
                    className="w-64 h-64 rounded-full object-cover shadow-2xl"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Hello! I&apos;m Guilherme Cirelli Lopes, a Systems Analysis and Development student 💻, 
                    known for being hardworking and honorable in keeping my promises. My goal is to help 
                    entrepreneurs 💡 and professionals like you transform ideas into successful digital 
                    projects 🌟, with scalable, modern and functional solutions.
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      💼 What can I do for your project?
                    </h3>
                    <ul className="text-lg text-gray-700 dark:text-gray-300 space-y-2 mb-6 list-disc list-inside">
                      <li>Development of responsive and modern websites that highlight your products or services.</li>
                      <li>Creation of customized web applications, with integrated Front-End and Back-End.</li>
                      <li>Optimization and deployment on platforms like Netlify and Vercel, ensuring performance and stability.</li>
                      <li>Structuring efficient systems using Node.js, SQL, ReactJS and NextJS.</li>
                      <li>Organized documentation and clear communication, facilitating teamwork and future maintenance.</li>
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      🚀 Why choose to work with me?
                    </h3>
                    <ul className="text-lg text-gray-700 dark:text-gray-300 space-y-2 mb-6 list-disc list-inside">
                      <li><strong>Total commitment:</strong> I deliver what I promise, studying and applying effective solutions.</li>
                      <li><strong>Quick and constant learning:</strong> I&apos;m always updated on the latest technologies 🔍, offering modern and efficient solutions.</li>
                      <li><strong>Results-focused:</strong> Before coding, I analyze and deeply understand the problem, ensuring the solution meets your exact needs 💡.</li>
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      My technical skills:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg text-gray-700 dark:text-gray-300">
                      <div>
                        <h4 className="font-semibold mb-2">Front-End:</h4>
                        <p>ReactJS | NextJS | HTML5 | CSS3 | Tailwind CSS | Bootstrap | JavaScript | TypeScript</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Back-End:</h4>
                        <p>Node.js | SQL | REST APIs | Git | GitHub</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Deploy & Optimization:</h4>
                        <p>Netlify | Vercel</p>
                      </div>
                    </div>
                  </div>

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
