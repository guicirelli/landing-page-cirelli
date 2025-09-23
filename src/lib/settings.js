// Configurações estáticas para evitar problemas com fs no cliente
const businessSettingsPT = {
  "brandName": "Guilherme Cirelli Lopes",
  "brandDescription": "Desenvolvedor web apaixonado por criar soluções eficientes e práticas.",
  "brandEmail": "guilopes.030206@gmail.com",
  "brandKeywords": ["Desenvolvedor Web", "Portfolio", "JavaScript", "Next.js", "React", "Node.js"],
  "brandPhone": "+55 43 99157-5781"
};

const businessSettingsEN = {
  "brandName": "Guilherme Cirelli Lopes",
  "brandDescription": "Web developer passionate about delivering efficient and practical solutions.",
  "brandEmail": "guilopes.030206@gmail.com",
  "brandKeywords": ["Web Developer", "Portfolio", "JavaScript", "Next.js", "React", "Node.js"],
  "brandPhone": "+55 43 99157-5781"
};

const generalSettings = {
  "siteUrl": "https://guilherme-cirelli.dev",
  "footerText": "© 2025 Guilherme Cirelli Lopes. Todos os direitos reservados. Construído com Next.js e muito ☕.",
  "postsToShow": 6,
  "homeCategory": "Development",
  "cookieConsent": false,
  "darkModeSwitcher": true,
  "feedbackEmail": "guilopes.030206@gmail.com",
  "publishedDate": "2025-01-15 00:00:00",
  "i18n": "pt-br",
  "errorMessage": "Ops... algo deu errado. Tente novamente mais tarde ou entre em contato conosco: guilopes.030206@gmail.com"
};

const themeSettings = {
  "postsSettings": {
    "postsToShow": 6,
    "postMaxW": "800",
    "leftColumn": false,
    "rightColumn": false,
    "bottomRow": true,
    "adsInsidePost": false,
    "postStyleVariation": "0"
  },
  "pagesSettings": {
    "pageBottomPadding": 30,
    "pageHeaderPadding": 22,
    "pageMaxW": "1100"
  },
  "header": {
    "logoAlign": "left",
    "headerHeight": 60,
    "bottomMainMenu": false,
    "headerMainMenu": "right",
    "headerMainMenuType": "simple"
  },
  "themeColors": {
    "brand_color": "#3b82f6",
    "ctaColor": "#3b82f6",
    "background_color": "#ffffff",
    "darkBrandColor": "#60a5fa",
    "secondaryColor": "#1e293b",
    "darkBackgroundColor": "#0f172a"
  },
  "generalThemeSettings": {
    "themeStyle": "modern"
  }
};

const logos = {
  "faviconLogo": "/favicon.svg",
  "mainLogo": "/img/foto perfil.jpeg",
  "markLogo": "/img/foto perfil.jpeg",
  "cardLogo": "/img/foto perfil.jpeg",
  "postAuthorLogo": "/img/foto perfil.jpeg",
  "mainLogoWH": "375x375"
};

const mainMenu = {
  "mainMenu": [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "About",
      "href": "/sobre"
    },
    {
      "label": "Projects",
      "href": "/projetos"
    },
    {
      "label": "Contact",
      "href": "/contato"
    }
  ]
};

const linkTreeData = {
  "linkTree": [
    {
      "href": "https://www.linkedin.com/in/guicirelli/",
      "label": "LinkedIn",
      "icon": "FaLinkedin"
    },
    {
      "href": "https://github.com/guicirelli",
      "label": "GitHub",
      "icon": "FaGithub"
    },
    {
      "href": "mailto:guilopes.030206@gmail.com",
      "label": "Email",
      "icon": "FaEnvelope"
    }
  ]
};

// Configurações de negócio
export const getBusinessSettings = () => {
  // Verifica se está no cliente
  if (typeof window !== 'undefined') {
    // Pega o idioma do localStorage ou usa o padrão
    const language = localStorage.getItem('language') || 'pt';
    return language === 'pt' ? businessSettingsPT : businessSettingsEN;
  }
  // No servidor, retorna o padrão em português
  return businessSettingsPT;
};

// Configurações gerais
export const getGeneralSettings = () => {
  return generalSettings;
};

// Configurações de tema
export const getThemeSettings = () => {
  return themeSettings;
};

// Logos
export const getLogos = () => {
  return logos;
};

// Menu principal
export const getMainMenu = () => {
  return mainMenu;
};

// LinkTree
export const getLinkTreeData = () => {
  return linkTreeData;
};

// Configurações de integração (placeholder)
export const getIntegrations = () => {
  return {};
};

// Informações de versão (placeholder)
export const getVersionInfo = () => {
  return {
    version: "1.0.0",
    nextVersion: "13.5.7",
    message: "Portfolio pessoal - Guilherme Cirelli Lopes"
  };
};
