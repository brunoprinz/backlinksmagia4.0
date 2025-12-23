
export type Language = 'en' | 'pt' | 'es' | 'fr' | 'de' | 'it' | 'pt-pt' | 'zh';

export interface BacklinkOpportunity {
  siteName: string;
  url: string;
  domainAuthority: number; // Simulated score 0-100
  relevanceScore: number; // Simulated score 0-100
  strategy: string; // e.g., "Guest Post", "Broken Link", "Skyscraper"
  contactInfo?: string;
}

export interface ContentStrategy {
  title: string;
  type: string;
  targetKeywords: string[];
  outline: string[];
  hook: string;
  contentBody?: string; // For reviews/scripts
}

export interface OutreachTemplate {
  subject: string;
  body: string;
}

export interface KeywordIdea {
  keyword: string;
  intent: 'Informational' | 'Commercial' | 'Transactional';
  difficulty: string;
  contentIdea: string;
}

export interface ZeroVolumeAnalysis {
  potentialScore: number; // 0-100
  verdict: 'High Potential' | 'Uncertain' | 'Low Potential';
  reasoning: string;
  suggestedVariations: string[];
}

export interface OnPageAnalysis {
  score: number; // 0-100
  keywordDensity: string;
  readability: string;
  missingElements: string[];
  actionableTips: string[];
}

export interface TrackedSiteHistory {
  month: string;
  links: number;
}

export interface TrackedSite {
  id: string;
  url: string;
  dr: number;
  backlinks: number;
  referringDomains: number;
  relevance: number; // 0-100
  qualityScore: number; // 0-100
  history: TrackedSiteHistory[];
}

export type KeywordMode = 'discovery' | 'competitor';

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  STRATEGY_WIZARD = 'STRATEGY_WIZARD',
  OPPORTUNITIES = 'OPPORTUNITIES',
  KEYWORDS = 'KEYWORDS',
  CONTENT_MAGIC = 'CONTENT_MAGIC',
  OUTREACH = 'OUTREACH',
  ACADEMY = 'ACADEMY',
  TRACKING = 'TRACKING',
  KGR_CALCULATOR = 'KGR_CALCULATOR',
  ONPAGE_ANALYZER = 'ONPAGE_ANALYZER',
  EXTRA_INCOME = 'EXTRA_INCOME',
  PROMPT_LIBRARY = 'PROMPT_LIBRARY',
  WHY_US = 'WHY_US'
}
