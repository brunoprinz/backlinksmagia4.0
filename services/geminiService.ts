import { GoogleGenAI, Type } from "@google/genai";
import { BacklinkOpportunity, ContentStrategy, OutreachTemplate, KeywordIdea, Language, ZeroVolumeAnalysis, OnPageAnalysis, TrackedSite } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * BACKLINK OPPORTUNITIES - Prospecção SAB
 */
export const findBacklinkOpportunities = async (niche: string, lang: Language = 'en'): Promise<BacklinkOpportunity[]> => {
  const prompt = `
    Use o Google Search para analisar o nicho "${niche}" sob a ótica da metodologia SAB (Serp Armor Breaker). 
    Identifique 5 sites REAIS, ativos e de autoridade que aceitem parcerias ou guest posts.
    
    FOCO: Encontre parceiros que permitam criar autoridade para "quebrar" o Top 5 de palavras-chave competitivas.
    
    IMPORTANT: Respond in the language code: "${lang}".
    
    Para cada site, estime o Domain Authority (DA), a relevância e uma estratégia específica (como Skyscraper ou Guest Post).
    
    Provide the output in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              siteName: { type: Type.STRING },
              url: { type: Type.STRING },
              domainAuthority: { type: Type.NUMBER },
              relevanceScore: { type: Type.NUMBER },
              strategy: { type: Type.STRING, description: "Specific tactic like 'Guest Post', 'Broken Link Building', etc." },
              contactInfo: { type: Type.STRING, description: "Generic contact page or email format suggestion" }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as BacklinkOpportunity[];
  } catch (error) {
    console.error("Gemini API Error (Opportunities):", error);
    return [];
  }
};

/**
 * RANK NINJA SAB EDITION - Armor Breach Logic
 */
export const generateKeywords = async (seedKeyword: string, lang: Language = 'en'): Promise<KeywordIdea[]> => {
  const prompt = `
    Atue como um especialista em SEO de Elite usando a metodologia "SAB (Serp Armor Breaker)". 
    Gere 10 palavras-chave de cauda longa relacionadas a "${seedKeyword}".
    
    CRITÉRIOS SAB:
    1. Foque em termos onde o Top 5 é dominado por fóruns (Reddit/Quora) ou sites de baixa autoridade.
    2. Identifique "fendas na armadura": termos com alta intenção de busca mas conteúdo pobre nos resultados atuais.
    3. Priorize palavras de "Volume Zero" que escondem intenção de compra real.

    IMPORTANT: Respond in the language code: "${lang}".

    Para cada keyword:
    - Determine o search intent.
    - Em 'difficulty', descreva a "fenda" encontrada (ex: "Top 3 dominado por fórum").
    - Sugira um Content Title focado em autoridade semântica.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}], 
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              keyword: { type: Type.STRING },
              intent: { type: Type.STRING, enum: ['Informational', 'Commercial', 'Transactional'] },
              difficulty: { type: Type.STRING },
              contentIdea: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as KeywordIdea[];
  } catch (error) {
    console.error("Gemini API Error (Keywords):", error);
    return [];
  }
};

/**
 * ARMOR BREACH ANALYSIS - Competitor Gap
 */
export const analyzeCompetitorGap = async (competitorUrl: string, topic: string, lang: Language = 'en'): Promise<KeywordIdea[]> => {
  const prompt = `
    Atue como um Estrategista de SEO Sênior realizando uma "Análise de Fenda na Armadura (Armor Breach Analysis)".
    
    Primeiro, use o Google Search para analisar o site concorrente: "${competitorUrl}".
    Entenda a estratégia de conteúdo deles sobre "${topic}".
    
    Depois, identifique 10 keywords de alto valor que este concorrente domina, mas que possuem brechas para um novo desafiante:
    1. Keywords onde o conteúdo do concorrente está desatualizado ou é superficial.
    2. Termos onde o concorrente rankeia no Top 5, mas o restante do Top 10 é composto por sites fracos (fóruns/fãs).
    3. Foque em "Money Keywords" onde podemos superar a autoridade dele através de profundidade semântica.
    
    IMPORTANT: Respond in the language code: "${lang}".
    
    Output JSON format matching the schema below.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              keyword: { type: Type.STRING },
              intent: { type: Type.STRING, enum: ['Informational', 'Commercial', 'Transactional'] },
              difficulty: { type: Type.STRING, description: "Descreva a fraqueza detectada no concorrente para esta keyword" },
              contentIdea: { type: Type.STRING, description: "Um título Skyscraper superior ao do concorrente" }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as KeywordIdea[];
  } catch (error) {
    console.error("Gemini API Error (Competitor Gap):", error);
    return [];
  }
};

/**
 * CONTENT MAGICIAN - Estratégia Semântica
 */
export const generateContentStrategy = async (topic: string, mode: string, lang: Language = 'en'): Promise<ContentStrategy> => {
  const prompt = `
    Atue como um Especialista em SEO Semântico. Crie uma estratégia imbatível para: "${topic}" usando o modo "${mode}".
    Siga a Doutrina SAB: foque em cobrir as lacunas que os sites de autoridade deixaram passar.
    
    IMPORTANT: Respond in the language code: "${lang}".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            targetKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            outline: { type: Type.ARRAY, items: { type: Type.STRING } },
            hook: { type: Type.STRING, description: "Um gancho irresistível para o primeiro parágrafo" },
            semanticKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Termos LSI e Entidades para EEAT" }
          }
        }
      }
    });

    const text = response.text;
    return JSON.parse(text) as ContentStrategy;
  } catch (error) {
    console.error("Erro no Content Magician:", error);
    throw error;
  }
};

/**
 * ORÁCULO - Planejamento de 90 dias
 */
export const generateGrowthPlan = async (topic: string, lang: Language = 'en'): Promise<any> => {
  const prompt = `
    Crie um plano de ataque SEO de 90 dias para o nicho: "${topic}".
    Use a metodologia SAB (Serp Armor Breaker). Divida em Mês 1 (Fundação), Mês 2 (Brecha) e Mês 3 (Dominação).
    
    IMPORTANT: Respond in the language code: "${lang}".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            month1: { type: Type.STRING },
            month2: { type: Type.STRING },
            month3: { type: Type.STRING },
            priority: { type: Type.STRING, description: "A maior fenda na armadura que deve ser atacada primeiro" }
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Erro no Oráculo:", error);
    return null;
  }
};

/**
 * AUXILIAR - Outreach & Guest Post Topics
 */
export const generateOutreachEmail = async (siteUrl: string, strategy: string, lang: Language = 'en'): Promise<OutreachTemplate> => {
  const prompt = `Crie um email de outreach profissional e persuasivo para o site ${siteUrl} usando a estratégia ${strategy}. Idioma: ${lang}.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            body: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text) as OutreachTemplate;
  } catch (error) {
    console.error("Erro no Outreach:", error);
    return { subject: "Parceria SEO", body: "" };
  }
};

export const generateGuestPostTopics = async (niche: string, lang: Language = 'en'): Promise<string[]> => {
  const prompt = `Gere 5 tópicos virais de guest post para o nicho ${niche}. Idioma: ${lang}.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Erro nos tópicos:", error);
    return [];
  }
};
