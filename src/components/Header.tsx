import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const headerConfig = useSelector((state: RootState) => state.content.header);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = headerConfig.navigation.items;

  const handleNavClick = (item: typeof menuItems[0]) => {
    if (item.href.includes("#")) {
      // Nếu đang ở trang chủ, scroll đến section
      if (location.pathname === "/") {
        const sectionId = item.href.split("#")[1];
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      // Nếu không ở trang chủ, navigate về trang chủ với anchor
      window.location.href = item.href;
    }
  };

  return (
    <>
      {/* Top Bar */}
      {headerConfig.contact.showPhone && (
        <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-medium">
          <div className="container mx-auto px-4 flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Hotline: {headerConfig.contact.phone}</span>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-sm shadow-md" 
            : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">BC</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground">{headerConfig.logo.text}</h1>
                <p className="text-xs text-muted-foreground">{headerConfig.logo.description}</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => 
                item.href.startsWith("/") && !item.href.includes("#") ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm"
                  >
                    {item.label}
                  </button>
                )
              )}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="default"
                className="bg-gradient-primary hover:bg-primary-hover transition-all duration-300 shadow-soft"
              >
                <Phone className="w-4 h-4 mr-2" />
                Đặt xe ngay
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-sm animate-fade-in">
              <nav className="py-4 space-y-2">
                {menuItems.map((item) => 
                  item.href.startsWith("/") && !item.href.includes("#") ? (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="block px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => {
                        handleNavClick(item);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors duration-200 font-medium"
                    >
                      {item.label}
                    </button>
                  )
                )}
                <div className="px-4 pt-4">
                  <Button 
                    variant="default"
                    className="w-full bg-gradient-primary hover:bg-primary-hover transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Đặt xe ngay
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;