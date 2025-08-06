import { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import { Button } from "@/components/ui/button";
import { Play, Star, Users, MapPin } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  const [currentStats, setCurrentStats] = useState({
    cars: 200,
    customers: 9000,
    locations: 200
  });

  useEffect(() => {
    // Animate statistics numbers
    const animateStats = () => {
      const targetStats = { cars: 200, customers: 9000, locations: 200 };
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCurrentStats({
          cars: Math.floor(targetStats.cars * progress),
          customers: Math.floor(targetStats.customers * progress),
          locations: Math.floor(targetStats.locations * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setCurrentStats(targetStats);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToServices = () => {
    document.getElementById('dichvu')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white space-y-6 animate-fade-in">
            <div className="space-y-2">
              <p className="text-lg font-medium text-green-300">
                TAXI - DU LỊCH TP. HCM
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                DU LỊCH - XE ĐƯA ĐÓN
              </h1>
            </div>

            <p className="text-xl text-gray-200 max-w-lg">
              Dịch vụ taxi hàng đầu Việt Nam với chất lượng 5 sao. 
              Chất lượng - Thương hiệu dựng nên từ sự hài lòng của khách hàng. 
              hoạt động 24/7. Mọi nơi - Có mặt khắp nơi.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {currentStats.cars}+
                </div>
                <p className="text-sm text-gray-300">Xe phục vụ</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {currentStats.customers.toLocaleString()}+
                </div>
                <p className="text-sm text-gray-300">Khách hàng</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {currentStats.locations}+
                </div>
                <p className="text-sm text-gray-300">Điểm đón</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToServices}
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 px-8 py-6 text-lg"
                variant="outline"
              >
                <Play className="w-5 h-5 mr-2" />
                XEM CHI TIẾT
              </Button>
              
              <Button 
                size="lg"
                className="bg-gradient-primary hover:bg-primary-hover px-8 py-6 text-lg shadow-strong"
                onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                ĐặT XE NGAY
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white font-medium">5.0 đánh giá</span>
              </div>
              
              <div className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5" />
                <span>1000+ khách hàng hài lòng</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div id="booking-form" className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <BookingForm />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;