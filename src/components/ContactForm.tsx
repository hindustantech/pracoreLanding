import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "All fields required",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    // ✅ Primary mailto (opens mail app)
    const mailtoLink = `mailto:ms@aashindia.com?subject=${subject}&body=${body}`;

    // ✅ Fallback Gmail compose (for mobile/browser)
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=ms@aashindia.com&su=${subject}&body=${body}`;

    // Try to open default mail app
    window.location.href = mailtoLink;

    // If mail app doesn't open, fallback to Gmail after 1.5s
    setTimeout(() => {
      window.open(gmailLink, "_blank");
    }, 1500);

    toast({
      title: "Opening mail app...",
      description: "Your mail app or Gmail will open shortly.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="bg-background">
      <div className="container mx-auto px-1 py-2 md:py-1">
        <div className="max-w-5xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-8 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
              Get In{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question or want to work together? We'd love to hear from
              you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Contact Form */}
            <div className="space-y-6 animate-fade-up">
              <Card className="p-5 shadow-soft hover:shadow-glow transition-all">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell us about your project..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="w-full"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Right: Contact Info */}
            <div className="space-y-5 animate-fade-up">
              <div className="space-y-5">
                <div className="flex gap-4 items-start p-5 bg-card rounded-xl shadow-soft hover:shadow-glow transition-all">
                  <div className="p-3 bg-gradient-primary rounded-lg flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Email Us
                    </h4>
                    <p className="text-muted-foreground">ms@aashindia.com</p>
                    {/* <p className="text-muted-foreground">support@precore.in</p> */}
                  </div>
                </div>

                <div className="flex gap-4 items-start p-5 bg-card rounded-xl shadow-soft hover:shadow-glow transition-all">
                  <div className="p-3 bg-gradient-primary rounded-lg flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Call Us
                    </h4>
                    <p className="text-muted-foreground">+91 9334196884</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mon–Fri 9AM–6PM IST
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="p-6 bg-card rounded-xl shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground">Projects Delivered</div>
                </div>
                <div className="p-6 bg-card rounded-xl shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-primary mb-2">
                    100%
                  </div>
                  <div className="text-muted-foreground">
                    Client Satisfaction
                  </div>
                </div>
                <div className="p-6 bg-card rounded-xl shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-primary mb-2">
                    24/7
                  </div>
                  <div className="text-muted-foreground">
                    Support Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
