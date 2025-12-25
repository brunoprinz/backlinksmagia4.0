import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Telescope, Wand2, SendHorizontal, Menu, X, 
  Target, BookOpen, LineChart, Compass, Globe, HelpCircle, 
  ScanSearch, Coins, Bot, Star, Swords, ShieldAlert, Zap 
} from 'lucide-react';
import { AppView, Language } from './types';
import { translations } from './utils/translations';

// Importação das Telas
import Dashboard from './components/Dashboard';
import OpportunityFinder from './components/OpportunityFinder';
import ContentMagician from './components/ContentMagician';
import OutreachAssistant from './components/OutreachAssistant';
import KeywordResearcher from './components/KeywordResearcher';
import SeoAcademy from './components/SeoAcademy';
import BacklinkTracker from './components/BacklinkTracker';
import SerpArmorBreaker from './components/SerpArmorBreaker';
import StrategyWizard from './components/StrategyWizard';
import OnboardingTour from './components/OnboardingTour';
import OnPageAnalyzer from './components/OnPageAnalyzer';
import ExtraIncomeGuide from './components/ExtraIncomeGuide';
import PromptLibrary from './components/PromptLibrary';
import WhyBacklinksMagia from './components/WhyBacklinksMagia';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Importante: use 'pt-BR' se for o padrão do seu novo types.ts
  const [language, setLanguage] = useState<Language>('pt-BR' as Language); 
  const [showTour, setShowTour] = useState(false);

  // Fallback de segurança para evitar tela azul caso a tradução falhe
  const t = translations[language]?.nav || translations['en'].nav;

  // Lógica para mostrar o tour automaticamente na primeira vez
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTourV4');
    if (!hasSeenTour) {
      // Pequeno delay para a página carregar visualmente antes do tour
      const timer = setTimeout(() => setShowTour(true), 1500);
      localStorage.setItem('hasSeenTourV4', 'true');
      return () => clearTimeout(timer);
    }
  }, []);

  const startTour = () => {
    setMobileMenuOpen(false);
    setShowTour(true);
  };

  const NavItem = ({ view, icon: Icon, label }: { view: AppView, icon: any, label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        currentView === view 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      <Icon className={`w-5 h-5 ${currentView === view ? 'text-white' : 'group-hover:text-indigo-400'}`} />
      <span className="font-bold text-sm uppercase tracking-tight">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      
      {/* Sidebar (Desktop & Mobile Base) */}
      <aside className={`
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 fixed lg:static inset-0 z-50
        flex flex-col w-72 bg-slate-900 border-r border-slate-800 transition-transform duration-300 overflow-y-auto custom-scrollbar
      `}>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-900/40">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">
              {t.title}
            </h1>
          </div>
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] px-1">
            {t.subtitle}
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <div className="pb-4">
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{t.startHere}</p>
            <NavItem view={AppView.DASHBOARD} icon={LayoutDashboard} label={t.dashboard} />
            <NavItem view={AppView.WHY_BACKLINKS} icon={Star} label={t.why_us} />
          </div>

          <div className="py-4 border-t border-slate-800/50">
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{t.tools}</p>
            <NavItem view={AppView.STRATEGY_WIZARD} icon={ShieldAlert} label={t.wizard} />
            <NavItem view={AppView.KEYWORDS} icon={Target} label={t.keywords} />
            <NavItem view={AppView.SERP_ARMOR_BREAKER} icon={Zap} label={t.kgr} />
            <NavItem view={AppView.OPPORTUNITIES} icon={Telescope} label={t.opportunities} />
            <NavItem view={AppView.ONPAGE_ANALYZER} icon={ScanSearch} label={t.onpage} />
            <NavItem view={AppView.CONTENT_MAGIC} icon={Wand2} label={t.content} />
            <NavItem view={AppView.OUTREACH} icon={SendHorizontal} label={t.outreach} />
            <NavItem view={AppView.TRACKING} icon={LineChart} label={t.tracking} />
          </div>

          <div className="py-4 border-t border-slate-800/50">
            <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{t.learn}</p>
            <NavItem view={AppView.ACADEMY} icon={BookOpen} label={t.academy} />
            <NavItem view={AppView.PROMPT_LIBRARY} icon={Bot} label={t.prompts} />
            <NavItem view={AppView.EXTRA_INCOME} icon={Coins} label={t.extra} />
          </div>
          
          <div className="pt-4 border-t border-slate-800 mt-4 mb-8">
            <button 
              onClick={startTour}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all group"
            >
              <HelpCircle className="w-5 h-5 group-hover:text-indigo-400" />
              <span className="font-bold text-sm uppercase tracking-tight text-left">Tour de Ajuda</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 z-50">
          <div className="flex items-center gap-2">
            <Swords className="w-6 h-6 text-indigo-500" />
            <span className="font-black text-white uppercase italic">{t.title}</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-400">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Language Selector Overlay */}
        <div className="absolute top-4 right-8 z-40 hidden lg:block">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold rounded-lg px-3 py-2 outline-none focus:border-indigo-500 uppercase"
          >
            <option value="pt">PT</option>
            <option value="en">EN-US</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="it">IT</option>
            <option value="de">DE</option>
            <option value="pt-pt">PT-PT</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 pt-20 lg:pt-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {currentView === AppView.DASHBOARD && <Dashboard lang={language} onNavigate={setCurrentView} />}
            {currentView === AppView.WHY_BACKLINKS && <WhyBacklinksMagia lang={language} />}
            {currentView === AppView.STRATEGY_WIZARD && <StrategyWizard lang={language} onNavigate={setCurrentView} />}
            {currentView === AppView.OPPORTUNITIES && <OpportunityFinder lang={language} />}
            {currentView === AppView.KEYWORDS && <KeywordResearcher lang={language} onNavigate={setCurrentView} />}
            {currentView === AppView.SERP_ARMOR_BREAKER && <SerpArmorBreaker lang={language} />}
            {currentView === AppView.ONPAGE_ANALYZER && <OnPageAnalyzer lang={language} />}
            {currentView === AppView.CONTENT_MAGIC && <ContentMagician lang={language} />}
            {currentView === AppView.OUTREACH && <OutreachAssistant lang={language} />}
            {currentView === AppView.ACADEMY && <SeoAcademy lang={language} />}
            {currentView === AppView.TRACKING && <BacklinkTracker lang={language} />}
            {currentView === AppView.EXTRA_INCOME && <ExtraIncomeGuide lang={language} />}
            {currentView === AppView.PROMPT_LIBRARY && <PromptLibrary lang={language} />}
          </div>
        </div>
      </main>

      {/* Onboarding Tour Component */}
      {showTour && (
        <div className="fixed inset-0 z-[100]">
          <OnboardingTour lang={language} onClose={() => setShowTour(false)} />
        </div>
      )}
    </div>
  );
};

export default App;