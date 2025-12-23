import { GoogleGenAI, Type } from "@google/genai";
import { BacklinkOpportunity, ContentStrategy, OutreachTemplate, KeywordIdea, Language } from "../types";

// Note que usamos process.env.API_KEY, que você deve configurar no painel do Netlify
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

// 1. Encontrar oportunidades de Backlinks
export const findBacklinkOpportunities = async (niche: string, lang: Language = 'en'): Promise<BacklinkOpportunity[]> => {
  const prompt = `Identify 5 REAL websites for link building in the niche "${niche}" (Language: ${lang}). Provide JSON with siteName, url, domainAuthority, relevanceScore, strategy, contactInfo.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { tools: [{googleSearch: {}}], responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error in findBacklinkOpportunities:", error);
    return [];
  }
};

// 2. Gerar Palavras-chave
export const generateKeywords = async (seedKeyword: string, lang: Language = 'en'): Promise<KeywordIdea[]> => {
  const prompt = `Generate 10 long-tail keywords for "${seedKeyword}" in ${lang}. Provide JSON array with keyword, intent, difficulty, contentIdea.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error in generateKeywords:", error);
    return [];
  }
};

// 3. Analisar Gap de Competidores
export const analyzeCompetitorGap = async (competitorUrl: string, topic: string, lang: Language = 'en'): Promise<KeywordIdea[]> => {
  const prompt = `Analyze ${competitorUrl} for topic "${topic}" in ${lang}. Find 10 keyword gaps. JSON array with keyword, intent, difficulty, contentIdea.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { tools: [{googleSearch: {}}], responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error in analyzeCompetitorGap:", error);
    return [];
  }
};

// 4. Gerar Estratégia de Conteúdo
export const generateContentStrategy = async (topic: string, lang: Language = 'en'): Promise<ContentStrategy> => {
  const prompt = `Create content strategy for "${topic}" in ${lang}. JSON with pillarTitle, clusters (array), targetAudience, suggestedFormat.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error in generateContentStrategy:", error);
    throw error;
  }
};

// 5. Gerar E-mail de Outreach (Necessário para o OutreachAssistant)
export const generateOutreachEmail = async (targetSite: string, strategy: string, niche: string, lang: Language = 'en'): Promise<OutreachTemplate> => {
  const prompt = `Write a professional backlink outreach email for ${targetSite} using ${strategy} strategy about ${niche} in ${lang}. JSON with subject, body.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error in generateOutreachEmail:", error);
    return { subject: "Error generating email", body: "" };
  }
};

// 6. Gerar Tópicos para Guest Post (Necessário para o OutreachAssistant)
export const generateGuestPostTopics = async (targetSite: string, niche: string, lang: Language = 'en'): Promise<string[]> => {
  const prompt = `Suggest 5 guest post topics for ${targetSite} in the ${niche} niche in ${lang}. JSON array of strings.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error in generateGuestPostTopics:", error);
    return [];
  }
};
