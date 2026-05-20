export interface NewsSource {
  name: string;
  url: string;
  logo: string;
  color: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  url: string;
  publishedAt: string;
  source: NewsSource;
  category: string;
}

export interface FeedResponse {
  articles: NewsArticle[];
  fetchedAt: string;
  sources: string[];
}