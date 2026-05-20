import { NextResponse } from "next/server";
import type { FeedResponse, NewsArticle, NewsSource } from "../../../data/news-types";

const SOURCES: NewsSource[] = [
  { name: "Reuters", url: "https://www.reuters.com", logo: "Reuters", color: "#FF6600" },
  { name: "BBC News", url: "https://www.bbc.com/news", logo: "BBC", color: "#BB1919" },
  { name: "AP News", url: "https://apnews.com", logo: "AP", color: "#FF4500" },
  { name: "CNN", url: "https://www.cnn.com", logo: "CNN", color: "#CC0000" },
];

const FEEDS = [
  { source: SOURCES[0], feedUrl: "https://feeds.reuters.com/reuters/topNews" },
  { source: SOURCES[1], feedUrl: "http://feeds.bbci.co.uk/news/rss.xml" },
  { source: SOURCES[2], feedUrl: "https://rsshub.app/apnews/topics/apf-topnews" },
  { source: SOURCES[3], feedUrl: "http://rss.cnn.com/rss/edition.rss" },
];

function parseFeedItem(item: any, source: NewsSource): NewsArticle | null {
  try {
    const title = item.title?._ || item.title?.toString() || item.title?.toString()?.split('CDATA[')[1]?.split(']]')[0] || '';
    const summary = item.summary?._ || item.summary?.toString() || item.description?._ || item.description?.toString() || '';
    const link = item.link?._ || item.link?.toString() || item.guid?._ || item.guid?.toString() || '';

    if (!title || !link) return null;

    const cleanTitle = title.replace(/<!\[CDATA\[|\]\]>/g, '').trim();
    const cleanSummary = summary.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, '').trim();
    const publishedAt = item.pubDate?._ || item.pubDate?.toString() || item.published?._ || new Date().toISOString();

    // Determine category from title/summary keywords
    const text = (cleanTitle + ' ' + cleanSummary).toLowerCase();
    let category = 'General';
    if (/\b(politics|election|trump|biden|government|congress|senate|parliament)\b/.test(text)) category = 'Politics';
    else if (/\b(economy|stock|market|finance|inflation|interest|federal reserve|trade|tariff)\b/.test(text)) category = 'Economy';
    else if (/\b(war|military|conflict|ukraine|gaza|israel|hamas|russia|china|taiwan)\b/.test(text)) category = 'World';
    else if (/\b(ai|technology|tech|apple|microsoft|google|openai|spacex|tesla)\b/.test(text)) category = 'Technology';
    else if (/\b(climate|energy|oil|renewable|solar|wind|environment)\b/.test(text)) category = 'Energy';
    else if (/\b(sports|soccer|football|basketball|olympics|tennis|golf)\b/.test(text)) category = 'Sports';
    else if (/\b(health|medical|disease|virus|vaccine|cancer|diabetes)\b/.test(text)) category = 'Health';

    return {
      id: Buffer.from(link).toString('base64').slice(0, 32),
      title: cleanTitle,
      summary: cleanSummary.slice(0, 280) + (cleanSummary.length > 280 ? '...' : ''),
      content: cleanSummary,
      url: link,
      publishedAt: new Date(publishedAt).toISOString(),
      source,
      category,
    };
  } catch {
    return null;
  }
}

async function fetchFeed(source: NewsSource, feedUrl: string): Promise<NewsArticle[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(feedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GlobeIntel/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
    });
    clearTimeout(timeout);

    if (!response.ok) return [];

    const xml = await response.text();
    const articles: NewsArticle[] = [];

    // Parse XML manually
    const itemMatches = xml.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || [];
    const channelMatch = xml.match(/<channel>([\s\S]*?)<\/channel>/i);
    const channelText = channelMatch?.[1] || '';

    // Get channel-level info
    const channelTitleMatch = channelText.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const channelLinkMatch = channelText.match(/<link[^>]*>([\s\S]*?)<\/link>/i);

    for (const itemStr of itemMatches.slice(0, 8)) {
      const getTagContent = (tag: string) => {
        const match = itemStr.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
        return match ? match[1].trim() : '';
      };

      const rawItem: any = {
        title: getTagContent('title'),
        link: getTagContent('link'),
        summary: getTagContent('description') || getTagContent('content:encoded'),
        pubDate: getTagContent('pubDate'),
        guid: getTagContent('guid'),
      };

      const article = parseFeedItem(rawItem, source);
      if (article && article.title.length > 10) {
        articles.push(article);
      }
    }

    return articles;
  } catch (error) {
    console.error(`Failed to fetch ${source.name}:`, error);
    return [];
  }
}

export async function GET() {
  try {
    const allArticles: NewsArticle[] = [];
    const sourcesChecked: string[] = [];

    // Fetch from all 4 sources in parallel
    const results = await Promise.allSettled(
      FEEDS.map(({ source, feedUrl }) => fetchFeed(source, feedUrl))
    );

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const source = FEEDS[i].source;

      if (result.status === 'fulfilled') {
        const articles = result.value;
        allArticles.push(...articles);
        sourcesChecked.push(source.name);
      }
    }

    // Sort by publishedAt (newest first)
    allArticles.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Deduplicate by title similarity
    const seen = new Set<string>();
    const unique = allArticles.filter((article) => {
      const normalized = article.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60);
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    });

    // Cap at 20 articles
    const finalArticles = unique.slice(0, 20);

    const response: FeedResponse = {
      articles: finalArticles,
      fetchedAt: new Date().toISOString(),
      sources: sourcesChecked,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      { articles: [], fetchedAt: new Date().toISOString(), sources: [], error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}