import { GoogleGenAI } from "@google/genai";
import { 
  BacklinkOpportunity, 
  ContentStrategy, 
  OutreachTemplate, 
  KeywordIdea, 
  Language, 
  ZeroVolumeAnalysis, 
  OnPageAnalysis,
  TrackedSite 
} from "../types";

// A chave será puxada das configurações da Vercel/Netlify ou .env local
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

// 1. Encontrar Oportunidades de Backlinks (OpportunityFinder.tsx)
export const findBacklinkOpportunities = async (niche: string, lang: Language = 'en'): Promise<BacklinkOpportunity[]> => {
  const prompt = `Analyze the niche "${niche}" in ${lang}. Find 5 REAL high-authority websites for guest posting or skyscraper. JSON: siteName, url, domainAuthority (30-90), relevanceScore (0-100), strategy, contactInfo.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { tools: [{googleSearch: {}}], responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) { return []; }
};

// 2. Pesquisa de Palavras-chave (KeywordResearcher.tsx)
export const generateKeywords = async (seedKeyword: string, lang: Language = 'en'): Promise<KeywordIdea[]> => {
  const prompt = `10 long-tail keywords for "${seedKeyword}" in ${lang}. JSON array: keyword, intent (Informational/Commercial/Transactional), difficulty (Low/Medium/High), contentIdea.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) { return []; }
};

// 3. Gap de Competidores (KeywordResearcher.tsx)
export const analyzeCompetitorGap = async (competitorUrl: string, topic: string, lang: Language = 'en'): Promise<KeywordIdea[]> => {
  const prompt = `Analyze ${competitorUrl} for "${topic}" in ${lang}. Find 10 gaps. JSON array: keyword, intent, difficulty, contentIdea.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { tools: [{googleSearch: {}}], responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) { return []; }
};

// 4. Estratégia de Conteúdo (ContentMagician.tsx)
export const generateContentStrategy = async (topic: string, mode: string = 'magnet', lang: Language = 'en'): Promise<ContentStrategy> => {
  const prompt = `Strategy for "${topic}" (Mode: ${mode}) in ${lang}. JSON: title, type, targetKeywords (array), outline (array), hook, contentBody.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) { throw error; }
};

// 5. E-mail de Outreach (OutreachAssistant.tsx)
export const generateOutreachEmail = async (targetSite: string, contentTitle: string, strategy: string, lang: Language = 'en'): Promise<OutreachTemplate> => {
  const prompt = `Outreach email for ${targetSite} about ${contentTitle} using ${strategy} in ${lang}. JSON: subject, body.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) { return { subject: "Error", body: "" }; }
};

// 6. Sugestão de Tópicos (OutreachAssistant.tsx)
export const generateGuestPostTopics = async (niche: string, lang: Language = 'en'): Promise<string[]> => {
  const prompt = `5 guest post topics for ${niche} in ${lang}. JSON array of strings.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) { return []; }
};

// 7. KGR - Keyword Golden Ratio (KgrCalculator.tsx)
export const analyzeZeroVolumeKeyword = async (keyword: string, lang: Language = 'en'): Promise<ZeroVolumeAnalysis> => {
  const prompt = `Analyze KGR for "${keyword}" in ${lang}. JSON: potentialScore (0-100), verdict (High Potential/Uncertain/Low Potential), reasoning, suggestedVariations (array).`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { potentialScore: 0, verdict: 'Uncertain', reasoning: "Error", suggestedVariations: [] };
  }
};

// 8. Analisador On-Page (OnPageAnalyzer.tsx)
export const analyzeOnPageContent = async (title: string, content: string, keyword: string, lang: Language = 'en'): Promise<OnPageAnalysis> => {
  const prompt = `Analyze SEO for Title: ${title}, Content: ${content}, Keyword: ${keyword} in ${lang}. JSON: score (0-100), keywordDensity, readability, missingElements (array), actionableTips (array).`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { score: 0, keywordDensity: "0%", readability: "N/A", missingElements: [], actionableTips: [] };
  }
};

// 9. Health Check do Domínio (BacklinkTracker.tsx)
export const analyzeDomainHealth = async (site: TrackedSite, lang: Language = 'en'): Promise<string> => {
  const prompt = `Analyze domain health for ${site.url} (DR: ${site.dr}, Backlinks: ${site.backlinks}) in ${lang}. Provide a 2-sentence SEO summary.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt
    });
    return response.text || "Analysis unavailable.";
  } catch (error) { return "Error analyzing domain."; }
};
