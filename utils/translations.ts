import { Language } from '../types';

const en: any = {
  nav: {
    title: "Backlinks Magia 4.0",
    subtitle: "SAB Methodology",
    startHere: "Start Here",
    why_us: "Why Us?",
    tools: "War Arsenal",
    learn: "Learn",
    dashboard: "Dashboard",
    wizard: "SAB Oracle - Strategy Wizard",
    opportunities: "Find Opportunities",
    keywords: "SAB Research - Rank Ninja",
    kgr: "Serp Armor Breaker",
    tracking: "Backlink Tracker",
    content: "Content Magician",
    outreach: "Outreach Assistant",
    onpage: "Audit - On-Page Analyzer",
    prompts: "Prompts - Vault",
    extra: "Freelance Wizard ($$)",
    academy: "SEO Academy"
  },
  dashboard: {
    welcome: "Welcome back",
    subtitle: "Your command center for search dominance.",
    stats_da: "Domain Authority",
    stats_links: "Total Backlinks",
    stats_growth: "Organic Growth",
    stats_health: "Profile Health",
    quick_actions: "Quick Actions",
    action_audit: "SAB Oracle",
    action_content: "Create Content",
    action_links: "Opportunities"
  },
  extra: {
    title: "Freelance Wizard",
    subtitle: "Monetize your knowledge.",
    gigs: [{ title: "SAB Audit", price: "$50+", desc: "Sell reports." }],
    tips: ["Focus on local SEO"],
    scripts: [{ title: "Script", text: "Hello..." }],
    btn_yt_seo: "Watch on YT", btn_yt_fiverr: "Fiverr Guide"
  },
  academy: { title: "Academy", subtitle: "Learn SAB", courses: [] },
  keywords: { title: "SAB Research", subtitle: "Find gaps", placeholder: "Keyword...", button: "Analyze" }
};

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
  extra: {
    title: "Renda Extra SEO",
    subtitle: "Monetize seu conhecimento.",
    gigs: [{ title: "Auditoria SAB", price: "R$ 250+", desc: "Venda relatórios." }],
    tips: ["Foque em negócios locais"],
    scripts: [{ title: "Script", text: "Olá..." }],
    btn_yt_seo: "Ver no YT", btn_yt_fiverr: "Guia Fiverr"
  },
  academy: { title: "Academy", subtitle: "Aprenda SAB", courses: [] },
  keywords: { title: "Pesquisa SAB", subtitle: "Encontre fendas", placeholder: "Palavra-chave...", button: "Analisar" }
};

// Mapeamento de exportação seguro
export const translations: any = {
  'en': en,
  'pt': pt,
  'pt-pt': pt,
  'es': { ...en, nav: { ...en.nav, title: "Backlinks Magia ES" } },
  'fr': { ...en, nav: { ...en.nav, title: "Backlinks Magie" } },
  'it': { ...en, nav: { ...en.nav, title: "Backlinks Magia IT" } },
  'de': { ...en, nav: { ...en.nav, title: "Backlinks Magie DE" } },
  'zh': en
};