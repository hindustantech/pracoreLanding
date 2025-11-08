import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import AuthDialog from "@/components/Authdialog";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
=======
>>>>>>> f3cd0b43c67dabd2babc88d89d44f0d202137e18

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
<<<<<<< HEAD
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
=======

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
>>>>>>> f3cd0b43c67dabd2babc88d89d44f0d202137e18
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

<<<<<<< HEAD
  // ✅ Filter nav items based on login status
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Our Solutions", href: "#startups" },
    // Show "Employee Attendance" only if logged in
    ...(isLoggedIn ? [{ name: "Employee Attendance", href: "/attendance" }] : []),
    { name: "Career", href: "/Career" },
    { name: "About Us", href: "#about" },
  ];

  // ✅ Handle navigation and smooth scroll
  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
      setIsOpen(false);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  // ✅ Determine active tab for underline
  const isActive = (href: string) => {
    if (href.startsWith("/") && location.pathname === href) return true;
    if (href.startsWith("#") && location.hash === href) return true;
    return false;
=======
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Our Startups", href: "#startups" },
    { name: "About Us", href: "#about" },
    { name: "Employee Login", href: "#attendance" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
>>>>>>> f3cd0b43c67dabd2babc88d89d44f0d202137e18
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
<<<<<<< HEAD
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-transparent"
=======
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
>>>>>>> f3cd0b43c67dabd2babc88d89d44f0d202137e18
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
<<<<<<< HEAD
          {/* ✅ Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
          >
            Praecore
          </div>

          {/* ✅ Desktop Menu */}
=======
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Precore
          </div>

          {/* Desktop Navigation */}
>>>>>>> f3cd0b43c67dabd2babc88d89d44f0d202137e18
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
<<<<<<< HEAD
                onClick={() => handleNavClick(item.href)}
                className={`relative font-medium transition-colors pb-1 ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.name}
                {/* 🔽 Underline animation */}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-primary transition-all duration-300 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}

            {isLoggedIn ? (
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button onClick={() => setIsDialogOpen(true)}>Login</Button>
            )}
          </div>

          {/* ✅ Mobile Menu Toggle */}
=======
                onClick={() => scrollToSection(item.href)}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
>>>>>>> f3cd0b43c67dabd2babc88d89d44f0d202137e18
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

<<<<<<< HEAD
        {/* ✅ Mobile Menu Dropdown */}
=======
        {/* Mobile Navigation */}
>>>>>>> f3cd0b43c67dabd2babc88d89d44f0d202137e18
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 bg-background/95 backdrop-blur-md rounded-lg mt-2 shadow-soft">
            {navItems.map((item) => (
              <button
                key={item.name}
<<<<<<< HEAD
                onClick={() => handleNavClick(item.href)}
                className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-primary font-semibold bg-accent/30"
                    : "text-foreground/80 hover:text-primary hover:bg-accent/50"
                }`}
=======
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-2 text-foreground/80 hover:text-primary hover:bg-accent/50 transition-colors rounded-md"
>>>>>>> f3cd0b43c67dabd2babc88d89d44f0d202137e18
              >
                {item.name}
              </button>
            ))}
<<<<<<< HEAD

            {isLoggedIn ? (
              <Button variant="outline" className="w-full mt-2" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button className="w-full mt-2" onClick={() => setIsDialogOpen(true)}>
                Login / Register
              </Button>
            )}
          </div>
        )}
      </div>

      {/* ✅ Auth Dialog */}
      <AuthDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
=======
          </div>
        )}
      </div>
>>>>>>> f3cd0b43c67dabd2babc88d89d44f0d202137e18
    </nav>
  );
};

export default Navbar;
