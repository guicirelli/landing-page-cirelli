import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBusinessSettings, getGeneralSettings } from '@/lib/settings';
import { useUser } from '@clerk/nextjs';

interface ProjetosProps {
  businessSettings: any;
  generalSettings: any;
}

interface Projeto {
  id: number;
  title: string;
  videoUrl: string;
  link: string;
  funcionalidades: string[];
  tecnologias: string[];
  featured: boolean;
  thumbnail?: string;
}

const Projetos = ({ businessSettings, generalSettings }: ProjetosProps) => {
  const { t } = useLanguage();
  const { isSignedIn, user, isLoaded } = useUser();
  
  const projetos: Projeto[] = [
    {
      id: 1,
      title: "Flowly",
      videoUrl: "https://www.loom.com/embed/0fbc80129201406ba932793bd91ce3d9?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
      link: "https://painelprodutivo.netlify.app",
      funcionalidades: [
        "Organização inteligente de tarefas",
        "Priorização automática com IA",
        "Dashboard de produtividade",
        "Relatórios e métricas em tempo real"
      ],
      tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      featured: true,
      thumbnail: "/img/foto flowly.jpg"
    },
    {
      id: 2,
      title: "Controle Financeiro Cirelli",
      videoUrl: "https://www.loom.com/embed/278249263aa340a8be79175a57394a84?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
      link: "https://financeguicirelli.netlify.app",
      funcionalidades: [
        "Login seguro com Clerk",
        "Dashboard financeiro completo",
        "Controle de receitas e despesas",
        "Gráficos intuitivos e análise visual",
        "Relatórios detalhados por categoria",
        "Interface moderna e fácil de usar"
      ],
      tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Clerk (Autenticação)"],
      featured: true,
      thumbnail: "/img/foto finance.jpg"
    },
    {
      id: 3,
      title: "AstroTech Solar",
      videoUrl: "https://www.loom.com/embed/83fc245bc8f54a09ad077c21cf1a0cc1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
      link: "https://astrotechsolar.netlify.app",
      funcionalidades: [
        "Site institucional completo para empresa de energia solar",
        "Calculadora fotovoltaica interativa",
        "Sessões de serviços, portfólio e depoimentos",
        "Navegação suave e layout totalmente responsivo"
      ],
      tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      featured: true,
      thumbnail: "/img/foto astrotech.jpg"
    },
    {
      id: 4,
      title: "Percirelli Store",
      videoUrl: "https://www.loom.com/embed/a0411ff38e1b414a8f6407def6f63fb6?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
      link: "https://percirelli.netlify.app",
      funcionalidades: [
        "Catálogo dinâmico de produtos",
        "Página de venda com destaque por categorias",
        "Layout responsivo e moderno",
        "Navegação rápida e otimizada"
      ],
      tecnologias: ["Next.js", "TypeScript", "Tailwind CSS", "Netlify (Deploy)"],
      featured: true,
      thumbnail: "/img/foto percirelli.jpg"
    }
  ];

  const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto>(projetos[0]);
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const painelCentralRef = useRef<HTMLDivElement>(null);
  const [mostrarNotificacao, setMostrarNotificacao] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState<Record<number, boolean>>({});
  
  // Refs para controlar timers e prevenir spam
  const timerNotificacaoRef = useRef<NodeJS.Timeout | null>(null);
  const ultimoClickRef = useRef<number>(0);
  const throttleDelayLogin = 2000; // 2 segundos para login

  // Carregar curtidas do localStorage ao montar
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoaded && isSignedIn) {
      const savedLikes = localStorage.getItem('projectLikes');
      if (savedLikes) {
        try {
          setLikes(JSON.parse(savedLikes));
        } catch (e) {
          console.error('Erro ao carregar curtidas:', e);
        }
      }
    }
  }, [isSignedIn, isLoaded]);

  // Limpar curtidas quando deslogar
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setLikes({});
    }
  }, [isSignedIn, isLoaded]);

  // Limpar timer ao desmontar componente
  useEffect(() => {
    return () => {
      if (timerNotificacaoRef.current) {
        clearTimeout(timerNotificacaoRef.current);
      }
    };
  }, []);

  // Função auxiliar para mostrar notificação de login
  const mostrarNotificacaoLogin = (duracao: number) => {
    // Cancela notificação anterior se existir
    if (timerNotificacaoRef.current) {
      clearTimeout(timerNotificacaoRef.current);
    }
    
    // Esconde notificação anterior imediatamente
    setMostrarNotificacao(false);
    
    // Pequeno delay para garantir que a animação reinicie
    setTimeout(() => {
      setMostrarNotificacao(true);
      
      // Agenda esconder notificação
      timerNotificacaoRef.current = setTimeout(() => {
        setMostrarNotificacao(false);
        timerNotificacaoRef.current = null;
      }, duracao);
    }, 50);
  };

  // Função para curtir/descurtir (otimizada contra spam)
  const toggleLike = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const agora = Date.now();
    
    // === CASO 1: Usuário NÃO autenticado ===
    if (!isSignedIn) {
      // Throttle: Só mostra notificação se passou tempo suficiente
      if (agora - ultimoClickRef.current < throttleDelayLogin) {
        // Muito rápido, ignora o click completamente
        return;
      }
      
      ultimoClickRef.current = agora;
      mostrarNotificacaoLogin(4000);
      return;
    }
    
    // === CASO 2: Usuário AUTENTICADO ===
    // Salva a curtida sem mostrar notificação
    const newLikes = { ...likes };
    newLikes[projectId] = !newLikes[projectId];
    setLikes(newLikes);
    localStorage.setItem('projectLikes', JSON.stringify(newLikes));
  };

  // Verificar se projeto está curtido
  const isLiked = (projectId: number) => {
    return likes[projectId] || false;
  };

  // Função para selecionar projeto e rolar até o painel
  const selecionarProjeto = (projeto: Projeto) => {
    setProjetoSelecionado(projeto);
    setIsFullscreen(false); // Resetar tela cheia ao trocar de projeto
    setVideoPlaying({ ...videoPlaying, [projeto.id]: false }); // Resetar estado do vídeo ao trocar de projeto
    
    // Rolar suavemente até o painel central com offset
    setTimeout(() => {
      if (painelCentralRef.current) {
        const elementPosition = painelCentralRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 70; // 70px de margem superior
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <>
      <Head>
        <title>{t('projects.title')} | {businessSettings.brandName}</title>
        <meta
          name="description"
          content={`Confira os projetos desenvolvidos por ${businessSettings.brandName} - Desenvolvedor web especializado em soluções modernas`}
        />
        <meta property="og:title" content={`${t('projects.title')} | ${businessSettings.brandName}`} />
        <meta property="og:description" content={`Confira os projetos desenvolvidos por ${businessSettings.brandName} - Desenvolvedor web especializado em soluções modernas`} />
      </Head>

      {/* Notificação de Login */}
      {mostrarNotificacao && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[320px]">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <p className="font-semibold text-base">{t('projects.like.loginRequired')}</p>
              <p className="text-sm text-blue-100">{t('projects.like.loginMessage')}</p>
            </div>
            <button 
              onClick={() => setMostrarNotificacao(false)}
              className="ml-2 hover:bg-white/20 rounded p-1 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Cabeçalho */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('projects.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('projects.subtitle')}
            </p>
          </div>
        </div>

        {/* Layout Principal */}
        <div className="max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6">
            
            {/* Sidebar Esquerda - Lista de Projetos */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="space-y-2 sm:space-y-3 sticky top-20 sm:top-24">
                {projetos.map((projeto) => (
                  <div
                    key={projeto.id}
                    onClick={() => selecionarProjeto(projeto)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selecionarProjeto(projeto);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Selecionar ${projeto.title}`}
                    className={`w-full text-left px-5 py-4 rounded-lg transition-all duration-200 shadow-lg relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      projetoSelecionado.id === projeto.id
                        ? 'bg-blue-600 text-white shadow-blue-600/30'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 shadow-gray-300/50 dark:shadow-gray-900/50'
                    }`}
                  >
                      {/* Badge de Destaque no canto superior esquerdo */}
                      {projeto.featured && (
                        <span className="absolute top-1.5 left-1.5 text-[10px]">
                          ⭐
                        </span>
                      )}

                      {/* Botão de Curtir no canto superior direito */}
                      <button
                        onClick={(e) => toggleLike(projeto.id, e)}
                        className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 ${
                          isLiked(projeto.id)
                            ? 'bg-red-500 hover:bg-red-600'
                            : projetoSelecionado.id === projeto.id
                            ? 'bg-white/20 hover:bg-white/30'
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        title={isSignedIn ? (isLiked(projeto.id) ? 'Descurtir' : 'Curtir') : 'Faça login para curtir'}
                      >
                        <svg 
                          className={`w-4 h-4 ${
                            isLiked(projeto.id) 
                              ? 'text-white' 
                              : projetoSelecionado.id === projeto.id
                              ? 'text-white'
                              : 'text-gray-600 dark:text-gray-300'
                          }`}
                          fill={isLiked(projeto.id) ? 'currentColor' : 'none'} 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                          />
                        </svg>
                      </button>

                      <div className="mb-2 pr-8">
                        <div className="mb-1">
                          <span className="font-semibold text-base">
                            {projeto.title}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {projeto.tecnologias.map((tech, index) => (
                          <span
                            key={index}
                            className={`text-xs px-2 py-0.5 rounded ${
                              projetoSelecionado.id === projeto.id
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Painel Central - Detalhes do Projeto */}
            <main className="flex-1 w-full" ref={painelCentralRef}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 md:p-6 lg:p-8">
                
                {/* Título do Projeto */}
                <div className="mb-4 sm:mb-5 md:mb-6">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h2 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      {projetoSelecionado.title}
                    </h2>
                    {projetoSelecionado.featured && (
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                        {t('projects.featuredBadge')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Layout: Funcionalidades (esquerda) + Vídeo (direita) */}
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-7 md:mb-8">
                  
                  {/* Funcionalidades - Esquerda */}
                  <div className="lg:col-span-2">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {t('projects.features')}
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {projetoSelecionado.funcionalidades.map((func, index) => (
                        <li key={index} className="flex items-start gap-2 sm:gap-3 text-gray-700 dark:text-gray-300">
                          <span className="text-blue-600 dark:text-blue-400 text-lg sm:text-xl mt-0.5 flex-shrink-0">•</span>
                          <span className="text-sm sm:text-base">{func}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Vídeo + Link - Direita */}
                  <div className="lg:col-span-5">
                    {/* Vídeo - Tamanho Normal (Grande) */}
                    <div className="rounded-lg overflow-hidden mb-3 relative">
                      <div className="w-full aspect-[21/9] relative">
                        {projetoSelecionado.thumbnail && !videoPlaying[projetoSelecionado.id] ? (
                          <>
                            <Image
                              src={projetoSelecionado.thumbnail}
                              alt={`Capa do vídeo - ${projetoSelecionado.title}`}
                              fill
                              className="object-cover"
                              priority
                            />
                            <div 
                              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-300 cursor-pointer group"
                              onClick={() => setVideoPlaying({ ...videoPlaying, [projetoSelecionado.id]: true })}
                            >
                              <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-4 sm:p-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-700 dark:text-gray-300 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </>
                        ) : (
                          <iframe
                            src={projetoSelecionado.videoUrl}
                            title={projetoSelecionado.title}
                            className="w-full h-full"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            style={{ border: 'none' }}
                          />
                        )}
                      </div>
                      {/* Botão de Tela Cheia - Embaixo à Direita */}
                      {(!projetoSelecionado.thumbnail || videoPlaying[projetoSelecionado.id]) && (
                        <div className="absolute bottom-2 right-2 z-10">
                          <button
                            onClick={() => setIsFullscreen(true)}
                            className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-all duration-200"
                            title="Tela Cheia"
                            aria-label="Tela Cheia"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Link do Projeto abaixo do vídeo */}
                    <div className="text-center">
                      <a
                        href={projetoSelecionado.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base md:text-lg"
                      >
                        {t('projects.accessProject')}
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Modal para Tela Cheia (100% da tela) */}
                {isFullscreen && (
                  <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900" onClick={() => setIsFullscreen(false)}>
                    <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
                      <iframe
                        src={projetoSelecionado.videoUrl}
                        title={projetoSelecionado.title}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    </div>
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 z-10 shadow-lg"
                      title="Fechar Tela Cheia"
                      aria-label="Fechar Tela Cheia"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Tecnologias - Embaixo de tudo (full width) */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-5 md:pt-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    {t('projects.technologies')}
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {projetoSelecionado.tecnologias.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 text-xs sm:text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-5xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-center">
            <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              {t('projects.interested.title')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-7 md:mb-8">
              {t('projects.interested.description')}
            </p>
            <Link
              href="/contato"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-3.5 md:py-4 px-6 sm:px-7 md:px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
            >
              {t('projects.interested.getInTouch')}
            </Link>
          </div>
        </div>
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
