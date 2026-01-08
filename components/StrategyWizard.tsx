import React, { useState } from 'react';
import { 
  Compass, HelpCircle, AlertTriangle, TrendingUp, Search, Target, 
  Mail, Wand2, ArrowRight, ShieldCheck, 
  LineChart, Swords, Zap, Radar, Terminal, Copy, Youtube, 
  ScanSearch, BarChart3
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
      new_project: { title: "New Niche (SAB)", desc: "Start from scratch and find the first armor breaches." },
      growth: { title: "Authority Scaling", desc: "You already have traffic, now let's crush the giants with SAB." },
      not_indexed: { title: "Indexing Rescue", desc: "Site isn't showing up? Let's fix the bot blockage." },
      site_audit: { title: "Elite Audit", desc: "Analyze why rankings stalled and where the errors are." },
      youtube: { title: "YouTube Domination", desc: "Build authority with video without needing a blog." },
      back_btn: "← Back to Start",
      mission_title: "SAB Domination Plan",
      ask_oracle: "ASK THE ORACLE"
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
    const subtopicosMap: Record<string, string> = {
      new_project: "FOCO: Mapear Vulnerabilidades (AllInTitle), Explorar Fendas (Fóruns/Low DA) e Conteúdo Skyscraper.",
      youtube: "FOCO: Pesquisa de Vídeo SAB, Roteirização de Elite, SEO On-Video e Sinais Sociais.",
      growth: "FOCO: Atropelar Gigantes, Expansão de Autoridade Tópica e Backlinks de Contexto.",
      not_indexed: "FOCO: Resgate de Indexação, Bloqueios de Crawler e Diagnóstico de Autoridade.",
      site_audit: "FOCO: Auditoria de Elite, Gaps de Conteúdo e Otimização de Arquitetura Semântica."
    };

    const cenarioNome = (scenarioInfo as any)[selectedScenario || 'new_project'].title;
    const focoSubtopicos = subtopicosMap[selectedScenario || 'new_project'];

    const prompt = `### PROTOCOLO ORÁCULO SAB - OPERAÇÃO DE DOMÍNIO ###
Atue como o Oráculo SAB (Serp Armor Breaker) do sistema Backlinks Magia 4.0. 

OPERACIONAL SELECIONADO: ${cenarioNome}
MISSÃO ATUAL: ${focoSubtopicos}

CONTEXTO ESTRATÉGICO (Manifesto 4.0):
1. Ignore métricas de vaidade. Foque em fendas reais (Vídeos, Fóruns, User Content).
2. Use Inteligência Preditiva para estimar intenção transacional.
3. Alvo final: Autoridade Tópica Inquestionável.

MEU NICHO/PROJETO: [INSIRA SEU NICHO AQUI]

Crie um Plano de Batalha de 5 passos com checkmarks acionáveis para quebrar a armadura da SERP e ocupar o espaço dos concorrentes agora.`;

    navigator.clipboard.writeText(prompt);
    alert(lang === 'en' ? "SAB Protocol copied!" : "Protocolo SAB Copiado! Estratégia alinhada com os subtópicos do cenário.");
  };

  const renderActionPlan = () => {
    switch (selectedScenario) {
      case 'new_project':
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <StepCard step="01" title="Mapear Vulnerabilidades" description="Use o Keyword Researcher para encontrar termos 'AllInTitle' baixos." icon={Search} onClick={() => onNavigate(AppView.KEYWORDS)} />
            <StepCard step="02" title="Explorar Fendas (SAB)" description="Verifique se o Top 10 tem fóruns ou sites irrelevantes." icon={Swords} onClick={() => onNavigate(AppView.SERP_ARMOR_BREAKER)} />
            <StepCard step="03" title="Conteúdo Skyscraper" description="Crie algo 10x melhor que o atual Top 1 com o Mago do Conteúdo." icon={Wand2} onClick={() => onNavigate(AppView.CONTENT_MAGIC)} />
          </div>
        );
      case 'growth':
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <StepCard step="01" title="Engenharia Reversa" description="Identifique os backlinks dos gigantes que você pode replicar no Outreach." icon={BarChart3} onClick={() => onNavigate(AppView.OUTREACH)} />
            <StepCard step="02" title="Clusters de Autoridade" description="Crie silos de conteúdo interligados para dominar um tópico inteiro." icon={Target} onClick={() => onNavigate(AppView.CONTENT_MAGIC)} />
            <StepCard step="03" title="Monitoramento de Ranking" description="Acompanhe sua subida e ajuste o SEO On-Page onde houver queda." icon={LineChart} onClick={() => onNavigate(AppView.TRACKING)} />
          </div>
        );
      case 'youtube':
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <StepCard step="01" title="Pesquisa de Vídeo SAB" description="Se houver um vídeo no Top 3 do Google, é uma fenda para explorar." icon={Search} onClick={() => onNavigate(AppView.KEYWORDS)} />
            <StepCard step="02" title="Roteirização de Elite" description="Use o Mago do Conteúdo para criar roteiros com ganchos psicológicos." icon={Wand2} onClick={() => onNavigate(AppView.CONTENT_MAGIC)} />
            <StepCard step="03" title="Impulso de SEO no Vídeo" description="Otimize Título e Tags usando as keywords encontradas no SAB." icon={Target} onClick={() => onNavigate(AppView.KEYWORDS)} />
            <StepCard step="04" title="Sinais Sociais & Backlinks" description="Ganhe autoridade inicial compartilhando no módulo de Outreach." icon={Mail} onClick={() => onNavigate(AppView.OUTREACH)} />
          </div>
        );
      case 'not_indexed':
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <StepCard step="01" title="Diagnóstico de Crawler" description="Verifique se há bloqueios técnicos no seu On-Page Analyzer." icon={ScanSearch} onClick={() => onNavigate(AppView.ONPAGE_ANALYZER)} />
            <StepCard step="02" title="Forçar Indexação" description="Crie sinais externos através de menções sociais no módulo Outreach." icon={Zap} onClick={() => onNavigate(AppView.OUTREACH)} />
            <StepCard step="03" title="Qualidade de Conteúdo" description="Refaça textos pobres usando as diretrizes do Mago do Conteúdo." icon={Wand2} onClick={() => onNavigate(AppView.CONTENT_MAGIC)} />
          </div>
        );
      case 'site_audit':
        return (
          <div className="space-y-4 animate-in slide-in-from-right-4">
            <StepCard step="01" title="Auditoria On-Page" description="Encontre erros técnicos e gaps de palavras-chave no seu site." icon={ShieldCheck} onClick={() => onNavigate(AppView.ONPAGE_ANALYZER)} />
            <StepCard step="02" title="Análise de Concorrência" description="Veja o que mudou na SERP e por que seus concorrentes subiram." icon={Compass} onClick={() => onNavigate(AppView.SERP_ARMOR_BREAKER)} />
            <StepCard step="03" title="Reciclagem de Conteúdo" description="Atualize posts antigos para recuperar a relevância semântica." icon={Wand2} onClick={() => onNavigate(AppView.CONTENT_MAGIC)} />
          </div>
        );
      default:
        return null;
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
              <button 
                onClick={copiarPromptEstrategia}
                className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
              >
                <Copy className="w-4 h-4" /> {scenarioInfo.ask_oracle}
              </button>
              <button 
                onClick={() => window.open('https://gemini.google.com/app', '_blank')}
                className="bg-white text-slate-900 px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all shadow-lg"
              >
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