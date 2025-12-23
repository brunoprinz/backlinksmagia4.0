import { GoogleGenAI, Type } from "@google/genai";
import { BacklinkOpportunity, ContentStrategy, OutreachTemplate, KeywordIdea, Language, ZeroVolumeAnalysis, OnPageAnalysis, TrackedSite } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Analyze a niche to find high-quality backlink candidates (Real Search)
export const findBacklinkOpportunities = async (niche: string, lang: Language = 'en'): Promise<BacklinkOpportunity[]> => {
  const prompt = `
    Use Google Search to analyze the niche "${niche}". Identify 5 REAL, active, high-authority websites, blogs, or digital magazines 
    that would be excellent targets for White Hat link building (e.g., Guest Posting, Skyscraper technique, Resource pages).
    
    IMPORTANT: Respond in the language code: "${lang}".
    
    For each site, estimate a Domain Authority (DA) between 30-90 based on their real-world reputation found in search, 
    a Relevance Score (0-100) to the niche, and suggest a specific strategy to acquire a backlink from them.
    
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

// Generate Keywords (Rank Ninja Logic - Brainstorming)
export const generateKeywords = async (seedKeyword: string, lang: Language = 'en'): Promise<KeywordIdea[]> => {
  const prompt = `
    Act as an SEO expert using the "Long Tail" strategy. 
    Generate 10 high-potential long-tail keywords related to "${seedKeyword}".
    Focus on keywords that are likely to have lower competition but high conversion intent.
    
    IMPORTANT: Respond in the language code: "${lang}".

    For each keyword, determine its search intent (Informational, Commercial, or Transactional),
    estimate difficulty (Low, Medium, High), and suggest a specific Content Title idea.
  `;

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

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as KeywordIdea[];
  } catch (error) {
    console.error("Gemini API Error (Keywords):", error);
    return [];
  }
};

// Analyze Competitor Gap (Real Search Analysis)
export const analyzeCompetitorGap = async (competitorUrl: string, topic: string, lang: Language = 'en'): Promise<KeywordIdea[]> => {
  const prompt = `
    Act as a senior SEO Strategist performing a "Content Gap Analysis".
    
    First, use Google Search to analyze the competitor website: "${competitorUrl}".
    Understand their content strategy regarding "${topic}".
    
    Then, identify 10 high-value keywords that this competitor likely ranks for, but that represent a "Content Gap" for a new challenger.
    Focus on "Money Keywords" (Commercial/Transactional) or high-volume Informational keywords.
    
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
              difficulty: { type: Type.STRING, description: "Estimate difficulty to outrank this competitor" },
              contentIdea: { type: Type.STRING, description: "A catchy, high-CTR content title (Skyscraper technique) to target this keyword." }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as KeywordIdea[];
  } catch (error) {
    console