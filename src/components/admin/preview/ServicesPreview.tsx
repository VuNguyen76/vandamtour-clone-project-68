import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[] | string;
}

interface ServicesPreviewProps {
  config?: {
    sectionTitle: string;
    sectionDescription: string;
    services: ServiceItem[];
  };
}

const ServicesPreview = ({ config }: ServicesPreviewProps) => {
  const defaultConfig = {
    sectionTitle: "DỊCH VỤ CỦA CHÚNG TÔI",
    sectionDescription: "Chúng tôi cung cấp đa dạng các dịch vụ taxi và vận chuyển chất lượng cao, đáp ứng mọi nhu cầu di chuyển của khách hàng",
    services: [
      {
        id: "taxi-gia-re",
        title: "Taxi Giá Rẻ",
        description: "Dịch vụ taxi giá rẻ, chất lượng cao trong thành phố",
        icon: "taxi-icon.png",
        features: "Giá cả hợp lý\nĐón đúng giờ\nXe sạch sẽ"
      },
      {
        id: "taxi-duong-dai",
        title: "Taxi Đường Dài",
        description: "Dịch vụ taxi đường dài an toàn, thoải mái",
        icon: "long-distance-icon.png",
        features: "Lái xe kinh nghiệm\nXe đời mới\nGiá ưu đãi"
      },
      {
        id: "taxi-hop-dong",
        title: "Taxi Hợp Đồng",
        description: "Dịch vụ taxi theo hợp đồng cho doanh nghiệp",
        icon: "contract-icon.png",
        features: "Cam kết chất lượng\nGiá ưu đãi\nDịch vụ chuyên nghiệp"
      },
      {
        id: "dua-don-san-bay",
        title: "Đưa Đón Sân Bay",
        description: "Dịch vụ đưa đón sân bay nhanh chóng, tiện lợi",
        icon: "airport-icon.png",
        features: "Đón đúng giờ bay\nTheo dõi chuyến bay\nHỗ trợ 24/7"
      }
    ]
  };

  const servicesConfig = config || defaultConfig;

  const scrollToBooking = () => {
    document.getElementById('booking-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {servicesConfig.sectionTitle}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {servicesConfig.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesConfig.services.map((service, index) => {
            const features = Array.isArray(service.features) 
              ? service.features 
              : typeof service.features === 'string' 
                ? service.features.split('\n').filter(f => f.trim()) 
                : [];

            return (
              <Card 
                key={service.id}
                className="service-card group hover:shadow-strong border-0 bg-white"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      {service.icon ? (
                      <img 
                        src={service.icon.includes('/') ? service.icon : `/src/assets/${service.icon}`} 
                        alt={service.title}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xs">
                        Icon
                      </div>
                    )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={scrollToBooking}
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Đặt xe ngay
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button 
            onClick={scrollToBooking}
            size="lg"
            className="bg-gradient-primary hover:bg-primary-hover text-lg px-8 py-6 shadow-medium hover:shadow-strong transition-all duration-300"
          >
            Xem tất cả dịch vụ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;