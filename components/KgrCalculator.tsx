import React, { useState, useEffect, useMemo } from 'react';
import { Calculator, Info, CheckCircle, XCircle, AlertTriangle, Download, Trash2, History, ExternalLink, Search, ArrowUp, ArrowDown, ArrowUpDown, Ghost, HelpCircle, ChevronDown, ChevronUp, Loader2, BookOpen } from 'lucide-react';
import { Language, ZeroVolumeAnalysis } from '../types';
import { analyzeZeroVolumeKeyword } from '../services/geminiService';
import { translations } from '../utils/translations';

interface KgrResult {
  ratio: number;
  status: 'Great' | 'Good' | 'Bad';
  message: string;
}

interface KgrEntry extends KgrResult {
  keyword: string;
  volume: number;
  allintitle: number;
  date: string;
}

interface KgrCalculatorProps {
  lang: Language;
}

const KgrCalculator: React.FC<KgrCalculatorProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'kgr' | 'zero_volume'>('kgr');
  
  // KGR State
  const [keyword, setKeyword] = useState('');
  const [searchVolume, setSearchVolume] = useState<number | ''>('');
  const [allintitle, setAllintitle] = useState<number | ''>('');
  const [result, setResult] = useState<KgrResult | null>(null);
  const [history, setHistory] = useState<KgrEntry[]>(() => {
    const saved = localStorage.getItem('bm_kgr_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [sortConfig, setSortConfig] = useState<{ key: keyof KgrEntry; direction: 'asc' | 'desc' }>({ 
    key: 'date', 
    direction: 'desc' 
  });

  // Zero Volume State
  const [ghostKeyword, setGhostKeyword] = useState('');
  const [ghostLoading, setGhostLoading] = useState(false);
  const [ghostResult, setGhostResult] = useState<ZeroVolumeAnalysis | null>(null);
  const [showGhostMethod, setShowGhostMethod] = useState(false);
  
  const t = translations[lang].kgr;

  // Save history whenever it changes
  useEffect(() => {
    localStorage.setItem('bm_kgr_history', JSON.stringify(history));
  }, [history]);

  const calculateKGR = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVolume === '' || allintitle === '') return;

    const vol = Number(searchVolume);
    const ait = Number(allintitle);
    let newResult: KgrResult;

    if (vol > 250) {
      newResult = {
        ratio: ait / vol,
        status: 'Bad',
        message: 'Volume > 250'
      };
    } else {
      const ratio = ait / vol;
      let status: 'Great' | 'Good' | 'Bad' = 'Bad';
      let message = '';

      if (ratio < 0.25) {
        status = 'Great';
        message = t.result_great;
      } else if (ratio >= 0.25 && ratio <= 1.00) {
        status = 'Good';
        message = t.result_good;
      } else {
        status = 'Bad';
        message = t.result_bad;
      }
      newResult = { ratio, status, message };
    }

    setResult(newResult);

    // Add to history
    const entry: KgrEntry = {
      ...newResult,
      keyword: keyword || '(No Keyword)',
      volume: vol,
      allintitle: ait,
      date: new Date().toLocaleDateString()
    };
    
    setHistory(prev => [entry, ...prev]);
  };

  const handleGhostAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ghostKeyword) return;
    setGhostLoading(true);
    setGhostResult(null);
    
    const analysis = await analyzeZeroVolumeKeyword(ghostKeyword, lang);
    setGhostResult(analysis);
    setGhostLoading(false);
  };

  const handleExport = () => {
    if (sortedHistory.length === 0) return;

    const headers = ['Keyword', 'Volume', 'Allintitle', 'KGR Ratio', 'Status', 'Date'];
    const rows = sortedHistory.map(h => [
      `"${h.keyword.replace(/"/g, '""')}"`,
      h.volume,
      h.allintitle,
      h.ratio.toFixed(2),
      h.status,
      h.date
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `kgr_history_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear the history?')) {
      setHistory([]);
      setResult(null);
    }
  };

  const openGoogleAllintitle = () => {
    if (!keyword) return;
    const query = `allintitle:${keyword}`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const openGoogleSearch = (kw: string) => {
    if (!kw) return;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(kw)}`, '_blank');
  };

  const openForumSearch = (kw: string) => {
    if (!kw) return;
    const query = `site:reddit.com OR site:quora.com "${kw}"`;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
  };

  const handleSort = (key: keyof KgrEntry) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedHistory = useMemo(() => {
    let sortableItems = [...history];
    sortableItems.sort((a, b) => {
      // Date Sorting
      if (sortConfig.key === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        const valA = isNaN(dateA) ? 0 : dateA;
        const valB = isNaN(dateB) ? 0 : dateB;
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      }
      if (sortConfig.key === 'status') {
         const priority = { 'Great': 1, 'Good': 2, 'Bad': 3 };
         const valA = priority[a.status] || 99;
         const valB = priority[b.status] || 99;
         if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
         if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
         return 0;
      }
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (aValue.toLowerCase() < bValue.toLowerCase()) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue.toLowerCase() > bValue.toLowerCase()) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      }
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sortableItems;
  }, [history, sortConfig]);

  const getSortIcon = (columnKey: keyof KgrEntry) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown className="w-3 h-3 ml-1 inline opacity-30" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="w-3 h-3 ml-1 inline text-amber-400" /> 
      : <ArrowDown className="w-3 h-3 ml-1 inline text-amber-400" />;
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header and Tabs */}
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {activeTab === 'kgr' ? (
                <Calculator className="w-8 h-8 text-amber-400" />
              ) : (
                <Ghost className="w-8 h-8 text-purple-400" />
              )}
              <h2 className="text-2xl font-bold text-white">
                {activeTab === 'kgr' ? t.title : t.zero_title}
              </h2>
            </div>
            
            <div className="bg-slate-900/80 p-1 rounded-lg border border-slate-700 flex">
              <button
                onClick={() => setActiveTab('kgr')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'kgr' 
                    ? 'bg-amber-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {t.tab_kgr || "KGR Calculator"}
              </button>
              <button
                onClick={() => setActiveTab('zero_volume')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'zero_volume' 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Ghost className="w-4 h-4" /> {t.tab_zero || "Zero Volume"}
              </button>
            </div>
          </div>
          <p className="text-slate-300 mb-4 max-w-2xl">
            {activeTab === 'kgr' ? t.subtitle : t.zero_desc}
          </p>
          
          {activeTab === 'kgr' && (
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 text-sm text-slate-400 inline-block">
              <p className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400" />
                <span>Credit: Doug Cunnington. <a href="https://nichesiteproject.com/keyword-golden-ratio/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">NicheSiteProject.com</a>.</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* KGR Mode */}
          {activeTab === 'kgr' && (
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                 <Calculator className="w-5 h-5 text-slate-400" /> Calculate
              </h3>
              <form onSubmit={calculateKGR} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">{t.label_keyword}</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="e.g. best coffee grinder"
                      className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                    <button 
                      type="button"
                      onClick={openGoogleAllintitle}
                      disabled={!keyword}
                      className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                      title={t.btn_check_google}
                    >
                      <Search className="w-4 h-4" />
                      <span className="hidden sm:inline">Google It</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      {t.label_volume}
                    </label>
                    <input
                      type="number"
                      value={searchVolume}
                      onChange={(e) => setSearchVolume(Number(e.target.value))}
                      placeholder="Max 250"
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">
                      {t.label_allintitle}
                    </label>
                    <input
                      type="number"
                      value={allintitle}
                      onChange={(e) => setAllintitle(Number(e.target.value))}
                      placeholder="Results"
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20"
                >
                  {t.button}
                </button>
              </form>
              
              {result && (
                <div className="mt-8 bg-slate-900/50 p-6 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-center animate-in slide-in-from-top-2">
                    <div className="mb-2">
                      {result.status === 'Great' && <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />}
                      {result.status === 'Good' && <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto" />}
                      {result.status === 'Bad' && <XCircle className="w-12 h-12 text-red-400 mx-auto" />}
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">{result.ratio.toFixed(2)}</h3>
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-2 border ${
                      result.status === 'Great' ? 'bg-emerald-900/30 text-emerald-300 border-emerald-500/30' :
                      result.status === 'Good' ? 'bg-yellow-900/30 text-yellow-300 border-yellow-500/30' :
                      'bg-red-900/30 text-red-300 border-red-500/30'
                    }`}>
                      {result.status}
                    </span>
                    <p className="text-slate-300 font-medium text-sm">{result.message}</p>
                </div>
              )}
            </div>
          )}

          {/* Zero Volume / Ghost Mode */}
          {activeTab === 'zero_volume' && (
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg border-t-4 border-t-purple-500">
              
              {/* Method Explanation Toggle */}
              <div className="mb-6 rounded-lg border border-purple-500/20 bg-purple-900/10 overflow-hidden">
                <button 
                   onClick={() => setShowGhostMethod(!showGhostMethod)}
                   className="w-full flex items-center justify-between p-4 text-purple-300 hover:bg-purple-900/20 transition-colors"
                >
                   <span className="font-bold flex items-center gap-2">
                     <BookOpen className="w-4 h-4" /> {t.zero_method_title || "The Method"}
                   </span>
                   {showGhostMethod ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showGhostMethod && (
                   <div className="p-4 pt-0 text-sm text-slate-300 leading-relaxed border-t border-purple-500/20 whitespace-pre-line">
                      {t.zero_method_text}
                   </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                 <Search className="w-5 h-5 text-slate-400" /> {t.zero_desc || "Analyze a Keyword"}
              </h3>
              <form onSubmit={handleGhostAnalyze} className="space-y-4">
                <div>
                   <label className="block text-sm font-medium text-slate-400 mb-1">{t.label_keyword}</label>
                   <input
                      type="text"
                      value={ghostKeyword}
                      onChange={(e) => setGhostKeyword(e.target.value)}
                      placeholder="e.g. how to start a worm farm in apartment"
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    />
                </div>
                
                {/* Manual Checks */}
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                   <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                     <ExternalLink className="w-3 h-3" /> {t.zero_manual_check || "Manual Checks"}
                   </h4>
                   <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => openGoogleSearch(ghostKeyword)}
                        disabled={!ghostKeyword}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-600 flex items-center justify-center gap-2"
                      >
                         <Search className="w-4 h-4 text-blue-400" />
                         {t.zero_check_auto || "Check Autocomplete"}
                      </button>
                      <button
                        type="button"
                        onClick={() => openForumSearch(ghostKeyword)}
                        disabled={!ghostKeyword}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-600 flex items-center justify-center gap-2"
                      >
                         <Search className="w-4 h-4 text-orange-400" />
                         {t.zero_check_forum || "Check Forums"}
                      </button>
                   </div>
                </div>

                <button 
                  type="submit"
                  disabled={ghostLoading || !ghostKeyword}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
                >
                  {ghostLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Ghost className="w-5 h-5" />}
                  {t.zero_btn_analyze || "Analyze Potential"}
                </button>
              </form>

              {ghostResult && (
                 <div className="mt-8 bg-slate-900/50 p-6 rounded-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700">
                       <div>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Potential Score</p>
                          <p className={`text-3xl font-bold ${
                             ghostResult.potentialScore > 70 ? 'text-emerald-400' : 
                             ghostResult.potentialScore > 40 ? 'text-yellow-400' : 'text-slate-400'
                          }`}>
                             {ghostResult.potentialScore}/100
                          </p>
                       </div>
                       <div className={`px-4 py-2 rounded-full border text-sm font-bold ${
                          ghostResult.verdict === 'High Potential' ? 'bg-emerald-900/20 text-emerald-300 border-emerald-500/30' :
                          ghostResult.verdict === 'Uncertain' ? 'bg-yellow-900/20 text-yellow-300 border-yellow-500/30' :
                          'bg-red-900/20 text-red-300 border-red-500/30'
                       }`}>
                          {ghostResult.verdict}
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div>
                          <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                             <HelpCircle className="w-4 h-4 text-purple-400" /> Analysis
                          </h4>
                          <p className="text-slate-300 text-sm leading-relaxed">{ghostResult.reasoning}</p>
                       </div>
                       <div>
                          <h4 className="text-white font-bold mb-2">Variations to Try</h4>
                          <div className="flex flex-wrap gap-2">
                             {ghostResult.suggestedVariations.map((v, i) => (
                                <span key={i} className="px-3 py-1 bg-slate-800 border border-slate-600 rounded-full text-xs text-slate-300">
                                   {v}
                                </span>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              )}
            </div>
          )}
        </div>

        {/* Tools Sidebar */}
        <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg h-full">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                 <ExternalLink className="w-5 h-5 text-indigo-400" />
                 {t.tools_title}
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                {t.tools_desc}
              </p>
              
              <div className="space-y-3">
                 <a 
                   href="https://ahrefs.com/keyword-generator" 
                   target="_blank" 
                   rel="noreferrer"
                   className="block p-3 rounded-lg bg-slate-900 hover:bg-slate-700 border border-slate-700 transition-colors group"
                 >
                   <div className="flex justify-between items-center">
                      <span className="font-medium text-white group-hover:text-indigo-300 transition-colors">{t.tool_ahrefs}</span>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
                   </div>
                 </a>
                 <a 
                   href="https://ads.google.com/home/tools/keyword-planner/" 
                   target="_blank" 
                   rel="noreferrer"
                   className="block p-3 rounded-lg bg-slate-900 hover:bg-slate-700 border border-slate-700 transition-colors group"
                 >
                   <div className="flex justify-between items-center">
                      <span className="font-medium text-white group-hover:text-indigo-300 transition-colors">{t.tool_planner}</span>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
                   </div>
                 </a>
                 <a 
                   href="https://neilpatel.com/ubersuggest/" 
                   target="_blank" 
                   rel="noreferrer"
                   className="block p-3 rounded-lg bg-slate-900 hover:bg-slate-700 border border-slate-700 transition-colors group"
                 >
                   <div className="flex justify-between items-center">
                      <span className="font-medium text-white group-hover:text-indigo-300 transition-colors">{t.tool_uber}</span>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
                   </div>
                 </a>
              </div>
              
              {activeTab === 'kgr' ? (
                <div className="mt-6 p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/20 text-xs text-indigo-200">
                   <strong>Pro Tip:</strong> Click the "Google It" button next to the keyword field to instantly check the <em>allintitle</em> count.
                </div>
              ) : (
                <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/20 text-xs text-purple-200">
                   <strong>Ghost Tip:</strong> Trust Google's Autocomplete over tool volume data. If Google suggests it, people are searching for it.
                </div>
              )}
            </div>
        </div>
      </div>

      {/* History Table (Only show for KGR mode currently) */}
      {activeTab === 'kgr' && history.length > 0 && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg animate-in slide-in-from-bottom-4">
           <div className="p-4 border-b border-slate-700 bg-slate-900/30 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400" />
              <h3 className="font-bold text-slate-300 text-sm">{t.history}</h3>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead className="bg-slate-900/50 text-slate-400 font-medium">
                 <tr>
                   <th 
                     className="px-4 py-3 cursor-pointer hover:text-white transition-colors select-none"
                     onClick={() => handleSort('keyword')}
                   >
                     Keyword {getSortIcon('keyword')}
                   </th>
                   <th 
                     className="px-4 py-3 cursor-pointer hover:text-white transition-colors select-none"
                     onClick={() => handleSort('volume')}
                   >
                     Vol {getSortIcon('volume')}
                   </th>
                   <th 
                     className="px-4 py-3 cursor-pointer hover:text-white transition-colors select-none"
                     onClick={() => handleSort('allintitle')}
                   >
                     AIT {getSortIcon('allintitle')}
                   </th>
                   <th 
                     className="px-4 py-3 cursor-pointer hover:text-white transition-colors select-none"
                     onClick={() => handleSort('ratio')}
                   >
                     Ratio {getSortIcon('ratio')}
                   </th>
                   <th 
                     className="px-4 py-3 cursor-pointer hover:text-white transition-colors select-none"
                     onClick={() => handleSort('status')}
                   >
                     Status {getSortIcon('status')}
                   </th>
                   <th 
                     className="px-4 py-3 cursor-pointer hover:text-white transition-colors select-none"
                     onClick={() => handleSort('date')}
                   >
                     Date {getSortIcon('date')}
                   </th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-700/50">
                 {sortedHistory.map((entry, idx) => (
                   <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                     <td className="px-4 py-3 text-white font-medium">{entry.keyword}</td>
                     <td className="px-4 py-3 text-slate-300">{entry.volume}</td>
                     <td className="px-4 py-3 text-slate-300">{entry.allintitle}</td>
                     <td className="px-4 py-3 text-white font-bold">{entry.ratio.toFixed(2)}</td>
                     <td className="px-4 py-3">
                       <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
                         entry.status === 'Great' ? 'bg-emerald-900/50 text-emerald-300' :
                         entry.status === 'Good' ? 'bg-yellow-900/50 text-yellow-300' :
                         'bg-red-900/50 text-red-300'
                       }`}>
                         {entry.status}
                       </span>
                     </td>
                     <td className="px-4 py-3 text-slate-400 text-xs">{entry.date}</td>
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

export default KgrCalculator;