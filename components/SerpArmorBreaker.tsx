import React, { useState } from 'react';
import { 
  ShieldAlert, Radar, Target, Info, CheckCircle, XCircle, 
  AlertTriangle, Search, Loader2, Copy, Terminal, Zap, Globe, BarChart3
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

// Interface para o novo algoritmo SAB
interface SABResult {
  isWinner: boolean;
  weakSpots: number;
  score: number;
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

  const copiarSuperPrompt = () => {
    const kw = keyword || "[SUA PALAVRA-CHAVE]";
    const prompt = `Analise a SERP (resultados de busca) para a keyword: "${kw}" em ${lang}.
Identifique se existem "Fendas na Armadura" (Armor Breaches) no Top 10.
Considere fendas: Fóruns (Reddit/Quora), sites com DA baixo (<20), ou conteúdos mal formatados.

RETORNE APENAS JSON:
{
  "isWinner": true/false,
  "weakSpots": 0,
  "score": 85,
  "analysis": "Resumo estratégico da oportunidade...",
  "competitors": [
    {"pos": 1, "site": "Exemplo.com", "da": 45, "isWeak": false, "type": "Autoridade"},
    {"pos": 2, "site": "Reddit.com", "da": 90, "isWeak": true, "type": "Fórum"}
  ]
}`;
    navigator.clipboard.writeText(prompt);
    alert("Missão de Análise de SERP copiada! Use o Gemini para encontrar as fendas.");
  };

  const handleManualRender = () => {
    try {
      const data = JSON.parse(manualJson);
      setSabResult(data);
      setManualJson('');
    } catch (e) {
      alert("Erro ao ler o JSON. Certifique-se de copiar o bloco { ... } completo.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col gap-6">
          <div className="relative group">
            <Radar className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 group-focus-within:text-indigo-300 transition-colors" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Digite a palavra-chave para analisar a SERP..."
              className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl py-5 pl-12 pr-4 text-white placeholder-slate-500 focus:border-indigo-500 outline-none transition-all text-lg"
            />
          </div>

          {/* SEÇÃO DE COMANDO - ESTILO MARKETPULSE */}
          <div className="mt-4 pt-6 border-t border-slate-700/50">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <button
                onClick={copiarSuperPrompt}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
              >
                <Copy className="w-5 h-5" /> Copiar Missão de Análise
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
                <Globe className="w-4 h-4" /> Protocolo de Varredura:
              </p>
              <ul className="text-slate-300 text-xs space-y-1 list-disc ml-4">
                <li>Copie a <strong>Missão de Análise</strong> e abra a IA no botão acima.</li>
                <li>O Gemini usará o Google Search para mapear a força dos concorrentes.</li>
                <li>Cole o código JSON gerado abaixo para visualizar o mapa de vulnerabilidades.</li>
              </ul>
            </div>

            <textarea
              value={manualJson}
              onChange={(e) => setManualJson(e.target.value)}
              placeholder="Cole o código JSON { 'isWinner': ... } aqui..."
              className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-emerald-400 font-mono text-sm focus:border-indigo-500 outline-none transition-all"
            />
            
            <button 
              onClick={handleManualRender}
              className="mt-3 w-full bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-600/50 py-3 rounded-xl text-sm font-bold transition-all uppercase tracking-widest"
            >
              Materializar Varredura de SERP
            </button>
          </div>
        </div>
      </div>

      {sabResult && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 text-center">
              <div className="text-4xl font-black text-white mb-1">{sabResult.score}</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest">SAB Score</div>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 text-center">
              <div className="text-4xl font-black text-emerald-400 mb-1">{sabResult.weakSpots}</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest">Fendas Encontradas</div>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 text-center flex items-center justify-center">
              {sabResult.isWinner ? (
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle className="w-6 h-6" /> Oportunidade Real
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <ShieldAlert className="w-6 h-6" /> SERP Blindada
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-3xl border border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-white font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" /> Mapa Detalhado da SERP
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-widest font-bold">
                    <th className="px-6 py-4">Posição</th>
                    <th className="px-6 py-4">Competidor</th>
                    <th className="px-6 py-4">DA Est.</th>
                    <th className="px-6 py-4">Status da Armadura</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {sabResult.competitors.map((comp, i) => (
                    <tr key={i} className={`hover:bg-slate-700/20 transition-colors ${comp.isWeak ? 'bg-emerald-500/5' : ''}`}>
                      <td className="px-6 py-4 font-black text-slate-500 text-lg">#{comp.pos}</td>
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{comp.site}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-mono">{comp.da}</td>
                      <td className="px-6 py-4">
                        {comp.isWeak ? (
                          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase bg-emerald-400/10 w-fit px-3 py-1 rounded-full border border-emerald-400/20">
                            <Zap className="w-3 h-3" /> Fenda: {comp.type}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase bg-slate-900 w-fit px-3 py-1 rounded-full border border-slate-700">
                            Blindado
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SerpArmorBreaker;