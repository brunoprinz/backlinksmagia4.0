import React, { useState } from 'react';
import { Search, Target, Loader2, Swords, Zap, Wand2, Terminal, Copy, Check, ExternalLink, Info } from 'lucide-react';
import { generateKeywords } from '../services/geminiService';
import { KeywordIdea, Language, AppView } from '../types';
import { translations } from '../utils/translations';

interface KeywordResearcherProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
}

const KeywordResearcher: React.FC<KeywordResearcherProps> = ({ lang, onNavigate }) => {
  const [seed, setSeed] = useState('');
  const [loading, setLoading] = useState(false);
  const [manualJson, setManualJson] = useState('');
  const [keywords, setKeywords] = useState<KeywordIdea[]>([]);
  const [copied, setCopied] = useState(false);

  const tBase = translations[lang] || translations['pt'];
  const t = tBase.keywords || {
    title: "Pesquisa SAB - Rank Ninja",
    subtitle: "Encontre brechas na armadura dos competidores",
    placeholder: "Digite um termo ou nicho...",
    button: "Analisar via IA"
  };

  const copiarSuperPrompt = () => {
    const nicho = seed || "[SEU NICHO]";
    const prompt = `Aja como um Especialista em SEO de Elite e Pesquisador SAB. Sua missão é encontrar 10 palavras-chave de baixa dificuldade para o nicho: "${nicho}". 
RETORNE APENAS UM ARRAY JSON PURO: [{"keyword": "...", "volume": "...", "difficulty": "...", "intent": "...", "contentIdea": "..."}]`;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const processarJsonManual = () => {
    try {
      const parsed = JSON.parse(manualJson);
      if (Array.isArray(parsed)) {
        setKeywords(parsed);
        setManualJson('');
      } else { alert("Erro: O formato deve ser um array [ ]."); }
    } catch (e) { alert("JSON inválido. Copie apenas o código da IA."); }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seed.trim()) return;
    setLoading(true);
    try {
      const results = await generateKeywords(seed, lang);
      if (results) setKeywords(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      {/* Box de Busca Principal */}
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
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {t.button}
            </button>
          </form>
        </div>
      </div>

      {/* CONSOLE DE COMANDO SAB (FALLBACK MANUAL) */}
      <div className="bg-slate-900 rounded-2xl border border-indigo-500/30 overflow-hidden shadow-2xl">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <Terminal className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">Protocolo SAB Manual</span>
          </div>
          <button 
            onClick={copiarSuperPrompt}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              copied ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            1. COPIAR PROMPT
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Instrução e Botão Gemini */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-3">
                <p className="text-sm text-slate-300 leading-relaxed">
                  <span className="text-indigo-400 font-bold italic">* Instrução:</span> Após copiar o prompt acima, clique no botão abaixo para abrir o Gemini. Cole o prompt, aguarde a resposta e cole apenas o código <span className="text-emerald-400 font-mono">JSON</span> gerado na caixa abaixo.
                </p>
                <a 
                  href="https://gemini.google.com/app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold border border-slate-600 transition-all group"
                >
                  <ExternalLink className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                  2. ABRIR GOOGLE GEMINI
                </a>
              </div>
            </div>
          </div>

          {/* Área de Colagem */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">3. Cole o código JSON aqui:</label>
            <textarea
              value={manualJson}
              onChange={(e) => setManualJson(e.target.value)}
              placeholder="Ex: [ { 'keyword': '...' } ]"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-emerald-400 font-mono text-xs h-32 focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button
            onClick={processarJsonManual}
            disabled={!manualJson}
            className="w-full py-4 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 rounded-xl text-xs font-black transition-all uppercase tracking-[0.2em]"
          >
            Injetar Dados e Liberar Arsenal
          </button>
        </div>
      </div>

      {/* RESULTADOS (TABELA) */}
      {keywords.length > 0 && (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl animate-in slide-in-from-bottom-4">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-500 text-[10px] uppercase tracking-[0.2em]">
                    <th className="px-6 py-4 font-black">Palavra-Chave</th>
                    <th className="px-6 py-4 font-black text-center">Volume</th>
                    <th className="px-6 py-4 font-black text-center">KD%</th>
                    <th className="px-6 py-4 font-black">Estratégia</th>
                    <th className="px-6 py-4 font-black text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {keywords.map((kw, i) => (
                    <tr key={i} className="hover:bg-slate-700/30 transition-colors group text-sm">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white">{kw.keyword}</div>
                        <div className="text-[9px] text-indigo-400 uppercase mt-1">{kw.intent}</div>
                      </td>
                      <td className="px-6 py-4 text-center text-slate-300 font-mono">{kw.volume}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded text-[10px] font-black border ${
                          parseInt(kw.difficulty) < 30 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        }`}>
                          {kw.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 italic max-w-xs truncate lg:max-w-none">
                        {kw.contentIdea}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => {
                            localStorage.setItem('bm_draft_topic', kw.contentIdea || kw.keyword);
                            onNavigate(AppView.CONTENT_MAGIC);
                          }}
                          className="p-2 bg-slate-900 hover:bg-indigo-600 rounded-lg text-white transition-all border border-slate-700"
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
