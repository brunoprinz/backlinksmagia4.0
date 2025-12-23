import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, CheckCircle2, Loader2, Lightbulb, Youtube, BookOpen, ShoppingBag } from 'lucide-react';
import { generateContentStrategy } from '../services/geminiService';
import { ContentStrategy, Language } from '../types';
import { translations } from '../utils/translations';

type ContentMode = 'magnet' | 'review' | 'video' | 'ebook';

interface ContentMagicianProps {
  lang: Language;
}

const ContentMagician: React.FC<ContentMagicianProps> = ({ lang }) => {
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState<ContentMode>('magnet');
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<ContentStrategy | null>(null);
  const t = translations[lang].content;

  useEffect(() => {
    // Check for draft topic passed from other components (e.g. KeywordResearcher)
    const draftTopic = localStorage.getItem('bm_draft_topic');
    if (draftTopic) {
      setTopic(draftTopic);
      localStorage.removeItem('bm_draft_topic'); // Clean up
    }
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    setLoading(true);
    setStrategy(null);
    // Pass lang to service
    const result = await generateContentStrategy(topic, mode, lang);
    setStrategy(result);
    setLoading(false);
  };

  const getModeIcon = () => {
    switch (mode) {
      case 'review': return <ShoppingBag className="w-5 h-5 text-pink-400" />;
      case 'video': return <Youtube className="w-5 h-5 text-red-400" />;
      case 'ebook': return <BookOpen className="w-5 h-5 text-blue-400" />;
      default: return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 p-8 rounded-xl border border-purple-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
              {getModeIcon()}
            </div>
            <h2 className="text-2xl font-bold text-white">{t.title}</h2>
          </div>
          
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
            {[
              { id: 'magnet', label: t.modes.magnet },
              { id: 'review', label: t.modes.review },
              { id: 'video', label: t.modes.video },
              { id: 'ebook', label: t.modes.ebook }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as ContentMode)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  mode === m.id 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-slate-300 mb-6">
          {t.subtitle}
        </p>
        
        <form onSubmit={handleGenerate} className="flex gap-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 bg-slate-900/80 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 min-w-[140px] justify-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lightbulb className="w-5 h-5" />}
            {loading ? t.loading : t.button}
          </button>
        </form>
      </div>

      {strategy && (
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col gap-6">
            <div className="border-b border-slate-700 pb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-sm font-medium mb-2 uppercase tracking-wide">
                {strategy.type}
              </span>
              <h3 className="text-3xl font-bold text-white mb-2">{strategy.title}</h3>
              <p className="text-slate-400 italic">"{strategy.hook}"</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-indigo-400 font-bold uppercase text-xs tracking-wider mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Outline
                </h4>
                <ul className="space-y-4">
                  {strategy.outline.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white mt-0.5 border border-slate-600">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-emerald-400 font-bold uppercase text-xs tracking-wider mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {strategy.targetKeywords.map((kw, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-md text-slate-300 text-sm hover:border-emerald-500/50 transition-colors cursor-default">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
                
                {strategy.contentBody && (
                   <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                      <h4 className="text-slate-400 font-bold uppercase text-xs tracking-wider mb-2">
                        Draft Preview
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {strategy.contentBody}
                      </p>
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentMagician;