import { useState, useEffect } from "react";
import { Phone, MessageCircle, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingContacts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
      setShowScrollTop(scrollPosition > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePhoneCall = () => {
    window.open("tel:0823141862", "_self");
  };

  const handleZaloChat = () => {
    window.open("https://zalo.me/0823141862", "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="floating-contact">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="floating-btn bg-gray-600 hover:bg-gray-700 animate-fade-in"
          size="icon"
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
      )}

      {/* Zalo Button */}
      <Button
        onClick={handleZaloChat}
        className="floating-btn bg-blue-500 hover:bg-blue-600 relative animate-bounce-gentle"
        size="icon"
      >
        <div className="pulse-ring bg-blue-400"></div>
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
          !
        </span>
      </Button>

      {/* Phone Button */}
      <Button
        onClick={handlePhoneCall}
        className="floating-btn bg-green-500 hover:bg-green-600 relative animate-pulse-scale"
        size="icon"
      >
        <div className="pulse-ring bg-green-400"></div>
        <Phone className="w-6 h-6" />
      </Button>

      {/* Phone Number Display */}
      <div className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-bold shadow-lg animate-fade-in hidden md:block">
        0823141862
      </div>
    </div>
  );
};

export default FloatingContacts;