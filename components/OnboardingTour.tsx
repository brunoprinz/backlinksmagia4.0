import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Wand2, Compass, Target, BookOpen, ScanSearch, LineChart, Coins, Swords, Zap } from 'lucide-react';
import { AppView, Language } from '../types';
import { translations } from '../utils/translations';

interface OnboardingTourProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AppView) => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ lang, isOpen, onClose, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const t = translations[lang].tour;

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  // Sincroniza a navegação do app com os passos do Tour
  useEffect(() => {
    if (isOpen) {
      switch (currentStep) {
        case 0: onNavigate(AppView.DASHBOARD); break;
        case 1: onNavigate(AppView.STRATEGY_WIZARD); break;
        case 2: onNavigate(AppView.KEYWORDS); break; // Onde mora o SAB Analyzer
        case 3: onNavigate(AppView.CONTENT_MAGIC); break;
        case 4: onNavigate(AppView.ACADEMY); break;
      }
    }
  }, [currentStep, isOpen, onNavigate]);

  // Novos passos focados na Metodologia SAB
  const steps = [
    {
      title: "Bem-vindo ao Backlinks Magia 4.0",
      desc: "Sua central de comando para dominar o Google. Esqueça as métricas de vaidade, aqui focamos em ROI.",
      icon: Zap,
      color: "text-yellow-400"
    },
    {
      title: "Mago da Estratégia",
      desc: "O Oráculo que cria seu plano de ataque de 90 dias baseado no algoritmo Serp Armor Breaker.",
      icon: Compass,
      color: "text-indigo-400"
    },
    {
      title: "Serp Armor Breaker (SAB)",
      desc: "Nossa tecnologia exclusiva que encontra fendas no Top 5. Se o gigante tem uma brecha, o SAB vai te mostrar.",
      icon: Swords,
      color: "text-red-400"
    },
    {
      title: "Magia de Conteúdo",
      desc: "Transforme brechas em ranking com o Content Magician. Crie artigos semanticamente superiores aos seus rivais.",
      icon: Wand2,
      color: "text-emerald-400"
    },
    {
      title: "SAB Masterclass",
      desc: "Aprenda a nova doutrina na SEO Academy. Descubra o que parou de funcionar e como os profissionais jogam agora.",
      icon: BookOpen,
      color: "text-blue-400"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  const ActiveIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 text-center space-y-6">
          <div className={`w-20 h-20 mx-auto rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center ${steps[currentStep].color} shadow-lg shadow-indigo-500/10`}>
            <ActiveIcon className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">
              {steps[currentStep].title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {steps[currentStep].desc}
            </p>
          </div>

          <div className="flex gap-2 justify-center py-2">
            {steps.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-700 text-slate-400 font-bold hover:bg-slate-700 hover:text-white transition-all uppercase text-xs tracking-widest"
            >
              Pular
            </button>
            <button
              onClick={handleNext}
              className="flex-[2] py-3 px-4 rounded-xl bg-indigo-600 text-white font-black hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
            >
              {currentStep === steps.length - 1 ? "Entrar na Guerra" : "Próximo"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;