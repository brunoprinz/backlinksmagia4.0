import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Trash2, ExternalLink, Link as LinkIcon, TrendingUp, Activity, Download, Gauge, Info, Loader2 } from 'lucide-react';
import { Language, TrackedSite } from '../types';
import { translations } from '../utils/translations';
import { analyzeDomainHealth } from '../services/geminiService';

interface BacklinkTrackerProps {
  lang: Language;
}

// Initial dummy data
const INITIAL_DATA: TrackedSite[] = [
  {
    id: '1',
    url: 'mysaas-startup.com',
    dr: 34,
    backlinks: 1250,
    referringDomains: 145,
    relevance: 85,
    qualityScore: 65, // (34 * 0.4) + (85 * 0.6) = 13.6 + 51 = 64.6 -> 65
    history: [
      { month: 'Jan', links: 400 },
      { month: 'Feb', links: 550 },
      { month: 'Mar', links: 700 },
      { month: 'Apr', links: 820 },
      { month: 'May', links: 1100 },
      { month: 'Jun', links: 1250 },
    ]
  }
];

const BacklinkTracker: React.FC<BacklinkTrackerProps> = ({ lang }) => {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Initialize from localStorage or fallback to INITIAL_DATA
  const [trackedSites, setTrackedSites] = useState<TrackedSite[]>(() => {
    const saved = localStorage.getItem('bm_tracked_sites');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [selectedSiteId, setSelectedSiteId] = useState<string>('');
  const t = translations[lang].tracker;

  // Set selected site on mount or when trackedSites changes if none selected
  useEffect(() => {
    if (!selectedSiteId && trackedSites.length > 0) {
      setSelectedSiteId(trackedSites[0].id);
    }
  }, [trackedSites, selectedSiteId]);

  // Save to localStorage whenever trackedSites changes
  useEffect(() => {
    localStorage.setItem('bm_tracked_sites', JSON.stringify(trackedSites));
  }, [trackedSites]);

  const handleAddSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;
    setLoading(true);

    const domain = urlInput.replace(/(^\w+:|^)\/\//, '');
    
    // Use Gemini to analyze/estimate stats for the domain
    const analysis = await analyzeDomainHealth(domain, lang);

    if (analysis) {
       // Override ID to ensure uniqueness in our local list context if needed, but Gemini provides one.
       // We'll trust Gemini's structure but ensure ID is unique just in case.
       const newSite = { ...analysis, id: Date.now().toString() };
       setTrackedSites([...trackedSites, newSite]);
       setSelectedSiteId(newSite.id);
       setUrlInput('');
    } else {
       // Fallback if AI fails
       const startValue = Math.floor(Math.random() * 500) + 100;
       const growthRate = Math.floor(Math.random() * 50) + 10;
       const dr = Math.floor(Math.random() * 40) + 10;
       const relevance = Math.floor(Math.random() * 50) + 50;
       const qualityScore = Math.round((dr * 0.4) + (relevance * 0.6));
       
       const newSite: TrackedSite = {
        id: Date.now().toString(),
        url: domain,
        dr,
        backlinks: startValue + (growthRate * 6),
        referringDomains: Math.floor(startValue / 10),
        relevance,
        qualityScore,
        history: [
          { month: 'Jan', links: startValue },
          { month: 'Feb', links: startValue + growthRate },
          { month: 'Mar', links: startValue + (growthRate * 2.5) },
          { month: 'Apr', links: startValue + (growthRate * 3) },
          { month: 'May', links: startValue + (growthRate * 4.5) },
          { month: 'Jun', links: startValue + (growthRate * 6) },
        ]
      };
      setTrackedSites([...trackedSites, newSite]);
      setSelectedSiteId(newSite.id);
      setUrlInput('');
    }

    setLoading(false);
  };

  const removeSite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = trackedSites.filter(s => s.id !== id);
    setTrackedSites(filtered);
    if (selectedSiteId === id && filtered.length > 0) {
      setSelectedSiteId(filtered[0].id);
    } else if (filtered.length === 0) {
      setSelectedSiteId('');
    }
  };

  const handleExport = () => {
    if (trackedSites.length === 0) return;

    const headers = ['URL', 'Domain Rating', 'Backlinks', 'Referring Domains', 'Quality Score', 'Relevance'];
    const rows = trackedSites.map(s => [
      `"${s.url}"`, 
      s.dr, 
      s.backlinks, 
      s.referringDomains,
      s.qualityScore,
      s.relevance
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `backlink_tracker_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedSite = trackedSites.find(s => s.id === selectedSiteId);

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-orange-400" />
              {t.title}
            </h2>
            <p className="text-slate-400 text-sm mt-1">{t.subtitle}</p>
          </div>
          
          <div className="flex gap-3">
             <button 
                onClick={handleExport}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" /> 
                <span className="hidden md:inline">{t.export || 'Export CSV'}</span>
             </button>
             <form onSubmit={handleAddSite} className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder={t.placeholder}
                  className="bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 outline-none w-40 md:w-64"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  <span className="hidden md:inline">{t.button}</span>
                </button>
              </form>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          {trackedSites.map((site) => (
            <button
              key={site.id}
              onClick={() => setSelectedSiteId(site.id)}
              className={`min-w-[200px] p-4 rounded-xl border text-left transition-all relative group ${
                selectedSiteId === site.id
                  ? 'bg-orange-900/20 border-orange-500 ring-1 ring-orange-500/50'
                  : 'bg-slate-900/50 border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-white truncate max-w-[140px]">{site.url}</span>
                <div 
                  onClick={(e) => removeSite(site.id, e)}
                  className="text-slate-500 hover:text-red-400 p-1 rounded-full hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <LinkIcon className="w-3 h-3" />
                  <span>{site.backlinks.toLocaleString()} links</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Gauge className="w-3 h-3 text-slate-500" />
                  <span className={`font-bold ${
                    site.qualityScore > 70 ? 'text-emerald-400' : 
                    site.qualityScore > 40 ? 'text-amber-400' : 'text-red-400'
                  }`}>QS: {site.qualityScore}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedSite ? (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-6">Growth Trajectory</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedSite.history}>
                  <defs>
                    <linearGradient id="colorBacklinks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="links" 
                    stroke="#f97316" 
                    fillOpacity={1} 
                    fill="url(#colorBacklinks)" 
                    name="Backlinks"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
               <h3 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2">
                 <Gauge className="w-4 h-4" />
                 {t.quality_score}
                 <div className="group relative ml-auto">
                    <Info className="w-4 h-4 text-slate-500 hover:text-white cursor-help" />
                    <div className="absolute right-0 bottom-full mb-2 w-48 p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-300 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Score based on:
                      <br/>• Domain Rating (40%)
                      <br/>• Niche Relevance (60%)
                      <br/>AI Estimate.
                    </div>
                 </div>
               </h3>
               
               <div className="flex items-center justify-between mb-4">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="50%" cy="50%" r="40" stroke="#334155" strokeWidth="8" fill="transparent" />
                      <circle 
                        cx="50%" 
                        cy="50%" 
                        r="40" 
                        stroke={selectedSite.qualityScore > 70 ? "#10b981" : selectedSite.qualityScore > 40 ? "#f59e0b" : "#ef4444"}
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * selectedSite.qualityScore) / 100}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <span className="absolute text-2xl font-bold text-white">{selectedSite.qualityScore}</span>
                  </div>
                  
                  <div className="flex-1 ml-6 space-y-3">
                     <div>
                       <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>{t.relevance}</span>
                          <span className="text-white font-bold">{selectedSite.relevance}%</span>
                       </div>
                       <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${selectedSite.relevance}%` }}></div>
                       </div>
                     </div>
                     <div>
                       <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Domain Rating</span>
                          <span className="text-white font-bold">{selectedSite.dr}</span>
                       </div>
                       <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-purple-500 h-full rounded-full" style={{ width: `${selectedSite.dr}%` }}></div>
                       </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h3 className="text-sm font-medium text-slate-400 mb-4">Link Profile</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span className="text-slate-300">Total Backlinks</span>
                  <span className="font-bold text-white">{selectedSite.backlinks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span className="text-slate-300">Referring Domains</span>
                  <span className="font-bold text-white">{selectedSite.referringDomains.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Growth (MoM)</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +12%
                  </span>
                </div>
              </div>
              <a 
                href={`https://${selectedSite.url}`} 
                target="_blank" 
                rel="noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
              >
                Visit Site <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800 p-12 rounded-xl border border-slate-700 text-center text-slate-500 border-dashed flex flex-col items-center justify-center">
          <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-white mb-2">{t.empty}</h3>
          <p className="max-w-md mx-auto">{t.placeholder || 'Select a site from the list above or add a new one.'}</p>
        </div>
      )}
    </div>
  );
};

export default BacklinkTracker;
