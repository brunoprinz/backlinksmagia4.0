import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShieldCheck, Activity, Wand2, Zap } from 'lucide-react';
import { Language, AppView } from '../types';
import { translations } from '../utils/translations';

interface DashboardProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
}

const data = [
  { name: 'Jan', da: 24, links: 12 },
  { name: 'Fev', da: 26, links: 18 },
  { name: 'Mar', da: 29, links: 25 },
  { name: 'Abr', da: 32, links: 40 },
  { name: 'Mai', da: 35, links: 55 },
  { name: 'Jun', da: 41, links: 85 },
];

const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: string, icon: any, color: string }) => (
  <div className="relative group overflow-hidden bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg hover:border-slate-500 transition-all duration-300">
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${color} opacity-10 group-hover:scale-110 transition-transform duration-500`} />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-slate-700 ${color.replace('bg-', 'text-')}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  </div>
);

const QuickAction = ({ label, icon: Icon, onClick }: { label: string, icon: any, onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-700/50 border border-slate-600 hover:bg-indigo-600 hover:border-indigo-500 transition-all group"
  >
    <Icon className="w-6 h-6 text-indigo-400 group-hover:text-white mb-2" />
    <span className="text-xs font-medium text-slate-300 group-hover:text-white text-center">{label}</span>
  </button>
);

const Dashboard: React.FC<DashboardProps> = ({ lang, onNavigate }) => {
  // Garante que t nunca seja undefined para evitar a tela azul
  const t = translations[lang]?.dashboard || {
    welcome: "Bem-vindo",
    subtitle: "Central de Comando",
    stats_da: "Autoridade",
    stats_links: "Backlinks",
    stats_growth: "Crescimento",
    stats_health: "Saúde",
    quick_actions: "Ações Rápidas",
    action_audit: "Oráculo SAB",
    action_content: "Conteúdo",
    action_links: "Oportunidades"
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white">{t.welcome}</h1>
        <p className="text-slate-400 mt-1">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t.stats_da} value="41" icon={ShieldCheck} color="bg-blue-500" />
        <StatCard title={t.stats_links} value="1,284" icon={TrendingUp} color="bg-emerald-500" />
        <StatCard title={t.stats_growth} value="+12.5%" icon={Activity} color="bg-indigo-500" />
        <StatCard title={t.stats_health} value="98%" icon={Zap} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6">Visão Geral de Crescimento</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorDa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                <Area type="monotone" dataKey="da" stroke="#818cf8" fillOpacity={1} fill="url(#colorDa)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            {t.quick_actions}
          </h2>
          <div className="grid grid-cols-2 gap-4">
             <QuickAction label={t.action_audit} icon={ShieldCheck} onClick={() => onNavigate(AppView.STRATEGY_WIZARD)} />
             <QuickAction label={t.action_content} icon={Wand2} onClick={() => onNavigate(AppView.CONTENT_MAGIC)} />
             <QuickAction label="Oportunidades" icon={TrendingUp} onClick={() => onNavigate(AppView.OPPORTUNITIES)} />
             <QuickAction label="Keywords" icon={Zap} onClick={() => onNavigate(AppView.KEYWORDS)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
