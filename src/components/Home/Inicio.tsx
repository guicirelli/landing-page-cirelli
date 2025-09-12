import Image from 'next/image';
import Link from 'next/link';
import { AboutMe as TAboutMe } from '@/types/Home';

interface AboutMeProps {
  aboutMe: TAboutMe;
}

export const Inicio = ({ aboutMe }: AboutMeProps) => {
  const { title, description, contact, pfp, techs } = aboutMe;

  return (
    <main className="flex flex-wrap-reverse justify-center items-center gap-6 md:gap-16 py-2 text-lg text-center xl:text-left xl:flex-nowrap xl:justify-between">
      <div className="text-gray-900 dark:text-white flex flex-col items-center xl:items-start gap-4 w-full xl:w-120">
        <h1 className="text-3xl sm:text-7xl xl:leading-[5rem] text-gray-900 dark:text-white">
          {title.default} <strong className="text-blue-600 dark:text-blue-400">{title.bold}</strong>
        </h1>
        <div className="mb-8">
          <h2 className="mb-8 text-gray-700 dark:text-gray-300 text-xl">
            Web developer passionate about creating efficient and practical solutions.
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full max-w-5xl">
          {[
            { name: "Next.js", color: "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-gray-500/25" },
            { name: "React", color: "bg-gradient-to-r from-cyan-400 to-cyan-500 text-black shadow-cyan-500/25" },
            { name: "JavaScript", color: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-yellow-500/25" },
            { name: "Node.js", color: "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/25" },
            { name: "Express", color: "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/25" },
            { name: "APIs REST", color: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-500/25" },
            { name: "HTML5", color: "bg-gradient-to-r from-orange-600 to-red-500 text-white shadow-orange-500/25" },
            { name: "CSS3", color: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/25" },
            { name: "SQL", color: "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-500/25" },
            { name: "GitHub", color: "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-gray-500/25" },
            { name: "Netlify", color: "bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-teal-500/25" },
            { name: "Trello", color: "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-blue-500/25" }
          ].map((tech, index) => (
            <div
              key={index}
              className={`px-4 py-3 rounded-lg text-center font-semibold text-sm ${tech.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              {tech.name}
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <Image
          src={pfp.image.url}
          alt={pfp.image.alt}
          width={375}
          height={375}
          className="rounded-full shadow-2xl"
        />
        <p className="p-3 w-fit text-base leading-tight bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-xl absolute -bottom-[0.75rem] sm:bottom-3 shadow-lg">
          <strong className="text-2xl">Undergraduate in Systems Analysis and Development</strong>
          <br />
          Systems Analysis and Development
        </p>
      </div>
    </main>
  );
};
