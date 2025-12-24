import React, { useState } from 'react';
import { Compass, HelpCircle, AlertTriangle, Play, TrendingUp, Search, Target, Mail, Calculator, Wand2, ArrowRight, CheckCircle2, ShieldCheck, LineChart, Swords, Zap, Radar, Terminal, Copy } from 'lucide-react';
import { AppView, Language } from '../types';
import { translations } from '../utils/translations';

interface StrategyWizardProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
}

type ScenarioId = 'not_indexed' | 'new_project' | 'youtube' | 'growth' | 'site_audit';

const StrategyWizard: React.FC<StrategyWizardProps> = ({ lang, onNavigate }) => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId | null>(null);
  const [manualJson, setManualJson] = useState('');
  const t = translations[lang].wizard;

  const SCENARIOS = [
    {
      id: 'new_project',
      title: "Dominação de Nicho Novo",
      description: "Como começar do zero e encontrar as primeiras fendas na armadura dos concorrentes.",
      icon: Radar,
      color: "text-emerald-400 bg-emerald-400"
    },
    {
      id: 'growth',
      title: "Escalada de Autoridade",
      description: "Você já tem tráfego, agora vamos atropelar os gigantes com o algoritmo SAB.",
      icon: TrendingUp,
      color: "text-indigo-400 bg-indigo-400"
    }
  ];

  // O Oráculo de Estratégia
  const copiarPromptEstrategia = () => {
    const prompt = `Atue como um General de SEO. 
Cenário: "${selectedScenario}". 
Objetivo: Criar um plano de 90 dias focado no algoritmo SerpArmorBreaker (SAB).

O plano deve incluir:
1. Fase de Reconhecimento (Keyword Researcher).
2. Fase de Invasão (SAB Analyzer para identificar Top 5 fraco).
3. Fase de Fortificação (On-Page Strategist).
4. Fase de Aliança (Outreach Assistant).

SAÍDA EM JSON:
{
  "planTitle": "Plano de Ataque: ...",
  "steps": [
    { "step": 1, "action": "Ação...", "tool": "SAB Analyzer" }
  ]
}`;
    navigator.clipboard.writeText(prompt);
    alert("Plano de Ataque Gerado! Leve ao Gemini.");
  };

  const renderActionPlan = () => {
    // Aqui renderizamos os cards de passo a passo usando as novas ferramentas
    return (
      <div className="space-y-4">
        <StepCard 
          step="01"
          title="Reconhecimento de Terreno"
          description="Use o Keyword Researcher para encontrar termos de baixa concorrência e alto interesse."
          icon={Search}
          onClick={() => onNavigate(AppView.KEYWORDS)}
        />
        <StepCard 
          step="02"
          title="Ataque SAB (Serp Armor Breaker)"
          description="Valide se o Top 5 possui sites fracos, fóruns ou brechas de autoridade. Ignore o KGR antigo."
          icon={Swords}
          onClick={() => onNavigate(AppView.KGR_CALC)} // Link para o novo SAB
        />
        <StepCard 
          step="03"
          title="Fortificação On-Page"
          description="Use o On-Page Strategist para garantir que seu conteúdo é semanticamente superior ao dos rivais."
          icon={Target}
          onClick={() => onNavigate(AppView.ONPAGE_ANALYZER)}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER E SELEÇÃO */}
      {!selectedScenario ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedScenario(s.id as ScenarioId)}
              className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-all text-left group"
            >
              <div className={`w-14 h-14 rounded-xl ${s.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <s.icon className={`w-8 h-8 ${s.color.split(' ')[0]}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
              <div className="mt-6 flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest">
                Iniciar Planejamento <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800 p-8 rounded-2xl border border-indigo-500 shadow-2xl animate-in zoom-in duration-300">
           <button 
            onClick={() => setSelectedScenario(null)}
            className="mb-6 text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
          >
            ← Voltar para Cenários
          </button>

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white uppercase italic flex items-center gap-3">
              <Zap className="text-yellow-400" /> Plano de Dominação SAB
            </h2>
            <button onClick={copiarPromptEstrategia} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
              <Copy className="w-4 h-4" /> PEDIR PLANO AO ORÁCULO
            </button>
          </div>

          {renderActionPlan()}
        </div>
      )}
    </div>
  );
};

const StepCard = ({ step, title, description, icon: Icon, onClick }: any) => (
  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row md:items-center gap-6 hover:border-indigo-500/50 transition-all group">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-indigo-400 font-black text-lg group-hover:bg-indigo-600 group-hover:text-white transition-all">
      {step}
    </div>
    <div className="flex-1 text-left">
      <h4 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight">
        {title}
      </h4>
      <p className="text-slate-400 text-sm mt-1 leading-relaxed">{description}</p>
    </div>
    <button 
      onClick={onClick}
      className="flex-shrink-0 bg-slate-800 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all border border-slate-700"
    >
      Abrir Ferramenta
    </button>
  </div>
);

export default StrategyWizard;