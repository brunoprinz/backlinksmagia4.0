import React from 'react';
import { ShieldCheck, Zap, Brain, Rocket, AlertTriangle, Skull, CheckCircle2, RefreshCcw, Hammer, Megaphone, TrendingUp, Unlock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface WhyBacklinksMagiaProps {
  lang: Language;
}

const WhyBacklinksMagia: React.FC<WhyBacklinksMagiaProps> = ({ lang }) => {
  const t = translations[lang].why_us;
  const content = t || translations['en'].why_us;
  
  // Fallback for languages where dilemma might be missing in partial updates
  const dilemma = content.dilemma || translations['en'].why_us.dilemma;

  const differentials = content.differentials || [];
  const icons = [Zap, Brain, Rocket, ShieldCheck];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-8 rounded-xl border border-indigo-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">{content.title}</h2>
          <p className="text-indigo-200 text-lg max-w-2xl">{content.subtitle}</p>
        </div>
      </div>

      {/* Differentials Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {differentials.map((item: any, idx: number) => {
          const Icon = icons[idx % icons.length];
          return (
            <div key={idx} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <Icon className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* NEW: The Beginner's Dilemma Section */}
      <div className="bg-slate-900/50 p-1 rounded-2xl border border-cyan-500/30">
        <div className="bg-slate-800 rounded-xl overflow-hidden">
          <div className="p-8 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
             <div className="flex items-center gap-3 mb-2">
                <Unlock className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">{dilemma.title}</h3>
             </div>
             <p className="text-slate-400">{dilemma.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-0">
             {/* The Problem Column */}
             <div className="lg:col-span-2 p-8 border-b lg:border-b-0 lg:border-r border-slate-700 bg-slate-900/30 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4 text-red-400">
                   <RefreshCcw className="w-6 h-6 animate-spin-slow" style={{ animationDuration: '3s' }} />
                   <h4 className="font-bold text-lg uppercase tracking-wider">{dilemma.problem_title}</h4>
                </div>
                <blockquote className="text-slate-300 italic text-lg leading-relaxed border-l-4 border-red-500/50 pl-4">
                   {dilemma.problem_desc}
                </blockquote>
             </div>

             {/* The Solution Column */}
             <div className="lg:col-span-3 p-8">
                <h4 className="font-bold text-lg text-cyan-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5" /> {dilemma.solution_title}
                </h4>
                
                <div className="space-y-6">
                   {/* Step 1 */}
                   <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-900/30 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                         <Zap className="w-5 h-5" />
                      </div>
                      <div>
                         <h5 className="text-white font-bold mb-1">{dilemma.steps[0].title}</h5>
                         <p className="text-slate-400 text-sm leading-relaxed">{dilemma.steps[0].desc}</p>
                      </div>
                   </div>

                   {/* Step 2 */}
                   <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-900/30 text-purple-400 flex items-center justify-center border border-purple-500/30">
                         <Hammer className="w-5 h-5" />
                      </div>
                      <div>
                         <h5 className="text-white font-bold mb-1">{dilemma.steps[1].title}</h5>
                         <p className="text-slate-400 text-sm leading-relaxed">{dilemma.steps[1].desc}</p>
                      </div>
                   </div>

                   {/* Step 3 */}
                   <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-900/30 text-orange-400 flex items-center justify-center border border-orange-500/30">
                         <Megaphone className="w-5 h-5" />
                      </div>
                      <div>
                         <h5 className="text-white font-bold mb-1">{dilemma.steps[2].title}</h5>
                         <p className="text-slate-400 text-sm leading-relaxed">{dilemma.steps[2].desc}</p>
                      </div>
                   </div>

                   {/* Step 4 */}
                   <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-900/30 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                         <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                         <h5 className="text-white font-bold mb-1">{dilemma.steps[3].title}</h5>
                         <p className="text-slate-400 text-sm leading-relaxed">{dilemma.steps[3].desc}</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Black Hat Warning Section */}
      <div className="bg-red-900/10 border border-red-500/30 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Skull className="w-32 h-32 text-red-500" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <h3 className="text-2xl font-bold text-white">{content.warning_title}</h3>
          </div>
          
          <div className="bg-slate-900/60 p-6 rounded-lg border border-red-900/50 mb-6 backdrop-blur-sm">
            <p className="text-slate-300 leading-relaxed text-lg">
              {content.warning_text}
            </p>
          </div>

          <div className="space-y-3">
            {content.warning_points.map((point: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  {idx === 2 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Skull className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <p className={`text-sm ${idx === 2 ? 'text-emerald-200 font-medium' : 'text-red-200/80'}`}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default WhyBacklinksMagia;