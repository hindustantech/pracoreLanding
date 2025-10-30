import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";
import { ArrowRight, Users, Building2 } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(210, 240, 255, 0.95), rgba(200, 235, 250, 0.95)), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft">
            <Building2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Building Products Since 2020</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
            Precore —{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Building products
            </span>
            <br />
            that help businesses grow
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-2xl mx-auto">
            We create innovative software solutions that empower businesses to scale, 
            streamline operations, and achieve their goals faster.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => scrollToSection("attendance")}
              className="group"
            >
              <Users className="w-5 h-5" />
              Employee Login
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="heroOutline" 
              size="lg"
              onClick={() => scrollToSection("startups")}
            >
              Our Startups
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="p-6 bg-card rounded-xl shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Projects Delivered</div>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
