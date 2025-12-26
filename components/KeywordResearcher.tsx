import React, { useState, useMemo } from 'react';
import { Search, Target, TrendingUp, DollarSign, BookOpen, Loader2, Download, Save, FolderOpen, ArrowUp, ArrowDown, ArrowUpDown, Swords, Users, Check, Wand2, Copy, Terminal, Zap, Globe } from 'lucide-react';
import { generateKeywords, analyzeCompetitorGap } from '../services/geminiService';
import { KeywordIdea, Language, KeywordMode, AppView } from '../types'; // Corrigido de types1 para types
import { translations } from '../utils/translations'; // Corrigido de translations1 para translations

interface KeywordResearcherProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
}

type SortKey = keyof KeywordIdea;
type SortDirection = 'asc' | 'desc';

const KeywordResearcher: React.FC<KeywordResearcherProps> = ({ lang, onNavigate }) => {
  const [mode, setMode] = useState<KeywordMode>('discovery');
  const [seed, setSeed] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [competitorTopic, setCompetitorTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<KeywordIdea[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey | null; direction: SortDirection }>({ 
    key: null, 
    direction: 'asc' 
  });

  // PROTEÇÃO: Garante que as traduções existam
  const tBase = translations[lang] || translations['pt'];
  const t = tBase.keywords || {
    title: "Pesquisa de Palavras-chave",
    subtitle: "Encontre brechas na armadura dos competidores",
    placeholder: "Digite um termo...",
    button: "Analisar",
    mode_discovery: "Descoberta",
    mode_gap: "Competitor Gap"
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seed && mode === 'discovery') return;
    setLoading(true);
    try {
      const results = await generateKeywords(seed, lang);
      setKeywords(results);
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar palavras-chave.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContent = (topic: string) => {
    localStorage.setItem('bm_draft_topic', topic);
    onNavigate(AppView.CONTENT_MAGIC);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Target className="w-32 h-32 text-indigo-500" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">{t.title}</h2>
          </div>
          <p className="text-slate-400">{t.subtitle}</p>

          <form onSubmit={handleSearch} className="mt-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder={t.placeholder}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/40"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {t.button}
            </button>
          </form>
        </div>
      </div>

      {keywords.length > 0 && (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
           <div className="p-6 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" /> Resultados Encontrados
              </h3>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-widest">
                    <th className="px-6 py-4 font-bold">Palavra-Chave</th>
                    <th className="px-6 py-4 font-bold text-center">Volume</th>
                    <th className="px-6 py-4 font-bold text-center">Dificuldade</th>
                    <th className="px-6 py-4 font-bold">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {keywords.map((kw, i) => (
                    <tr key={i} className="hover:bg-slate-700/30 transition-colors group">
                      <td className="px-6 py-4 font-medium text-white">{kw.keyword}</td>
                      <td className="px-6 py-4 text-center text-slate-300">{kw.volume}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2 py-1 rounded bg-slate-900 text-indigo-400 text-xs border border-indigo-500/20">
                          {kw.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleCreateContent(kw.keyword)}
                          className="p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition-all"
                        >
                          <Wand2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      )}
    </div>
  );
};

export default KeywordResearcher;
