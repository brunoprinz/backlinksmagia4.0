import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Telescope, Wand2, SendHorizontal, Menu, X, 
  Target, BookOpen, LineChart, Compass, Globe, HelpCircle, 
  ScanSearch, Coins, Bot, Star, Swords, ShieldAlert, Zap 
} from 'lucide-react';
// ... outros imports

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [language, setLanguage] = useState<Language>('pt'); 
  const t = translations[language].nav; // Supondo que você renomeou a chave no translation.ts

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* SIDEBAR */}
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
            label={language === 'pt' ? "Oráculo Estratégico" : "Strategy Oracle"} 
          />
          
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mt-6 mb-2">
            {language === 'pt' ? "Arsenal de Guerra" : "War Arsenal"}
          </div>

          <NavItem view={AppView.KEYWORDS} icon={Target} label={language === 'pt' ? "Pesquisa SAB" : "SAB Research"} />
          <NavItem 
            view={AppView.SERP_ARMOR_BREAKER} 
            icon={Swords} 
            label={language === 'pt' ? "Armor Breaker" : "Armor Breaker"} 
          />
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

      {/* ÁREA DE CONTEÚDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto">
        {currentView === AppView.STRATEGY_WIZARD && <StrategyWizard lang={language} onNavigate={setCurrentView} />}
        {currentView === AppView.SERP_ARMOR_BREAKER && <SerpArmorBreaker lang={language} />}
        {/* ... outras renderizações condicionais */}
      </main>
    </div>
  );
};