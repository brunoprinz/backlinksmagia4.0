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
import OnPageAnalyzer from './components/OnPageAnalyzer';
import ExtraIncomeGuide from './components/ExtraIncomeGuide';
import PromptLibrary from './components/PromptLibrary';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('pt'); 

  const t = translations[language].nav;

  // Componente de Item de Navegação Interno
  const NavItem = ({ view, icon: Icon, label, active: propActive, onClick: propOnClick }: any) => {
    const isActive = propActive !== undefined ? propActive : currentView === view;
    const handleClick = () => {
      if (propOnClick) propOnClick();
      else setCurrentView(view);
      setMobileMenuOpen(false);
    };

    return (
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
          isActive 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
        }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-indigo-400'}`} />
        <span className="font-bold text-sm uppercase tracking-tight">{label}</span>
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
      
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-950 border-r border-slate-800">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20">
            <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <h1 className="text-xl font-black tracking-tighter italic uppercase">MarketPulse <span className="text-indigo-500">AI</span></h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          <NavItem 
            active={currentView === AppView.STRATEGY_WIZARD} 
            onClick={() => setCurrentView(AppView.STRATEGY_WIZARD)} 
            icon={Compass} 
            label={language === 'pt' ? "Oráculo SAB" : "SAB Oracle"} 
          />
          
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mt-6 mb-2">
            {language === 'pt' ? "Arsenal de Guerra" : "War Arsenal"}
          </div>

          <NavItem view={AppView.KEYWORDS} icon={Target} label={language === 'pt' ? "Pesquisa SAB" : "SAB Research"} />
          <NavItem view={AppView.SERP_ARMOR_BREAKER} icon={Swords} label="Armor Breaker" />
          <NavItem view={AppView.ONPAGE_ANALYZER} icon={ScanSearch} label={language === 'pt' ? "Auditoria Semântica" : "Semantic Audit"} />
          
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mt-6 mb-2">
            {language === 'pt' ? "Escalada & Ganho" : "Scaling & Profit"}
          </div>

          <NavItem view={AppView.CONTENT_MAGIC} icon={Wand2} label={t.content} />
          <NavItem view={AppView.OUTREACH} icon={SendHorizontal} label={t.outreach} />
          <NavItem view={AppView.EXTRA_INCOME} icon={Coins} label={t.extra} />
          <NavItem view={AppView.ACADEMY} icon={BookOpen} label="SEO Academy" />
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Seletor de Idioma Flutuante */}
        <div className="absolute top-6 right-8 z-50">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-slate-800 border border-slate-700 text-white text-xs font-bold py-2 px-3 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="pt">PT-BR</option>
            <option value="en">EN-US</option>
          </select>
        </div>

        <div className="p-4 lg:p-8 pt-20 lg:pt-8">
          {currentView === AppView.DASHBOARD && <Dashboard lang={language} onNavigate={setCurrentView} />}
          {currentView === AppView.STRATEGY_WIZARD && <StrategyWizard lang={language} onNavigate={setCurrentView} />}
          {currentView === AppView.OPPORTUNITIES && <OpportunityFinder lang={language} />}
          {currentView === AppView.KEYWORDS && <KeywordResearcher lang={language} onNavigate={setCurrentView} />}
          {currentView === AppView.SERP_ARMOR_BREAKER && <SerpArmorBreaker lang={language} />}
          {currentView === AppView.ONPAGE_ANALYZER && <OnPageAnalyzer lang={language} />}
          {currentView === AppView.CONTENT_MAGIC && <ContentMagician lang={language} />}
          {currentView === AppView.OUTREACH && <OutreachAssistant lang={language} />}
          {currentView === AppView.ACADEMY && <SeoAcademy lang={language} />}
          {currentView === AppView.EXTRA_INCOME && <ExtraIncomeGuide lang={language} />}
          {currentView === AppView.PROMPT_LIBRARY && <PromptLibrary lang={language} />}
          {currentView === AppView.TRACKING && <BacklinkTracker lang={language} />}
        </div>
      </main>
    </div>
  );
};

export default App; // Imprescindível para o index.tsx encontrar o componente