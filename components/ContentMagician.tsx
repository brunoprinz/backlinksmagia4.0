import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, CheckCircle2, Loader2, Lightbulb, Youtube, BookOpen, ShoppingBag, Copy, Terminal, Zap, Wand2, Type } from 'lucide-react';
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
    if (!topic) { alert("Defina um tópico primeiro!"); return; }
    
    const prompt = `Você é um Redator SEO de Elite. 
Tópico: "${topic}"
Formato: "${mode}"

Sua missão é criar o conteúdo mais completo da internet sobre isso:
1. Crie um Título H1 Irresistível.
2. Estruture em H2 e H3 focando em responder as intenções de busca.
3. Inclua naturalmente termos semânticos (LSI) relacionados.
4. Adicione uma seção de FAQ no final.

SAÍDA OBRIGATÓRIA EM JSON (Para o sistema formatar):
{
  "title": "Título do Post",
  "targetKeywords": ["KW1", "KW2"],
  "outline": ["Intro", "Tópico A", "Tópico B", "Conclusão"],
  "contentBody": "Escreva aqui o texto completo ou o primeiro rascunho..."
}`;
    navigator.clipboard.writeText(prompt);
    alert("Super Prompt de Conteúdo Copiado!");
  };

  const handleManualRender = () => {
    try {
      const data = JSON.parse(manualJson);
      setStrategy({
        title: data.title,
        targetKeywords: data.targetKeywords,
        outline: data.outline,
        contentBody: data.contentBody,
        angle: "Análise IA"
      });
    } catch (e) {
      alert("Erro no JSON. Verifique se o Gemini fechou todas as chaves { }.");
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    setLoading(true);
    setStrategy(null);
    const result = await generateContentStrategy(topic, mode, lang);
    setStrategy(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* PAINEL DE CRIAÇÃO */}
      <div className="bg-slate-800 p-8 rounded-xl border border-emerald-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
          <Wand2 className="w-24 h-24 text-emerald-400" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white uppercase italic">Mago do Conteúdo</h2>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button type="button" onClick={() => setMode('magnet')} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${mode === 'magnet' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                <FileText className="w-6 h-6" /> <span className="text-xs font-bold uppercase">Blog Post</span>
              </button>
              <button type="button" onClick={() => setMode('review')} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${mode === 'review' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                <ShoppingBag className="w-6 h-6" /> <span className="text-xs font-bold uppercase">Review</span>
              </button>
              <button type="button" onClick={() => setMode('video')} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${mode === 'video' ? 'bg-red-600 border-red-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                <Youtube className="w-6 h-6" /> <span className="text-xs font-bold uppercase">Roteiro</span>
              </button>
              <button type="button" onClick={() => setMode('ebook')} className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${mode === 'ebook' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                <BookOpen className="w-6 h-6" /> <span className="text-xs font-bold uppercase">Ebook</span>
              </button>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Sobre o que vamos escrever hoje?"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
              <button type="button" onClick={copiarPromptConteudo} className="bg-slate-700 hover:bg-slate-600 text-white px-6 rounded-lg font-bold flex items-center gap-2">
                <Copy className="w-5 h-5" /> PROMPT
              </button>
              <button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                {loading ? 'CONJURANDO...' : 'CRIAR'}
              </button>
            </div>
          </form>

          {/* MODO ORÁCULO PARA CONTEÚDO LONGO */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-emerald-400 mb-3 text-sm font-bold uppercase tracking-widest">
              <Terminal className="w-4 h-4" /> Pergaminho do Oráculo (Cole o JSON)
            </div>
            <textarea
              value={manualJson}
              onChange={(e) => setManualJson(e.target.value)}
              placeholder="Cole o JSON com o conteúdo completo aqui..."
              className="w-full h-24 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-emerald-400 font-mono focus:border-emerald-500 outline-none"
            />
            <button onClick={handleManualRender} className="mt-2 w-full bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-600/50 py-2 rounded-lg text-sm font-bold transition-all">
              FORMATAR CONTEÚDO MÁGICO
            </button>
          </div>
        </div>
      </div>

      {/* RESULTADO DA MÁGICA */}
      {strategy && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden animate-in zoom-in duration-300">
          <div className="p-8 border-b border-slate-700">
            <h3 className="text-3xl font-black text-white mb-4 italic tracking-tight underline decoration-emerald-500 decoration-4 underline-offset-8">
              {strategy.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {strategy.targetKeywords.map((kw, idx) => (
                <span key={idx} className="px-3 py-1 bg-emerald-900/30 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold">
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-700">
            <div className="p-8 lg:col-span-1 bg-slate-900/30">
              <h4 className="text-slate-400 font-bold uppercase text-xs mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" /> Estrutura Sugerida (H2/H3)
              </h4>
              <ul className="space-y-4">
                {strategy.outline.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center text-[10px] font-bold border border-slate-700 shrink-0">
                      {idx + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 lg:col-span-2">
              <h4 className="text-slate-400 font-bold uppercase text-xs mb-4 flex items-center gap-2">
                <Type className="w-4 h-4 text-emerald-400" /> Rascunho do Conteúdo
              </h4>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {strategy.contentBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentMagician;