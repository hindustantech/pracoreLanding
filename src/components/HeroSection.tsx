import heroBackground from "@/assets/hero-background.jpg";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28"
      style={{
        backgroundImage: `linear-gradient(rgba(210, 240, 255, 0.95), rgba(200, 235, 250, 0.95)), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/70 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-soft mb-5">
            Modern software solutions for growth-focused businesses
          </p>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight tracking-tight">
            Praecore —{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Building scalable processes
            </span>
            <br />
            that help businesses grow
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl mb-10 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We innovate software solutions that support businesses to
            grow, streamline operations, and achieve their goals faster.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {[
              ["Fast Delivery", "Agile teams"],
              ["Scalable Systems", "Built for growth"],
              ["Reliable Support", "Long-term partnership"],
            ].map(([title, subtitle]) => (
              <div key={title} className="rounded-xl border border-border/70 bg-white/60 px-3 py-4 backdrop-blur-sm shadow-soft">
                <p className="text-sm sm:text-base font-semibold text-foreground">{title}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("startups")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center focus:outline-none"
        aria-label="Scroll to solutions"
      >
        <div className="w-6 h-10 border-2 border-primary/80 rounded-full flex items-start justify-center p-2 mb-1.5 animate-bounce">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
        <ChevronDown className="w-5 h-5 text-primary animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
