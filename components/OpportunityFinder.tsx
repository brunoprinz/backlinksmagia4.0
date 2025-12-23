import React, { useState } from 'react';
import { Search, Globe, ArrowRight, Loader2, BarChart2 } from 'lucide-react';
import { findBacklinkOpportunities } from '../services/geminiService';
import { BacklinkOpportunity, Language } from '../types';
import { translations } from '../utils/translations';

interface OpportunityFinderProps {
  lang: Language;
}

const OpportunityFinder: React.FC<OpportunityFinderProps> = ({ lang }) => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<BacklinkOpportunity[]>([]);
  const t = translations[lang].opportunities;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche) return;
    setLoading(true);
    // Pass lang to service
    const results = await findBacklinkOpportunities(niche, lang);
    setOpportunities(results);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400 mb-6">{t.subtitle}</p>
        
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            {loading ? t.loading : t.button}
          </button>
        </form>
      </div>

      {opportunities.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {opportunities.map((opp, index) => (
            <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-900/30 rounded-lg text-indigo-400">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{opp.siteName}</h3>
                    <p className="text-sm text-indigo-400 mb-2">{opp.url}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="px-2 py-1 bg-slate-700 rounded text-slate-300">{t.col_strategy}: {opp.strategy}</span>
                      <span className="px-2 py-1 bg-slate-700 rounded text-slate-300">{t.col_contact}: {opp.contactInfo || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                      {opp.domainAuthority} <BarChart2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="text-xs text-slate-400">DA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {opp.relevanceScore}%
                    </div>
                    <div className="text-xs text-slate-400">Rel</div>
                  </div>
                  <button className="p-2 rounded-full bg-slate-700 hover:bg-indigo-600 text-white transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
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