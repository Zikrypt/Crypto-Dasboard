import Navbar from "@/components/Navbar";

const News = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Crypto News</h1>
          <p className="text-xl text-muted-foreground">Coming soon - Latest cryptocurrency news and updates</p>
        </div>
      </main>
    </div>
  );
};

export default News;