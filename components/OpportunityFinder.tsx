import React, { useState } from 'react';
import { Search, Globe, ArrowRight, Loader2, BarChart2, Copy, Terminal, Zap } from 'lucide-react';
import { findBacklinkOpportunities } from '../services/geminiService';
import { BacklinkOpportunity, Language } from '../types';
import { translations } from '../utils/translations';

interface OpportunityFinderProps {
  lang: Language;
}

const OpportunityFinder: React.FC<OpportunityFinderProps> = ({ lang }) => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [manualJson, setManualJson] = useState('');
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const t = translations[lang].opportunities;

  const copiarSuperPrompt = () => {
    const nichoFoco = niche || "[SEU NICHO]";
    const prompt = `Você é um Especialista em SEO de Elite. Pesquise 8 sites REAIS para o nicho "${nichoFoco}" em ${lang}. 
    Divida em: 2 Big Players, 4 Médios e 2 em Ascensão.
    Para cada um, forneça uma estratégia de 3 passos: comentário, compartilhamento e gancho de e-mail.
    RETORNE APENAS JSON:
    {
      "opportunities": [
        {
          "siteName": "...",
          "url": "...",
          "domainAuthority": 0,
          "relevanceScore": 0,
          "strategy": "...",
          "contactInfo": "..."
        }
      ]
    }`;
    navigator.clipboard.writeText(prompt);
    alert("Missão Estratégica copiada! Agora cole-a no Gemini.");
  };

  const handleManualRender = () => {
    try {
      const data = JSON.parse(manualJson);
      if (data.opportunities) {
        setOpportunities(data.opportunities);
        setManualJson('');
      } else {
        alert("O formato do JSON parece estar incorreto. Certifique-se de que ele contém a chave 'opportunities'.");
      }
    } catch (e) {
      alert("Erro ao ler o JSON. Certifique-se de copiar apenas o código de dentro do bloco gerado pelo Gemini.");
    }
  };

  const handleSearch = async () => {
    if (!niche) return;
    setLoading(true);
    try {
      const results = await findBacklinkOpportunities(niche, lang);
      setOpportunities(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col gap-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 group-focus-within:text-indigo-300 transition-colors" />
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder={t.placeholder}
              className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl py-5 pl-12 pr-4 text-white placeholder-slate-500 focus:border-indigo-500 outline-none transition-all text-lg"
            />
          </div>
          
          <button
            onClick={handleSearch}
            disabled={loading || !niche}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Zap className="w-6 h-6" />}
            {t.button}
          </button>

          {/* SEÇÃO DE COMANDO - ESTILO MARKETPULSE */}
          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <button
                onClick={copiarSuperPrompt}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
              >
                <Copy className="w-5 h-5" /> Copiar Missão Estratégica
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
                <Globe className="w-4 h-4" /> Instruções de Ativação:
              </p>
              <ul className="text-slate-300 text-xs space-y-1 list-disc ml-4">
                <li>Clique em <strong>"Copiar Missão Estratégica"</strong> para levar o comando ao clipboard.</li>
                <li>Use o botão branco acima para abrir o Gemini em uma nova aba.</li>
                <li>Cole o comando na IA, aguarde a geração e <strong>copie apenas o código JSON</strong>.</li>
                <li>Cole o código no campo abaixo e clique em "Renderizar".</li>
              </ul>
            </div>

            <textarea
              value={manualJson}
              onChange={(e) => setManualJson(e.target.value)}
              placeholder="Cole o código JSON { 'opportunities': [...] } aqui..."
              className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-emerald-400 font-mono text-sm focus:border-indigo-500 outline-none transition-all"
            />
            
            <button 
              onClick={handleManualRender}
              className="mt-3 w-full bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-600/50 py-3 rounded-xl text-sm font-bold transition-all uppercase tracking-widest"
            >
              Renderizar Oportunidades no Painel
            </button>
          </div>
        </div>
      </div>

      {opportunities.length > 0 && (
        <div className="grid gap-6">
          {opportunities.map((opp, index) => (
            <div key={index} className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 hover:border-indigo-500/50 transition-all group">
              <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {opp.siteName}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 font-mono">{opp.url}</p>
                  <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl">
                    <p className="text-indigo-300 text-sm italic">
                      "<strong>Estratégia SAB:</strong> {opp.strategy}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                      {opp.domainAuthority} <BarChart2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest">DA</div>
                  </div>
                  <div className="w-[1px] h-10 bg-slate-700"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {opp.relevanceScore}%
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest">Rel</div>
                  </div>
                  <a 
                    href={opp.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white transition-all shadow-lg"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OpportunityFinder;