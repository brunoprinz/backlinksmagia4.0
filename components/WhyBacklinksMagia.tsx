import React from 'react';
import { ShieldCheck, Zap, Brain, Rocket, AlertTriangle, Skull, CheckCircle2, RefreshCcw, Hammer, Megaphone, TrendingUp, Unlock, Swords, Target, Search } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface WhyBacklinksMagiaProps {
  lang: Language;
}

const WhyBacklinksMagia: React.FC<WhyBacklinksMagiaProps> = ({ lang }) => {
  const content = {
    pt: {
      title: "Por que o Backlinks Magia 4.0?",
      subtitle: "A diferença entre seguir o rebanho e dominar o mercado.",
      dilemma_title: "O Grande Dilema do SEO Moderno",
      dilemma_text: "O Google mudou. Aquela fórmula mágica de 2018 (KGR) que todos os gurus ainda ensinam tornou-se o caminho mais rápido para ser ignorado pelo algoritmo. O Google agora entende Entidades, Autoridade e Intenção.",
      differentials: [
        {
          title: "Algoritmo SAB (Serp Armor Breaker)",
          desc: "Não contamos volume de busca. Encontramos falhas reais no Top 5 onde sites fracos ou fóruns estão ocupando espaço indevido. É cirúrgico.",
          icon: Swords
        },
        {
          title: "Inteligência Semântica",
          desc: "Nossas ferramentas não apenas sugerem palavras, elas constroem autoridade através de LSI e estruturação de Silos que a IA do Google ama.",
          icon: Brain
        },
        {
          title: "Execução em Tempo Recorde",
          desc: "O que levava semanas de análise manual agora é feito pelo Oráculo e pelo Wizard em minutos. O seu plano de 90 dias pronto em um clique.",
          icon: Zap
        }
      ],
      warning_title: "O Perigo das Métricas Obsoletas",
      warning_text: "O KGR e o excesso de Backlinks de baixa qualidade morreram. Se você continuar usando as mesmas ferramentas que todo mundo usa, você terá os mesmos resultados medíocres que eles.",
      warning_points: [
        "O Google ignora fórmulas matemáticas simples (KGR).",
        "Backlinks sem contexto são fáceis de rastrear e punir.",
        "A vitória agora pertence a quem identifica a brecha semântica."
      ]
    }
    // Adicionar 'en' conforme necessário
  }[lang] || {};

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header - Impacto Visual */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-900 p-10 rounded-2xl border border-indigo-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-4xl font-black text-white mb-2 uppercase italic tracking-tighter italic">
            {content.title}
          </h2>
          <p className="text-indigo-200 text-lg opacity-80 max-w-2xl">
            {content.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Diferenciais - Agora com Ícones de 'Guerra' */}
        {content.differentials.map((item: any, idx: number) => (
          <div key={idx} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-all group">
            <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <item.icon className="w-6 h-6" />
            </div>
            <h4 className="text-white font-bold mb-2 uppercase tracking-tight text-sm">{item.title}</h4>
            <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Seção de Alerta - Impactante */}
      <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Skull className="w-48 h-48 text-red-500" />
        </div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-500 w-8 h-8" />
              <h3 className="text-2xl font-black text-white uppercase italic">{content.warning_title}</h3>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              {content.warning_text}
            </p>
          </div>

          <div className="space-y-4">
            {content.warning_points.map((point: string, idx: number) => (
              <div key={idx} className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-red-900/20">
                <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-red-400" />
                </div>
                <p className="text-sm text-slate-200 font-medium leading-tight">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Final */}
      <div className="text-center py-6">
        <p className="text-slate-500 text-xs uppercase tracking-[0.3em] font-bold mb-4">A tecnologia que os gurus não querem que você use</p>
        <div className="flex justify-center gap-2">
            <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
            <div className="h-1 w-4 bg-slate-700 rounded-full"></div>
            <div className="h-1 w-4 bg-slate-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default WhyBacklinksMagia;