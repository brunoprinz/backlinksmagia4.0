import React, { useState } from 'react';
import { 
  Compass, HelpCircle, AlertTriangle, Play, TrendingUp, Search, Target, 
  Mail, Calculator, Wand2, ArrowRight, CheckCircle2, ShieldCheck, 
  LineChart, Swords, Zap, Radar, Terminal, Copy, Youtube, Video, 
  Globe, MessageSquare, Star
} from 'lucide-react';
import { AppView, Language } from '../types';
import { translations } from '../utils/translations';

interface StrategyWizardProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
}

type ScenarioId = 'not_indexed' | 'new_project' | 'youtube' | 'growth' | 'site_audit';

const StrategyWizard: React.FC<StrategyWizardProps> = ({ lang, onNavigate }) => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId | null>(null);
  const t = translations[lang].wizard;

  // Textos Dinâmicos para os Cenários (PT/EN)
  const scenarioInfo = {
    pt: {
      new_project: { title: "Nicho Novo (SAB)", desc: "Como começar do zero e encontrar as primeiras fendas na armadura." },
      growth: { title: "Escalada de Autoridade", desc: "Você já tem tráfego, agora vamos atropelar os gigantes." },
      not_indexed: { title: "Resgate de Indexação", desc: "Seu site não aparece no Google? Vamos resolver o bloqueio." },
      site_audit: { title: "Auditoria de Elite", desc: "Analise por que você parou de subir e onde estão os erros." },
      youtube: { title: "YouTube Domination", desc: "Crie autoridade com vídeos sem precisar de um blog agora." },
      back_btn: "← Voltar ao Início",
      mission_title: "Plano de Dominação SAB",
      ask_oracle: "PEDIR PLANO AO ORÁCULO"
    },
    en: {
      new_project: { title: "New Niche (SAB)", desc: "Start from scratch and find the first armor breaches in your niche." },
      growth: { title: "Authority Scaling", desc: "You already have traffic, now let's crush the giants with SAB." },
      not_indexed: { title: "Indexing Rescue", desc: "Your site isn't showing up? Let's fix the bot blockage." },
      site_audit: { title: "Elite Audit", desc: "Analyze why your rankings stalled and where the errors are." },
      youtube: { title: "YouTube Domination", desc: "Build authority with video without needing a blog right now." },
      back_btn: "← Back to Start",
      mission_title: "SAB Domination Plan",
      ask_oracle: "ASK THE ORACLE FOR PLAN"
    }
  }[lang];

  const SCENARIOS = [
    { id: 'new_project', icon: Radar, color: "text-emerald-400" },
    { id: 'growth', icon: TrendingUp, color: "text-indigo-400" },
    { id: 'youtube', icon: Youtube, color: "text-red-500" },
    { id: 'not_indexed', icon: AlertTriangle, color: "text-amber-500" },
    { id: 'site_audit', icon: ShieldCheck, color: "text-blue-400" },
  ];

  const copiarPromptEstrategia = () => {
    const prompt = `Você é o Oráculo SAB do Backlinks Magia.
Cenário Atual: "${scenarioInfo.youtube.title}"
Minha Missão: [DESCREVA SEU OBJETIVO AQUI]

Crie um Plano de Batalha de 5 passos focado em encontrar vulnerabilidades competitivas e quebrar a armadura da SERP/YouTube.
Retorne um checklist acionável.`;
    navigator.clipboard.writeText(prompt);
    alert(lang === 'en' ? "Mission copied! Paste it in Gemini." : "Missão copiada! Cole no Gemini para o plano detalhado.");
  };

  const renderActionPlan = () => {
    switch (selectedScenario) {
      case 'youtube':
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <StepCard 
              step="01" 
              title={lang === 'en' ? "SAB Video Research" : "Pesquisa de Vídeo SAB"} 
              description={lang === 'en' ? "Search keywords on Google. If a video is in the Top 3, it's an armor breach you can exploit." : "Pesquise keywords no Google. Se houver um vídeo no Top 3, é uma fenda de armadura que você pode explorar."}
              icon={Search}
              onClick={() => onNavigate('keyword-research')}
            />
            <StepCard 
              step="02" 
              title={lang === 'en' ? "Elite Scripting" : "Roteirização de Elite"} 
              description={lang === 'en' ? "Use Content Magician to create a script with psychological hooks and semantic entities." : "Use o Mago do Conteúdo para criar um roteiro com ganchos psicológicos e entidades semânticas."}
              icon={Wand2}
              onClick={() => onNavigate('content-magician')}
            />
            <StepCard 
              step="03" 
              title={lang === 'en' ? "Video SEO Boost" : "Impulso de SEO no Vídeo"} 
              description={lang === 'en' ? "Optimize Title, Description and Tags using keywords found in the SAB module." : "Otimize Título, Descrição e Tags usando as keywords encontradas no módulo SAB."}
              icon={Target}
              onClick={() => onNavigate('keyword-research')}
            />
            <StepCard 
              step="04" 
              title={lang === 'en' ? "Social Signals & Backlinks" : "Sinais Sociais & Backlinks"} 
              description={lang === 'en' ? "Share the video URL in the Outreach module to gain initial authority embeds." : "Compartilhe a URL do vídeo no módulo Outreach para ganhar embeds e autoridade inicial."}
              icon={Mail}
              onClick={() => onNavigate('outreach')}
            />
          </div>
        );
      case 'new_project':
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <StepCard step="01" title="Mapear Vulnerabilidades" description="Use o Keyword Researcher para encontrar termos 'AllInTitle' baixos." icon={Search} onClick={() => onNavigate('keyword-research')} />
            <StepCard step="02" title="Explorar Fendas (SAB)" description="Verifique se o Top 10 tem fóruns ou sites irrelevantes." icon={Swords} onClick={() => onNavigate('kgr-calculator')} />
            <StepCard step="03" title="Conteúdo Skyscraper" description="Crie algo 10x melhor que o atual Top 1 com o Mago do Conteúdo." icon={Wand2} onClick={() => onNavigate('content-magician')} />
          </div>
        );
      // ... (outros cases seguem a mesma lógica simplificada)
      default:
        return <div className="text-slate-500 italic p-10 text-center">Plano em fase de calibração mística...</div>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {!selectedScenario ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCENARIOS.map((s) => {
            const Icon = s.icon;
            const info = (scenarioInfo as any)[s.id];
            return (
              <button
                key={s.id}
                onClick={() => setSelectedScenario(s.id as ScenarioId)}
                className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:border-indigo-500/50 transition-all group text-left relative overflow-hidden flex flex-col h-full"
              >
                <div className={`p-4 rounded-2xl bg-slate-900 mb-6 w-fit ${s.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white uppercase italic mb-3 tracking-tighter">{info.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{info.desc}</p>
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  {lang === 'en' ? "Consult Oracle" : "Consultar Oráculo"} <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-md">
          <button 
            onClick={() => setSelectedScenario(null)}
            className="mb-8 text-slate-400 hover:text-white flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> {scenarioInfo.back_btn}
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-slate-700 pb-8">
            <h2 className="text-3xl font-black text-white uppercase italic flex items-center gap-3 tracking-tighter">
              <Zap className="text-indigo-500 fill-indigo-500 w-8 h-8" /> {scenarioInfo.mission_title}
            </h2>
            <div className="flex gap-3 w-full md:w-auto">
                <button onClick={copiarPromptEstrategia} className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
                <Copy className="w-4 h-4" /> {scenarioInfo.ask_oracle}
                </button>
                <button onClick={() => window.open('https://gemini.google.com/app', '_blank')} className="bg-white text-slate-900 px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all shadow-lg">
                <Terminal className="w-4 h-4 text-indigo-600" /> GEMINI
                </button>
            </div>
          </div>

          <div className="max-w-3xl">
            {renderActionPlan()}
          </div>
        </div>
      )}
    </div>
  );
};

const StepCard = ({ step, title, description, icon: Icon, onClick }: any) => (
  <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center gap-6 hover:border-indigo-500/30 transition-all group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-2 opacity-5">
        <Icon className="w-16 h-16" />
    </div>
    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-black text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
      {step}
    </div>
    <div className="flex-1 text-left relative z-10">
      <h4 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tight mb-1">
        {title}
      </h4>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
    <button 
      onClick={onClick}
      className="flex-shrink-0 bg-slate-800 hover:bg-indigo-600 text-white p-3 rounded-xl transition-all shadow-lg border border-slate-700 hover:border-indigo-500"
    >
      <ArrowRight className="w-5 h-5" />
    </button>
  </div>
);

export default StrategyWizard;