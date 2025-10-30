import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StartupCard from "@/components/StartupCard";
import AboutSection from "@/components/AboutSection";
import EmployeeAttendance from "@/components/EmployeeAttendance";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import inshopzzMockup from "@/assets/inshopzz-mockup.png";
import salonmasterMockup from "@/assets/salonmaster-mockup.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      
      <section id="startups" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Our <span className="bg-gradient-primary bg-clip-text text-transparent">Startups</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Innovative products designed to transform businesses
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="animate-fade-up">
              <StartupCard
                name="Inshopzz"
                description="A comprehensive e-commerce platform that helps businesses sell online with ease. Features include inventory management, payment integration, customer analytics, and a beautiful storefront that converts visitors into customers. Perfect for retail businesses looking to expand their digital presence."
                websiteUrl="https://inshopzz.com"
                appUrl="https://play.google.com/store"
                mockupImage={inshopzzMockup}
              />
            </div>
            
            <div className="animate-fade-up">
              <StartupCard
                name="SalonMaster"
                description="The ultimate salon management solution for modern beauty businesses. Streamline appointments, manage staff schedules, track inventory, process payments, and engage customers with automated reminders. Designed specifically for salons, spas, and beauty professionals to grow their business efficiently."
                websiteUrl="https://salonmaster.com"
                appUrl="https://play.google.com/store"
                mockupImage={salonmasterMockup}
              />
            </div>
          </div>
        </div>
      </section>

      <div id="about">
        <AboutSection />
      </div>
      <div id="attendance">
        <EmployeeAttendance />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
