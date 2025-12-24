import React, { useState } from 'react';
import { Search, Globe, ArrowRight, Loader2, BarChart2, Copy, Terminal } from 'lucide-react';
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
  const [opportunities, setOpportunities] = useState<any[]>([]); // Usando any para suportar os novos campos
  const t = translations[lang].opportunities;

  // Função para copiar o Super Prompt (Estilo MarketPulse)
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
          "category": "...",
          "domainAuthority": "...",
          "relevanceScore": 100,
          "relationshipStrategy": {
            "commentSuggestion": "...",
            "shareHook": "...",
            "emailOpening": "..."
          }
        }
      ]
    }`;
    navigator.clipboard.writeText(prompt);
    alert("Super Prompt Copiado! Cole no Gemini e traga o JSON.");
  };

  const handleManualRender = () => {
    try {
      const data = JSON.parse(manualJson);
      setOpportunities(data.opportunities || []);
    } catch (e) {
      alert("Erro no JSON. Verifique se copiou o código completo.");
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche) return;
    setLoading(true);
    const results = await findBacklinkOpportunities(niche, lang);
    setOpportunities(results);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. SEÇÃO DE BUSCA E MODO RESILIENTE */}
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400 mb-6">{t.subtitle}</p>
        
        <div className="space-y-4">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button 
              type="button"
              onClick={copiarSuperPrompt}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 border border-slate-500"
              title="Copiar Prompt para uso manual"
            >
              <Copy className="w-5 h-5" />
              Prompt
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {loading ? t.loading : t.button}
            </button>
          </form>

          {/* ÁREA DE INPUT MANUAL (MÁGICA DO MARKET PULSE) */}
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <div className="flex items-center gap-2 text-indigo-400 mb-3 text-sm font-bold uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>Modo de Emergência (Cole o JSON do Gemini abaixo)</span>
            </div>
            <textarea
              value={manualJson}
              onChange={(e) => setManualJson(e.target.value)}
              placeholder="Cole o código { 'opportunities': [...] } aqui para renderizar instantaneamente..."
              className="w-full h-24 bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-xs text-emerald-400 font-mono focus:border-indigo-500 outline-none"
            />
            <button 
              onClick={handleManualRender}
              className="mt-2 w-full bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-600/50 py-2 rounded-lg text-sm font-bold transition-all"
            >
              RENDERIZAR DADOS MANUAIS
            </button>
          </div>
        </div>
      </div>

      {/* 2. LISTAGEM DE RESULTADOS (DESIGN ORIGINAL + NOVOS CAMPOS) */}
      {opportunities.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {opportunities.map((opp, index) => (
            <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all group shadow-lg">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                
                {/* INFO BÁSICA */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-indigo-900/30 rounded-lg text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{opp.siteName}</h3>
                      <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30 uppercase">
                        {opp.category || 'Geral'}
                      </span>
                    </div>
                    <p className="text-sm text-indigo-400">{opp.url}</p>
                    
                    {/* ESTRATÉGIA DE RELACIONAMENTO (A NOVIDADE) */}
                    {opp.relationshipStrategy && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                          <span className="text-[10px] text-emerald-400 font-bold block mb-1">💬 COMENTÁRIO</span>
                          <p className="text-xs text-slate-300 italic">"{opp.relationshipStrategy.commentSuggestion}"</p>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                          <span className="text-[10px] text-blue-400 font-bold block mb-1">📢 COMPARTILHAR</span>
                          <p className="text-xs text-slate-300">"{opp.relationshipStrategy.shareHook}"</p>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                          <span className="text-[10px] text-purple-400 font-bold block mb-1">📧 E-MAIL</span>
                          <p className="text-xs text-slate-300 font-mono">{opp.relationshipStrategy.emailOpening}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* MÉTRICAS */}
                <div className="flex items-center gap-6 self-center lg:self-start bg-slate-900/50 p-4 rounded-xl border border-slate-700">
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