import React, { useState } from 'react';
import { 
  Book, CheckSquare, Skull, Globe, Building, Youtube, Flame, Swords, 
  Zap, Target, ShieldCheck, TrendingUp, Search, PlayCircle, ExternalLink, 
  Sparkles, ListChecks, Crown, Rocket, ArrowRight, FileText
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations1';

interface SeoAcademyProps { lang: Language; }

const SeoAcademy: React.FC<SeoAcademyProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'indexing' | 'onpage' | 'viral' | 'graveyard' | 'masterclass'>('masterclass');
  const t = translations[lang].academy;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="bg-indigo-500/20 p-4 rounded-2xl">
              <Book className="w-10 h-10 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">{t.title}</h2>
              <p className="text-slate-400 font-medium">{t.subtitle}</p>
            </div>
          </div>
          
          <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-700 overflow-x-auto no-scrollbar">
            {['masterclass', 'indexing', 'onpage', 'viral', 'graveyard'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab === 'masterclass' ? 'SAB Masterclass' : 
                 tab === 'indexing' ? 'Indexação' : 
                 tab === 'onpage' ? 'On-Page' : 
                 tab === 'viral' ? 'SEO Viral' : 'Cemitério'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* ABA MASTERCLASS - TEXTOS RESTAURADOS E AMPLIADOS */}
        {activeTab === 'masterclass' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Swords className="w-32 h-32 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                  <Flame className="w-6 h-6 text-orange-500" />
                  Metodologia SAB (Serp Armor Breaker)
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6 font-medium">
                  {lang === 'pt' 
                    ? "A evolução definitiva do KGR. Enquanto o KGR foca apenas em volume, o SAB (Serp Armor Breaker) foca em vulnerabilidade estrutural. O objetivo é encontrar palavras-chave onde os 'Gigantes' (sites de alta autoridade) estão protegidos por uma 'armadura fina' — ou seja, conteúdo mal otimizado, fóruns (Reddit/Quora) ou sites irrelevantes para a intenção de busca. Quando você identifica uma fenda na armadura deles, seu conteúdo entra como uma flecha precisa, dominando o topo mesmo com menos autoridade de domínio."
                    : "The definitive evolution of KGR. While KGR focuses only on volume, SAB (Serp Armor Breaker) focuses on structural vulnerability. The goal is to find keywords where 'Giants' (high authority sites) are protected by 'thin armor' — poorly optimized content, forums (Reddit/Quora), or irrelevant sites. When you identify a gap in their armor, your content strikes like a precise arrow."}
                </p>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-widest">
                  <span>Power Level: Pro</span>
                  <div className="h-1 w-20 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[95%]"></div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <Building className="w-32 h-32 text-amber-500" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                  <Crown className="w-6 h-6 text-amber-400" />
                  Técnica Skyscraper (Arranha-céu)
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6 font-medium">
                  {lang === 'pt'
                    ? "Criada por Brian Dean, esta técnica baseia-se em três pilares: encontrar conteúdo que já é um sucesso (tem muitos links), criar algo 10x melhor (mais atualizado, melhor design, mais profundo) e promover para as pessoas certas. Não se trata de inventar a roda, mas de construir o prédio mais alto da cidade para que todos olhem para ele. No Backlinks Magia, usamos a IA para identificar os pontos fracos do 'prédio' atual e gerar um conteúdo que seja imbatível em autoridade e utilidade."
                    : "Created by Brian Dean, this technique is based on three pillars: find successful content (with many links), create something 10x better (updated, better design, deeper), and promote it to the right people. It's not about reinventing the wheel, but about building the tallest building in town so everyone looks at it."}
                </p>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest">
                  <span>Difficulty: Hard</span>
                  <div className="h-1 w-20 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[80%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA INDEXAÇÃO - MANTIDA IGUAL */}
        {activeTab === 'indexing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
            <AcademyCard 
              title={lang === 'pt' ? "Google Search Console" : "Google Search Console"}
              desc={lang === 'pt' ? "A ferramenta fundamental. Aprenda a forçar a indexação e monitorar erros de rastreamento." : "The fundamental tool. Learn to force indexing and monitor crawl errors."}
              query="google search console indexing tutorial"
              watchText={lang === 'pt' ? "Ver Tutorial" : "Watch Tutorial"}
            />
            <AcademyCard 
              title={lang === 'pt' ? "API de Indexação" : "Indexing API"}
              desc={lang === 'pt' ? "Para sites grandes: como usar a API oficial do Google para indexar páginas em minutos, não dias." : "For large sites: how to use Google's official API to index pages in minutes, not days."}
              query="google indexing api setup guide"
              watchText={lang === 'pt' ? "Ver Tutorial" : "Watch Tutorial"}
            />
            <AcademyCard 
              title={lang === 'pt' ? "Sitemaps Dinâmicos" : "Dynamic Sitemaps"}
              desc={lang === 'pt' ? "Garanta que o Google descubra seu conteúdo novo instantaneamente com sitemaps otimizados." : "Ensure Google discovers your new content instantly with optimized sitemaps."}
              query="advanced sitemap seo strategy"
              watchText={lang === 'pt' ? "Ver Tutorial" : "Watch Tutorial"}
            />
          </div>
        )}

        {/* ABA ON-PAGE - CORRIGIDA (REMOVIDO KGR) */}
        {activeTab === 'onpage' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
            <AcademyCard 
              title={lang === 'pt' ? "Entidades e LSI" : "Entities and LSI"}
              desc={lang === 'pt' ? "O Google não lê apenas palavras, ele lê entidades. Aprenda a cercar o tema principal com termos semanticamente ricos." : "Google doesn't just read words, it reads entities. Learn to surround the main topic with semantically rich terms."}
              query="seo entity based optimization"
              watchText={lang === 'pt' ? "Ver Aula" : "Watch Class"}
            />
            <AcademyCard 
              title={lang === 'pt' ? "Arquitetura de Silo" : "Silo Architecture"}
              desc={lang === 'pt' ? "Organize seu site de forma que a autoridade flua das páginas mais fortes para as que você quer ranquear." : "Organize your site so authority flows from the strongest pages to the ones you want to rank."}
              query="internal linking silo structure seo"
              watchText={lang === 'pt' ? "Ver Aula" : "Watch Class"}
            />
            <AcademyCard 
              title={lang === 'pt' ? "Core Web Vitals" : "Core Web Vitals"}
              desc={lang === 'pt' ? "A experiência do usuário agora é fator de ranking. Garanta que seu site carregue como um raio." : "UX is now a ranking factor. Ensure your site loads like lightning."}
              query="optimize core web vitals for seo"
              watchText={lang === 'pt' ? "Ver Aula" : "Watch Class"}
            />
          </div>
        )}

        {/* ABA VIRAL - PREENCHIDA COM CONTEÚDO NOVO */}
        {activeTab === 'viral' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-500">
            <AcademyCard 
              title={lang === 'pt' ? "Link Baiting" : "Link Baiting"}
              desc={lang === 'pt' ? "Como criar calculadoras, ferramentas ou infográficos que as pessoas imploram para linkar." : "How to create calculators, tools, or infographics that people beg to link to."}
              query="link baiting examples and strategy"
              watchText={lang === 'pt' ? "Ver Aula" : "Watch Class"}
            />
            <AcademyCard 
              title={lang === 'pt' ? "SEO de Notícias (Trends)" : "News SEO (Trends)"}
              desc={lang === 'pt' ? "Aproveite tendências do Google Trends e Twitter para ganhar picos massivos de tráfego e autoridade." : "Leverage Google Trends and Twitter trends to gain massive traffic and authority spikes."}
              query="google news seo strategy"
              watchText={lang === 'pt' ? "Ver Aula" : "Watch Class"}
            />
            <AcademyCard 
              title={lang === 'pt' ? "Ego Bait Strategy" : "Ego Bait Strategy"}
              desc={lang === 'pt' ? "Mencione influenciadores de forma estratégica para que eles mesmos compartilhem seu conteúdo." : "Strategically mention influencers so they share your content themselves."}
              query="ego bait marketing strategy"
              watchText={lang === 'pt' ? "Ver Aula" : "Watch Class"}
            />
          </div>
        )}

        {/* ABA CEMITÉRIO - MANTIDA IGUAL */}
        {activeTab === 'graveyard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            <GraveyardItem 
              title="Keyword Stuffing" 
              description={lang === 'pt' ? "Repetir palavras-chave de forma não natural." : "Repeating keywords unnaturally."} 
              reason={lang === 'pt' ? "O algoritmo do Google agora entende contexto e pune excessos." : "Google's algorithm now understands context and punishes excess."} 
              lang={lang}
            />
            <GraveyardItem 
              title="PBNs Públicas" 
              description={lang === 'pt' ? "Comprar links em redes de blogs fáceis de detectar." : "Buying links on easy-to-detect blog networks."} 
              reason={lang === 'pt' ? "O Google identifica o padrão (footprint) e ignora ou pune o site." : "Google identifies the footprint and ignores or punishes the site."} 
              lang={lang}
            />
            <GraveyardItem 
              title="Diretórios de Baixa Qualidade" 
              description={lang === 'pt' ? "Cadastrar seu site em milhares de diretórios automáticos." : "Submitting your site to thousands of automatic directories."} 
              reason={lang === 'pt' ? "Considerado spam. Links sem relevância não passam autoridade." : "Considered spam. Irrelevant links pass no authority."} 
              lang={lang}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Componentes Auxiliares
const AcademyCard = ({ title, desc, query, watchText }: any) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl group hover:border-indigo-500/50 transition-all">
      <div className="mb-4 p-2 w-fit rounded-lg bg-slate-700 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
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

const GraveyardItem = ({ title, description, reason, lang }: any) => (
  <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl group hover:border-red-500/30 transition-all">
    <div className="flex items-center gap-3 mb-3">
      <Skull className="w-5 h-5 text-red-500" />
      <h4 className="text-lg font-bold text-white">{title}</h4>
    </div>
    <p className="text-slate-400 text-xs mb-3">{description}</p>
    <div className="bg-red-900/10 border border-red-900/20 p-3 rounded-xl">
      <p className="text-red-400 text-[10px] font-bold uppercase mb-1">Por que morreu:</p>
      <p className="text-slate-300 text-[11px] leading-tight">{reason}</p>
    </div>
  </div>
);

export default SeoAcademy;