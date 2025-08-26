import Navbar from "@/components/Navbar";

const Markets = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Markets</h1>
          <p className="text-xl text-muted-foreground">Coming soon - Advanced market analysis and trading data</p>
        </div>
      </main>
    </div>
  );
};

export default Markets;