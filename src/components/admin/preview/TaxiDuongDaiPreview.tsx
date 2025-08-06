import { MapPin, Clock, Navigation, Star, Calendar, Users, Route, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Destination {
  name: string;
  price: string;
  duration: string;
  distance: string;
  description: string;
  popular: boolean;
}

interface Promotion {
  title: string;
  description: string;
  icon: string;
}

interface Benefit {
  text: string;
}

interface TaxiDuongDaiPreviewProps {
  config?: {
    sectionTitle: string;
    sectionDescription: string;
    badgeText: string;
    destinations: Destination[];
    promotions: Promotion[];
    benefits: Benefit[];
  };
}

const TaxiDuongDaiPreview = ({ config }: TaxiDuongDaiPreviewProps) => {
  const defaultConfig = {
    sectionTitle: "TAXI ĐƯỜNG DÀI",
    sectionDescription: "Dịch vụ taxi đường dài chuyên nghiệp với hơn 15 năm kinh nghiệm. Chúng tôi cam kết mang đến cho bạn những chuyến đi an toàn, thoải mái và đáng nhớ nhất.",
    badgeText: "Dịch vụ cao cấp",
    destinations: [
      {
        name: "TP.HCM - Vũng Tàu",
        price: "450.000đ",
        duration: "2 giờ",
        distance: "125km",
        description: "Biển đẹp, resort cao cấp",
        popular: true
      },
      {
        name: "TP.HCM - Đà Lạt",
        price: "850.000đ",
        duration: "4.5 giờ",
        distance: "300km",
        description: "Khí hậu mát mẻ, phong cảnh thơ mộng",
        popular: false
      },
      {
        name: "TP.HCM - Cần Thơ",
        price: "380.000đ",
        duration: "2.5 giờ",
        distance: "160km",
        description: "Miệt vườn sông nước, chợ nổi",
        popular: false
      },
      {
        name: "TP.HCM - Phan Thiết",
        price: "520.000đ",
        duration: "3 giờ",
        distance: "200km",
        description: "Đồi cát bay, resort nghỉ dưỡng",
        popular: true
      }
    ],
    promotions: [
      {
        title: "Đặt trước 24h",
        description: "Giảm ngay 10% + tặng nước uống miễn phí",
        icon: "Calendar"
      },
      {
        title: "Nhóm từ 4 người",
        description: "Ưu đãi 15% cho đoàn khách du lịch",
        icon: "Users"
      },
      {
        title: "Khứ hồi",
        description: "Miễn phí chờ 3 tiếng + giảm 20% lượt về",
        icon: "Route"
      }
    ],
    benefits: [
      { text: "Xe đời mới, máy lạnh mát" },
      { text: "WiFi miễn phí suốt tuyến đường" },
      { text: "Nước uống và khăn lạnh miễn phí" },
      { text: "Hỗ trợ hành lý lớn" },
      { text: "Thanh toán linh hoạt" },
      { text: "Bảo hiểm toàn diện" }
    ]
  };

  const taxiConfig = config || defaultConfig;

  const getPromotionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar':
        return <Calendar className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'Route':
        return <Route className="w-6 h-6" />;
      default:
        return <Gift className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {taxiConfig.badgeText}
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {taxiConfig.sectionTitle}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {taxiConfig.sectionDescription}
          </p>
        </div>

        {/* Popular Destinations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Tuyến đường phổ biến</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {taxiConfig.destinations.map((destination, index) => (
              <Card 
                key={index}
                className={`overflow-hidden hover:shadow-strong transition-all duration-300 group ${
                  destination.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    {destination.popular && (
                      <Badge className="bg-red-500 hover:bg-red-600 text-white">
                        <Star className="w-3 h-3 mr-1 fill-white" />
                        Phổ biến
                      </Badge>
                    )}
                  </div>
                  
                  <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {destination.name}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {destination.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{destination.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      <Navigation className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{destination.distance}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{destination.price}</span>
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      Đặt xe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Promotions */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Ưu đãi đặc biệt</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {taxiConfig.promotions.map((promotion, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-shadow duration-300 group">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary/30 group-hover:to-primary/40 transition-colors">
                    {getPromotionIcon(promotion.icon)}
                  </div>
                  
                  <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {promotion.title}
                  </h4>
                  
                  <p className="text-muted-foreground">
                    {promotion.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl p-8 shadow-medium">
          <h3 className="text-2xl font-bold text-center mb-8">Quyền lợi khách hàng</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {taxiConfig.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-foreground">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-primary hover:bg-primary-hover text-lg px-8 py-6">
            Đặt xe đường dài ngay
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TaxiDuongDaiPreview;