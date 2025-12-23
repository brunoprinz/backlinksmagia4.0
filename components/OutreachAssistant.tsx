import React, { useState } from 'react';
import { Send, Copy, RefreshCw, Loader2, Mail, Lightbulb, Check } from 'lucide-react';
import { generateOutreachEmail, generateGuestPostTopics } from '../services/geminiService';
import { OutreachTemplate, Language } from '../types';
import { translations } from '../utils/translations';

interface OutreachAssistantProps {
  lang: Language;
}

const OutreachAssistant: React.FC<OutreachAssistantProps> = ({ lang }) => {
  const [targetName, setTargetName] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [strategyType, setStrategyType] = useState('Guest Post');
  const [loading, setLoading] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [email, setEmail] = useState<OutreachTemplate | null>(null);
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  const t = translations[lang].outreach;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetName || !contentTitle) return;
    setLoading(true);
    // Pass lang to service
    const result = await generateOutreachEmail(targetName, contentTitle, strategyType, lang);
    setEmail(result);
    setLoading(false);
  };

  const handleSuggestTopics = async () => {
    if (!contentTitle) return;
    setLoadingTopics(true);
    const topics = await generateGuestPostTopics(contentTitle, lang);
    setSuggestedTopics(topics);
    setLoadingTopics(false);
  };

  const copyToClipboard = () => {
    if (email) {
      navigator.clipboard.writeText(`${t.subject}: ${email.subject}\n\n${email.body}`);
      alert('Copied!');
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-400" />
            {t.title}
          </h2>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t.target_label}</label>
              <input
                type="text"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                placeholder="e.g., TechCrunch, Jane Doe"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t.content_label}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={contentTitle}
                  onChange={(e) => setContentTitle(e.target.value)}
                  placeholder="e.g., The Future of AI in SEO"
                  className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                {strategyType === 'Guest Post' && (
                  <button
                    type="button"
                    onClick={handleSuggestTopics}
                    disabled={!contentTitle || loadingTopics}
                    className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-yellow-400 rounded-lg border border-slate-600 transition-colors disabled:opacity-50"
                    title="Suggest Guest Post Topics"
                  >
                    {loadingTopics ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lightbulb className="w-5 h-5" />}
                  </button>
                )}
              </div>
            </div>

            {/* Suggested Topics Area */}
            {suggestedTopics.length > 0 && (
              <div className="bg-slate-900/50 p-4 rounded-lg border border-yellow-500/20 animate-in fade-in slide-in-from-top-2">
                <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Lightbulb className="w-3 h-3" /> Pitch Ideas
                </h4>
                <ul className="space-y-2">
                  {suggestedTopics.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-2 group">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-yellow-400 transition-colors" />
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors cursor-pointer" onClick={() => {navigator.clipboard.writeText(topic); alert('Topic copied!');}}>
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">{t.strategy_label}</label>
              <select 
                value={strategyType}
                onChange={(e) => setStrategyType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Guest Post">Guest Post Pitch</option>
                <option value="Skyscraper Technique">Skyscraper Technique</option>
                <option value="Broken Link Building">Broken Link Building</option>
                <option value="Resource Page">Resource Page Inclusion</option>
              </select>
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
              {loading ? t.loading : t.button}
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        {email ? (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-4">
              <h3 className="font-bold text-white">{t.preview}</h3>
              <button 
                onClick={copyToClipboard}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
              >
                <Copy className="w-4 h-4" /> {t.copy}
              </button>
            </div>
            
            <div className="space-y-4 flex-1">
              <div>
                <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">{t.subject}:</span>
                <p className="text-white font-medium text-lg mt-1">{email.subject}</p>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 whitespace-pre-wrap text-slate-300 font-light leading-relaxed">
                {email.body}
              </div>
            </div>
            
            <button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> Open
            </button>
          </div>
        ) : (
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex items-center justify-center text-slate-500 flex-col gap-3 border-dashed">
            <Mail className="w-12 h-12 opacity-20" />
            <p>Generate an email to see the preview here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutreachAssistant;