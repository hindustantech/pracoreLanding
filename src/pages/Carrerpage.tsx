import Navbar from "@/components/Navbar";
import CareerPage from "@/components/Carrer";

const Carrer = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      {/* 👇 yahan margin-top add kiya */}
      <main className="flex-grow mt-16">
        <CareerPage />
      </main>
    </div>
  );
};

export default Carrer;
