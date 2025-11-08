import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Briefcase, Rocket, Users, Building2, ArrowRight } from "lucide-react";

const jobOpenings = [
  {
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote / India",
    type: "Full-time",
    description:
      "Build delightful, high-performing web apps using React, TypeScript, and Tailwind. Work closely with our design team to craft smooth user experiences.",
  },
  {
    title: "Backend Developer",
    department: "Engineering",
    location: "Remote / India",
    type: "Full-time",
    description:
      "Design and build scalable APIs and microservices. You'll work on performance, reliability, and developer-friendly APIs for our platform.",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote / Hybrid",
    type: "Contract / Full-time",
    description:
      "Shape how users experience our products through beautiful, intuitive design and creative problem-solving.",
  },
];

const CareerPage = () => {
  // Function to open email app
  const handleEmailClick = (subject = "Career Opportunity", body = "") => {
    const email = "ms@aashindia.com";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Join Our Growing Team
          </motion.h1>
          <motion.p
            className="text-base text-muted-foreground max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            We’re on a mission to build products that empower businesses and individuals worldwide.  
            If you love solving real problems and creating impact — we’d love to have you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
        
          </motion.div>
        </div>
      </section>

      {/* WHY JOIN SECTION */}
      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">Why Join Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 shadow-soft hover:shadow-glow transition-all">
              <CardContent className="flex flex-col items-center text-center">
                <Rocket className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-1">High-Growth Startup</h3>
                <p className="text-muted-foreground text-sm">
                  Be part of an ambitious journey — your work will have visible impact and recognition.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-soft hover:shadow-glow transition-all">
              <CardContent className="flex flex-col items-center text-center">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-1">Collaborative Culture</h3>
                <p className="text-muted-foreground text-sm">
                  Work alongside passionate teammates who care about innovation and learning.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-soft hover:shadow-glow transition-all">
              <CardContent className="flex flex-col items-center text-center">
                <Building2 className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-1">Work From Anywhere</h3>
                <p className="text-muted-foreground text-sm">
                  We’re remote-friendly! Work flexibly from where you’re most productive.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* JOB OPENINGS SECTION */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Open Positions</h2>

          <div className="space-y-6 max-w-3xl mx-auto">
            {jobOpenings.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 border-border hover:border-primary transition-all duration-300 shadow-soft hover:shadow-glow">
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {job.department} • {job.location} • {job.type}
                        </p>
                      </div>
                      <Button
                        variant="default"
                        className="rounded-full"
                        onClick={() =>
                          handleEmailClick(
                            `Application for ${job.title}`,
                            `Hi Team,\n\nI’m interested in applying for the ${job.title} position.\nPlease find my details below:\n\n- Name:\n- Contact:\n- Portfolio/Resume link:\n\nBest regards,\n`
                          )
                        }
                      >
                        <Briefcase className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">{job.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-transparent text-center">
        <h2 className="text-3xl font-bold mb-4">Didn’t find your role?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm">
          We’re always looking for passionate people. Send us your CV and tell us how you can make a difference.
        </p>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full"
          onClick={() =>
            handleEmailClick(
              "General Application",
              "Hi Team,\n\nI'm interested in exploring opportunities at your company. Please find my resume attached.\n\nBest regards,\n"
            )
          }
        >
          Send Your Resume
        </Button>
      </section>
    </div>
  );
};

export default CareerPage;
