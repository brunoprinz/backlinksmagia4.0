import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, CheckCircle2, Loader2, Lightbulb, Youtube, BookOpen, ShoppingBag, Copy, Terminal, Zap, Wand2, Type, Globe } from 'lucide-react';
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
  const [manualJson, setManualJson] = useState('');
  const [strategy, setStrategy] = useState<ContentStrategy | null>(null);
  const t = translations[lang].content;

  useEffect(() => {
    const draftTopic = localStorage.getItem('bm_draft_topic');
    if (draftTopic) {
      setTopic(draftTopic);
      localStorage.removeItem('bm_draft_topic');
    }
  }, []);

  // Mágica MarketPulse: Prompt para Conteúdo Épico
  const copiarPromptConteudo = () => {
    if (!topic) { alert(lang === 'en' ? "Define a topic first!" : "Defina um tópico primeiro!"); return; }
    
    const prompt = `Você é um Criador de Conteúdo de Elite.
Crie uma Estratégia de Conteúdo SAB para o tópico: "${topic}" em ${lang}.
O formato deve ser: ${mode}.

Sua missão:
1. Título Skyscraper que domine o CTR.
2. Gancho psicológico (Hook) para os primeiros 15 segundos/parágrafo.
3. Outline (Estrutura) com 5 a 8 tópicos focando em fendas semânticas.
4. Corpo do conteúdo (resumo) rico em entidades LSI.

RETORNE APENAS JSON:
{
  "title": "...",
  "type": "${mode}",
  "targetKeywords": ["...", "..."],
  "outline": ["...", "..."],
  "hook": "...",
  "contentBody": "..."
}`;
    
    navigator.clipboard.writeText(prompt);
    alert(lang === 'en' ? "Content Mission copied!" : "Missão de Conteúdo copiada! Use o Gemini para gerar a mágica.");
  };

  const handleManualRender = () => {
    try {
      const data = JSON.parse(manualJson);
      setStrategy(data);
      setManualJson('');
    } catch (e) {
      alert(lang === 'en' ? "Invalid JSON format." : "Formato JSON inválido. Verifique o código gerado pelo Gemini.");
    }
  };

  const handleMagicSearch = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const result = await generateContentStrategy(topic, lang);
      setStrategy(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const modes: { id: ContentMode; label: string; icon: any; color: string }[] = [
    { id: 'magnet', label: 'Lead Magnet', icon: Sparkles, color: 'indigo' },
    { id: 'review', label: 'Product Review', icon: ShoppingBag, color: 'emerald' },
    { id: 'video', label: 'Video Script', icon: Youtube, color: 'red' },
    { id: 'ebook', label: 'Ebook Outline', icon: BookOpen, color: 'amber' },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {modes.map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 font-bold text-xs uppercase tracking-widest ${mode === m.id ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg' : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300'}`}
                >
                  <Icon className={`w-6 h-6 ${mode === m.id ? 'text-indigo-400' : 'text-slate-600'}`} />
                  {m.label}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <Wand2 className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={lang === 'en' ? "Topic or keyword for your content..." : "Tópico ou palavra-chave para seu conteúdo..."}
              className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl py-5 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all text-lg shadow-inner"
            />
          </div>

          <button
            onClick={handleMagicSearch}
            disabled={loading || !topic}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
            {lang === 'en' ? "Manifest Content Strategy" : "Manifestar Estratégia de Conteúdo"}
          </button>

          {/* SEÇÃO DE COMANDO - ESTILO MARKETPULSE */}
          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <button
                onClick={copiarPromptConteudo}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
              >
                <Copy className="w-5 h-5" /> {lang === 'en' ? "Copy Content Mission" : "Copiar Missão de Conteúdo"}
              </button>
              
              <button
                onClick={() => window.open('https://gemini.google.com/app', '_blank')}
                className="flex-1 bg-white hover:bg-slate-100 text-slate-900 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <Terminal className="w-5 h-5 text-indigo-600" /> {lang === 'en' ? "Open Gemini" : "Abrir Gemini para Colar"}
              </button>
            </div>

            <div className="mb-4 p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-lg">
              <p className="text-indigo-300 text-sm mb-2 font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4" /> {lang === 'en' ? "Epic Content Protocol:" : "Protocolo de Conteúdo Épico:"}
              </p>
              <ul className="text-slate-300 text-xs space-y-1 list-disc ml-4">
                <li>{lang === 'en' ? "Copy the specific mission for your content type." : "Copie a missão específica para seu tipo de conteúdo."}</li>
                <li>{lang === 'en' ? "Paste it in Gemini to get a full semantic structure." : "Cole no Gemini para obter uma estrutura semântica completa."}</li>
                <li>{lang === 'en' ? "Paste the generated JSON below to visualize your draft." : "Cole o JSON gerado abaixo para visualizar seu rascunho."}</li>
              </ul>
            </div>

            <textarea
              value={manualJson}
              onChange={(e) => setManualJson(e.target.value)}
              placeholder='{ "title": "...", "outline": [...] }'
              className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-emerald-400 font-mono text-sm focus:border-indigo-500 outline-none transition-all"
            />
            
            <button 
              onClick={handleManualRender}
              className="mt-3 w-full bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-600/50 py-3 rounded-xl text-sm font-bold transition-all uppercase"
            >
              {lang === 'en' ? "Materialize Magic Draft" : "Materializar Rascunho Mágico"}
            </button>
          </div>
        </div>
      </div>

      {strategy && (
        <div className="bg-slate-800/50 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
                {strategy.type} 4.0
              </span>
              <div className="flex gap-2">
                {strategy.targetKeywords.map((kw, i) => (
                  <span key={i} className="text-indigo-200 text-xs">#{kw}</span>
                ))}
              </div>
            </div>
            <h2 className="text-3xl font-black text-white leading-tight">{strategy.title}</h2>
          </div>

          <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-700">
            <div className="p-8 lg:col-span-1 bg-slate-900/30">
              <h4 className="text-slate-400 font-bold uppercase text-xs mb-6 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" /> {lang === 'en' ? "Structure (H2/H3)" : "Estrutura (H2/H3)"}
              </h4>
              <ul className="space-y-4">
                {strategy.outline.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold border border-indigo-500/30 shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 lg:col-span-2 bg-slate-800/20">
              <div className="mb-8 p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                <h4 className="text-indigo-400 font-bold uppercase text-xs mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> {lang === 'en' ? "The Hook (Opening)" : "O Gancho (Abertura)"}
                </h4>
                <p className="text-slate-300 text-lg italic leading-relaxed">"{strategy.hook}"</p>
              </div>

              <h4 className="text-slate-400 font-bold uppercase text-xs mb-4 flex items-center gap-2">
                <Type className="w-4 h-4 text-emerald-400" /> {lang === 'en' ? "Content Draft" : "Rascunho do Conteúdo"}
              </h4>
              <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                {strategy.contentBody || (lang === 'en' ? "Generate to see the full draft..." : "Gere para ver o rascunho completo...")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentMagician;