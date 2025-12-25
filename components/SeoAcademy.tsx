import React, { useState } from 'react';
import { 
  Book, CheckSquare, Skull, Globe, Building, Youtube, Flame, Swords, 
  Zap, Target, ShieldCheck, TrendingUp, Search, PlayCircle, ExternalLink, 
  Sparkles, ListChecks, Crown, Rocket, ArrowRight, FileText
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface SeoAcademyProps { lang: Language; }

const SeoAcademy: React.FC<SeoAcademyProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'indexing' | 'onpage' | 'viral' | 'graveyard' | 'masterclass'>('masterclass');
  const t = translations[lang].academy;

  // Conteúdo Expandido com Suporte a Idioma (Tradução dos textos longos)
  const academyContent = {
    pt: {
      sabTitle: "Metodologia SAB (Serp Armor Breaker)",
      sabDesc: "A evolução definitiva do KGR. Enquanto o KGR foca apenas em volume, o SAB (Serp Armor Breaker) foca em vulnerabilidade estrutural. O objetivo é encontrar palavras-chave onde os 'Gigantes' (sites de alta autoridade) estão protegidos por uma 'armadura fina' — conteúdo mal otimizado, fóruns (Reddit/Quora) ou sites irrelevantes para a intenção de busca. Quando você identifica uma fenda, seu conteúdo entra como uma flecha precisa.",
      skyscraperTitle: "Técnica Skyscraper (Arranha-Céu)",
      skyscraperDesc: "O conceito é simples: encontre o conteúdo que já é o 'prédio mais alto' (Top 1) para sua palavra-chave, e construa 10 andares a mais. Melhore o design, atualize os dados, adicione infográficos e torne-o tão irresistível que os donos de sites naturalmente preferirão linkar para você do que para o concorrente desatualizado.",
      watchBtn: "Assistir Tutorial",
      whyDied: "Por que morreu:",
    },
    en: {
      sabTitle: "SAB Methodology (Serp Armor Breaker)",
      sabDesc: "The ultimate evolution of KGR. While KGR focuses only on volume, SAB (Serp Armor Breaker) focuses on structural vulnerability. The goal is to find keywords where 'Giants' (high authority sites) are protected by 'thin armor' — poorly optimized content, forums (Reddit/Quora), or sites irrelevant to search intent. When you identify a breach, your content enters like a precise arrow.",
      skyscraperTitle: "Skyscraper Technique",
      skyscraperDesc: "The concept is simple: find the content that is already the 'tallest building' (Top 1) for your keyword, and build 10 more floors. Improve the design, update the data, add infographics, and make it so irresistible that site owners will naturally prefer to link to you instead of the outdated competitor.",
      watchBtn: "Watch Tutorial",
      whyDied: "Why it died:",
    }
  }[lang] || { /* Fallback para PT se não houver tradução */ };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2 relative z-10">
          <Book className="w-8 h-8 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white uppercase italic tracking-tighter">SEO Academy <span className="text-indigo-500">v4.0</span></h2>
        </div>
        <p className="text-slate-400 relative z-10">{t.subtitle}</p>
        
        {/* Navegação de Abas */}
        <div className="flex gap-4 mt-6 border-b border-slate-700 overflow-x-auto no-scrollbar">
          {['masterclass', 'indexing', 'onpage', 'viral', 'graveyard'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 px-4 font-bold text-xs uppercase tracking-widest transition-all relative whitespace-nowrap ${
                activeTab === tab ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.replace(/^\w/, (c) => c.toUpperCase())}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500 rounded-full animate-in fade-in duration-300" />}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        {/* --- ABA MASTERCLASS (SAB + SKYSCRAPER) --- */}
        {activeTab === 'masterclass' && (
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-indigo-600/10 border border-indigo-500/30 p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/40">
                  <Swords className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic">{academyContent.sabTitle}</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg mb-6">
                {academyContent.sabDesc}
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                  <span className="text-indigo-400 font-bold block mb-1">Passo 01</span>
                  <p className="text-xs text-slate-400">Identificar keywords com baixa barreira de entrada (Armor Breaches).</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                  <span className="text-indigo-400 font-bold block mb-1">Passo 02</span>
                  <p className="text-xs text-slate-400">Criar conteúdo semanticamente superior focado em LSI e Entidades.</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                  <span className="text-indigo-400 font-bold block mb-1">Passo 03</span>
                  <p className="text-xs text-slate-400">Distribuir autoridade via Outreach focado em contexto real.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-700 p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-4">
                <Building className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">{academyContent.skyscraperTitle}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {academyContent.skyscraperDesc}
              </p>
            </div>
          </div>
        )}

        {/* --- ABA INDEXAÇÃO (UNIFICADA) --- */}
        {activeTab === 'indexing' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
            <StepCard title="Google Search Console" desc="A base de tudo. Configure e verifique sua propriedade imediatamente." query="how to setup google search console 2024" lang={lang} />
            <StepCard title="Sitemap.xml Protocol" desc="Envie seu mapa do site para que o Google entenda sua estrutura." query="generate and submit sitemap search console" lang={lang} />
            <StepCard title="Robots.txt Optimization" desc="Instrua os bots sobre o que rastrear e o que ignorar no seu servidor." query="best robots.txt for seo" lang={lang} />
            <StepCard title="Internal Linking Map" desc="Use links internos para distribuir o 'link juice' por todas as páginas." query="internal linking strategy for seo" lang={lang} />
            <StepCard title="Instant Indexing API" desc="A forma mais rápida de indexar posts e páginas novas em minutos." query="setup google indexing api for wordpress" lang={lang} />
            <StepCard title="URL Inspection Protocol" desc="Force o rastreio manual de páginas cruciais que estão travadas." query="request indexing google search console manual" lang={lang} />
          </div>
        )}

        {/* --- ABA ON-PAGE --- */}
        {activeTab === 'onpage' && (
          <div className="grid md:grid-cols-2 gap-6 animate-in fade-in">
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <h4 className="text-white font-bold flex items-center gap-2 mb-4"><Target className="text-indigo-400" /> KGR: Keyword Golden Ratio</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Fórmula: (Resultados com "allintitle") / (Volume mensal). Se for menor que 0.25, a chance de rankear no Top 10 em 48h é altíssima.</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <h4 className="text-white font-bold flex items-center gap-2 mb-4"><FileText className="text-emerald-400" /> Estrutura de Títulos Hx</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Mantenha a hierarquia lógica: Um H1 por página, H2s para sub-temas e H3s para detalhes. O Google lê isso como o índice de um livro.</p>
            </div>
          </div>
        )}

        {/* --- ABA GRAVEYARD (CEMITÉRIO) --- */}
        {activeTab === 'graveyard' && (
          <div className="grid md:grid-cols-2 gap-4 animate-in fade-in">
            <GraveyardItem title="Keyword Stuffing" description="Repetir palavras-chave sem sentido no texto." reason="O algoritmo Panda/Hummingbird já entende semântica." lang={lang} />
            <GraveyardItem title="PBNs Públicas" description="Comprar links de redes de blogs genéricos." reason="Pegada digital fácil de detectar. Risco de banimento." lang={lang} />
            <GraveyardItem title="Conteúdo Spin/IA Puro" description="Gerar textos automáticos sem revisão humana." reason="Google prioriza EEAT (Experiência e Autoridade)." lang={lang} />
            <GraveyardItem title="Link Exchange Automático" description="Troca massiva de links via plugins." reason="Esquema de links detectável pelo algoritmo SpamBrain." lang={lang} />
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Cartão de Etapa (Indexing)
const StepCard = ({ title, desc, query, lang }: any) => {
  const watchText = lang === 'en' ? "Watch Tutorial" : "Assistir Tutorial";
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-all group">
      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        <CheckSquare className="w-5 h-5" />
      </div>
      <h4 className="text-white font-bold text-sm mb-2">{title}</h4>
      <p className="text-slate-400 text-xs leading-relaxed mb-4">{desc}</p>
      <a 
        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-indigo-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
      >
        <Youtube className="w-4 h-4" /> {watchText}
      </a>
    </div>
  );
};

// Componente do Cemitério
const GraveyardItem = ({ title, description, reason, lang }: any) => (
  <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl group hover:border-red-500/30 transition-all">
    <div className="flex items-center gap-3 mb-3">
      <Skull className="w-5 h-5 text-red-500" />
      <h4 className="text-lg font-bold text-white">{title}</h4>
    </div>
    <p className="text-slate-400 text-xs mb-3">{description}</p>
    <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10">
      <span className="text-red-400 text-[10px] font-black uppercase tracking-widest block mb-1">
        {lang === 'en' ? "Why it died:" : "Por que morreu:"}
      </span>
      <p className="text-slate-300 text-xs italic">{reason}</p>
    </div>
  </div>
);

export default SeoAcademy;