import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBusinessSettings, getGeneralSettings, getLinkTreeData } from '@/lib/settings';
import { PageSection } from '@/components/commons/PageSection';
import { ContactForm } from '@/components/commons/ContactForm';
// Removed react-icons import

interface ContatoProps {
  businessSettings: any;
  generalSettings: any;
  linkTreeData: any;
}

const Contato = ({ businessSettings, generalSettings, linkTreeData }: ContatoProps) => {
  const { t } = useLanguage();
  
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      FaLinkedin: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      FaGithub: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      FaEnvelope: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
    };
    return icons[iconName] || icons.FaEnvelope;
  };

  return (
    <>
      <Head>
        <title>Contact | {businessSettings.brandName}</title>
        <meta
          name="description"
          content={`Get in touch with ${businessSettings.brandName} - Web developer available for new projects and opportunities`}
        />
        <meta property="og:title" content={`Contact | ${businessSettings.brandName}`} />
        <meta property="og:description" content={`Get in touch with ${businessSettings.brandName} - Web developer available for new projects and opportunities`} />
      </Head>

      <div className="min-h-screen">
        <PageSection
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
          vPadding="py-20"
        >
          <div className="col-span-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl xs:text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8">
                  {t('contact.connect.title')}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                  {t('contact.connect.description')}
                </p>

                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      {t('contact.connect.contactInfo')}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                      <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{t('contact.location')}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{t('contact.locationText')}</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-6 sm:mt-7 md:mt-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    {t('contact.social.title')}
                  </h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {linkTreeData.linkTree?.filter((link: any) => link.icon !== 'FaEnvelope').map((link: any, index: number) => {
                      const IconComponent = getIcon(link.icon);
                      const isGithub = link.icon === 'FaGithub';
                      return (
                        <a
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group relative p-3 sm:p-4 w-fit text-base sm:text-lg md:text-xl font-semibold text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 ${
                            isGithub 
                              ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:shadow-purple-500/25 border-purple-500 hover:border-purple-400' 
                              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/25 border-blue-500 hover:border-blue-400'
                          }`}
                          aria-label={link.label}
                        >
                          <span className="flex items-center gap-1.5 sm:gap-2">
                            <IconComponent />
                            <span className="hidden xs:inline">{link.label}</span>
                          </span>
                          <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                            isGithub 
                              ? 'bg-gradient-to-r from-purple-400 to-purple-500' 
                              : 'bg-gradient-to-r from-blue-400 to-blue-500'
                          }`}></div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </PageSection>

        <PageSection
          title={t('contact.availability.title')}
          subtitle={t('contact.availability.subtitle')}
          bgColor="bg-gray-50 dark:bg-gray-800"
        >
          <div className="col-span-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">✓</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('contact.availability.available')}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  {t('contact.availability.availableDesc')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">✓</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('contact.availability.quickResponse')}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  {t('contact.availability.quickResponseDesc')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">✓</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('contact.availability.flexible')}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  {t('contact.availability.flexibleDesc')}
                </p>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<ContatoProps> = async () => {
  const businessSettings = getBusinessSettings();
  const generalSettings = getGeneralSettings();
  const linkTreeData = getLinkTreeData();

  return {
    props: {
      businessSettings,
      generalSettings,
      linkTreeData,
    },
  };
};

export default Contato;
