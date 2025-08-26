import Navbar from "@/components/Navbar";
import CryptoTable from "@/components/CryptoTable";
import CryptoChart from "@/components/CryptoChart";
import MarketDominance from "@/components/MarketDominance";
import CryptoNews from "@/components/CryptoNews";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Live Crypto Tracker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with real-time cryptocurrency prices and market data. 
            Track the top cryptocurrencies and their 24-hour performance.
          </p>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <CryptoChart />
          <MarketDominance />
        </div>

        {/* Crypto Data Table */}
        <div className="mb-12">
          <CryptoTable />
        </div>

        {/* News Section */}
        <div>
          <CryptoNews />
        </div>
      </main>
    </div>
  );
};

export default Index;
