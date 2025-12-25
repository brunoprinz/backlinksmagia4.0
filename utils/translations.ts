import { Language } from '../types';

const pt: any = {
  nav: {
    title: "Backlinks Magia",
    subtitle: "v4.0.1 Estável",
    startHere: "Comece Aqui",
    why_us: "Por que Backlinks Magia?",
    tools: "Arsenal de Guerra",
    learn: "Aprenda",
    dashboard: "Painel Principal",
    wizard: "Oráculo SAB - Estrategista",
    opportunities: "Encontrar Oportunidades",
    keywords: "Pesquisa SAB - Rank Ninja",
    kgr: "Serp Armor Breaker",
    tracking: "Rastreador de Links",
    content: "Mago de Conteúdo",
    outreach: "Assistente de Outreach",
    onpage: "Analisador On-Page",
    prompts: "Cofre de Prompts",
    extra: "Renda Extra Freelance ($$)",
    academy: "Academia SEO"
  },
  dashboard: {
    welcome: "Bem-vindo de volta",
    subtitle: "Sua central de comando para dominância de busca.",
    stats_da: "Autoridade do Domínio",
    stats_links: "Total de Backlinks",
    stats_growth: "Crescimento Orgânico",
    stats_health: "Saúde do Perfil",
    quick_actions: "Ações Rápidas",
    action_audit: "Oráculo SAB",
    action_content: "Criar Conteúdo",
    action_links: "Oportunidades"
  },
  prompts: {
    title: "Cofre de Prompts",
    subtitle: "Prompts de elite para dominar a IA",
    copy: "Copiar",
    copied: "Copiado!",
    placeholder: "Digite seu nicho..."
  },
  keywords: {
    title: "Pesquisa SAB",
    subtitle: "Encontre fendas na armadura dos concorrentes",
    placeholder: "Palavra-chave semente...",
    button: "Analisar"
  },
  opportunities: {
    title: "Oportunidades",
    subtitle: "Sites reais para prospectar links",
    placeholder: "Seu nicho...",
    button: "Buscar"
  },
  extra: {
    title: "Renda Extra SEO",
    subtitle: "Monetize seu conhecimento.",
    gigs: [], // Pode deixar vazio se for usar fixo no componente
    tips: [],
    scripts: [],
    btn_yt_seo: "Ver no YT",
    btn_yt_fiverr: "Guia Fiverr"
  },
  tour: {
    next: "Próximo",
    skip: "Pular",
    finish: "Finalizar"
  }
};

// Força tudo para Português para evitar erros
export const translations: any = {
  en: pt,
  pt: pt,
  'pt-BR': pt
};