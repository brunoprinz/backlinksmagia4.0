import React, { useState } from 'react';
import { Bot, Copy, Check, Sparkles, BookOpen, List, Target, Zap, AlertTriangle, UserPlus, Users, HelpCircle, TrendingUp, Download } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface PromptLibraryProps {
  lang: Language;
}

const PromptLibrary: React.FC<PromptLibraryProps> = ({ lang }) => {
  const [niche, setNiche] = useState('');
  const [generated, setGenerated] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const t = translations[lang].prompts;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche) return;
    setGenerated(true);
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const safeNiche = niche || "[INSERT NICHE]";
  
  // Prompts adapted based on language. 
  // If the user interface is in PT, the prompts are generated in PT for the AI.
  const isPt = lang === 'pt';

  const PROMPTS = [
    {
      id: 1,
      title: isPt ? "Tutorial Passo a Passo" : "Step-by-Step Tutorial",
      icon: BookOpen,
      color: "text-blue-400 bg-blue-400",
      content: isPt 
        ? `Atue como um especialista em ${safeNiche} e Redator SEO Sênior.
Crie um esboço detalhado para um artigo tutorial intitulado "O Guia Definitivo para Iniciantes em ${safeNiche}".
O objetivo é ranquear no Google para termos de busca de cauda longa.
Estrutura necessária:
1. Título Otimizado (H1) atraente.
2. Introdução com um "Gancho" forte que aborda a dor do leitor.
3. 5 a 7 Passos Práticos (H2s), cada um detalhando EXATAMENTE o que fazer.
4. Seção de "Erros Comuns" para evitar.
5. Conclusão com Call to Action (CTA).
Tom de voz: Educativo, encorajador e autoritário.`
        : `Act as a ${safeNiche} expert and Senior SEO Copywriter.
Create a detailed outline for a tutorial article titled "The Ultimate Beginner's Guide to ${safeNiche}".
The goal is to rank on Google for long-tail search terms.
Required Structure:
1. Optimized Title (H1) that is catchy.
2. Introduction with a strong "Hook" addressing user pain points.
3. 5-7 Practical Steps (H2s), each detailing EXACTLY what to do.
4. "Common Mistakes" section.
5. Conclusion with a Call to Action (CTA).
Tone: Educational, encouraging, and authoritative.`
    },
    {
      id: 2,
      title: isPt ? "Artigo de Lista (Listicle)" : "Listicle Article",
      icon: List,
      color: "text-emerald-400 bg-emerald-400",
      content: isPt
        ? `Você é um estrategista de conteúdo viral.
Escreva um artigo de lista sobre ${safeNiche} focado em alta compartilhabilidade.
Tema: "10 Ferramentas/Dicas sobre ${safeNiche} que Ninguém te Conta".
Para cada item da lista:
- Nome do item/dica (H2).
- Por que é importante.
- Como aplicar imediatamente.
Certifique-se de que o conteúdo seja "Escaneável" (use bullet points e parágrafos curtos).`
        : `You are a viral content strategist.
Write a listicle article about ${safeNiche} focused on high shareability.
Topic: "10 Tools/Tips about ${safeNiche} That No One Tells You".
For each item in the list:
- Name of item/tip (H2).
- Why it matters.
- How to apply it immediately.
Ensure the content is "Scannable" (use bullet points and short paragraphs).`
    },
    {
      id: 3,
      title: isPt ? "Estudo de Caso (Case Study)" : "Case Study",
      icon: Target,
      color: "text-amber-400 bg-amber-400",
      content: isPt
        ? `Escreva um Estudo de Caso narrativo sobre ${safeNiche}.
Título: "Como eu [Atingi um Resultado Desejável] em ${safeNiche} em 30 Dias".
Estrutura:
1. O Desafio: Qual era o problema inicial?
2. A Solução: Qual estratégia específica de ${safeNiche} foi usada?
3. A Execução: Passo a passo do que foi feito.
4. Os Resultados: Dados quantitativos (use números simulados realistas).
5. O Aprendizado: O que o leitor pode tirar disso.
Foque em autoridade e prova social.`
        : `Write a narrative Case Study about ${safeNiche}.
Title: "How I [Achieved Desirable Result] in ${safeNiche} in 30 Days".
Structure:
1. The Challenge: What was the initial problem?
2. The Solution: What specific ${safeNiche} strategy was used?
3. The Execution: Step-by-step of what was done.
4. The Results: Quantitative data (use realistic simulated numbers).
5. The Takeaway: What the reader can learn.
Focus on authority and social proof.`
    },
    {
      id: 4,
      title: isPt ? "Opinião Polêmica" : "Controversial Opinion",
      icon: AlertTriangle,
      color: "text-red-400 bg-red-400",
      content: isPt
        ? `Atue como um líder de pensamento em ${safeNiche}.
Escreva um texto de opinião desafiando o "Status Quo" da indústria de ${safeNiche}.
Argumento central: "Por que a maioria das pessoas está errada sobre [Aspecto Popular de ${safeNiche}]".
Use lógica, dados e analogias para defender um ponto de vista contrário.
O objetivo é gerar debate e comentários, mas mantenha o profissionalismo.
Termine com uma pergunta provocativa para os leitores.`
        : `Act as a thought leader in ${safeNiche}.
Write an opinion piece challenging the "Status Quo" of the ${safeNiche} industry.
Core Argument: "Why most people are wrong about [Popular Aspect of ${safeNiche}]".
Use logic, data, and analogies to defend a contrarian viewpoint.
The goal is to generate debate and comments, but keep it professional.
End with a provocative question for the readers.`
    },
    {
      id: 5,
      title: isPt ? "Revelação de Segredo" : "The 'Secret' Reveal",
      icon: Zap,
      color: "text-purple-400 bg-purple-400",
      content: isPt
        ? `Crie um roteiro para um conteúdo estilo "Revelação de Segredo" sobre ${safeNiche}.
Headline: "O Segredo nº 1 sobre ${safeNiche} que os Gurus não querem que você saiba".
Estrutura:
1. Crie um mistério inicial (Curiosity Gap).
2. Revele o "segredo" (uma técnica ou insight pouco conhecido).
3. Explique por que funciona.
4. Dê um exemplo prático.
Este conteúdo deve fazer o leitor sentir que obteve uma vantagem injusta.`
        : `Create a script for "Secret Reveal" style content about ${safeNiche}.
Headline: "The #1 Secret about ${safeNiche} that Gurus don't want you to know".
Structure:
1. Create initial mystery (Curiosity Gap).
2. Reveal the "secret" (a little-known technique or insight).
3. Explain why it works.
4. Give a practical example.
This content should make the reader feel they gained an unfair advantage.`
    },
    {
      id: 6,
      title: isPt ? "Email de Outreach (Roundup)" : "Outreach Email (Roundup)",
      icon: UserPlus,
      color: "text-indigo-400 bg-indigo-400",
      content: isPt
        ? `Escreva um modelo de email frio para enviar a especialistas em ${safeNiche}.
Objetivo: Convidá-los para participar de um "Expert Roundup" (Artigo Colaborativo) no meu blog.
Assunto: Pergunta rápida para um artigo sobre ${safeNiche} (destaque para você).
Corpo do email:
- Elogie genuinamente um trabalho recente deles.
- Explique que estou criando um artigo com "Os Top Especialistas em ${safeNiche}".
- Faça UMA única pergunta simples para eles responderem.
- Mencione que colocarei um link para o site deles.
Tom: Breve, respeitoso e profissional.`
        : `Write a cold email template to send to experts in ${safeNiche}.
Goal: Invite them to participate in an "Expert Roundup" (Collaborative Article) on my blog.
Subject: Quick question for an article about ${safeNiche} (feature for you).
Body:
- Genuinely compliment their recent work.
- Explain I am creating an article with "Top Experts in ${safeNiche}".
- Ask ONE single simple question for them to answer.
- Mention I will link back to their site.
Tone: Brief, respectful, and professional.`
    },
    {
      id: 7,
      title: isPt ? "Comparativo (Vs)" : "Comparison (Vs)",
      icon: Users,
      color: "text-cyan-400 bg-cyan-400",
      content: isPt
        ? `Escreva um artigo comparativo para ${safeNiche}.
Tema: "Método A vs Método B em ${safeNiche}: Qual é o melhor para você?".
Estrutura:
1. Introdução imparcial.
2. Análise profunda do Método A (Prós e Contras).
3. Análise profunda do Método B (Prós e Contras).
4. Veredito final baseado em diferentes perfis de usuário (Ex: Iniciante vs Avançado).
O objetivo é ajudar o usuário a tomar uma decisão de compra ou estratégia.`
        : `Write a comparison article for ${safeNiche}.
Topic: "Method A vs Method B in ${safeNiche}: Which is best for you?".
Structure:
1. Unbiased introduction.
2. Deep analysis of Method A (Pros and Cons).
3. Deep analysis of Method B (Pros and Cons).
4. Final verdict based on different user profiles (e.g., Beginner vs Advanced).
The goal is to help the user make a buying or strategic decision.`
    },
    {
      id: 8,
      title: isPt ? "Guia Problema/Solução" : "Problem/Solution Guide",
      icon: HelpCircle,
      color: "text-pink-400 bg-pink-400",
      content: isPt
        ? `Identifique o problema mais comum e frustrante no nicho de ${safeNiche}.
Escreva um guia focado na solução desse problema específico.
Headline: "Como resolver [Problema Doloroso] em ${safeNiche} de uma vez por todas".
Use o framework PAS (Problema, Agitação, Solução):
1. Problema: Descreva a dor.
2. Agitação: Descreva o que acontece se não resolver (piora a situação).
3. Solução: Apresente seu método como o alívio imediato.
Inclua passos acionáveis.`
        : `Identify the most common and frustrating problem in the ${safeNiche} niche.
Write a guide focused on solving this specific problem.
Headline: "How to solve [Painful Problem] in ${safeNiche} once and for all".
Use the PAS framework (Problem, Agitation, Solution):
1. Problem: Describe the pain.
2. Agitation: Describe what happens if left unsolved (makes it worse).
3. Solution: Present your method as the immediate relief.
Include actionable steps.`
    },
    {
      id: 9,
      title: isPt ? "Análise de Tendência" : "Trend Analysis",
      icon: TrendingUp,
      color: "text-orange-400 bg-orange-400",
      content: isPt
        ? `Atue como um analista de mercado em ${safeNiche}.
Escreva um artigo sobre "O Futuro de ${safeNiche}: 5 Tendências para os Próximos Anos".
Para cada tendência:
- O que está mudando?
- Dados ou observações que comprovam a mudança.
- Como se preparar para isso hoje.
O tom deve ser visionário e preparar o leitor para sair na frente da concorrência.`
        : `Act as a market analyst in ${safeNiche}.
Write an article about "The Future of ${safeNiche}: 5 Trends for the Next Few Years".
For each trend:
- What is changing?
- Data or observations proving the change.
- How to prepare for it today.
The tone should be visionary and prepare the reader to get ahead of the competition.`
    },
    {
      id: 10,
      title: isPt ? "Erros de Iniciante" : "Beginner Mistakes",
      icon: AlertTriangle,
      color: "text-teal-400 bg-teal-400",
      content: isPt
        ? `Escreva um artigo de alerta para iniciantes em ${safeNiche}.
Título: "7 Erros que estão matando seu progresso em ${safeNiche} (e como corrigi-los)".
Foque em mitos comuns ou práticas ultrapassadas.
Para cada erro:
1. O que a maioria faz.
2. Por que isso é ruim.
3. O que fazer em vez disso (a maneira correta).
Use um tom empático ("Eu já estive no seu lugar...").`
        : `Write a warning article for beginners in ${safeNiche}.
Title: "7 Mistakes killing your progress in ${safeNiche} (and how to fix them)".
Focus on common myths or outdated practices.
For each mistake:
1. What most people do.
2. Why it's bad.
3. What to do instead (the right way).
Use an empathetic tone ("I've been in your shoes...").`
    }
  ];

  const handleExportCsv = () => {
    if (!generated) return;

    const headers = ['Category', 'Niche', 'Prompt'];
    const rows = PROMPTS.map(p => [
        `"${p.title.replace(/"/g, '""')}"`,
        `"${safeNiche.replace(/"/g, '""')}"`,
        `"${p.content.replace(/"/g, '""')}"`
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `prompts_${safeNiche.replace(/\s+/g, '_')}_${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Bot className="w-8 h-8 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white">{t.title}</h2>
          </div>
          <p className="text-slate-400 mb-6 max-w-2xl">{t.desc}</p>
          
          <form onSubmit={handleGenerate} className="flex gap-4 max-w-xl">
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-5 h-5" />
              {t.button}
            </button>
          </form>
        </div>
      </div>

      {generated && (
        <>
          <div className="flex justify-end mb-2 animate-in fade-in slide-in-from-bottom-2">
            <button
                onClick={handleExportCsv}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 border border-slate-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
                <Download className="w-4 h-4" />
                Save Prompts as CSV
            </button>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 fade-in">
            {PROMPTS.map((prompt) => (
              <div key={prompt.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-500 transition-all shadow-lg">
                <div className="p-4 border-b border-slate-700 bg-slate-900/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${prompt.color} bg-opacity-20`}>
                      <prompt.icon className={`w-5 h-5 ${prompt.color.replace('bg-', 'text-')}`} />
                    </div>
                    <h3 className="font-bold text-white">{prompt.title}</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(prompt.content, prompt.id)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      copiedId === prompt.id 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    }`}
                  >
                    {copiedId === prompt.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === prompt.id ? t.copied : t.copy}
                  </button>
                </div>
                <div className="p-4 bg-slate-900/50">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-slate-400 leading-relaxed overflow-x-auto max-h-[250px] scrollbar-thin scrollbar-thumb-slate-700">
                    {prompt.content}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PromptLibrary;