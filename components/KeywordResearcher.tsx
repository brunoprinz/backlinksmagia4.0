import React, { useState } from 'react';
import { Search, Target, Loader2, Swords, Zap, Wand2, Globe } from 'lucide-react';
import { generateKeywords } from '../services/geminiService';
import { KeywordIdea, Language, KeywordMode, AppView } from '../types';
import { translations } from '../utils/translations';

interface KeywordResearcherProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
}

const KeywordResearcher: React.FC<KeywordResearcherProps> = ({ lang, onNavigate }) => {
  const [seed, setSeed] = useState('');
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<KeywordIdea[]>([]);

  // Tradução com Fallback seguro
  const tBase = translations[lang] || translations['pt'];
  const t = tBase.keywords || {
    title: "Pesquisa SAB - Rank Ninja",
    subtitle: "Encontre brechas na armadura dos competidores",
    placeholder: "Digite um termo ou nicho...",
    button: "Analisar",
    no_results: "Nenhum resultado encontrado."
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seed.trim()) return;

    setLoading(true);
    try {
      // Chamada real ao serviço Gemini
      const results = await generateKeywords(seed, lang);
      
      // Se o serviço retornar algo, atualizamos o estado
      if (results && Array.isArray(results)) {
        setKeywords(results);
      } else {
        alert("A IA não retornou dados formatados corretamente.");
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      alert("Erro ao conectar com a IA. Verifique sua chave API ou conexão.");
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
      {/* Box de Busca */}
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

      {/* Tabela de Resultados */}
      {keywords.length > 0 && (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
           <div className="p-6 border-b border-slate-700 bg-slate-800/50">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" /> Oportunidades Identificadas
              </h3>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-widest">
                    <th className="px-6 py-4 font-bold">Palavra-Chave</th>
                    <th className="px-6 py-4 font-bold text-center">Volume</th>
                    <th className="px-6 py-4 font-bold text-center">Dificuldade</th>
                    <th className="px-6 py-4 font-bold">Sugestão de Conteúdo</th>
                    <th className="px-6 py-4 font-bold">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {keywords.map((kw, i) => (
                    <tr key={i} className="hover:bg-slate-700/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{kw.keyword}</div>
                        <div className="text-[10px] text-slate-500 uppercase mt-1">{kw.intent || 'Informativo'}</div>
                      </td>
                      <td className="px-6 py-4 text-center text-slate-300 font-mono">{kw.volume}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold border ${
                          parseInt(kw.difficulty) < 30 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        }`}>
                          {kw.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 italic">
                        {kw.contentIdea || 'Análise de nicho disponível'}
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleCreateContent(kw.contentIdea || kw.keyword)}
                          className="flex items-center gap-2 px-3 py-2 bg-slate-900 hover:bg-indigo-600 rounded-lg text-white transition-all text-xs border border-slate-700"
                        >
                          <Wand2 className="w-3.5 h-3.5" />
                          Mago
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
