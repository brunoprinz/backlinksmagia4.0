import React, { useState, useMemo } from 'react';
import { Search, Target, TrendingUp, DollarSign, BookOpen, Loader2, Download, Save, FolderOpen, ArrowUp, ArrowDown, ArrowUpDown, Swords, Users, Check, Wand2, Copy, Terminal, Zap, Globe } from 'lucide-react';
import { generateKeywords, analyzeCompetitorGap } from '../services/geminiService';
import { KeywordIdea, Language, KeywordMode, AppView } from '../types1';
import { translations } from '../utils/translations1';

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
  const [manualJson, setManualJson] = useState('');
  const [keywords, setKeywords] = useState<KeywordIdea[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey | null; direction: SortDirection }>({ 
    key: null, 
    direction: 'asc' 
  });

  const t = translations[lang].keywords;

  const copiarSuperPrompt = () => {
    const nicho = mode === 'discovery' ? seed : competitorTopic;
    const prompt = `Atue como um Especialista em SEO SAB (Serp Armor Breaker).
Analise o nicho "${nicho || '[DIGITE O NICHO]'}".
Procure por "Fendas na Armadura": palavras-chave onde o Top 5 é dominado por fóruns (Reddit/Quora) ou sites de baixa autoridade.
FOCO: Keywords de "Volume Zero" com alta intenção de compra.

RETORNE APENAS O JSON NO FORMATO:
[
  {
    "keyword": "...",
    "intent": "Informational | Commercial | Transactional",
    "difficulty": "Ex: Fenda detectada - Top 3 dominado por fóruns",
    "contentIdea": "Título Skyscraper com profundidade semântica"
  }
]`;
    navigator.clipboard.writeText(prompt);
    alert("Missão de Espionagem SAB copiada! Agora cole-a no Gemini.");
  };

  const handleManualRender = () => {
    try {
      const data = JSON.parse(manualJson);
      setKeywords(Array.isArray(data) ? data : data.keywords || []);
      setManualJson('');
    } catch (e) {
      alert("Erro ao ler o JSON. Certifique-se de copiar exatamente o bloco [] gerado pelo Gemini.");
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = mode === 'discovery' 
        ? await generateKeywords(seed, lang)
        : await analyzeCompetitorGap(competitorUrl, competitorTopic, lang);
      setKeywords(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContent = (title: string) => {
    localStorage.setItem('pendingContentTitle', title);
    onNavigate(AppView.STRATEGY_WIZARD);
  };

  // Lógica de Ordenação
  const sortedKeywords = useMemo(() => {
    const sortableItems = [...keywords];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [keywords, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getIntentIcon = (intent: string) => {
    switch (intent) {
      case 'Informational': return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'Commercial': return <TrendingUp className="w-4 h-4 text-purple-400" />;
      case 'Transactional': return <DollarSign className="w-4 h-4 text-emerald-400" />;
      default: return <Target className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* SELEÇÃO DE MODO */}
      <div className="flex p-1 bg-slate-900/50 rounded-2xl border border-slate-800 w-fit mx-auto">
        <button
          onClick={() => setMode('discovery')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${mode === 'discovery' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <Search className="w-4 h-4" /> {t.modes.discovery}
        </button>
        <button
          onClick={() => setMode('competitor')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${mode === 'competitor' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <Swords className="w-4 h-4" /> {t.modes.competitor}
        </button>
      </div>

      <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
        <div className="space-y-6">
          {mode === 'discovery' ? (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder={t.placeholders.seed}
                className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                value={competitorUrl}
                onChange={(e) => setCompetitorUrl(e.target.value)}
                placeholder={t.placeholders.url}
                className="bg-slate-900/50 border-2 border-slate-700 rounded-2xl py-4 px-6 text-white focus:border-indigo-500 outline-none transition-all"
              />
              <input
                type="text"
                value={competitorTopic}
                onChange={(e) => setCompetitorTopic(e.target.value)}
                placeholder={t.placeholders.topic}
                className="bg-slate-900/50 border-2 border-slate-700 rounded-2xl py-4 px-6 text-white focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          )}

          <button
            onClick={handleSearch}
            disabled={loading || (mode === 'discovery' ? !seed : !competitorUrl)}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Zap className="w-6 h-6" />}
            {t.searchButton}
          </button>

          {/* SEÇÃO DE COMANDO - ESTILO MARKETPULSE */}
          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <button
                onClick={copiarSuperPrompt}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
              >
                <Copy className="w-5 h-5" /> Copiar Missão de Espionagem
              </button>
              
              <button
                onClick={() => window.open('https://gemini.google.com/app', '_blank')}
                className="flex-1 bg-white hover:bg-slate-100 text-slate-900 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <Terminal className="w-5 h-5 text-indigo-600" /> Abrir Gemini para colar Prompt
              </button>
            </div>

            <div className="mb-4 p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-lg">
              <p className="text-indigo-300 text-sm mb-2 font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4" /> Protocolo SAB:
              </p>
              <ul className="text-slate-300 text-xs space-y-1 list-disc ml-4">
                <li>Copie o <strong>Super Prompt</strong> de espionagem acima.</li>
                <li>Abra o Gemini e cole o comando para iniciar a varredura de fendas.</li>
                <li>Copie o código JSON resultante (incluindo os colchetes [ ]).</li>
                <li>Cole no campo abaixo para listar as palavras-chave de baixa competição.</li>
              </ul>
            </div>

            <textarea
              value={manualJson}
              onChange={(e) => setManualJson(e.target.value)}
              placeholder="Cole o array JSON [ ... ] retornado pelo Gemini aqui..."
              className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-emerald-400 font-mono text-sm focus:border-indigo-500 outline-none transition-all"
            />
            
            <button 
              onClick={handleManualRender}
              className="mt-3 w-full bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-600/50 py-3 rounded-xl text-sm font-bold transition-all uppercase"
            >
              Materializar Palavras-Chave no Painel
            </button>
          </div>
        </div>
      </div>

      {keywords.length > 0 && (
        <div className="bg-slate-800/50 rounded-3xl border border-slate-700 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-700">
                  <th onClick={() => requestSort('keyword')} className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-white">
                    <div className="flex items-center gap-2">Keyword <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th onClick={() => requestSort('intent')} className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-white">
                    <div className="flex items-center gap-2">Intenção <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th onClick={() => requestSort('difficulty')} className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-white">
                    <div className="flex items-center gap-2">Fenda SAB <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Ação Sugerida</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {sortedKeywords.map((kw, index) => (
                  <tr key={index} className="hover:bg-indigo-500/5 transition-colors group">
                    <td className="px-6 py-4 text-white font-medium">{kw.keyword}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getIntentIcon(kw.intent)}
                        <span className="text-sm text-slate-300">{kw.intent}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {kw.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">
                      <div className="flex items-center justify-between gap-4">
                         <span>{kw.contentIdea}</span>
                         <button 
                          onClick={() => handleCreateContent(kw.contentIdea)} 
                          title="Criar Estratégia de Conteúdo"
                          className="opacity-0 group-hover:opacity-100 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-all shadow-lg shadow-indigo-600/40"
                         >
                          <Wand2 className="w-4 h-4" />
                         </button>
                      </div>
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