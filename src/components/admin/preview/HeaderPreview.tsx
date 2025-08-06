import { Phone, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeaderPreviewProps {
  config?: {
    logo: {
      text: string;
      description: string;
    };
    navigation: {
      items: Array<{ label: string; href: string }>;
    };
    contact: {
      phone: string;
      showPhone: boolean;
      address: string;
      showAddress: boolean;
    };
  };
}

const HeaderPreview = ({ config }: HeaderPreviewProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const defaultConfig = {
    logo: {
      text: "Vân Đăm Tour",
      description: "Dịch vụ taxi uy tín tại Đà Lạt"
    },
    navigation: {
      items: [
        { label: "Trang chủ", href: "/" },
        { label: "Dịch vụ", href: "#services" },
        { label: "Bảng giá", href: "#pricing" },
        { label: "Tin tức", href: "/news" },
        { label: "Liên hệ", href: "/contact" }
      ]
    },
    contact: {
      phone: "0823141862",
      showPhone: true,
      address: "Đà Lạt, Lâm Đồng",
      showAddress: true
    }
  };

  const headerConfig = config || defaultConfig;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-medium">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          <span>Hotline: {headerConfig.contact.phone}</span>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">VD</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground">
                  {headerConfig.logo.text}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {headerConfig.logo.description}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {headerConfig.navigation.items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium text-sm"
                >
                  {item.label}
                </a>
              ))}
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
                {headerConfig.navigation.items.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </a>
                ))}
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

export default HeaderPreview;