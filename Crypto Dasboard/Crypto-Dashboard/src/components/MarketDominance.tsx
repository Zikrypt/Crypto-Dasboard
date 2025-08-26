import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DominanceData {
  name: string;
  value: number;
  color: string;
}

const MarketDominance = () => {
  const [dominanceData, setDominanceData] = useState<DominanceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDominanceData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false'
        );
        
        if (!response.ok) throw new Error('Failed to fetch dominance data');
        
        const data = await response.json();
        const totalMarketCap = data.reduce((sum: number, coin: any) => sum + coin.market_cap, 0);
        
        const formattedData = data.map((coin: any, index: number) => ({
          name: coin.symbol.toUpperCase(),
          value: Math.round((coin.market_cap / totalMarketCap) * 100),
          color: getColor(index),
        }));

        // Add "Others" category for remaining market cap
        const topFivePercentage = formattedData.reduce((sum: number, item: DominanceData) => sum + item.value, 0);
        if (topFivePercentage < 100) {
          formattedData.push({
            name: "Others",
            value: 100 - topFivePercentage,
            color: "hsl(var(--muted))",
          });
        }

        setDominanceData(formattedData);
      } catch (error) {
        console.error('Error fetching dominance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDominanceData();
  }, []);

  const getColor = (index: number) => {
    const colors = [
      "hsl(var(--primary))",
      "hsl(var(--secondary))",
      "hsl(var(--accent))",
      "hsl(var(--destructive))",
      "hsl(var(--success))",
    ];
    return colors[index] || "hsl(var(--muted))";
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].value}% of market
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-elevated">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Market Dominance</CardTitle>
        <p className="text-muted-foreground">Top cryptocurrencies by market cap</p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-80">
            <div className="text-muted-foreground">Loading dominance data...</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={dominanceData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
              >
                {dominanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: entry.color }}>
                    {value} ({entry.payload?.value}%)
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketDominance;