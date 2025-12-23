import React, { useState } from 'react';
import { Coins, Briefcase, Star, Search, Rocket, Zap, Youtube, CheckCircle2, TrendingUp, Lightbulb, MessageCircle, Copy, Share2, Users, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface ExtraIncomeGuideProps {
  lang: Language;
}

const ExtraIncomeGuide: React.FC<ExtraIncomeGuideProps> = ({ lang }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const t = translations[lang].extra;
  // Fallback to EN if translation missing for complex arrays
  const gigs = t.gigs || translations['en'].extra.gigs;
  const tips = t.tips || translations['en'].extra.tips;
  const scripts = t.scripts || translations['en'].extra.scripts;

  const openYoutube = (query: string) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
  };

  const copyScript = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Header with Motivational Quote */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 p-8 rounded-xl border border-emerald-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Coins className="w-10 h-10 text-emerald-400" />
            <div>
               <h2 className="text-3xl font-bold text-white">{t.title}</h2>
               <p className="text-emerald-200/80">{t.subtitle}</p>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border-l-4 border-emerald-500 inline-block">
            <p className="text-white font-medium italic text-lg">"{t.motivational}"</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Content: 10 Gig Ideas & Scripts */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* GIGS */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">{t.gigs_title}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {gigs.map((gig: any, idx: number) => (
                <div key={idx} className="bg-slate-800 p-5 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all hover:-translate-y-1 group">
                  <div className="flex justify-between items-start mb-3">
                     <div className="w-8 h-8 rounded-lg bg-blue-900/30 text-blue-400 flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                     </div>
                     <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-700 text-slate-300">
                        {gig.tool}
                     </span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">{gig.title}</h4>
                  <p className="text-slate-400 text-sm mb-3">{gig.desc}</p>
                  <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                    <p className="text-emerald-400 text-xs font-bold flex items-start gap-1">
                      <Star className="w-3 h-3 mt-0.5 shrink-0" /> {gig.usp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SCRIPTS SECTION */}
          {scripts && scripts.length > 0 && (
             <div className="space-y-6 pt-6 border-t border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                   <MessageCircle className="w-6 h-6 text-pink-400" />
                   <div>
                     <h3 className="text-xl font-bold text-white">{t.scripts_title}</h3>
                     <p className="text-sm text-slate-400">{t.scripts_desc}</p>
                   </div>
                </div>

                <div className="grid gap-4">
                   {scripts.map((script: any, idx: number) => (
                      <div key={idx} className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-pink-500/30 transition-all">
                         <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                               {idx === 0 && <Share2 className="w-5 h-5 text-blue-400" />}
                               {idx === 1 && <MessageCircle className="w-5 h-5 text-green-400" />}
                               {idx === 2 && <Users className="w-5 h-5 text-orange-400" />}
                               <span className="font-bold text-white">{script.channel}</span>
                            </div>
                            <span className="text-xs text-slate-500 uppercase tracking-wider bg-slate-800 px-2 py-1 rounded">{script.title}</span>
                         </div>
                         <div className="bg-slate-800 p-4 rounded-lg border border-slate-600/50 font-mono text-sm text-slate-300 relative group">
                            "{script.script}"
                            <button 
                               onClick={() => copyScript(script.script, idx)}
                               className="absolute top-2 right-2 p-1.5 rounded bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600 transition-colors"
                               title="Copy Script"
                            >
                               {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}

        </div>

        {/* Sidebar: Ranking Tips & Resources */}
        <div className="space-y-8">
          
          {/* Algorithm Hacks */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
             <div className="flex items-center gap-2 mb-4">
                <Rocket className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-white leading-tight">{t.algo_title}</h3>
             </div>
             <div className="space-y-4">
                {tips.map((tip: any, idx: number) => (
                   <div key={idx} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                      <div>
                         <h4 className="text-white font-bold text-sm">{tip.title}</h4>
                         <p className="text-slate-400 text-xs leading-relaxed mt-0.5">{tip.desc}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* YouTube Resources */}
          <div className="bg-gradient-to-br from-red-900/20 to-slate-800 p-6 rounded-xl border border-red-500/20">
             <div className="flex items-center gap-2 mb-4">
                <Youtube className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-bold text-white">{t.resources_title}</h3>
             </div>
             <p className="text-slate-400 text-xs mb-4">
               Watch these curated search results to learn how to land your first client without spending money.
             </p>
             <div className="space-y-3">
               <button 
                  onClick={() => openYoutube('conseguir seu primeiro cliente oferecendo seo')}
                  className="w-full bg-slate-900 hover:bg-red-600 hover:text-white text-slate-200 border border-slate-700 hover:border-red-500 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-between group"
               >
                  <span className="flex items-center gap-2"><Search className="w-4 h-4" /> {t.btn_yt_seo}</span>
                  <Youtube className="w-4 h-4 opacity-50 group-hover:opacity-100" />
               </button>
               <button 
                  onClick={() => openYoutube('conseguir seu primeiro cliente em sites como fiverr')}
                  className="w-full bg-slate-900 hover:bg-green-600 hover:text-white text-slate-200 border border-slate-700 hover:border-green-500 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-between group"
               >
                  <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> {t.btn_yt_fiverr}</span>
                  <Zap className="w-4 h-4 opacity-50 group-hover:opacity-100" />
               </button>
             </div>
          </div>

          <div className="bg-yellow-900/10 p-4 rounded-xl border border-yellow-500/20">
             <div className="flex gap-3">
               <Lightbulb className="w-6 h-6 text-yellow-500 shrink-0" />
               <p className="text-xs text-yellow-200/80 leading-relaxed">
                 <strong>Pro Mindset:</strong> Do not just "sell SEO". Sell a specific result using a specific mechanism. "I will do SEO" is boring. "I will find 10 Ghost Keywords" is a unique product.
               </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExtraIncomeGuide;