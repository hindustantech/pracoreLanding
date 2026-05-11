import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";

interface StartupCardProps {
  name: string;
  description: string;
  websiteUrl: string;
  appUrl: string;
  mockupImage: string;
}

const StartupCard = ({ name, description, websiteUrl, appUrl, mockupImage }: StartupCardProps) => {
  return (
    <div className="group bg-card rounded-2xl shadow-soft hover:shadow-glow transition-all duration-500 overflow-hidden border border-border hover:border-primary">
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 order-2 md:order-1">
            <h3 className="text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="default" 
                onClick={() => window.open(websiteUrl, "_blank")}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open(appUrl, "_blank")}
                className="flex-1"
              >
                <Download className="w-4 h-4" />
                Install App
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex-shrink-0">
            <div className="relative group-hover:scale-105 transition-transform duration-500">
              <div className="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
              <img 
                src={mockupImage} 
                alt={`${name} app mockup`}
                className="relative w-64 h-auto drop-shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupCard;
