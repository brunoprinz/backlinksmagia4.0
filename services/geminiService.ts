import { GoogleGenAI, Type } from "@google/genai";
import { BacklinkOpportunity, ContentStrategy, OutreachTemplate, KeywordIdea, Language, ZeroVolumeAnalysis, OnPageAnalysis, TrackedSite } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 1. Analyze a niche to find backlink candidates
export const findBacklinkOpportunities = async (niche: string, lang: Language = 'en'): Promise<BacklinkOpportunity[]> => {
  const prompt = `
    Use Google Search to analyze the niche "${niche}". Identify 5 REAL, active, high-authority websites...
    IMPORTANT: Respond in the language code: "${lang}".
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
              strategy: { type: Type.STRING },
              contactInfo: { type: Type.STRING }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || "[]") as BacklinkOpportunity[];
  } catch (error) {
    console.error("Gemini API Error (Opportunities):", error);
    return [];
  }
};

// 2. Generate Keywords
export const generateKeywords = async (seedKeyword: string, lang: Language = 'en'): Promise<KeywordIdea[]> => {
  const prompt = `Act as an SEO expert... Generate 10 high-potential long-tail keywords for "${seedKeyword}" in "${lang}".`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
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

    return JSON.parse(response.text || "[]") as KeywordIdea[];
  } catch (error) {
    console.error("Gemini API Error (Keywords):", error);
    return [];
  }
};

// 3. NOVA FUNÇÃO: Generate Content Strategy (A que estava faltando!)
export const generateContentStrategy = async (topic: string, lang: Language = 'en'): Promise<ContentStrategy> => {
  const prompt = `
    Create a comprehensive Content Strategy for the topic: "${topic}".
    The strategy must include:
    1. A main pillar article title.
    2. 3 supporting sub-topics (cluster content).
    3. Target audience description.
    4. Suggested content format (Video, Long-form blog, etc.).
    
    IMPORTANT: Respond in language code: "${lang}".
    Output JSON format.
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
            pillarTitle: { type: Type.STRING },
            clusters: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            targetAudience: { type: Type.STRING },
            suggestedFormat: { type: Type.STRING }
          }
        }
      }
    });

    return JSON.parse(response.text || "{}") as ContentStrategy;
  } catch (error) {
    console.error("Gemini API Error (Strategy):", error);
    throw error;
  }
};

// 4. Analyze Competitor Gap
export const analyzeCompetitorGap = async (competitorUrl: string, topic: string, lang: Language = 'en'): Promise<KeywordIdea[]> => {
  const prompt = `Analyze competitor "${competitorUrl}" for topic "${topic}" in language "${lang}"...`;

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

    return JSON.parse(response.text || "[]") as KeywordIdea[];
  } catch (error) {
    console.error("Gemini API Error (Competitor Gap):", error);
    return [];
  }
};