import React, { useState, useMemo } from 'react';
import { Search, Target, TrendingUp, DollarSign, BookOpen, Loader2, Download, Save, FolderOpen, ArrowUp, ArrowDown, ArrowUpDown, Swords, Users, Check, Wand2 } from 'lucide-react';
import { generateKeywords, analyzeCompetitorGap } from '../services/geminiService';
import { KeywordIdea, Language, KeywordMode, AppView } from '../types';
import { translations } from '../utils/translations';

interface KeywordResearcherProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
}

type SortKey = keyof KeywordIdea;
type SortDirection = 'asc' | 'desc';

const KeywordResearcher: React.FC<KeywordResearcherProps> = ({ lang, onNavigate }) => {
  const [mode, setMode] = useState<KeywordMode>('discovery');
  
  // Standard inputs
  const [seed, setSeed] = useState('');
  
  // Competitor inputs
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [competitorTopic, setCompetitorTopic] = useState('');

  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<KeywordIdea[]>([]);
  const [justSaved, setJustSaved] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey | null; direction: SortDirection }>({ 
    key: null, 
    direction: 'asc' 
  });
  
  const t = translations[lang].keywords;

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setKeywords([]); // Clear previous
    setSortConfig({ key: null, direction: 'asc' });

    if (mode === 'discovery') {
      if (!seed) { setLoading(false); return; }
      const results = await generateKeywords(seed, lang);
      setKeywords(results);
    } else {
      if (!competitorUrl || !competitorTopic) { setLoading(false); return; }
      const results = await analyzeCompetitorGap(competitorUrl, competitorTopic, lang);
      setKeywords(results);
    }
    
    setLoading(false);
  };

  const handleCreateContent = (contentIdea: string) => {
    // Store idea in localStorage to pass it to Content Magician
    localStorage.setItem('bm_draft_topic', contentIdea);
    onNavigate(AppView.CONTENT_MAGIC);
  };

  const sortedKeywords = useMemo(() => {
    let sortableItems = [...keywords];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const key = sortConfig.key as SortKey;
        
        // Custom sort logic for Difficulty
        if (key === 'difficulty') {
           const difficultyOrder: {[key: string]: number} = { 'Low': 1, 'Medium': 2, 'High': 3 };
           // Handle case-insensitivity or potential trimming needs just in case
           const valA = difficultyOrder[a.difficulty] || 0;
           const valB = difficultyOrder[b.difficulty] || 0;
           
           if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
           if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
           return 0;
        }

        // Default string sorting
        const aValue = a[key].toString().toLowerCase();
        const bValue = b[key].toString().toLowerCase();

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [keywords, sortConfig]);

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleExport = () => {
    // Use sortedKeywords so the export matches the visual table order
    if (sortedKeywords.length === 0) return;

    const headers = [t.table_kw, t.table_intent, t.table_diff, t.table_idea];
    const rows = sortedKeywords.map(k => [
      `"${k.keyword.replace(/"/g, '""')}"`, 
      `"${k.intent}"`, 
      `"${k.difficulty}"`, 
      `"${k.contentIdea.replace(/"/g, '""')}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Naming based on mode
    const filenamePrefix = mode === 'discovery' ? `rank_ninja_${seed.replace(/\s+/g, '_')}` : `gap_analysis_${competitorTopic.replace(/\s+/g, '_')}`;

    link.setAttribute('href', url);
    link.setAttribute('download', `${filenamePrefix}_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = () => {
    if (keywords.length === 0) return;
    localStorage.setItem('bm_saved_keywords', JSON.stringify(keywords));
    setJustSaved(true);
    setTimeout(() => {
      setJustSaved(false);
    }, 2000);
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('bm_saved_keywords');
    if (saved) {
      try {
        setKeywords(JSON.parse(saved));
        setSortConfig({ key: null, direction: 'asc' });
      } catch (e) {
        console.error("Failed to parse saved keywords", e);
      }
    } else {
      alert(t.empty_save || 'No saved research found.');
    }
  };

  const getIntentIcon = (intent: string) => {
    switch (intent) {
      case 'Transactional': return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'Commercial': return <TrendingUp className="w-4 h-4 text-blue-400" />;
      default: return <BookOpen className="w-4 h-4 text-slate-400" />;
    }
  };

  const getSortIcon = (columnKey: SortKey) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown className="w-4 h-4 ml-1 inline opacity-30" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="w-4 h-4 ml-1 inline text-emerald-400" /> 
      : <ArrowDown className="w-4 h-4 ml-1 inline text-emerald-400" />;
  };

  const isDiscovery = mode === 'discovery';

  return (
    <div className="space-y-6">
      <div className={`
        relative p-8 rounded-xl border transition-colors duration-500 overflow-hidden
        ${isDiscovery 
          ? 'bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-emerald-500/30' 
          : 'bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-500/30'
        }
      `}>
        {/* Mode Switcher Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setMode('discovery'); setKeywords([]); }}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
              isDiscovery 
                ? 'bg-emerald-600 text-white shadow-lg' 
                : 'bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Target className="w-4 h-4" /> {t.mode_discovery}
          </button>
          <button
            onClick={() => { setMode('competitor'); setKeywords([]); }}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
              !isDiscovery 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Swords className="w-4 h-4" /> {t.mode_competitor}
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             {isDiscovery ? <Target className="w-8 h-8 text-emerald-400" /> : <Users className="w-8 h-8 text-blue-400" />}
             <h2 className="text-2xl font-bold text-white">{t.title}</h2>
          </div>
          <button 
             onClick={handleLoad}
             className={`flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium bg-slate-900/50 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 ${isDiscovery ? 'hover:border-emerald-500/50' : 'hover:border-blue-500/50'}`}
          >
             <FolderOpen className="w-4 h-4" />
             {t.load || 'Load Saved'}
          </button>
        </div>
        
        <p className="text-slate-300 mb-6 max-w-2xl">
          {isDiscovery ? t.subtitle : t.comp_desc}
        </p>
        
        <form onSubmit={handleResearch} className={`flex flex-col md:flex-row gap-4 ${!isDiscovery ? 'items-end' : ''}`}>
          {isDiscovery ? (
            // Discovery Mode Input
            <input
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 bg-slate-900/80 border border-emerald-500/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          ) : (
             // Competitor Mode Inputs
             <>
                <div className="flex-1 w-full">
                  <label className="block text-xs font-bold text-blue-300 uppercase tracking-wider mb-2 ml-1">{t.comp_url_label}</label>
                  <input
                    type="text"
                    value={competitorUrl}
                    onChange={(e) => setCompetitorUrl(e.target.value)}
                    placeholder={t.comp_url_placeholder}
                    className="w-full bg-slate-900/80 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex-1 w-full">
                   <label className="block text-xs font-bold text-blue-300 uppercase tracking-wider mb-2 ml-1">{t.comp_topic_label}</label>
                   <input
                    type="text"
                    value={competitorTopic}
                    onChange={(e) => setCompetitorTopic(e.target.value)}
                    placeholder={t.placeholder}
                    className="w-full bg-slate-900/80 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
             </>
          )}
          
          <button 
            type="submit"
            disabled={loading}
            className={`
              px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50
              ${isDiscovery 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white md:mb-[1px] h-[50px]'}
            `}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            {loading ? t.loading : (isDiscovery ? t.button : t.comp_button)}
          </button>
        </form>
      </div>

      {sortedKeywords.length > 0 && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="flex justify-end gap-3 p-4 border-b border-slate-700">
             <button 
                onClick={handleSave}
                className={`flex items-center gap-2 transition-colors text-sm font-medium ${
                  justSaved 
                    ? 'text-emerald-400 bg-emerald-900/20 px-3 py-1.5 rounded-lg' 
                    : 'text-indigo-400 hover:text-indigo-300 px-3 py-1.5'
                }`}
             >
                {justSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {justSaved ? (t.saved || 'Saved!') : (t.save || 'Save Research')}
             </button>
             <div className="w-px h-5 bg-slate-700 my-auto"></div>
             <button 
                onClick={handleExport}
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium px-3 py-1.5"
             >
                <Download className="w-4 h-4" />
                {t.export || 'Export CSV'}
             </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-700">
                  <th 
                    className="px-6 py-4 text-slate-400 font-medium cursor-pointer hover:text-white transition-colors select-none group"
                    onClick={() => handleSort('keyword')}
                  >
                    <div className="flex items-center">
                      {t.table_kw}
                      {getSortIcon('keyword')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-slate-400 font-medium cursor-pointer hover:text-white transition-colors select-none group"
                    onClick={() => handleSort('intent')}
                  >
                    <div className="flex items-center">
                      {t.table_intent}
                      {getSortIcon('intent')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-slate-400 font-medium cursor-pointer hover:text-white transition-colors select-none group"
                    onClick={() => handleSort('difficulty')}
                  >
                    <div className="flex items-center">
                      {t.table_diff}
                      {getSortIcon('difficulty')}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-slate-400 font-medium">
                    {t.table_idea}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {sortedKeywords.map((kw, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/30 transition-colors group">
                    <td className="px-6 py-4 text-white font-medium">{kw.keyword}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getIntentIcon(kw.intent)}
                        <span className={`text-sm ${
                          kw.intent === 'Transactional' ? 'text-emerald-300' : 
                          kw.intent === 'Commercial' ? 'text-blue-300' : 'text-slate-300'
                        }`}>
                          {kw.intent}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        kw.difficulty === 'Low' ? 'bg-emerald-900 text-emerald-200' :
                        kw.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-200' :
                        'bg-red-900 text-red-200'
                      }`}>
                        {kw.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">
                      <div className="flex items-center justify-between gap-4">
                         <span>{kw.contentIdea}</span>
                         <button 
                            onClick={() => handleCreateContent(kw.contentIdea)}
                            className="opacity-0 group-hover:opacity-100 p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-all transform hover:scale-105"
                            title="Create this content with Content Magician"
                         >
                            <Wand2 className="w-4 h-4" />
                         </button>
                      </div>
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

export default KeywordResearcher;