import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Wand2, Compass, Target, BookOpen, ScanSearch, LineChart, Coins } from 'lucide-react';
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

  useEffect(() => {
    // Navigate the app in the background to show the relevant section
    if (isOpen) {
      switch (currentStep) {
        case 0:
          onNavigate(AppView.DASHBOARD);
          break;
        case 1:
          onNavigate(AppView.STRATEGY_WIZARD);
          break;
        case 2:
          onNavigate(AppView.KEYWORDS); // Show Keywords/KGR context
          break;
        case 3:
          onNavigate(AppView.CONTENT_MAGIC); // Show Content context
          break;
        case 4:
          onNavigate(AppView.ONPAGE_ANALYZER); // New: OnPage
          break;
        case 5:
          onNavigate(AppView.TRACKING); // New: Tracker
          break;
        case 6:
          onNavigate(AppView.EXTRA_INCOME); // New: Freelance
          break;
        case 7:
          onNavigate(AppView.ACADEMY);
          break;
        default:
          break;
      }
    }
  }, [currentStep, isOpen, onNavigate]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < t.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    localStorage.setItem('bm_tour_seen', 'true');
    onNavigate(AppView.DASHBOARD);
    onClose();
  };

  // Icons corresponding to the 8 steps
  const icons = [Wand2, Compass, Target, Wand2, ScanSearch, LineChart, Coins, BookOpen];
  const CurrentIcon = icons[currentStep] || Wand2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-in zoom-in-95 duration-300">
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative p-8">
          <button 
            onClick={handleFinish} 
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            title={t.skip}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <CurrentIcon className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                {currentStep + 1} / {t.steps.length}
              </span>
              <h2 className="text-2xl font-bold text-white">
                {t.steps[currentStep].title}
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {t.steps[currentStep].desc}
              </p>
            </div>

            <div className="flex gap-2 w-full pt-4">
              <div className="flex-1 flex gap-1 justify-center items-center">
                {t.steps.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentStep ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="w-full flex gap-3">
              <button
                onClick={handleFinish}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-600 text-slate-300 font-medium hover:bg-slate-700 hover:text-white transition-colors"
              >
                {t.skip}
              </button>
              <button
                onClick={handleNext}
                className="flex-[2] py-3 px-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                {currentStep === t.steps.length - 1 ? t.finish : t.next}
                {currentStep !== t.steps.length - 1 && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;