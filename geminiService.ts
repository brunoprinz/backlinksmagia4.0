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
    Provide the output in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
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
              strategy: { type: Type.STRING },
              contactInfo: { type: Type.STRING }
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
    IMPORTANT: Respond in the language code: "${lang}".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
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
    Analise o concorrente: "${competitorUrl}" sobre o tópico "${topic}".
    IMPORTANT: Respond in the language code: "${lang}".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
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
    console.error("Gemini API Error (Competitor Gap):", error);
    return [];
  }
};

/**
 * CONTENT MAGICIAN - Estratégia Semântica
 */
export const generateContentStrategy = async (topic: string, mode: string, lang: Language = 'en'): Promise<ContentStrategy> => {
  const prompt = `Crie uma estratégia SAB para: "${topic}" no modo "${mode}". Idioma: "${lang}".`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
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
            hook: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text) as ContentStrategy;
  } catch (error) {
    console.error("Erro no Content Magician:", error);
    throw error;
  }
};

/**
 * ORÁCULO - Planejamento de 90 dias
 */
export const generateGrowthPlan = async (topic: string, lang: Language = 'en'): Promise<any> => {
  const prompt = `Plano SAB de 90 dias para: "${topic}". Idioma: "${lang}".`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            month1: { type: Type.STRING },
            month2: { type: Type.STRING },
            month3: { type: Type.STRING },
            priority: { type: Type.STRING }
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
