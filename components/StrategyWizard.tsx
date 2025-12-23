import React, { useState } from 'react';
import { Compass, HelpCircle, AlertTriangle, Play, TrendingUp, Search, Target, Mail, Calculator, Wand2, ArrowRight, CheckCircle2, ShieldCheck, LineChart } from 'lucide-react';
import { AppView, Language } from '../types';
import { translations } from '../utils/translations';

interface StrategyWizardProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
}

type ScenarioId = 'not_indexed' | 'new_project' | 'youtube' | 'growth' | 'site_audit';

const StrategyWizard: React.FC<StrategyWizardProps> = ({ lang, onNavigate }) => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId | null>(null);
  const t = translations[lang].wizard;

  // Icons and colors remain static mapping, but titles/desc come from translations
  const SCENARIOS = [
    {
      id: 'not_indexed',
      title: t.scenarios.not_indexed.title,
      description: t.scenarios.not_indexed.desc,
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-400"
    },
    {
      id: 'new_project',
      title: t.scenarios.new_project.title,
      description: t.scenarios.new_project.desc,
      icon: Compass,
      color: "text-emerald-400 bg-emerald-400"
    },
    {
      id: 'youtube',
      title: t.scenarios.youtube.title,
      description: t.scenarios.youtube.desc,
      icon: Play,
      color: "text-red-400 bg-red-400"
    },
    {
      id: 'growth',
      title: t.scenarios.growth.title,
      description: t.scenarios.growth.desc,
      icon: TrendingUp,
      color: "text-blue-400 bg-blue-400"
    },
    {
      id: 'site_audit',
      title: t.scenarios.site_audit.title,
      description: t.scenarios.site_audit.desc,
      icon: ShieldCheck,
      color: "text-purple-400 bg-purple-400"
    }
  ];

  const renderActionPlan = () => {
    switch (selectedScenario) {
      case 'not_indexed':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right">
            <div className="space-y-4">
              <StepCard 
                step={1}
                title="Fix Foundations"
                description="Before building links, ensure your On-Page SEO is perfect."
                actionLabel="SEO Academy"
                icon={CheckCircle2}
                onClick={() => onNavigate(AppView.ACADEMY)}
              />
              <StepCard 
                step={2}
                title="Discover Topics"
                description="Use Rank Ninja to find potential keyword ideas for your niche."
                actionLabel="Find Keywords"
                icon={Target}
                onClick={() => onNavigate(AppView.KEYWORDS)}
              />
              <StepCard 
                step={3}
                title="Validate Competitiveness"
                description="Crucial: Use the KGR Calculator to confirm you can actually rank for these keywords."
                actionLabel="Validate with KGR"
                icon={Calculator}
                onClick={() => onNavigate(AppView.KGR_CALCULATOR)}
              />
              <StepCard 
                step={4}
                title="Create a 'Link Magnet'"
                description="Generate content based on your validated KGR keywords."
                actionLabel="Content Magician"
                icon={Wand2}
                onClick={() => onNavigate(AppView.CONTENT_MAGIC)}
              />
            </div>
          </div>
        );

      case 'new_project':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right">
            <div className="space-y-4">
              <StepCard 
                step={1}
                title="Market Research"
                description="Find what your audience is actually searching for."
                actionLabel="Rank Ninja Keywords"
                icon={Target}
                onClick={() => onNavigate(AppView.KEYWORDS)}
              />
              <StepCard 
                step={2}
                title="Validate Competitiveness"
                description="Don't guess. Use the KGR Calculator to find low-competition gems."
                actionLabel="Validate with KGR"
                icon={Calculator}
                onClick={() => onNavigate(AppView.KGR_CALCULATOR)}
              />
              <StepCard 
                step={3}
                title="First Guide/Ebook"
                description="Create a Lead Magnet using your validated keywords."
                actionLabel="Draft Ebook"
                icon={Wand2}
                onClick={() => onNavigate(AppView.CONTENT_MAGIC)}
              />
            </div>
          </div>
        );

      case 'youtube':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right">
            <div className="space-y-4">
              <StepCard 
                step={1}
                title="Find Video Topics"
                description="Look for 'How-to' keywords for visual answers."
                actionLabel="Find Keywords"
                icon={Target}
                onClick={() => onNavigate(AppView.KEYWORDS)}
              />
              <StepCard 
                step={2}
                title="Write Scripts"
                description="Use AI to write a high-retention script."
                actionLabel="Video Script"
                icon={Wand2}
                onClick={() => onNavigate(AppView.CONTENT_MAGIC)}
              />
              <StepCard 
                step={3}
                title="Get Embeds"
                description="Find blogs to pitch your video as a resource."
                actionLabel="Find Opportunities"
                icon={Search}
                onClick={() => onNavigate(AppView.OPPORTUNITIES)}
              />
            </div>
          </div>
        );

      case 'growth':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right">
            <div className="space-y-4">
              <StepCard 
                step={1}
                title="Spy on Competitors"
                description="Identify high-DR sites that accept Guest Posts."
                actionLabel="Find Opportunities"
                icon={Search}
                onClick={() => onNavigate(AppView.OPPORTUNITIES)}
              />
              <StepCard 
                step={2}
                title="Skyscraper Content"
                description="Create a resource better than what currently ranks #1."
                actionLabel="Create Link Magnet"
                icon={Wand2}
                onClick={() => onNavigate(AppView.CONTENT_MAGIC)}
              />
              <StepCard 
                step={3}
                title="Cold Outreach"
                description="Write personalized emails to editors."
                actionLabel="Draft Emails"
                icon={Mail}
                onClick={() => onNavigate(AppView.OUTREACH)}
              />
            </div>
          </div>
        );

      case 'site_audit':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right">
            <div className="space-y-4">
              <StepCard 
                step={1}
                title="Technical & Indexing Check"
                description="First, ensure Google can crawl and index your site correctly."
                actionLabel="Check Indexing Guide"
                icon={CheckCircle2}
                onClick={() => onNavigate(AppView.ACADEMY)}
              />
              <StepCard 
                step={2}
                title="Backlink Profile Health"
                description="Review your current backlinks and domain authority progress."
                actionLabel="View Tracker"
                icon={LineChart}
                onClick={() => onNavigate(AppView.TRACKING)}
              />
              <StepCard 
                step={3}
                title="Content Gap Analysis"
                description="Identify high-intent keywords your site is currently missing."
                actionLabel="Find Gaps"
                icon={Target}
                onClick={() => onNavigate(AppView.KEYWORDS)}
              />
              <StepCard 
                step={4}
                title="Competitor Link Comparison"
                description="See who is linking to your competitors but not you."
                actionLabel="Find Opportunities"
                icon={Search}
                onClick={() => onNavigate(AppView.OPPORTUNITIES)}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle className="w-8 h-8 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">{t.title}</h2>
        </div>
        <p className="text-slate-400">
          {t.subtitle}
        </p>
      </div>

      {!selectedScenario ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id as ScenarioId)}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-slate-500 hover:bg-slate-700/50 transition-all text-left group"
            >
              <div className={`w-12 h-12 rounded-lg ${scenario.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <scenario.icon className={`w-6 h-6 ${scenario.color.replace('bg-', 'text-')}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{scenario.title}</h3>
              <p className="text-slate-400 text-sm">{scenario.description}</p>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button 
            onClick={() => setSelectedScenario(null)}
            className="mb-6 text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
          >
            ← {t.back}
          </button>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-indigo-400 font-bold uppercase tracking-wider text-sm">{t.plan}</span>
            <div className="h-px bg-slate-700 flex-1"></div>
          </div>

          {renderActionPlan()}
        </div>
      )}
    </div>
  );
};

const StepCard = ({ step, title, description, actionLabel, icon: Icon, onClick }: any) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row md:items-center gap-6">
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center text-white font-bold text-lg">
      {step}
    </div>
    <div className="flex-1">
      <h4 className="text-lg font-bold text-white flex items-center gap-2">
        {title}
      </h4>
      <p className="text-slate-400 text-sm mt-1">{description}</p>
    </div>
    <button 
      onClick={onClick}
      className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm"
    >
      <Icon className="w-4 h-4" />
      {actionLabel} <ArrowRight className="w-3 h-3 ml-1" />
    </button>
  </div>
);

export default StrategyWizard;