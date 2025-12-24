import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Trash2, ExternalLink, Link as LinkIcon, TrendingUp, Activity, Download, Gauge, Info, Loader2, ShieldCheck, ShieldAlert, Terminal, Copy, Zap } from 'lucide-react';
import { Language, TrackedSite } from '../types';
import { translations } from '../utils/translations';
import { analyzeDomainHealth } from '../services/geminiService';

interface BacklinkTrackerProps {
  lang: Language;
}

const BacklinkTracker: React.FC<BacklinkTrackerProps> = ({ lang }) => {
  const [sites, setSites] = useState<TrackedSite[]>([]);
  const [selectedSite, setSelectedSite] = useState<TrackedSite | null>(null);
  const [loading, setLoading] = useState(false);
  const [manualJson, setManualJson] = useState('');
  const t = translations[lang].tracker;

  // Carregar dados (Simulando o salvamento local)
  useEffect(() => {
    const saved = localStorage.getItem('bm_tracked_sites');
    if (saved) setSites(JSON.parse(saved));
  }, []);

  // Mágica MarketPulse: Prompt para Auditoria de Saúde de Backlinks
  const copiarPromptAuditoria = () => {
    if (!selectedSite) return;
    const prompt = `Você é um Auditor de Perfil de Links. 
Analise os dados do domínio: "${selectedSite.url}".
DR: ${selectedSite.dr}, Backlinks: ${selectedSite.backlinks}, Domínios Ref: ${selectedSite.referringDomains}.

Sua missão:
1. Avalie a proporção Backlinks/Domínios.
2. Identifique se há sinais de "Spam" ou "PBN".
3. Dê uma nota de Saúde de 0 a 100.
4. Sugira uma estratégia para os próximos 30 dias.

RETORNE APENAS JSON:
{
  "healthScore": 75,
  "status": "Safe",
  "warnings": ["Excesso de links do mesmo IP", "Texto âncora muito otimizado"],
  "recommendation": "Foque em conquistar 5 links de domínios com DR > 50 este mês."
}`;
    navigator.clipboard.writeText(prompt);
    alert("Prompt de Auditoria Copiado!");
  };

  const handleManualUpdate = () => {
    try {
      const data = JSON.parse(manualJson);
      if (selectedSite) {
        const updated = { ...selectedSite, qualityScore: data.healthScore };
        setSites(sites.map(s => s.id === selectedSite.id ? updated : s));
        setSelectedSite(updated);
        alert("Saúde do Domínio Atualizada via Oráculo!");
      }
    } catch (e) {
      alert("Erro no JSON. Verifique a resposta do Gemini.");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER E ADICIONAR SITE */}
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Activity className="text-orange-500" /> Monitor de Autoridade
            </h2>
            <p className="text-slate-400">Acompanhe a saúde e o crescimento do seu perfil de backlinks.</p>
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-900/20">
            <Plus className="w-5 h-5" /> NOVO PROJETO
          </button>
        </div>

        {/* LISTA DE SITES (GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sites.map(site => (
            <div 
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedSite?.id === site.id ? 'bg-slate-700 border-orange-500 shadow-orange-900/20 shadow-lg' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white truncate">{site.url}</span>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${site.qualityScore > 70 ? 'bg-emerald-900 text-emerald-400' : 'bg-orange-900 text-orange-400'}`}>
                  DR {site.dr}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><LinkIcon className="w-3 h-3" /> {site.backlinks}</span>
                <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-emerald-500" /> +12%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETALHES E IA (MÁGICA MARKETPULSE) */}
      {selectedSite ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
          
          {/* GRÁFICO DE CRESCIMENTO */}
          <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-white">Histórico de Autoridade</h3>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg"><Download className="w-4 h-4" /></button>
                <button onClick={copiarPromptAuditoria} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-indigo-500">
                  <Copy className="w-4 h-4" /> AUDITORIA IA
                </button>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedSite.history}>
                  <defs>
                    <linearGradient id="colorLinks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                    itemStyle={{ color: '#f97316' }}
                  />
                  <Area type="monotone" dataKey="links" stroke="#f97316" fillOpacity={1} fill="url(#colorLinks)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PAINEL DE CONTROLE IA (ESTILO MARKETPULSE) */}
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-indigo-500/30">
              <div className="flex items-center gap-2 text-indigo-400 mb-4 text-xs font-bold uppercase tracking-widest">
                <Terminal className="w-4 h-4" /> Diagnóstico do Oráculo
              </div>
              <textarea
                value={manualJson}
                onChange={(e) => setManualJson(e.target.value)}
                placeholder="Cole o JSON da Auditoria aqui..."
                className="w-full h-32 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-indigo-400 font-mono focus:border-indigo-500 outline-none mb-3"
              />
              <button 
                onClick={handleManualUpdate}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/40"
              >
                <Zap className="w-4 h-4 text-yellow-400" /> ATUALIZAR STATUS
              </button>
            </div>

            {/* STATUS DE SAÚDE */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
               <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-400 text-xs font-bold uppercase">Saúde do Perfil</span>
                  {selectedSite.qualityScore > 60 ? <ShieldCheck className="text-emerald-500" /> : <ShieldAlert className="text-orange-500" />}
               </div>
               <div className="flex items-end gap-2 mb-4">
                  <div className="text-4xl font-black text-white">{selectedSite.qualityScore}</div>
                  <div className="text-slate-500 mb-1 font-bold">/100</div>
               </div>
               <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ${selectedSite.qualityScore > 60 ? 'bg-emerald-500' : 'bg-orange-500'}`} style={{ width: `${selectedSite.qualityScore}%` }}></div>
               </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800 p-12 rounded-xl border border-slate-700 text-center text-slate-500 border-dashed">
          <Activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <h3 className="text-xl font-bold text-white mb-2">Nenhum Domínio Selecionado</h3>
          <p>Selecione um projeto acima para ver a análise profunda de autoridade.</p>
        </div>
      )}
    </div>
  );
};

export default BacklinkTracker;