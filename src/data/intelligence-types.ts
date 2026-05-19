export interface Source {
  name: string;
  logo: string;
  url: string;
  date: string;
  author?: string;
}
export interface IntelligenceItem {
  id: string;
  category: string;
  headline: string;
  summary: string;
  fullReport: string;
  context: string;
  implications: string[];
  timeline: { time: string; event: string }[];
  sources: Source[];
  impact: "critical" | "high" | "medium" | "low";
  time: string;
  sector: string;
  tags: string[];
  region: string;
}
