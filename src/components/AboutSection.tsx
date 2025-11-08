import teamPhoto from "@/assets/team-photo.jpg";
import { Target, Users, Lightbulb } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="pt-2 pb-2 bg-background">

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              About <span className="bg-gradient-primary bg-clip-text text-transparent">Praecore</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering businesses through innovative technology solutions
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-4 items-center mb-2">

            <div className="space-y-6 animate-fade-up">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Praecore is a dynamic software company dedicated to building products that transform 
                businesses. We specialize in creating scalable, user-friendly applications that solve 
                real-world problems for companies across various industries.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team of passionate developers, designers, and strategists work collaboratively 
                to deliver solutions that not only meet but exceed our clients' expectations. From 
                e-commerce platforms to business management tools, we build products that drive growth.
              </p>
              
              <div className="grid gap-6 mt-8">
                <div className="flex gap-4 items-start p-4 bg-card rounded-xl shadow-soft">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <Target className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Our Mission</h4>
                    <p className="text-muted-foreground">
                      To empower businesses with cutting-edge technology solutions that drive growth and efficiency.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start p-4 bg-card rounded-xl shadow-soft">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <Lightbulb className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Our Vision</h4>
                    <p className="text-muted-foreground">
                      To be the leading innovator in business software, known for quality and customer success.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-up">
              {/* <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src={teamPhoto} 
                  alt="Precore Team" 
                  className="relative rounded-2xl shadow-glow w-full hover:scale-105 transition-transform duration-500"
                />
              </div> */}
              {/* <div className="mt-4 flex items-center justify-center gap-4">

                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">Team Members</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-primary">2</div>
                  <div className="text-sm text-muted-foreground">Active Products</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
