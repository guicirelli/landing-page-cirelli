import Image from 'next/image';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { AboutMe as TAboutMe } from '@/types/Home';



const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
});

interface AboutMeProps {
  aboutMe: TAboutMe;
}

export const Inicio = ({ aboutMe }: AboutMeProps) => {
  const { title, description, contact, pfp, techs } = aboutMe;

  return (
    <main className="flex flex-wrap-reverse justify-center items-center gap-6 md:gap-16 py-2 text-lg text-center xl:text-left xl:flex-nowrap xl:justify-between">
      <div className="text-white flex flex-col items-center xl:items-start gap-4 w-full xl:w-120">
        <h1 className="text-3xl sm:text-7xl xl:leading-[5rem] text-white">
  {title.default} <strong>{title.bold}</strong>
</h1>
        <div className="mb-8">
  <h2 className={`${roboto.className} mb-8`}>
    Web developer passionate about delivering efficient and practical solutions.
  </h2>
 <div className="flex flex-col xl:flex-row xl:items-center xl:gap-8">
   <Link
     href={contact.link}
     target="_blank"
     rel="noopener noreferrer"
     className="group relative p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 w-fit text-xl font-semibold text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 mb-4 xl:mb-0 border-2 border-blue-500 hover:border-blue-400"
   >
     <span className="flex items-center gap-2">
       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
       </svg>
       {contact.label}
     </span>
     <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
   </Link>
   
   <ul className="flex flex-wrap justify-center xl:justify-start gap-3 text-xl">
     {techs.map(({ tech, bgcolor, color }, index) => (
       <li
         key={tech + index}
         style={{ backgroundColor: bgcolor, color: color }}
         className="w-fit p-2 rounded-md"
       >
         {tech}
       </li>
     ))}
   </ul>
 </div>
</div>
      </div>
      <div className="relative">
        <Image
          src={pfp.image.url}
          alt={pfp.image.alt}
          unoptimized
          width={375}
          height={375}
          className="rounded-full"
        />
        <p className="p-3 w-fit text-base leading-tight bg-h-blue-500 rounded-xl text-black absolute -bottom-[0.75rem] sm:bottom-3">
          <strong className="text-2xl">Undergraduate in Systems Analysis and Development</strong>
          <br />
        
           Systems Analysis and Development
        </p>
      </div>
    </main>
  );
};
