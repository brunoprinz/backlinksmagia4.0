import React from 'react';
import { ShieldAlert, Swords, Target, X, ChevronRight, HelpCircle } from 'lucide-react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-indigo-500/30 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10">
        {/* Header Estilizado */}
        <div className="bg-indigo-600 p-6 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Swords className="w-24 h-24 text-white rotate-12" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Manifesto Backlinks Magia 4.0</h2>
            <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mt-1">A Era da Autoridade Tópica</p>
          </div>
          <button onClick={onClose} className="relative z-10 p-2 hover:bg-white/10 rounded-full text-white transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* O Conceito */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 h-fit">
                <Target className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg italic">Inteligência Preditiva vs. Dados Históricos</h3>
                <p className="text-slate-400 text-sm leading-relaxed mt-1">
                  Diferente de ferramentas que mostram dados estáticos do passado, o <span className="text-indigo-400 font-bold">Oráculo SAB</span> utiliza modelos preditivos. 
                  <span className="block mt-1 text-slate-500 italic">
                    *Volumes de busca e métricas de autoridade são estimativas estratégicas baseadas em intenção real, não números exatos de inventário.
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 h-fit">
                <ShieldAlert className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg italic">Autoridade Tópica: O Novo Algoritmo</h3>
                <p className="text-slate-400 text-sm leading-relaxed mt-1">
                  O Google não ranqueia mais apenas palavras, ele ranqueia especialistas. Nosso arsenal foi desenhado para transformar seu site em uma <span className="text-emerald-400 font-bold">autoridade inquestionável</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action Interno */}
          <div className="bg-indigo-500/5 border border-indigo-500/20 p-6 rounded-2xl">
            <p className="text-indigo-300 text-xs font-mono mb-4 leading-relaxed">
              // VOCÊ NÃO É MAIS UM OPERADOR DE FERRAMENTAS.<br />
              // VOCÊ É UM ESTRATEGISTA DE ELITE.
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={onClose}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3 group tracking-widest uppercase text-sm"
              >
                Iniciar Operação
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => {
                  onClose();
                  window.dispatchEvent(new CustomEvent('start-tour-from-manifesto'));
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 text-indigo-400 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider border border-slate-700"
              >
                <HelpCircle className="w-4 h-4" />
                Conhecer a plataforma (Tour)
              </button>
            </div>
          </div>
          
          <p className="text-center text-[10px] text-slate-500 uppercase font-bold tracking-[0.3em]">
            Backlinks Magia 4.0 - Protegido por Metodologia SAB
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManifestoModal;