import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldAlert, Radar, Target, Info, CheckCircle, XCircle, 
  AlertTriangle, Download, Trash2, History, Search, 
  ArrowUp, ArrowDown, ArrowUpDown, Loader2, Copy, Terminal, Zap
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

// Interface para o novo algoritmo SAB
interface SABResult {
  isWinner: boolean;
  weakSpots: number;
  score: number; // 0 a 100
  analysis: string;
  competitors: Array<{
    pos: number;
    site: string;
    da: string | number;
    isWeak: boolean;
    type: string;
  }>;
}

interface KgrCalculatorProps {
  lang: Language;
}

const SerpArmorBreaker: React.FC<KgrCalculatorProps> = ({ lang }) => {
  const [keyword, setKeyword] = useState('');
  const [manualJson, setManualJson] = useState('');
  const [loading, setLoading] = useState(false);
  const [sabResult, setSabResult] = useState<SABResult | null>(null);
  const t = translations[lang].kgr || { title: "SERP Armor Breaker", subtitle: "Encontre as fendas na armadura dos gigantes" };

  // O "Pulo do Gato": Super Prompt focado no Método Steve (Top 5 Fraco)
  const copiarPromptSAB = () => {
    if (!keyword) { alert("Digite uma palavra-chave primeiro!"); return; }
    
    const prompt = `Atue como um Especialista em Inteligência de Busca. 
Analise a SERP Real (Top 10) para a palavra-chave: "${keyword}" em ${lang}.

CRITÉRIOS DE FRAQUEZA (Método Steve):
1. Site com DA (Domain Authority) < 25.
2. Presença de Fóruns (Reddit, Quora, Yahoo, etc).
3. Posts de Redes Sociais ou Vídeos do YouTube (quando a busca pede texto).
4. Domínios de nicho pequeno ou blogs amadores.

MISSÃO: 
Identifique quantos desses "Resultados Fracos" existem especificamente no TOP 5. 
Se houver 3 ou mais no Top 5, é um "SAB WINNER" (80% de chance de rankear sem backlinks).

RETORNE APENAS JSON:
{
  "keyword": "${keyword}",
  "isWinner": true,
  "weakSpots": 3,
  "score": 85,
  "analysis": "Explicação curta de por que é fácil ou difícil.",
  "competitors": [
    { "pos": 1, "site": "Exemplo.com", "da": 15, "isWeak": true, "type": "Fórum" }
  ]
}`;
    navigator.clipboard.writeText(prompt);
    alert("Prompt SAB Copiado! O Oráculo está pronto.");
  };

  const handleManualRender = () => {
    try {
      const data = JSON.parse(manualJson);
      setSabResult(data);
    } catch (e) {
      alert("Erro no JSON. Verifique se copiou o código completo do Gemini.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Estilo Radar */}
      <div className="bg-slate-800 p-8 rounded-xl border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Radar className="w-24 h-24 text-emerald-500 animate-pulse" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white uppercase tracking-tighter italic">
              SERP Armor Breaker <span className="text-emerald-500">v4.0</span>
            </h2>
          </div>
          <p className="text-slate-400 mb-6 max-w-xl">
            Baseado no Método Steve: Identificando fraquezas estruturais no Top 5 para ranquear sem gastar com backlinks.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Insira a palavra-chave de destino..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
              <button 
                onClick={copiarPromptSAB}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/20"
              >
                <Copy className="w-5 h-5" /> COPIAR MISSÃO
              </button>
            </div>

            <div className="pt-4 border-t border-slate-700/50">
              <div className="flex items-center gap-2 text-emerald-400 mb-2 text-xs font-bold uppercase">
                <Terminal className="w-4 h-4" /> Relatório do Oráculo
              </div>
              <textarea
                value={manualJson}
                onChange={(e) => setManualJson(e.target.value)}
                placeholder="Cole o JSON retornado pelo Gemini aqui..."
                className="w-full h-20 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-emerald-500 font-mono focus:border-emerald-500 outline-none"
              />
              <button 
                onClick={handleManualRender}
                className="w-full mt-2 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-yellow-400" /> PROCESSAR ARMOR BREAKER
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTADO ESTILO RAIO-X */}
      {sabResult && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-300">
          {/* Card de Veredito */}
          <div className={`p-6 rounded-xl border ${sabResult.isWinner ? 'bg-emerald-900/20 border-emerald-500' : 'bg-red-900/20 border-red-500'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Status da Missão</span>
              {sabResult.isWinner ? <CheckCircle className="text-emerald-500" /> : <ShieldAlert className="text-red-500" />}
            </div>
            <div className="text-4xl font-black text-white mb-2">
              {sabResult.isWinner ? 'WINNER' : 'RISKY'}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {sabResult.analysis}
            </p>
          </div>

          {/* Card de Métricas SAB */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col justify-center items-center text-center">
            <div className="text-5xl font-black text-emerald-400 mb-1">{sabResult.weakSpots}/5</div>
            <div className="text-xs font-bold text-slate-500 uppercase">Fraquezas no Top 5</div>
            <div className="w-full bg-slate-900 h-2 rounded-full mt-4 overflow-hidden">
              <div 
                className="h-full bg-emerald-500" 
                style={{ width: `${(sabResult.weakSpots / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Card de Score */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col justify-center items-center text-center">
            <div className="text-5xl font-black text-white mb-1">{sabResult.score}</div>
            <div className="text-xs font-bold text-slate-500 uppercase">SAB Difficulty Score</div>
            <div className="text-[10px] text-slate-400 mt-2 italic">Quanto maior, mais fácil penetrar.</div>
          </div>

          {/* Tabela de Invasão da SERP */}
          <div className="md:col-span-3 bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800 text-xs font-bold text-slate-400 uppercase">
                  <th className="px-6 py-3">Posição</th>
                  <th className="px-6 py-3">Competidor</th>
                  <th className="px-6 py-3">DA Est.</th>
                  <th className="px-6 py-3">Vulnerabilidade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {sabResult.competitors.map((comp, i) => (
                  <tr key={i} className={comp.isWeak ? 'bg-emerald-500/5' : ''}>
                    <td className="px-6 py-4 font-bold text-slate-500">#{comp.pos}</td>
                    <td className="px-6 py-4 text-white text-sm">{comp.site}</td>
                    <td className="px-6 py-4 text-sm font-mono">{comp.da}</td>
                    <td className="px-6 py-4">
                      {comp.isWeak ? (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full font-bold uppercase">
                          BRECHA: {comp.type}
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-700 text-slate-400 px-2 py-1 rounded-full font-bold uppercase">
                          Blindado
                        </span>
                      )}
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

export default SerpArmorBreaker;