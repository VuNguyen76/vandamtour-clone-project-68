import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import TaxiDuongDaiSection from "@/components/TaxiDuongDaiSection";
import TinTucSection from "@/components/TinTucSection";
import Footer from "@/components/Footer";

import FloatingContacts from "@/components/FloatingContacts";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <TaxiDuongDaiSection />
      <TinTucSection />
      <Footer />
      <FloatingContacts />
    </div>
  );
};

export default Index;
