import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShieldCheck, Activity, Wand2, Zap } from 'lucide-react';
import { Language, AppView } from '../types';
import { translations } from '../utils/translations';

interface DashboardProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
}

// Dados estáticos movidos para fora para garantir que nunca sejam undefined
const chartData = [
  { name: 'Jan', da: 24, links: 12 },
  { name: 'Fev', da: 26, links: 18 },
  { name: 'Mar', da: 29, links: 25 },
  { name: 'Abr', da: 32, links: 40 },
  { name: 'Mai', da: 35, links: 55 },
  { name: 'Jun', da: 41, links: 85 },
];

const Dashboard: React.FC<DashboardProps> = ({ lang, onNavigate }) => {
  // Verificação ultra-segura das traduções
  const currentLang = lang || 'pt';
  const tBase = translations[currentLang] || translations['pt'] || {};
  const t = tBase.dashboard || {
    welcome: "Bem-vindo",
    subtitle: "Central de Comando",
    stats_da: "Autoridade",
    stats_links: "Backlinks",
    stats_growth: "Crescimento",
    stats_health: "Saúde",
    quick_actions: "Ações Rápidas",
    action_audit: "Oráculo SAB",
    action_content: "Criar Conteúdo",
    action_links: "Oportunidades"
  };

  return (
    <div className="space-y-8 p-4">
      <div>
        <h1 className="text-3xl font-bold text-white">{t.welcome || "Bem-vindo"}</h1>
        <p className="text-slate-400 mt-1">{t.subtitle || "Carregando painel..."}</p>
      </div>

      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <ShieldCheck className="text-blue-400 mb-2" />
          <h3 className="text-slate-400 text-sm">{t.stats_da}</h3>
          <p className="text-2xl font-bold text-white">41</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <TrendingUp className="text-emerald-400 mb-2" />
          <h3 className="text-slate-400 text-sm">{t.stats_links}</h3>
          <p className="text-2xl font-bold text-white">1,284</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <Activity className="text-indigo-400 mb-2" />
          <h3 className="text-slate-400 text-sm">{t.stats_growth}</h3>
          <p className="text-2xl font-bold text-white">+12.5%</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <Zap className="text-amber-400 mb-2" />
          <h3 className="text-slate-400 text-sm">{t.stats_health}</h3>
          <p className="text-2xl font-bold text-white">98%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico com tratamento de erro interno */}
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 min-h-[350px]">
          <h2 className="text-xl font-bold text-white mb-6">Crescimento de Autoridade</h2>
          <div className="h-[300px] w-full">
            {chartData && chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                  <Area type="monotone" dataKey="da" stroke="#818cf8" fill="#818cf8" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-slate-500">Sem dados para exibir</div>
            )}
          </div>
        </div>

        {/* Botões de Ação Rápida */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            {t.quick_actions || "Ações"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onNavigate(AppView.STRATEGY_WIZARD)}
              className="p-4 bg-slate-700 hover:bg-indigo-600 rounded-xl text-center transition-all"
            >
              <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
              <span className="text-xs text-white block">{t.action_audit || "Audit"}</span>
            </button>
            <button 
              onClick={() => onNavigate(AppView.CONTENT_MAGIC)}
              className="p-4 bg-slate-700 hover:bg-indigo-600 rounded-xl text-center transition-all"
            >
              <Wand2 className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
              <span className="text-xs text-white block">{t.action_content || "Conteúdo"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
