import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StartupCard from "@/components/StartupCard";
import AboutSection from "@/components/AboutSection";
import EmployeeAttendance from "@/components/EmployeeAttendance";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

import inshopzzMockup from "@/assets/inshopzz-mockup1.png";
import salonmasterMockup from "@/assets/salonmaster-mockup1.png";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Hero Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* ✅ Startups Section */}
      <section id="startups" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Our{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Innovative products designed to transform businesses
            </p>
          </div>

          {/* ✅ Startup Cards */}
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Inshopzz */}
            <div className="animate-fade-up" data-delay="100">
              <StartupCard
                name="Inshopzz-App"
                description="In today's world of information overload, small and medium-sized enterprises (SMEs) need new,
effective strategies for marketing and brand building. However, many SMEs struggle to take
advantage of digital and social media platforms due to a lack of awareness or the high costs involved.
As a result, they fail to reach their target audience. Recognizing this challenge, we identified the need
for a platform that could bridge this gap and provide a solution. This led to the creation of the
iNShopzz app.
iNShopzz was launched with the goal of increasing awareness about the products and services
available within local communities. It serves as a tool for buyers to easily discover whats available
and make informed decisions. The app also offers special discounts to attract customers. Importantly,
iNShopzz is completely free to use. We do not charge any fees from customers, and there is no
payment gateway integrated into the app, meaning no transactions occur through the platform."
                websiteUrl="https://inshopzz.com"
                appUrl="https://play.google.com/store/apps/details?id=com.inshopzz.aash_india"
                mockupImage={inshopzzMockup}
              />
            </div>

            {/* SalonMaster */}
            <div className="animate-fade-up" data-delay="200">
              <StartupCard
                name="SalonMaster-App"
                description="In the dynamic, fast-paced, and highly competitive world of salon business, fragmentation is the
single greatest barrier to growth. Stylists seek better job opportunities, authentic source of SOP of
the products which they use, reference and revaluation of their techniques but lack a centralized
platform. Salon owners struggle with recruitment, availability of right product . Product companies
spend fortunes on inefficient, in-person training and launches. Academies and franchisors grapple
with limited reach. And the entire industry lacks a unified digital coherent eco system which can
bring synergy in the business transactions.
Enter Salon Master—a revolutionary, all-in-one B2B2C (Business-to-Business-to-Consumer) platform
designed not just as an app, but as a complete ecosystem that interconnects every pillar of the
beauty industry. Salon Master is the digital collaboration where talent meets opportunity,
management meets insight, products meet education, and businesses meet their future. It is the
operating system for the modern salon professional.
."
                websiteUrl="http://thesalonmaster.com/"
                appUrl="https://play.google.com/store/apps/details?id=com.aashindia.salonmasterx"
                mockupImage={salonmasterMockup}
              />
            </div>
            <div className="animate-fade-up" data-delay="200">
              <StartupCard
                name="UAI-App"
                description="UAI is a modern human resource and workforce management platform designed to streamline employee operations, attendance tracking, payroll coordination, and organizational management. The platform focuses on improving business productivity through scalable, user-friendly, and technology-driven HR solutions. Praecore delivers efficient digital systems that help companies manage employees, optimize workflows, and enhance operational transparency.
."
                websiteUrl="https://hr.praecore.in/"
                appUrl="https://play.google.com/store/apps/details?id=com.uai.attendance&hl=en"
                mockupImage={salonmasterMockup}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ✅ About Section */}
      <section id="about" className="py-20">
        <AboutSection />
      </section>


      {/* ✅ Contact Section */}
      <section id="contact" className="py-20">
        <ContactForm />
      </section>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default Index;
