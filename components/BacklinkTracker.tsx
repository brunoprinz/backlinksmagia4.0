import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Trash2, ExternalLink, Link as LinkIcon, TrendingUp, Activity, Download, Gauge, Info, Loader2, Sparkles, Zap, Globe, ArrowRight } from 'lucide-react';
import { Language, TrackedSite } from '../types';
import { translations } from '../utils/translations1';

interface BacklinkTrackerProps {
  lang: Language;
}

const BacklinkTracker: React.FC<BacklinkTrackerProps> = ({ lang }) => {
  const [sites, setSites] = useState<TrackedSite[]>([]);
  const [selectedSite, setSelectedSite] = useState<TrackedSite | null>(null);
  const [loading, setLoading] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  
  const t = translations[lang] || {};

  // Funções de salvamento e carregamento mantidas...
  useEffect(() => {
    const saved = localStorage.getItem('bm_tracked_sites');
    if (saved) setSites(JSON.parse(saved));
  }, []);

  const handleAddSite = () => {
    if (!newUrl) return;
    setLoading(true);
    
    // Simulação de chamada ao Gemini
    setTimeout(() => {
      const newSite: TrackedSite = {
        id: Math.random().toString(36).substr(2, 9),
        url: newUrl,
        dr: Math.floor(Math.random() * 40) + 10,
        backlinks: Math.floor(Math.random() * 1000),
        history: [
          { date: '2023-10', dr: 10, links: 100 },
          { date: '2023-11', dr: 15, links: 250 },
          { date: '2023-12', dr: 22, links: 480 }
        ]
      };
      const updated = [...sites, newSite];
      setSites(updated);
      localStorage.setItem('bm_tracked_sites', JSON.stringify(updated));
      setNewUrl('');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <TrendingUp className="w-10 h-10 text-indigo-500" />
            {lang === 'en' ? "Authority Monitor" : "Monitor de Autoridade"}
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            {lang === 'en' ? "Track domain growth and link intelligence" : "Acompanhe o crescimento do domínio e inteligência de links"}
          </p>
        </div>

        {/* Input Inteligente com Botão Gemini */}
        <div className="flex flex-col gap-2">
          <div className="relative group">
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="ex: seudominio.com"
              className="bg-slate-800 border-2 border-slate-700 text-white pl-10 pr-40 py-4 rounded-2xl w-full md:w-[450px] focus:border-indigo-500 outline-none transition-all shadow-2xl"
            />
            <Globe className="absolute left-3 top-4.5 w-5 h-5 text-slate-500" />
            
            <button
              onClick={handleAddSite}
              disabled={loading || !newUrl}
              className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group-hover:scale-105 active:scale-95"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {lang === 'en' ? "Analyze with AI" : "Analisar com IA"}
                </>
              )}
            </button>
          </div>
          <p className="text-[10px] text-slate-500 flex items-center gap-1 ml-2">
            <Info className="w-3 h-3" />
            {lang === 'en' ? "Gemini AI will scan authority and backlink history." : "O Gemini IA irá escanear a autoridade e histórico de backlinks."}
          </p>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lista de Sites */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-slate-400 text-xs font-black uppercase tracking-widest px-2">
            {lang === 'en' ? "Your Projects" : "Seus Projetos"}
          </h2>
          <div className="grid grid-cols-1 gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {sites.map(site => (
              <button
                key={site.id}
                onClick={() => setSelectedSite(site)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                  selectedSite?.id === site.id 
                    ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.2)]' 
                    : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedSite?.id === site.id ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white text-sm truncate w-32">{site.url}</div>
                    <div className="text-[10px] text-slate-400">DR: {site.dr} | Links: {site.backlinks}</div>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 ${selectedSite?.id === site.id ? 'text-indigo-400' : 'text-slate-600'}`} />
              </button>
            ))}
            
            {sites.length === 0 && (
              <div className="text-center py-12 bg-slate-800/20 rounded-3xl border-2 border-dashed border-slate-800">
                <p className="text-slate-600 text-sm">{lang === 'en' ? "No domains tracked yet." : "Nenhum domínio rastreado."}</p>
              </div>
            )}
          </div>
        </div>

        {/* Visualização de Dados */}
        <div className="lg:col-span-8">
          {selectedSite ? (
            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-8 animate-in slide-in-from-right-4 duration-500">
                {/* Header do Site Selecionado e Gráfico (mantendo sua estrutura anterior) */}
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white">{selectedSite.url}</h3>
                    <button 
                      onClick={() => {
                        const updated = sites.filter(s => s.id !== selectedSite.id);
                        setSites(updated);
                        localStorage.setItem('bm_tracked_sites', JSON.stringify(updated));
                        setSelectedSite(null);
                      }}
                      className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                </div>
                
                {/* O resto do seu gráfico e cards de estatísticas continua aqui... */}
            // Versão Corrigida
<div className="h-[300px] mt-8">
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={selectedSite.history}>
      <defs>
        <linearGradient id="colorDr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
      <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
      <YAxis stroke="#64748b" fontSize={12} />
      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }} />
      <Area type="monotone" dataKey="dr" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorDr)" />
    </AreaChart>
  </ResponsiveContainer>
</div>
            </div>
          ) : (
            <div className="bg-slate-800/30 h-full min-h-[400px] rounded-3xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-center p-12">
              <Zap className="w-16 h-16 text-slate-700 mb-6" />
              <h3 className="text-xl font-bold text-slate-400">{lang === 'en' ? "Ready to scale?" : "Pronto para escalar?"}</h3>
              <p className="text-slate-500 text-sm mt-2 max-w-xs">{lang === 'en' ? "Enter a domain above and let Gemini AI analyze the competitive landscape." : "Insira um domínio acima e deixe o Gemini IA analisar o cenário competitivo."}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BacklinkTracker;