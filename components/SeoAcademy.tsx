import React, { useState } from 'react';
import { Book, CheckSquare, Skull, Globe, Building, Youtube, Flame, Swords, Zap, Target, ShieldCheck, TrendingUp, Search, PlayCircle, ExternalLink, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface SeoAcademyProps { lang: Language; }

const SeoAcademy: React.FC<SeoAcademyProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'indexing' | 'onpage' | 'viral' | 'graveyard' | 'masterclass'>('masterclass');
  const t = translations[lang].academy;

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-2 relative z-10">
          <Book className="w-8 h-8 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white uppercase italic tracking-tighter">SEO Academy <span className="text-indigo-500">v4.0</span></h2>
        </div>
        <p className="text-slate-400 relative z-10">{t.subtitle}</p>
        
        {/* Navegação de Abas */}
        <div className="flex gap-4 mt-6 border-b border-slate-700 overflow-x-auto no-scrollbar">
          {[
            { id: 'masterclass', label: 'SAB Masterclass', color: 'indigo' },
            { id: 'indexing', label: t.tabs?.indexing || 'Indexação', color: 'blue' },
            { id: 'onpage', label: t.tabs?.onpage || 'SEO Local', color: 'emerald' },
            { id: 'viral', label: t.tabs?.viral || 'YouTube/Viral', color: 'red' },
            { id: 'graveyard', label: 'Graveyard 💀', color: 'slate' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-2 font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id ? `text-indigo-400 border-b-2 border-indigo-400` : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {/* --- MASTERCLASS SAB (O DIFERENCIAL) --- */}
        {activeTab === 'masterclass' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
            <AcademyCard title="A Doutrina SAB" icon={Swords} color="text-indigo-400">
              <ChecklistItem 
                title="A Morte do KGR" 
                desc="Por que o Google moderno ignora fórmulas matemáticas de volume." 
                ytQuery="SEO keywords intent vs volume"
                lang={lang}
              />
              <ChecklistItem 
                title="Hackeando o Top 5" 
                desc="Como identificar 'sites papel' e fóruns para rankear sem backlinks." 
                ytQuery="find low authority keywords SEO"
                lang={lang}
              />
            </AcademyCard>
            <AcademyCard title="Estratégias de Elite" icon={Sparkles} color="text-amber-400">
              <ChecklistItem 
                title="Tropicalização de Conteúdo" 
                desc="Como pegar o que funciona nos EUA e dominar o mercado brasileiro com o Content Magician." 
                ytQuery="SEO content gap analysis"
                lang={lang}
              />
              <ChecklistItem 
                title="Conversão: De Visitante a Cliente" 
                desc="Estruturando seu post para que o leitor tome uma ação imediata." 
                ytQuery="high converting blog post structure"
                lang={lang}
              />
            </AcademyCard>
          </div>
        )}

        {/* --- INDEXAÇÃO E SILOS (ORIGINAL) --- */}
        {activeTab === 'indexing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
            <AcademyCard title="Indexação Turbo" icon={Zap} color="text-blue-400">
              <ChecklistItem 
                title="Google Search Console (GSC)" 
                desc="Obrigatório. Verifique a propriedade e envie seu sitemap imediatamente." 
                ytQuery="Set up Google Search Console"
                lang={lang}
              />
              <ChecklistItem 
                title="API de Indexação Instantânea" 
                desc="O método 'Black Hat do bem' para indexar páginas em minutos." 
                ytQuery="Google Search Console API indexing"
                lang={lang}
              />
            </AcademyCard>
            <AcademyCard title="Arquitetura de Silo" icon={Building} color="text-blue-500">
              <ChecklistItem 
                title="Linkagem Interna Automática" 
                desc="Como criar uma teia de autoridade que o Google adora rastrear." 
                ytQuery="internal linking strategy for SEO"
                lang={lang}
              />
            </AcademyCard>
          </div>
        )}

        {/* --- SEO LOCAL E RANK (ORIGINAL) --- */}
        {activeTab === 'onpage' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
            <AcademyCard title="SEO Local" icon={Globe} color="text-emerald-400">
              <ChecklistItem 
                title="Google Business Profile" 
                desc="Apareça no mapa quando seus clientes estiverem por perto." 
                ytQuery="Optimize Google Business Profile 2026"
                lang={lang}
              />
              <ChecklistItem 
                title="Citações Locais (NAP)" 
                desc="A importância da consistência em diretórios e redes sociais." 
                ytQuery="local seo citations tutorial"
                lang={lang}
              />
            </AcademyCard>
            <AcademyCard title="On-Page Semântico" icon={Search} color="text-emerald-500">
              <ChecklistItem 
                title="Palavras LSI & Entidades" 
                desc="Vá além da palavra-chave e fale a língua da IA do Google." 
                ytQuery="LSI keywords and entities SEO"
                lang={lang}
              />
            </AcademyCard>
          </div>
        )}

        {/* --- YOUTUBE E VIRAL (ORIGINAL) --- */}
        {activeTab === 'viral' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
            <AcademyCard title="YouTube SEO" icon={Youtube} color="text-red-500">
              <ChecklistItem 
                title="Otimização de Vídeo" 
                desc="Tags, Títulos e Descrições que o algoritmo do YouTube ama." 
                ytQuery="YouTube SEO tutorial for beginners"
                lang={lang}
              />
              <ChecklistItem 
                title="CTR de Elite" 
                desc="Como criar thumbnails que 'gritam' para serem clicadas." 
                ytQuery="increase YouTube CTR tips"
                lang={lang}
              />
            </AcademyCard>
            <AcademyCard title="Google Discover" icon={Flame} color="text-orange-500">
              <ChecklistItem 
                title="Hackeando o Feed Discover" 
                desc="O segredo para receber milhares de cliques em 24 horas." 
                ytQuery="get content on google discover"
                lang={lang}
              />
            </AcademyCard>
          </div>
        )}

        {/* --- GRAVEYARD (CEMITÉRIO) --- */}
        {activeTab === 'graveyard' && (
          <div className="grid gap-4 animate-in fade-in">
             <div className="bg-red-900/10 border border-red-900/30 p-6 rounded-xl flex items-start gap-4">
              <Skull className="w-10 h-10 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2 italic">O CEMITÉRIO DO SEO</h3>
                <p className="text-slate-400 text-sm">Pare de perder tempo com técnicas que o Google já aprendeu a ignorar.</p>
              </div>
            </div>
            <GraveyardItem 
              title="KGR (Keyword Golden Ratio)" 
              description="Achar que uma divisão matemática de volume garante a 1ª página." 
              reason="A IA do Google agora analisa autoridade e semântica, não apenas contagem de títulos." 
            />
            <GraveyardItem 
              title="PBNs Compradas" 
              description="Links de sites 'zumbis' criados apenas para vender backlinks." 
              reason="Fácil detecção por footprints. Pode causar a desindexação total do seu site." 
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Componente para os Cards da Academy
const AcademyCard = ({ title, icon: Icon, color, children }: any) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg hover:border-slate-600 transition-all">
    <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${color}`}>
      <Icon className="w-5 h-5" /> {title}
    </h3>
    <div className="space-y-6">{children}</div>
  </div>
);

// Componente para os Itens com Checklist e botão de Vídeo
const ChecklistItem = ({ title, desc, ytQuery, lang }: any) => {
  const query = lang === 'pt' ? `${title} tutorial passo a passo` : `${ytQuery} tutorial`;
  return (
    <div className="flex gap-4 p-4 bg-slate-900/40 rounded-lg border border-slate-700/50 hover:border-indigo-500/30 transition-all group">
      <div className="bg-slate-800 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-slate-700 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
        <CheckSquare className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className="text-white font-bold text-sm tracking-tight">{title}</h4>
        <p className="text-slate-400 text-xs mt-1 leading-relaxed mb-4">{desc}</p>
        <a 
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-red-600/20 text-slate-300 hover:text-red-400 px-4 py-2 rounded-lg text-[10px] font-black border border-slate-700 hover:border-red-500/50 transition-all uppercase tracking-widest"
        >
          <Youtube className="w-4 h-4" /> Watch Tutorial
        </a>
      </div>
    </div>
  );
};

// Componente para o Cemitério
const GraveyardItem = ({ title, description, reason }: any) => (
  <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
    <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
    <p className="text-slate-400 text-sm mb-3">{description}</p>
    <div className="bg-red-900/20 p-3 rounded-lg border border-red-900/50">
      <span className="text-red-300 text-[10px] font-bold uppercase tracking-wider">Por que morreu:</span>
      <p className="text-slate-300 text-xs mt-1 italic leading-relaxed">{reason}</p>
    </div>
  </div>
);

export default SeoAcademy;