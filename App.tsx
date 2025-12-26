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
  const [language, setLanguage] = useState<Language>('pt'); 
  const [showTour, setShowTour] = useState(false);

  // MECANISMO DE SEGURANÇA: Garante que 't' nunca seja undefined
  // Se translations[language] falhar, ele tenta 'pt', se falhar, pega o primeiro disponível
  const t = translations[language] || translations['pt'] || Object.values(translations)[0];

  const startTour = () => {
    setCurrentView(AppView.DASHBOARD);
    setShowTour(true);
    setMobileMenuOpen(false);
  };

  // Fecha menu mobile ao navegar
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentView]);

  const NavItem = ({ view, icon: Icon, label }: { view: AppView, icon: any, label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        currentView === view 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-inter">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900 border-r border-slate-800 overflow-y-auto">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">{t.nav?.title || "Backlinks Magia"}</h1>
          </div>
          <p className="text-xs text-indigo-400 font-black uppercase tracking-widest">{t.nav?.subtitle}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem view={AppView.DASHBOARD} icon={LayoutDashboard} label={t.nav?.dashboard} />
          <NavItem view={AppView.WHY_BACKLINKS} icon={Star} label={t.nav?.why_us} />
          
          <div className="pt-4 pb-2 px-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{t.nav?.tools}</span>
          </div>
          
          <NavItem view={AppView.STRATEGY_WIZARD} icon={ShieldAlert} label={t.nav?.wizard} />
          <NavItem view={AppView.KEYWORDS} icon={Target} label={t.nav?.keywords} />
          <NavItem view={AppView.SERP_ARMOR_BREAKER} icon={Zap} label={t.nav?.kgr} />
          <NavItem view={AppView.ONPAGE_ANALYZER} icon={ScanSearch} label={t.nav?.onpage} />
          <NavItem view={AppView.PROMPT_LIBRARY} icon={Bot} label={t.nav?.prompts} />
          <NavItem view={AppView.TRACKING} icon={LineChart} label={t.nav?.tracking} />
          <NavItem view={AppView.CONTENT_MAGIC} icon={Wand2} label={t.nav?.content} />
          <NavItem view={AppView.OPPORTUNITIES} icon={Telescope} label={t.opportunities} />
          <NavItem view={AppView.OUTREACH} icon={SendHorizontal} label={t.nav?.outreach} />

          <div className="pt-4 pb-2 px-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{t.nav?.learn}</span>
          </div>
          
          <NavItem view={AppView.ACADEMY} icon={BookOpen} label={t.nav?.academy} />
          <NavItem view={AppView.EXTRA_INCOME} icon={Coins} label={t.nav?.extra} />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={startTour}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Help Tour</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header Mobile */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Swords className="w-6 h-6 text-indigo-500" />
            <span className="font-bold">{t.nav?.title}</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-400">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* View Renderer */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto pb-20 lg:pb-0">
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

      {/* Tour Overlay */}
      {showTour && (
        <div className="fixed inset-0 z-[100]">
          <OnboardingTour 
            lang={language} 
            isOpen={showTour} 
            onClose={() => setShowTour(false)} 
            onNavigate={setCurrentView} 
          />
        </div>
      )}
    </div>
  );
};

export default App;

