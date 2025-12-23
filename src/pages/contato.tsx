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
      FaUpwork: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.491-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  {t('contact.connect.title')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {t('contact.connect.description')}
                </p>

                <div className="space-y-6">
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
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {t('contact.social.title')}
                  </h3>
                  <div className="flex gap-4">
                    {linkTreeData.linkTree?.map((link: any, index: number) => {
                      const IconComponent = getIcon(link.icon);
                      return (
                        <a
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative p-4 w-fit text-xl font-semibold text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-green-500/25 border-green-500 hover:border-green-400"
                          aria-label={link.label}
                        >
                          <span className="flex items-center gap-2">
                            <IconComponent />
                            {link.label}
                          </span>
                          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-green-400 to-green-500"></div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('contact.availability.available')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('contact.availability.availableDesc')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('contact.availability.quickResponse')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('contact.availability.quickResponseDesc')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('contact.availability.flexible')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
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
