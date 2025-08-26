import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar } from "lucide-react";

interface NewsItem {
  title: string;
  url: string;
  published_at: string;
  source: string;
  summary?: string;
}

const CryptoNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Using CryptoCompare News API (free tier)
        const response = await fetch(
          'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=latest'
        );
        
        if (!response.ok) throw new Error('Failed to fetch news');
        
        const data = await response.json();
        
        if (data.Response === 'Success') {
          setNews(data.Data.slice(0, 8)); // Get latest 8 articles
        } else {
          throw new Error('Invalid response from news API');
        }
      } catch (err) {
        // Fallback to mock data if API fails
        const mockNews: NewsItem[] = [
          {
            title: "Bitcoin Reaches New All-Time High Amid Institutional Adoption",
            url: "#",
            published_at: new Date().toISOString(),
            source: "CryptoNews",
            summary: "Bitcoin continues its bullish momentum as more institutions adopt cryptocurrency."
          },
          {
            title: "Ethereum 2.0 Staking Rewards Attract More Validators",
            url: "#",
            published_at: new Date(Date.now() - 3600000).toISOString(),
            source: "DeFi Daily",
            summary: "The Ethereum network sees increased staking participation following reward improvements."
          },
          {
            title: "Regulatory Clarity Drives Crypto Market Optimism",
            url: "#",
            published_at: new Date(Date.now() - 7200000).toISOString(),
            source: "Blockchain Times",
            summary: "New regulatory guidelines provide much-needed clarity for crypto businesses."
          },
          {
            title: "DeFi Protocol Launches Revolutionary Yield Farming Feature",
            url: "#",
            published_at: new Date(Date.now() - 10800000).toISOString(),
            source: "DeFi Pulse",
            summary: "A new DeFi protocol introduces innovative yield farming mechanisms."
          },
          {
            title: "Major Bank Announces Crypto Custody Services",
            url: "#",
            published_at: new Date(Date.now() - 14400000).toISOString(),
            source: "Financial Express",
            summary: "Traditional banking giant enters cryptocurrency custody market."
          }
        ];
        setNews(mockNews);
        setError('Using demo data - API temporarily unavailable');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    
    // Refresh news every 5 minutes
    const interval = setInterval(fetchNews, 300000);
    
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    }
  };

  return (
    <Card className="shadow-elevated">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Latest Crypto News</CardTitle>
        <p className="text-muted-foreground">Stay updated with the latest developments</p>
        {error && (
          <Badge variant="secondary" className="w-fit">
            {error}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading latest news...</div>
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((article, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => article.url !== '#' && window.open(article.url, '_blank')}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    {article.summary && (
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {article.summary}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.published_at)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {article.source}
                      </Badge>
                    </div>
                  </div>
                  {article.url !== '#' && (
                    <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CryptoNews;