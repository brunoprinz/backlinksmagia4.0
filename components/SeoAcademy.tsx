import React, { useState } from 'react';
import { Book, CheckSquare, ChevronDown, ChevronUp, Skull, Globe, Square, ListChecks, Youtube, Crown, Rocket, Building, ArrowRight, Flame } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface SeoAcademyProps {
  lang: Language;
}

const SeoAcademy: React.FC<SeoAcademyProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'indexing' | 'onpage' | 'viral' | 'graveyard' | 'masterclass'>('masterclass');
  const t = translations[lang].academy;

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-2">
          <Book className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">{t.title}</h2>
        </div>
        <p className="text-slate-400">{t.subtitle}</p>
        
        <div className="flex gap-4 mt-6 border-b border-slate-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab('masterclass')}
            className={`pb-3 px-2 font-medium text-sm transition-colors relative whitespace-nowrap ${
              activeTab === 'masterclass' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <Crown className="w-4 h-4" /> {t.tab_masterclass}
            </span>
            {activeTab === 'masterclass' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400" />}
          </button>
          <button
            onClick={() => setActiveTab('indexing')}
            className={`pb-3 px-2 font-medium text-sm transition-colors relative whitespace-nowrap ${
              activeTab === 'indexing' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.tab_indexing}
            {activeTab === 'indexing' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400" />}
          </button>
          <button
            onClick={() => setActiveTab('onpage')}
            className={`pb-3 px-2 font-medium text-sm transition-colors relative whitespace-nowrap ${
              activeTab === 'onpage' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.tab_onpage}
            {activeTab === 'onpage' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400" />}
          </button>
          <button
            onClick={() => setActiveTab('viral')}
            className={`pb-3 px-2 font-medium text-sm transition-colors relative whitespace-nowrap ${
              activeTab === 'viral' ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.tab_viral}
            {activeTab === 'viral' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400" />}
          </button>
          <button
            onClick={() => setActiveTab('graveyard')}
            className={`pb-3 px-2 font-medium text-sm transition-colors relative whitespace-nowrap ${
              activeTab === 'graveyard' ? 'text-red-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.tab_graveyard}
            {activeTab === 'graveyard' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-400" />}
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {activeTab === 'masterclass' && <MasterClassView lang={lang} />}
        {activeTab === 'indexing' && <IndexingGuide lang={lang} />}
        {activeTab === 'onpage' && <OnPageChecklist lang={lang} />}
        {activeTab === 'viral' && <ViralContentTypes />}
        {activeTab === 'graveyard' && <SeoGraveyard />}
      </div>
    </div>
  );
};

const MasterClassView = ({ lang }: { lang: Language }) => {
  const t = translations[lang].academy.masterclass;
  const content = t || translations['en'].academy.masterclass;
  const isPt = lang === 'pt' || lang === 'pt-pt';

  return (
    <div className="grid lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2">
      
      {/* KGR Card */}
      <div className="bg-gradient-to-br from-amber-900/30 to-slate-800 p-8 rounded-xl border border-amber-500/30 relative overflow-hidden group hover:border-amber-500/50 transition-all flex flex-col">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex-1">
           <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-6 border border-amber-500/20">
              <Rocket className="w-6 h-6 text-amber-400" />
           </div>
           
           <h3 className="text-2xl font-bold text-white mb-2">{content.kgr.title}</h3>
           <p className="text-amber-200/80 font-medium mb-6 italic">{content.kgr.subtitle}</p>
           
           <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-amber-500 mb-6">
              <p className="text-slate-300 text-sm leading-relaxed">
                 "{content.kgr.hook}"
              </p>
           </div>

           <div className="space-y-4 mb-6">
              {content.kgr.body.map((para: string, idx: number) => (
                 <p key={idx} className="text-slate-400 text-sm leading-relaxed">
                    {para}
                 </p>
              ))}
           </div>

           <div className="bg-amber-900/20 p-4 rounded-lg border border-amber-500/20 flex items-start gap-3">
              <CheckSquare className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-white">{content.kgr.action}</p>
           </div>
        </div>
        
        <a 
           href="https://www.youtube.com/watch?v=A-17FBdNqQs" 
           target="_blank" 
           rel="noreferrer"
           className="mt-6 w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-lg font-medium transition-colors relative z-10"
        >
           <Youtube className="w-5 h-5" />
           {isPt ? 'Clique aqui para saber mais sobre KGR' : 'Click here to learn more about KGR'}
        </a>
      </div>

      {/* Skyscraper Card */}
      <div className="bg-gradient-to-br from-indigo-900/30 to-slate-800 p-8 rounded-xl border border-indigo-500/30 relative overflow-hidden group hover:border-indigo-500/50 transition-all flex flex-col">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex-1">
           <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-6 border border-indigo-500/20">
              <Building className="w-6 h-6 text-indigo-400" />
           </div>
           
           <h3 className="text-2xl font-bold text-white mb-2">{content.skyscraper.title}</h3>
           <p className="text-indigo-200/80 font-medium mb-6 italic">{content.skyscraper.subtitle}</p>
           
           <div className="bg-slate-900/50 p-4 rounded-lg border-l-4 border-indigo-500 mb-6">
              <p className="text-slate-300 text-sm leading-relaxed">
                 "{content.skyscraper.hook}"
              </p>
           </div>

           <div className="space-y-4 mb-6">
              {content.skyscraper.body.map((para: string, idx: number) => (
                 <p key={idx} className="text-slate-400 text-sm leading-relaxed">
                    {para}
                 </p>
              ))}
           </div>

           <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/20 flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-white">{content.skyscraper.action}</p>
           </div>
        </div>

        <a 
           href="https://www.youtube.com/watch?v=O6AFgeNzEkI" 
           target="_blank" 
           rel="noreferrer"
           className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium transition-colors relative z-10"
        >
           <Youtube className="w-5 h-5" />
           {isPt ? 'Clique aqui para saber mais sobre o Método Arranha-Céus' : 'Click here to learn more about Skyscraper Technique'}
        </a>
      </div>

    </div>
  );
};

const ChecklistItem: React.FC<{ number: number; title: string; content: React.ReactNode; lang: Language }> = ({ number, title, content, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const t = translations[lang].academy;
  
  return (
    <div className={`rounded-lg border overflow-hidden transition-all duration-300 ${isChecked ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
      <div className="w-full flex items-center justify-between p-4 hover:bg-slate-700/50 transition-colors">
        <div className="flex items-center gap-4 flex-1">
          <button 
             onClick={(e) => { e.stopPropagation(); setIsChecked(!isChecked); }}
             className="focus:outline-none transition-transform active:scale-95"
          >
             {isChecked ? (
                <CheckSquare className="w-6 h-6 text-emerald-400" />
             ) : (
                <Square className="w-6 h-6 text-slate-500 hover:text-slate-300" />
             )}
          </button>
          
          <button onClick={() => setIsOpen(!isOpen)} className="flex-1 text-left flex items-center gap-3">
             <span className={`text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center border ${isChecked ? 'bg-emerald-900/50 border-emerald-500/50 text-emerald-300' : 'bg-slate-900 border-slate-600 text-slate-400'}`}>
                {number}
             </span>
             <h3 className={`font-medium transition-colors ${isChecked ? 'text-slate-400 line-through' : 'text-white'}`}>
                {title}
             </h3>
          </button>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="ml-4">
           {isOpen ? <ChevronUp className="text-slate-400 w-5 h-5" /> : <ChevronDown className="text-slate-400 w-5 h-5" />}
        </button>
      </div>
      
      {isOpen && (
        <div className={`p-4 pt-0 pl-[3.5rem] text-sm leading-relaxed border-t bg-slate-900/30 ${isChecked ? 'border-emerald-500/20 text-slate-400' : 'border-slate-700/50 text-slate-300'}`}>
          <div className="pt-4">{content}</div>
          <div className="mt-4">
             <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(title + " SEO tutorial")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors bg-red-900/20 hover:bg-red-900/30 px-3 py-1.5 rounded-lg border border-red-500/20"
            >
              <Youtube className="w-3 h-3" />
              {t.btn_watch || "Watch Tutorials"}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

const OnPageChecklist = ({ lang }: { lang: Language }) => {
  const t = translations[lang].academy;
  const items = t.checklist || translations['en'].academy.checklist;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
      <div className="bg-blue-900/20 border border-blue-900/50 p-6 rounded-xl flex items-start gap-4">
        <ListChecks className="w-10 h-10 text-blue-400 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{t.tab_onpage}</h3>
          <p className="text-slate-300 text-sm">
             Use this checklist for every new page you publish. Mark items as done to track your optimization progress.
          </p>
        </div>
      </div>

      <div className="space-y-3">
         {items.map((item: any, idx: number) => (
            <ChecklistItem 
              key={idx}
              number={idx + 1}
              title={item.title}
              content={item.desc}
              lang={lang}
            />
         ))}
      </div>
    </div>
  );
};

const IndexingGuide = ({ lang }: { lang: Language }) => {
  const t = translations[lang].academy;
  const content = {
    en: {
      steps: [
        { title: "Set up Google Search Console (GSC)", desc: "This is mandatory. Go to search.google.com and verify ownership of your domain." },
        { title: "Create a Sitemap", desc: "If using WordPress, use RankMath or Yoast. It creates a file (usually yoursite.com/sitemap_index.xml) listing all pages." },
        { title: "Submit Sitemap to GSC", desc: "In GSC sidebar, click 'Sitemaps' and paste your sitemap URL. This tells Google your pages exist." },
        { title: "Force Indexing (URL Inspection)", desc: "Paste a specific URL in the top search bar of GSC. If it says 'URL is not on Google', click 'Request Indexing'." },
        { title: "Internal Linking", desc: "Orphan pages (pages with no internal links) are hard to find. Link to your new page from your Homepage." }
      ]
    },
    pt: {
      steps: [
        { title: "Configurar Google Search Console (GSC)", desc: "Obrigatório. Vá para search.google.com e verifique a propriedade do seu domínio." },
        { title: "Criar um Sitemap", desc: "Se usa WordPress, use RankMath ou Yoast. Eles criam um arquivo (seusite.com/sitemap_index.xml) listando suas páginas." },
        { title: "Enviar Sitemap para o GSC", desc: "No menu do GSC, clique em 'Sitemaps' e cole a URL do seu sitemap. Isso avisa ao Google que suas páginas existem." },
        { title: "Forçar Indexação (Inspeção de URL)", desc: "Cole uma URL específica na barra de busca do GSC. Se disser 'A URL não está no Google', clique em 'Solicitar Indexação'." },
        { title: "Linkagem Interna", desc: "Páginas órfãs (sem links) são difíceis de achar. Crie links para sua nova página a partir da Home." }
      ]
    },
    es: { steps: [{ title: "Configurar GSC", desc: "Obligatorio. Verifica tu dominio en search.google.com." }, {title: "Crear Sitemap", desc: "Usa RankMath o Yoast para generar tu sitemap XML."}, {title: "Enviar Sitemap", desc: "En GSC, ve a Sitemaps y envía tu URL."}, {title: "Inspección de URL", desc: "Usa la barra superior de GSC para solicitar indexación manual."}, {title: "Enlaces Internos", desc: "Enlaza tu nuevo contenido desde la página de inicio."}] },
    fr: { steps: [{ title: "Configuration GSC", desc: "Obligatoire. Vérifiez votre domaine sur search.google.com." }, {title: "Créer un Sitemap", desc: "Utilisez RankMath ou Yoast."}, {title: "Soumettre le Sitemap", desc: "Dans GSC, envoyez votre URL de sitemap."}, {title: "Inspection d'URL", desc: "Demandez l'indexation manuelle via la barre de recherche GSC."}, {title: "Maillage Interne", desc: "Liez votre nouveau contenu depuis l'accueil."}] },
    de: { steps: [{ title: "GSC Einrichten", desc: "Verifizieren Sie Ihre Domain auf search.google.com." }, {title: "Sitemap Erstellen", desc: "Nutzen Sie RankMath oder Yoast."}, {title: "Sitemap Einreichen", desc: "Senden Sie Ihre Sitemap-URL in der GSC."}, {title: "URL-Prüfung", desc: "Beantragen Sie die Indexierung manuell."}, {title: "Interne Verlinkung", desc: "Verlinken Sie neue Inhalte von der Startseite."}] },
    it: { steps: [{ title: "Configura GSC", desc: "Obbligatorio. Vai su search.google.com." }, {title: "Crea Sitemap", desc: "Usa RankMath o Yoast."}, {title: "Invia Sitemap", desc: "Invia l'URL della sitemap in GSC."}, {title: "Ispezione URL", desc: "Richiedi indicizzazione manuale."}, {title: "Link Interni", desc: "Collega i nuovi contenuti dalla home."}] },
    zh: { steps: [{ title: "设置 GSC", desc: "必需。前往 search.google.com 验证域名。" }, {title: "创建站点地图", desc: "使用 RankMath 或 Yoast。"}, {title: "提交站点地图", desc: "在 GSC 中提交您的站点地图 URL。"}, {title: "强制索引", desc: "使用 GSC 顶部栏手动请求索引。"}, {title: "内部链接", desc: "从主页链接到新内容。"}] }
  };

  const currentContent = content[lang] || content.en;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
      <div className="bg-emerald-900/20 border border-emerald-900/50 p-6 rounded-xl flex items-start gap-4">
        <Globe className="w-10 h-10 text-emerald-400 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-bold text-white mb-2">How to get on Google</h3>
          <p className="text-slate-300 text-sm">
            Writing content is useless if Google doesn't know it exists. Follow these steps to ensure your site is "Crawled" and "Indexed".
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {currentContent.steps.map((step, idx) => (
          <div key={idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center text-slate-400 font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">{step.title}</h4>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            </div>
            <div className="pl-12">
               <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(step.title + " tutorial")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors bg-red-900/20 hover:bg-red-900/30 px-3 py-1.5 rounded-lg border border-red-500/20"
              >
                <Youtube className="w-3 h-3" />
                {t.btn_watch || "Watch Tutorials"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ViralContentTypes = () => {
  const strategies = [
    { title: "The 'Expert Roundup'", desc: "Ask 10 experts the same question. They will all share the article because they are in it." },
    { title: "The 'Contrarian Opinion'", desc: "Go against a popular belief in your niche. Controversy creates engagement." },
    { title: "The 'Ultimate Data Study'", desc: "Analyze data (or scrape it) to find a new insight. People link to data sources." }
  ];

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
      <div className="bg-purple-900/20 border border-purple-900/50 p-6 rounded-xl flex items-start gap-4">
        <Flame className="w-10 h-10 text-purple-400 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Viral Content Strategies</h3>
          <p className="text-slate-300 text-sm">
            Content designed to get shares and backlinks naturally.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
         {strategies.map((s, i) => (
             <div key={i} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h4 className="font-bold text-white mb-2">{s.title}</h4>
                <p className="text-slate-400 text-sm">{s.desc}</p>
             </div>
         ))}
      </div>
    </div>
  )
}

const GraveyardItem = ({ title, description, reason }: { title: string, description: string, reason: string }) => (
  <div className="bg-slate-900/50 p-6 rounded-xl border border-red-900/30 hover:border-red-500/30 transition-all">
    <div className="flex items-start gap-4">
      <Skull className="w-8 h-8 text-red-500/50 shrink-0 mt-1" />
      <div>
        <h3 className="text-white font-bold text-lg mb-2 decoration-red-500/50 line-through decoration-2">{title}</h3>
        <p className="text-slate-400 text-sm mb-3">{description}</p>
        <div className="bg-red-900/20 p-3 rounded-lg border border-red-900/50">
          <span className="text-red-300 text-xs font-bold uppercase tracking-wider">Why it died:</span>
          <p className="text-slate-300 text-sm mt-1">{reason}</p>
        </div>
      </div>
    </div>
  </div>
);

const SeoGraveyard = () => (
  <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-2">
    <div className="bg-red-900/20 border border-red-900/50 p-6 rounded-xl flex items-start gap-4">
        <Skull className="w-10 h-10 text-red-500 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-bold text-white mb-2">SEO Graveyard</h3>
          <p className="text-slate-300 text-sm">Techniques that no longer work (and might get you penalized).</p>
        </div>
    </div>
    <GraveyardItem 
        title="Keyword Stuffing" 
        description="Repeating keywords unnaturally." 
        reason="Google's Hummingbird update understands context now." 
    />
      <GraveyardItem 
        title="PBNs (Public Blog Networks)" 
        description="Buying links from fake blog networks." 
        reason="Easy footprint to detect. Results in deindexing." 
    />
      <GraveyardItem 
        title="Article Spinning" 
        description="Using software to rewrite one article 100 times." 
        reason="Google detects duplicate content patterns easily." 
    />
  </div>
);

export default SeoAcademy;