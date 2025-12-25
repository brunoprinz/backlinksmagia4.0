import React, { useState } from 'react';
import { ScanSearch, FileText, CheckCircle, AlertCircle, Loader2, Copy, Terminal, Zap, Brain, Target, Globe } from 'lucide-react';
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

RETORNE APENAS JSON:
{
  "score": 0-100,
  "intentVerdict": "...",
  "missingTopics": ["...", "..."],
  "semanticTerms": ["...", "..."],
  "actionPlan": "...",
  "readabilityScore": "Boa/Média/Ruim"
}

Conteúdo para analisar: ${content.substring(0, 1000) || 'Use a URL fornecida'}`;
    
    navigator.clipboard.writeText(prompt);
    alert("Missão de Auditoria On-Page copiada! Use o Gemini para analisar o conteúdo.");
  };

  const handleManualRender = () => {
    try {
      const data = JSON.parse(manualJson);
      setAnalysis(data);
      setManualJson('');
    } catch (e) {
      alert("Erro ao ler o JSON. Certifique-se de que o Gemini retornou o formato de objeto correto.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL da página (opcional)..."
                className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <Brain className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
              <input
                type="text"
                placeholder="Palavra-chave Foco..."
                className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Cole o seu conteúdo aqui para análise semântica..."
            className="w-full h-48 bg-slate-900/50 border-2 border-slate-700 rounded-2xl p-4 text-white focus:border-indigo-500 outline-none transition-all resize-none font-sans"
          />

          {/* SEÇÃO DE COMANDO - ESTILO MARKETPULSE */}
          <div className="mt-4 pt-6 border-t border-slate-700/50">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <button
                onClick={copiarPromptOnPage}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
              >
                <Copy className="w-5 h-5" /> Copiar Missão de Auditoria
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
                <Globe className="w-4 h-4" /> Protocolo de Otimização:
              </p>
              <ul className="text-slate-300 text-xs space-y-1 list-disc ml-4">
                <li>Copie a <strong>Missão de Auditoria</strong> (inclui o seu texto/URL).</li>
                <li>No Gemini, cole o comando para iniciar a auditoria semântica 4.0.</li>
                <li>Cole o código JSON gerado abaixo para ver os pontos de melhoria.</li>
              </ul>
            </div>

            <textarea
              value={manualJson}
              onChange={(e) => setManualJson(e.target.value)}
              placeholder="Cole o código JSON de auditoria aqui..."
              className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-emerald-400 font-mono text-sm focus:border-indigo-500 outline-none transition-all"
            />
            
            <button 
              onClick={handleManualRender}
              className="mt-3 w-full bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-600/50 py-3 rounded-xl text-sm font-bold transition-all uppercase"
            >
              Materializar Auditoria Semântica
            </button>
          </div>
        </div>
      </div>

      {analysis && (
        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 col-span-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-3xl font-black text-white border border-indigo-500/30">
                 {analysis.score}
               </div>
               <div>
                 <h3 className="text-white font-bold">Saúde Semântica</h3>
                 <p className="text-slate-400 text-xs tracking-widest uppercase">Análise de IA</p>
               </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Legibilidade</span>
              <span className="text-emerald-400 font-bold px-3 py-1 bg-emerald-400/10 rounded-full border border-emerald-400/20">
                {analysis.readabilityScore}
              </span>
            </div>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
            <h3 className="text-slate-400 text-xs font-bold uppercase mb-4">Plano de Ação Imediato</h3>
            <p className="text-slate-300 text-sm italic">"{analysis.actionPlan}"</p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-3xl border border-red-500/20">
            <h3 className="text-red-400 text-xs font-bold uppercase mb-4">O que o Top 3 tem e você não:</h3>
            <ul className="space-y-2">
              {analysis.missingTopics?.map((item: string, i: number) => (
                <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-3xl border border-emerald-500/20 md:col-span-2">
            <h3 className="text-emerald-400 text-xs font-bold uppercase mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Inclua estas Entidades (LSI) para EEAT:
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.semanticTerms?.map((term: string, i: number) => (
                <span key={i} className="px-3 py-1.5 bg-slate-900 text-emerald-300 text-xs rounded-lg border border-emerald-500/20 font-medium">
                  + {term}
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