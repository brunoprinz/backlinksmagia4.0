import React, { useState } from 'react';
import { Send, Copy, RefreshCw, Loader2, Mail, Lightbulb, Check, SendHorizontal, MessageSquare, Terminal, Zap, Sparkles, UserCheck, Globe } from 'lucide-react';
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
  const [manualJson, setManualJson] = useState('');
  const [email, setEmail] = useState<OutreachTemplate | null>(null);
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  const t = translations[lang].outreach;

  const copiarPromptOutreach = () => {
    if (!targetName) { 
      alert(lang === 'en' ? "Who is the target?" : "Quem é o alvo?"); 
      return; 
    }
    const prompt = `Você é um Especialista em Relações Públicas e Link Building de Elite.
Alvo (Nome ou Site): "${targetName}"
Meu Nicho/Assunto: "${contentTitle || '[MEU ASSUNTO]'}"
Estratégia: "${strategyType}"

Sua missão: Escreva um e-mail de abordagem curto, altamente personalizado e que NÃO pareça spam.
Use um gancho de curiosidade no assunto. O corpo deve focar no benefício para o site DELES.

RETORNE APENAS JSON:
{
  "subject": "...",
  "body": "..."
}`;
    navigator.clipboard.writeText(prompt);
    alert(lang === 'en' ? "Outreach Mission copied!" : "Missão de Abordagem copiada! Use o Gemini para gerar o e-mail perfeito.");
  };

  const handleManualRender = () => {
    try {
      const data = JSON.parse(manualJson);
      setEmail(data);
      setManualJson('');
    } catch (e) {
      alert(lang === 'en' ? "Invalid JSON format." : "Formato JSON inválido.");
    }
  };

  const handleGenerate = async () => {
    if (!targetName) return;
    setLoading(true);
    try {
      const result = await generateOutreachEmail(targetName, contentTitle, strategyType, lang);
      setEmail(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative">
              <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 w-5 h-5" />
              <input
                type="text"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                placeholder={lang === 'en' ? "Target site or name..." : "Site alvo ou nome do contato..."}
                className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            
            <div className="relative">
              <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 w-5 h-5" />
              <input
                type="text"
                value={contentTitle}
                onChange={(e) => setContentTitle(e.target.value)}
                placeholder={lang === 'en' ? "Your topic/niche..." : "Seu tópico ou nicho..."}
                className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <select
              value={strategyType}
              onChange={(e) => setStrategyType(e.target.value)}
              className="w-full bg-slate-900/50 border-2 border-slate-700 rounded-2xl py-4 px-6 text-white focus:border-indigo-500 outline-none transition-all appearance-none"
            >
              <option value="Guest Post">Guest Post</option>
              <option value="Skyscraper">Skyscraper Technique</option>
              <option value="Broken Link">Broken Link Building</option>
              <option value="Resource Page">Resource Page</option>
            </select>

            <button
              onClick={handleGenerate}
              disabled={loading || !targetName}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <SendHorizontal className="w-5 h-5" />}
              {lang === 'en' ? "Draft Outreach" : "Rascunhar Abordagem"}
            </button>
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700 space-y-4">
            <div className="flex flex-col gap-3">
              <button
                onClick={copiarPromptOutreach}
                className="w-full bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Copy className="w-4 h-4" /> {lang === 'en' ? "Copy Outreach Mission" : "Copiar Missão de Abordagem"}
              </button>
              
              <button
                onClick={() => window.open('https://gemini.google.com/app', '_blank')}
                className="w-full bg-white text-slate-900 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <Terminal className="w-4 h-4 text-indigo-600" /> {lang === 'en' ? "Open Gemini" : "Abrir Gemini"}
              </button>
            </div>

            <div className="p-4 bg-indigo-950/20 rounded-xl border border-indigo-500/10">
              <p className="text-indigo-300 text-[11px] mb-2 font-bold uppercase tracking-widest flex items-center gap-2">
                <Globe className="w-3 h-3" /> {lang === 'en' ? "Outreach Protocol" : "Protocolo de Outreach"}
              </p>
              <textarea
                value={manualJson}
                onChange={(e) => setManualJson(e.target.value)}
                placeholder='{ "subject": "...", "body": "..." }'
                className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 text-emerald-400 font-mono text-xs focus:border-indigo-500 outline-none"
              />
              <button 
                onClick={handleManualRender}
                className="mt-2 w-full bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-600/50 py-2 rounded-lg text-xs font-bold transition-all"
              >
                {lang === 'en' ? "MATERIALIZE EMAIL" : "VISUALIZAR E-MAIL"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PREVIEW DO E-MAIL ESTILO INBOX */}
      {email && (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500 max-w-4xl mx-auto border border-slate-200">
          <div className="bg-slate-50 px-8 py-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SAB Outreach Console</span>
          </div>
          <div className="p-10">
            <div className="mb-8 border-b border-slate-100 pb-6">
              <div className="text-slate-400 text-xs font-bold uppercase mb-2">Subject:</div>
              <h3 className="text-xl font-bold text-slate-800">{email.subject}</h3>
            </div>
            <div className="text-slate-600 leading-relaxed whitespace-pre-wrap font-serif text-lg">
              {email.body}
            </div>
            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`Subject: ${email.subject}\n\n${email.body}`);
                  alert(lang === 'en' ? "Email copied to clipboard!" : "E-mail copiado para a área de transferência!");
                }}
                className="bg-slate-900 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-xl"
              >
                <Copy className="w-4 h-4" /> {lang === 'en' ? "Copy to Send" : "Copiar para Enviar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutreachAssistant;