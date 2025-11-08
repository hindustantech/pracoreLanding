import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/Authdialog";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Scroll effect for background change
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

<<<<<<< HEAD
  // ✅ Filter nav items based on login status
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Our Solutions", href: "#startups" },
    ...(isLoggedIn ? [{ name: "Employee Attendance", href: "/attendance" }] : []),
    { name: "Career", href: "/Career" },
    { name: "About Us", href: "#about" },
    // { name: "Contact", href: "#contact" },
  ];

  // ✅ Handle nav click (smooth scroll or navigation)
  const handleNavClick = (href) => {
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

  // ✅ Active tab indicator
  const isActive = (href) => {
    if (href.startsWith("/") && location.pathname === href) return true;
    if (href.startsWith("#") && location.hash === href) return true;
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ✅ Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent"
          >
            Praecore
          </div>

          {/* ✅ Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`relative font-medium transition-colors pb-1 ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.name}
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
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* ✅ Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 bg-background/95 backdrop-blur-md rounded-lg mt-2 shadow-soft">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-primary font-semibold bg-accent/30"
                    : "text-foreground/80 hover:text-primary hover:bg-accent/50"
                }`}
              >
                {item.name}
              </button>
            ))}

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
    </nav>
  );
};

export default Navbar;
