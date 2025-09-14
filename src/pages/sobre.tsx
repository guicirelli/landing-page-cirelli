import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBusinessSettings, getGeneralSettings } from '@/lib/settings';
import { PageSection } from '@/components/commons/PageSection';

interface SobreProps {
  businessSettings: any;
  generalSettings: any;
}

const Sobre = ({ businessSettings, generalSettings }: SobreProps) => {
  const { t } = useLanguage();
  
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
          title={t('about.title')}
          subtitle=""
          vPadding="py-20"
        >
          <div className="col-span-full">
            <div className="prose prose-lg max-w-none mx-auto">
              {/* Education and Specialization blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                    {t('about.education.title')}
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200">
                    {t('about.education.degree')}
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
                    {t('about.specialization.title')}
                  </h3>
                  <p className="text-green-800 dark:text-green-200">
                    {t('about.specialization.area')}
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
                    {t('about.introduction')}
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('about.services.title')}
                    </h3>
                    <ul className="text-lg text-gray-700 dark:text-gray-300 space-y-2 mb-6 list-disc list-inside">
                      {t('about.services.items').map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('about.whyChoose.title')}
                    </h3>
                    <ul className="text-lg text-gray-700 dark:text-gray-300 space-y-2 mb-6 list-disc list-inside">
                      {t('about.whyChoose.items').map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('about.skills.title')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg text-gray-700 dark:text-gray-300">
                      <div>
                        <h4 className="font-semibold mb-2">{t('about.skills.frontend')}</h4>
                        <p>{t('about.skills.frontendTechs')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t('about.skills.backend')}</h4>
                        <p>{t('about.skills.backendTechs')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t('about.skills.deploy')}</h4>
                        <p>{t('about.skills.deployTechs')}</p>
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
