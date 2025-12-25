import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Telescope, Wand2, SendHorizontal, Menu, X, Target, BookOpen, LineChart, Calculator, Compass, Globe, HelpCircle, ScanSearch, Coins, Bot, Star } from 'lucide-react';
import { AppView, Language } from './types';
import { translations } from './utils/translations';
import Dashboard from './components/Dashboard';
import OpportunityFinder from './components/OpportunityFinder';
import ContentMagician from './components/ContentMagician';
import OutreachAssistant from './components/OutreachAssistant';
import KeywordResearcher from './components/KeywordResearcher';
import SeoAcademy from './components/SeoAcademy';
import BacklinkTracker from './components/BacklinkTracker';
import SerpArmorBreak from './components/SerpArmorBreaker';
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

  const t = translations[language].sidebar;

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('bm_tour_seen');
    if (!hasSeenTour) {
      // Small delay to ensure render is complete
      setTimeout(() => setShowTour(true), 500);
    }
  }, []);

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const startTour = () => {
    setShowTour(true);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard lang={language} onNavigate={handleNavigate} />;
      case AppView.STRATEGY_WIZARD:
        return <StrategyWizard lang={language} onNavigate={handleNavigate} />;
      case AppView.WHY_US:
        return <WhyBacklinksMagia lang={language} />;
      case AppView.OPPORTUNITIES:
        return <OpportunityFinder lang={language} />;
      case AppView.KEYWORDS:
        return <KeywordResearcher lang={language} onNavigate={handleNavigate} />;
      case AppView.CONTENT_MAGIC:
        return <ContentMagician lang={language} />;
      case AppView.OUTREACH:
        return <OutreachAssistant lang={language} />;
      case AppView.ACADEMY:
        return <SeoAcademy lang={language} />;
      case AppView.TRACKING:
        return <BacklinkTracker lang={language} />;
      case AppView.KGR_CALCULATOR:
        return <KgrCalculator lang={language} />;
      case AppView.ONPAGE_ANALYZER:
        return <OnPageAnalyzer lang={language} />;
      case AppView.EXTRA_INCOME:
        return <ExtraIncomeGuide lang={language} />;
      case AppView.PROMPT_LIBRARY:
        return <PromptLibrary lang={language} />;
      default:
        return <Dashboard lang={language} onNavigate={handleNavigate} />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: AppView, icon: any, label: string }) => (
    <button
      onClick={() => handleNavigate(view)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        currentView === view
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-100 overflow-hidden font-sans">
      <OnboardingTour 
        lang={language} 
        isOpen={showTour} 
        onClose={() => setShowTour(false)} 
        onNavigate={setCurrentView}
      />

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 bg-slate-900 p-6 z-20">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <div>
             <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {t.title}
            </span>
            <p className="text-[10px] text-slate-500">{t.subtitle}</p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-6">
           <div className="bg-slate-800 p-1 rounded-lg grid grid-cols-4 gap-1 border border-slate-700">
              {(['en', 'pt', 'es', 'fr', 'de', 'it', 'pt-pt', 'zh'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-[10px] font-bold py-1.5 rounded uppercase transition-colors ${
                      language === lang ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title={lang === 'pt-pt' ? 'Português (Portugal)' : lang}
                >
                  {lang === 'pt-pt' ? 'PT-PT' : lang}
                </button>
              ))}
           </div>
        </div>

        <nav className="space-y-1 flex-1 overflow-y-auto scrollbar-thin">
          <NavItem view={AppView.DASHBOARD} icon={LayoutDashboard} label={t.dashboard} />
          <div className="pb-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4 pt-4">{t.startHere}</div>
            <NavItem view={AppView.STRATEGY_WIZARD} icon={Compass} label={t.wizard} />
            <NavItem view={AppView.WHY_US} icon={Star} label={t.why_us} />
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4 pt-2">{t.tools}</div>
          <NavItem view={AppView.OPPORTUNITIES} icon={Telescope} label={t.opportunities} />
          <NavItem view={AppView.KEYWORDS} icon={Target} label={t.keywords} />
          <NavItem view={AppView.SERP_ARMOR_BREAKER} icon={Zap} label={t.kgr} />
          <NavItem view={AppView.ONPAGE_ANALYZER} icon={ScanSearch} label={t.onpage} />
          <NavItem view={AppView.PROMPT_LIBRARY} icon={Bot} label={t.prompts} />
          <NavItem view={AppView.TRACKING} icon={LineChart} label={t.tracking} />
          <NavItem view={AppView.CONTENT_MAGIC} icon={Wand2} label={t.content} />
          <NavItem view={AppView.OUTREACH} icon={SendHorizontal} label={t.outreach} />
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4 pt-4">{t.learn}</div>
          <NavItem view={AppView.ACADEMY} icon={BookOpen} label={t.academy} />
          <NavItem view={AppView.EXTRA_INCOME} icon={Coins} label={t.extra} />
        </nav>

        <div className="pt-4 mt-2 border-t border-slate-800">
          <button 
             onClick={startTour}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
             <HelpCircle className="w-5 h-5" />
             <span className="font-medium">Help Tour</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900 z-10">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold">{t.title}</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-slate-900 z-20 p-6 animate-in slide-in-from-right overflow-y-auto">
             <div className="flex justify-between mb-6">
                 {/* Mobile Lang Selector */}
                 <div className="grid grid-cols-4 gap-2 w-full max-w-[280px]">
                    {(['en', 'pt', 'es', 'fr', 'de', 'it', 'pt-pt', 'zh'] as Language[]).map((lang) => (
                       <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`h-8 rounded border flex items-center justify-center text-[10px] font-bold uppercase ${
                             language === lang ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-700 text-slate-400'
                          }`}
                       >
                          {lang === 'pt-pt' ? 'PT-PT' : lang}
                       </button>
                    ))}
                 </div>
                 <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-300 ml-2">
                    <X />
                 </button>
             </div>
             <nav className="space-y-2">
                <NavItem view={AppView.DASHBOARD} icon={LayoutDashboard} label={t.dashboard} />
                <NavItem view={AppView.STRATEGY_WIZARD} icon={Compass} label={t.wizard} />
                <NavItem view={AppView.WHY_US} icon={Star} label={t.why_us} />
                <NavItem view={AppView.OPPORTUNITIES} icon={Telescope} label={t.opportunities} />
                <NavItem view={AppView.KEYWORDS} icon={Target} label={t.keywords} />
                <NavItem view={AppView.SERP_ARMOR_BREAK} icon={Zap} label={t.kgr} />
                <NavItem view={AppView.ONPAGE_ANALYZER} icon={ScanSearch} label={t.onpage} />
                <NavItem view={AppView.PROMPT_LIBRARY} icon={Bot} label={t.prompts} />
                <NavItem view={AppView.TRACKING} icon={LineChart} label={t.tracking} />
                <NavItem view={AppView.CONTENT_MAGIC} icon={Wand2} label={t.content} />
                <NavItem view={AppView.OUTREACH} icon={SendHorizontal} label={t.outreach} />
                <NavItem view={AppView.ACADEMY} icon={BookOpen} label={t.academy} />
                <NavItem view={AppView.EXTRA_INCOME} icon={Coins} label={t.extra} />
                
                <div className="pt-4 border-t border-slate-800 mt-4">
                  <button 
                    onClick={startTour}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
                  >
                    <HelpCircle className="w-5 h-5" />
                    <span className="font-medium">Help Tour</span>
                  </button>
                </div>
            </nav>
          </div>
        )}

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 relative scrollbar-thin">
           <div className="max-w-7xl mx-auto">
             {renderContent()}
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;