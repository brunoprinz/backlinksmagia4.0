import React, { useState } from 'react';
import { ScanSearch, CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { OnPageAnalysis, Language } from '../types';
import { analyzeOnPageContent } from '../services/geminiService';
import { translations } from '../utils/translations';

interface OnPageAnalyzerProps {
  lang: Language;
}

const OnPageAnalyzer: React.FC<OnPageAnalyzerProps> = ({ lang }) => {
  const [keyword, setKeyword] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<OnPageAnalysis | null>(null);
  const t = translations[lang].onpage;

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword || !content) return;
    setLoading(true);
    setAnalysis(null);
    const result = await analyzeOnPageContent(title, content, keyword, lang);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <ScanSearch className="w-8 h-8 text-blue-400" />
          {t.title}
        </h2>
        <p className="text-slate-400 mb-6">{t.subtitle}</p>

        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t.label_kw}</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t.label_title}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{t.label_content}</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ScanSearch className="w-5 h-5" />}
            {loading ? "Analyzing..." : t.button}
          </button>
        </form>
      </div>

      {analysis && (
        <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-center">
            <h3 className="text-slate-400 font-medium uppercase tracking-wider text-xs mb-2">{t.score}</h3>
            <div className={`text-5xl font-bold mb-2 ${
              analysis.score > 80 ? 'text-emerald-400' : analysis.score > 50 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {analysis.score}
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
              <div 
                className={`h-full ${analysis.score > 80 ? 'bg-emerald-500' : analysis.score > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                style={{ width: `${analysis.score}%` }}
              ></div>
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-yellow-400" /> Analysis Details
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
               <div className="bg-slate-900/50 p-3 rounded-lg">
                  <span className="text-xs text-slate-500 uppercase">{t.density}</span>
                  <p className="text-white font-medium">{analysis.keywordDensity}</p>
               </div>
               <div className="bg-slate-900/50 p-3 rounded-lg">
                  <span className="text-xs text-slate-500 uppercase">{t.readability}</span>
                  <p className="text-white font-medium">{analysis.readability}</p>
               </div>
            </div>
            <div className="space-y-3">
               {analysis.missingElements.length > 0 && (
                  <div>
                    <h4 className="text-red-400 text-sm font-bold flex items-center gap-1 mb-1"><XCircle className="w-3 h-3" /> Missing</h4>
                    <ul className="list-disc list-inside text-sm text-slate-300 ml-1">
                      {analysis.missingElements.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  </div>
               )}
               <div>
                  <h4 className="text-emerald-400 text-sm font-bold flex items-center gap-1 mb-1"><CheckCircle className="w-3 h-3" /> {t.tips}</h4>
                  <ul className="list-disc list-inside text-sm text-slate-300 ml-1">
                    {analysis.actionableTips.map((tip, i) => <li key={i}>{tip}</li>)}
                  </ul>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnPageAnalyzer;