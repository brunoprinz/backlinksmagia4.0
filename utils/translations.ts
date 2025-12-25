// translations.ts
import { Language } from '../types';

const en = {
  nav: { // Renomeado de 'sidebar' para 'nav' para dar match com o App.tsx
    title: "MarketPulse AI",
    subtitle: "v4.0.1 Stable",
    startHere: "Start Here",
    why_us: "Why MarketPulse AI?",
    tools: "War Arsenal",
    learn: "Learn",
    dashboard: "Dashboard",
    wizard: "SAB Oracle",
    opportunities: "Find Opportunities",
    keywords: "SAB Research",
    kgr: "Armor Breaker", // Referência ao antigo KGR
    tracking: "Backlink Tracker",
    content: "Content Magician",
    outreach: "Outreach Assistant",
    onpage: "Semantic Audit",
    prompts: "Prompt Vault",
    extra: "Freelance Wizard ($$)",
    academy: "SEO Academy"
  },
  why_us: {
    title: "Why MarketPulse AI?",
    subtitle: "The methodology behind the algorithm. Why we dominate.",
    differentials: [
      { title: "Action Over Data", desc: "Other tools drown you in metrics. We give you a step-by-step Action Plan based on the SAB Method." },
      { title: "White Hat Automation", desc: "We use AI to speed up legitimate authority building, not to generate spam." },
      { title: "The SAB Advantage", desc: "The Serp Armor Breaker (SAB) identifies exact vulnerabilities in big competitors that traditional tools miss." },
      { title: "Holistic Growth", desc: "We bridge the gap between content creation and authority acquisition in one ecosystem." }
    ],
    warning_title: "⚠️ The Black Hat Danger Zone",
    warning_text: "MarketPulse AI is 100% White Hat. We help you DESERVE the ranking, so you keep it forever.",
    dilemma: {
      title: "The End of the Beginner's Dilemma",
      subtitle: "How to break the 'Chicken and Egg' cycle of SEO.",
      solution_title: "The MarketPulse Solution",
      steps: [
        { title: "1. Find the Gaps (SAB)", desc: "Use the Armor Breaker to find keywords where authority doesn't matter. Rank in 24h without backlinks." },
        { title: "2. Build Assets (Content Magic)", desc: "Create resources so good that they naturally attract links and social shares." },
        { title: "3. Force Visibility", desc: "Use our Outreach Assistant to put your content in front of the right curators." },
        { title: "4. Scale Dominance", desc: "Once you have initial traffic, use the Oracle to map your path to the top 1." }
      ]
    }
  },
  // ... rest of the en object
};

const pt = {
  nav: {
    title: "MarketPulse AI",
    subtitle: "v4.0.1 Estável",
    startHere: "Comece Aqui",
    why_us: "Por que MarketPulse?",
    tools: "Arsenal de Guerra",
    learn: "Aprender",
    dashboard: "Painel",
    wizard: "Oráculo SAB",
    opportunities: "Oportunidades",
    keywords: "Pesquisa SAB",
    kgr: "Armor Breaker",
    tracking: "Monitor de Links",
    content: "Mago do Conteúdo",
    outreach: "Assistente de Outreach",
    onpage: "Auditoria Semântica",
    prompts: "Biblioteca de Prompts",
    extra: "Renda Extra SEO ($$)",
    academy: "SEO Academy"
  },
  why_us: {
    title: "Por que MarketPulse AI?",
    subtitle: "A metodologia por trás do algoritmo. Por que somos diferentes.",
    differentials: [
      { title: "Ação sobre Dados", desc: "Outras ferramentas te afogam em métricas. Nós te damos um Plano de Ação passo a passo." },
      { title: "Automação White Hat", desc: "Automatizamos o trabalho duro, não o spam. Usamos IA para acelerar estratégias legítimas." },
      { title: "O Diferencial SAB", desc: "O Serp Armor Breaker (SAB) identifica vulnerabilidades exatas em grandes concorrentes." },
      { title: "Crescimento Holístico", desc: "Não separamos conteúdo de autoridade. Unimos os dois em um ecossistema completo." }
    ],
    dilemma: {
      title: "O Fim do Dilema do Iniciante",
      subtitle: "Como quebrar o ciclo 'Ovo e a Galinha' do SEO.",
      solution_title: "A Solução MarketPulse",
      steps: [
        { title: "1. Quebre a Armadura (SAB)", desc: "Encontre fendas onde sites pequenos podem ranquear sem backlinks em 24h." },
        { title: "2. Crie Ativos (Mago do Conteúdo)", desc: "Não escreva posts; crie recursos impossíveis de serem ignorados." },
        { title: "3. Force a Visibilidade", desc: "Use o Assistente de Outreach para colocar seu conteúdo na cara do gol." },
        { title: "4. Domine o Nicho", desc: "Use o Oráculo para mapear o caminho até o Top 1 dos termos mais difíceis." }
      ]
    }
  },
  // ... rest of the pt object
};

export const translations = { en, pt, es: en, fr: en, de: en, it: en, 'pt-pt': pt, zh: en };