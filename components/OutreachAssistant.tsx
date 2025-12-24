import React, { useState } from 'react';
import { Send, Copy, RefreshCw, Loader2, Mail, Lightbulb, Check, SendHorizontal, MessageSquare, Terminal, Zap, Sparkles, UserCheck } from 'lucide-react';
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

  // Mágica MarketPulse: Prompt de Outreach de Alta Conversão
  const copiarPromptOutreach = () => {
    if (!targetName) { alert("Diga quem é o alvo!"); return; }
    const prompt = `Você é um Especialista em Relações Públicas e Link Building.
Alvo: "${targetName}"
Assunto do meu site: "${contentTitle}"
Estratégia: "${strategyType}"

MISSÃO: Escreva um e-mail de outreach personalizado que NÃO pareça spam.
1. Use um tom amigável e profissional.
2. Comece com um elogio genuíno ao trabalho dele.
3. Proponha um valor claro (ex: um conteúdo que falta no site dele).
4. Assunto do e-mail deve ser curto e curioso.

SAÍDA EM JSON:
{
  "subject": "Assunto do E-mail",
  "body": "Corpo do e-mail formatado..."
}`;
    navigator.clipboard.writeText(prompt);
    alert("Prompt de Conexão Copiado!");
  };

  const handleManualRender = () => {
    try {
      const data = JSON.parse(manualJson);
      setEmail({ subject: data.subject, body: data.body });
    } catch (e) {
      alert("Erro no JSON. Verifique a resposta.");
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetName || !contentTitle) return;
    setLoading(true);
    const result = await generateOutreachEmail(targetName, contentTitle, strategyType, lang);
    setEmail(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* PAINEL DE CONEXÃO */}
      <div className="bg-slate-800 p-8 rounded-xl border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <SendHorizontal className="w-32 h-32 text-white" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="w-8 h-8 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white uppercase italic">Assistente de Outreach</h2>
          </div>

          <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Nome do Site/Autor</label>
                <input
                  type="text"
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  placeholder="Ex: Blog do Neil Patel"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Seu Tópico/URL</label>
                <input
                  type="text"
                  value={contentTitle}
                  onChange={(e) => setContentTitle(e.target.value)}
                  placeholder="Ex: Guia de Backlinks 2026"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Estratégia de Abordagem</label>
                <select 
                  value={strategyType}
                  onChange={(e) => setStrategyType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option>Guest Post</option>
                  <option>Link Quebrado</option>
                  <option>Mencionar Especialista</option>
                  <option>Parceria de Conteúdo</option>
                </select>
              </div>
              <div className="flex gap-3 pt-6">
                <button type="button" onClick={copiarPromptOutreach} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                  <Copy className="w-4 h-4" /> PROMPT
                </button>
                <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  GERAR
                </button>
              </div>
            </div>
          </form>

          {/* MODO ORÁCULO */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-indigo-400 mb-3 text-sm font-bold uppercase tracking-widest">
              <Terminal className="w-4 h-4" /> Script de Conexão (Cole o JSON)
            </div>
            <textarea
              value={manualJson}
              onChange={(e) => setManualJson(e.target.value)}
              placeholder="Cole o JSON do e-mail gerado aqui..."
              className="w-full h-20 bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-indigo-400 font-mono focus:border-indigo-500 outline-none"
            />
            <button onClick={handleManualRender} className="mt-2 w-full bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-400 border border-indigo-600/50 py-2 rounded-lg text-sm font-bold transition-all">
              VISUALIZAR E-MAIL
            </button>
          </div>
        </div>
      </div>

      {/* PREVIEW DO E-MAIL */}
      {email && (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-right-8 duration-500">
          <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">New Message</span>
          </div>
          <div className="p-8">
            <div className="mb-6 border-b border-slate-100 pb-4">
              <span className="text-slate-400 text-sm">Subject:</span>
              <h3 className="text-slate-900 font-bold text-lg inline ml-2">{email.subject}</h3>
            </div>
            <div className="text-slate-700 leading-relaxed whitespace-pre-wrap font-serif italic text-lg">
              {email.body}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutreachAssistant;