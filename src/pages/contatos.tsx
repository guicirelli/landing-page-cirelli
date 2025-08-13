import { CopyButton } from '@/components/commons/CopyButton';
import Head from 'next/head';

interface ContatosProps {
  contacts: {
    name: string;
    link: string;
    isMail?: boolean;
  }[];
}

const Contatos = ({ contacts }: ContatosProps) => {
  console.log(contacts);

  return (
    <>
      <Head>
        <title>Contacts | Guilherme</title>
      </Head>
      <div className=" px-6 md:px-32 bg-h-blue-900 rounded-lg shadow-lg py-10">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-10">Contacts</h1>
        <ul className="flex flex-col items-center mx-auto max-w-md space-y-4">
          {contacts.map(({ link, name, isMail }, idx) => (
            <li key={name + idx} className="flex items-center gap-3 text-lg md:text-xl">
  <span>{isMail ? "📧" : "🔗"}</span>
  <a
    href={isMail ? `mailto:${link}` : link}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-h-blue-400 transition-colors font-semibold underline"
  >
    {name}
  </a>
  {isMail && <CopyButton textToCopy={link} />}
</li>
          ))}
        </ul>
      </div>
    </>
  );
};

const loadContacts = async () => {
  return [
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/guicirelli/",
    },
    {
      name: "GitHub",
      link: "https://github.com/guicirelli",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/guicirelli/",
    },
    {
      name: "Email",
      link: "guilopes.030206@gmail.com",
      isMail: true,
    },
    
  ];
};

export const getServerSideProps = async () => {
  const contacts = await loadContacts();

  return {
    props: {
      contacts,
    },
  };
};

export default Contatos;
