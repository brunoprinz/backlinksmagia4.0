import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Trash2, ExternalLink, Link as LinkIcon, TrendingUp, Activity, Download, Gauge, Info, Loader2, ShieldCheck, ShieldAlert, Terminal, Copy, Zap, Globe } from 'lucide-react';
import { Language, TrackedSite } from '../types';
import { translations } from '../utils/translations';

interface BacklinkTrackerProps {
  lang: Language;
}

const BacklinkTracker: React.FC<BacklinkTrackerProps> = ({ lang }) => {
  const [sites, setSites] = useState<TrackedSite[]>([]);
  const [selectedSite, setSelectedSite] = useState<TrackedSite | null>(null);
  const [loading, setLoading] = useState(false);
  const [manualJson, setManualJson] = useState('');
  const t = translations[lang].tracker || { 
    title: "Monitor de Autoridade", 
    subtitle: "Acompanhe o crescimento do seu império",
    addProject: lang === 'en' ? "New Project" : "Novo Projeto" 
  };

  useEffect(() => {
    const saved = localStorage.getItem('bm_tracked_sites');
    if (saved) setSites(JSON.parse(saved));
  }, []);

  const saveSites = (newSites: TrackedSite[]) => {
    setSites(newSites);
    localStorage.setItem('bm_tracked_sites', JSON.stringify(newSites));
  };

  const handleAddSite = () => {
    const url = prompt(lang === 'en' ? "Enter site URL:" : "Digite a URL do site:");
    if (!url) return;

    const newSite: TrackedSite = {
      id: Math.random().toString(36).substr(2, 9),
      url: url.replace('https://', '').replace('http://', ''),
      dr: 0,
      backlinks: 0,
      referringDomains: 0,
      relevance: 100,
      qualityScore: 70,
      history: [
        { month: 'Jan', links: 0 }
      ]
    };

    saveSites([...sites, newSite]);
  };

  const removeSite = (id: string) => {
    if (confirm(lang === 'en' ? "Delete project?" : "Excluir projeto?")) {
      const filtered = sites.filter(s => s.id !== id);
      saveSites(filtered);
      if (selectedSite?.id === id) setSelectedSite(null);
    }
  };

  const copiarPromptAuditoria = () => {
    if (!selectedSite) return;
    const prompt = `Analise o perfil de backlinks para o domínio: "${selectedSite.url}".
Identifique:
1. Toxicidade: Existem links de vizinhança ruim?
2. Diversidade: O texto âncora está natural ou sobre-otimizado?
3. Autoridade Real: Qual o DR estimado e a qualidade dos domínios de referência?

RETORNE APENAS JSON:
{
  "dr": 45,
  "backlinks": 1250,
  "referringDomains": 320,
  "qualityScore": 85,
  "healthAnalysis": "O perfil parece saudável, mas foque em ganhar mais links .edu e .gov..."
}`;
    navigator.clipboard.writeText(prompt);
    alert("Missão de Auditoria de Perfil copiada!");
  };

  const handleManualRender = () => {
    try {
      const data = JSON.parse(manualJson);
      if (selectedSite) {
        const updated = sites.map(s => s.id === selectedSite.id ? { ...s, ...data } : s);
        saveSites(updated);
        setSelectedSite({ ...selectedSite, ...data });
        setManualJson('');
      }
    } catch (e) {
      alert("Erro ao ler JSON.");
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER DO MONITOR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-indigo-400" /> {t.title}
          </h2>
          <p className="text-slate-400 text-sm">{t.subtitle}</p>
        </div>
        <button 
          onClick={handleAddSite}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-5 h-5" /> {lang === 'en' ? "New Project" : "Novo Projeto"}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LISTA DE SITES */}
        <div className="space-y-4">
          {sites.map(site => (
            <div 
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group ${selectedSite?.id === site.id ? 'bg-indigo-600/20 border-indigo-500 shadow-lg' : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${selectedSite?.id === site.id ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    {site.url.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm truncate w-32">{site.url}</div>
                    <div className="text-xs text-slate-500 uppercase font-mono">DR: {site.dr}</div>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); removeSite(site.id); }}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DASHBOARD DETALHADO */}
        <div className="lg:col-span-2 space-y-6">
          {selectedSite ? (
            <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{selectedSite.url}</h3>
                  <div className="flex gap-4">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{selectedSite.backlinks} Backlinks</span>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{selectedSite.referringDomains} Domínios</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <button onClick={copiarPromptAuditoria} className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-500 transition-all" title="Copiar Auditoria">
                    <Copy className="w-5 h-5" />
                  </button>
                  <button onClick={() => window.open('https://gemini.google.com/app', '_blank')} className="bg-white text-slate-900 p-3 rounded-xl hover:bg-slate-100 transition-all" title="Abrir Gemini">
                    <Terminal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* INSTRUÇÕES E INPUT MANUAL */}
              <div className="mb-6 p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-xl">
                <p className="text-indigo-300 text-xs mb-3 font-semibold flex items-center gap-2 italic">
                  <Globe className="w-4 h-4" /> {lang === 'en' ? "Paste the JSON health audit below to update metrics:" : "Cole o JSON da auditoria de saúde abaixo para atualizar as métricas:"}
                </p>
                <textarea
                  value={manualJson}
                  onChange={(e) => setManualJson(e.target.value)}
                  placeholder='{ "dr": 40, ... }'
                  className="w-full h-20 bg-slate-900 border border-slate-700 rounded-lg p-3 text-emerald-400 font-mono text-xs focus:border-indigo-500 outline-none mb-3"
                />
                <button onClick={handleManualRender} className="w-full bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-600/50 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all">
                  {lang === 'en' ? "Update Health Stats" : "Atualizar Estatísticas de Saúde"}
                </button>
              </div>

              {/* MÉTRICAS RÁPIDAS */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Saúde do Perfil</span>
                    {selectedSite.qualityScore > 60 ? <ShieldCheck className="text-emerald-500" /> : <ShieldAlert className="text-orange-500" />}
                  </div>
                  <div className="flex items-end gap-2 mb-4">
                    <div className="text-4xl font-black text-white">{selectedSite.qualityScore}</div>
                    <div className="text-slate-500 mb-1 font-bold">/100</div>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${selectedSite.qualityScore > 60 ? 'bg-emerald-500' : 'bg-orange-500'}`} style={{ width: `${selectedSite.qualityScore}%` }}></div>
                  </div>
                </div>

                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Autoridade (DR)</span>
                    <Gauge className="text-indigo-400 w-5 h-5" />
                  </div>
                  <div className="text-4xl font-black text-white mb-2">{selectedSite.dr}</div>
                  <p className="text-slate-500 text-[10px] leading-relaxed">
                    {lang === 'en' ? "Estimated based on link quality and referring domains." : "Estimado com base na qualidade dos links e domínios de referência."}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/30 p-20 rounded-3xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-center">
              <Activity className="w-16 h-16 text-slate-700 mb-6" />
              <h3 className="text-xl font-bold text-slate-400">{lang === 'en' ? "Select a project to view details" : "Selecione um projeto para ver os detalhes"}</h3>
              <p className="text-slate-500 text-sm mt-2">{lang === 'en' ? "Or create a new one to start tracking authority." : "Ou crie um novo para começar a monitorar a autoridade."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BacklinkTracker;