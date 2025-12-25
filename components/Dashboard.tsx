import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Link, ShieldCheck, Activity, Wand2, Sparkles, Zap, Search } from 'lucide-react';
import { Language, AppView } from '../types';
import { translations } from '../utils/translations';

interface DashboardProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
}

const data = [
  { name: 'Jan', da: 24, links: 12 },
  { name: 'Feb', da: 26, links: 18 },
  { name: 'Mar', da: 29, links: 25 },
  { name: 'Apr', da: 32, links: 40 },
  { name: 'May', da: 35, links: 55 },
  { name: 'Jun', da: 41, links: 85 },
];

const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: string, icon: any, color: string }) => (
  <div className="relative group overflow-hidden bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg hover:border-slate-500 transition-all duration-300">
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${color} opacity-10 group-hover:opacity-20 transition-opacity blur-2xl`}></div>
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-white mt-2 drop-shadow-md">{value}</p>
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-20 border border-white/5`}>
        <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  </div>
);

const QuickAction = ({ label, icon: Icon, onClick }: { label: string, icon: any, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-slate-800/50 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500 rounded-xl transition-all group"
  >
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/30">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <span className="text-sm font-medium text-slate-300 group-hover:text-white">{label}</span>
  </button>
);

const Dashboard: React.FC<DashboardProps> = ({ lang, onNavigate }) => {
  const t = translations[lang].dashboard;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-8 md:p-12">
        {/* Magical Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Backlinks Magia 4.0
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t.welcome}
            </h1>
            <p className="text-lg text-slate-300 max-w-xl">
              {t.subtitle}
            </p>
          </div>
          
          {/* Abstract Wizard Visual */}
          <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
             <div className="relative w-40 h-40 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center shadow-2xl">
                <Wand2 className="w-20 h-20 text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" />
                <div className="absolute -top-2 -right-2">
                   <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t.stat_da} value="41" icon={ShieldCheck} color="text-indigo-400 bg-indigo-400" />
        <StatCard title={t.stat_links} value="1,248" icon={Link} color="text-emerald-400 bg-emerald-400" />
        <StatCard title={t.stat_traffic} value="15.2k" icon={Activity} color="text-blue-400 bg-blue-400" />
        <StatCard title={t.stat_success} value="12%" icon={TrendingUp} color="text-purple-400 bg-purple-400" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            {t.chart_title}
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorDa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLinks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="da" stroke="#818cf8" fillOpacity={1} fill="url(#colorDa)" />
                <Area type="monotone" dataKey="links" stroke="#34d399" fillOpacity={1} fill="url(#colorLinks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            {t.quick_actions}
          </h2>
          <div className="grid grid-cols-2 gap-4 flex-1">
             <QuickAction label={t.action_audit} icon={ShieldCheck} onClick={() => onNavigate(AppView.STRATEGY_WIZARD)} />
             <QuickAction label={t.action_content} icon={Wand2} onClick={() => onNavigate(AppView.CONTENT_MAGIC)} />
             <QuickAction label={t.action_links} icon={Search} onClick={() => onNavigate(AppView.OPPORTUNITIES)} />
             <QuickAction label="KGR" icon={Activity} onClick={() => onNavigate(AppView.KGR_CALCULATOR)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;