import React, { useState } from 'react';
import { ScanSearch, FileText, CheckCircle, AlertCircle, Loader2, Copy, Terminal, Zap, Brain, Target } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

const OnPageStrategist: React.FC<{ lang: Language }> = ({ lang }) => {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [manualJson, setManualJson] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const t = translations[lang].onpage;

  const copiarPromptOnPage = () => {
    const prompt = `Você é um Estrategista de Conteúdo SEO de Elite. 
Analise o seguinte conteúdo/URL: "${url || 'Conteúdo abaixo'}" para a palavra-chave foco.

Sua missão é realizar uma Auditoria Semântica 4.0:
1. INTENÇÃO: Qual o formato exato que o Google está premiando para isso? (Informativo, Transacional, Lista?)
2. LACUNAS: Quais tópicos ou sub-tópicos o Top 3 aborda que este conteúdo NÃO aborda?
3. ENTIDADES: Liste 10 palavras-chave semânticas (LSI) que devem estar presentes.
4. VEREDITO: O que mudar IMEDIATAMENTE para subir posições?

Conteúdo para analisar: ${content.substring(0, 2000)}

RETORNE APENAS JSON:
{
  "intent": "...",
  "score": 85,
  "missingTopics": ["Tópico 1", "Tópico 2"],
  "semanticTerms": ["Termo 1", "Termo 2"],
  "actionPlan": "...",
  "isOptimized": false
}`;
    navigator.clipboard.writeText(prompt);
    alert("Prompt de Estratégia On-Page Copiado!");
  };

  const handleManualRender = () => {
    try {
      const data = JSON.parse(manualJson);
      setAnalysis(data);
    } catch (e) {
      alert("Erro no JSON. Verifique a cópia.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Painel de Comando */}
      <div className="bg-slate-800 p-8 rounded-xl border border-purple-500/30 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8 text-purple-400" />
          <h2 className="text-2xl font-bold text-white uppercase italic">On-Page Strategist</h2>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL da página (opcional)..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Cole seu texto aqui para uma análise profunda..."
            className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-purple-500 outline-none"
          />
          
          <div className="flex gap-4">
            <button onClick={copiarPromptOnPage} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
              <Copy className="w-5 h-5" /> GERAR PROMPT DE ANÁLISE
            </button>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2 text-purple-400 mb-2 text-xs font-bold uppercase tracking-widest">
              <Terminal className="w-4 h-4" /> Resposta do Oráculo
            </div>
            <textarea
              value={manualJson}
              onChange={(e) => setManualJson(e.target.value)}
              placeholder="Cole o JSON de análise aqui..."
              className="w-full h-20 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-purple-400 font-mono focus:border-purple-500 outline-none"
            />
            <button onClick={handleManualRender} className="w-full mt-2 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" /> RENDERIZAR ESTRATÉGIA
            </button>
          </div>
        </div>
      </div>

      {/* RESULTADOS DA AUDITORIA */}
      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4">
          {/* Intenção e Score */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 text-xs font-bold uppercase mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" /> Intenção Detectada
            </h3>
            <div className="text-2xl font-bold text-white mb-2">{analysis.intent}</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-900 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full" style={{ width: `${analysis.score}%` }}></div>
              </div>
              <span className="text-purple-400 font-bold">{analysis.score}%</span>
            </div>
          </div>

          {/* Plano de Ação */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-slate-400 text-xs font-bold uppercase mb-4">Plano de Ação Imediato</h3>
            <p className="text-slate-300 text-sm italic">"{analysis.actionPlan}"</p>
          </div>

          {/* Tópicos Faltantes */}
          <div className="bg-slate-900/50 p-6 rounded-xl border border-red-500/20">
            <h3 className="text-red-400 text-xs font-bold uppercase mb-4">O que o Top 3 tem e você não:</h3>
            <ul className="space-y-2">
              {analysis.missingTopics.map((item: string, i: number) => (
                <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Termos Semânticos */}
          <div className="bg-slate-900/50 p-6 rounded-xl border border-emerald-500/20">
            <h3 className="text-emerald-400 text-xs font-bold uppercase mb-4">Inclua estas Entidades (LSI):</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.semanticTerms.map((term: string, i: number) => (
                <span key={i} className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-1 rounded border border-emerald-500/20 font-bold uppercase">
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnPageStrategist;