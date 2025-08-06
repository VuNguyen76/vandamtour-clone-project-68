import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Car, Users } from "lucide-react";

interface PricingPlan {
  id: string;
  title: string;
  icon: string;
  popular: boolean;
  prices: Array<{
    distance: string;
    price: string;
    unit: string;
  }>;
  features: string[];
}

interface PricingPreviewProps {
  config?: {
    sectionTitle: string;
    sectionDescription: string;
    plans: PricingPlan[];
    additionalInfo?: {
      title: string;
      features: string[];
    };
  };
}

const PricingPreview = ({ config }: PricingPreviewProps) => {
  const defaultConfig = {
    sectionTitle: "BẢNG GIÁ DỊCH VỤ",
    sectionDescription: "Giá cả minh bạch, cạnh tranh nhất thị trường. Không phát sinh chi phí ẩn, khách hàng hoàn toàn yên tâm.",
    plans: [
      {
        id: "4seats",
        title: "BẢNG GIÁ XE 4 CHỖ",
        icon: "car",
        popular: false,
        prices: [
          { distance: "Dưới 10km", price: "14k", unit: "/1km" },
          { distance: "Dưới 100km", price: "10k", unit: "/1km" },
          { distance: "Từ 100km trở lên", price: "9k", unit: "/1km" },
        ],
        features: [
          "Đi khứ hồi lượt về giảm đến 70% (tùy quãng đường)",
          "Phí đường bộ khách thanh toán (nếu có)",
          "Lái xe an toàn, đón đúng giờ",
          "Xe đời mới, sạch sẽ",
        ],
      },
      {
        id: "7seats",
        title: "BẢNG GIÁ XE 7 CHỖ",
        icon: "users",
        popular: true,
        prices: [
          { distance: "Dưới 10km", price: "18k", unit: "/1km" },
          { distance: "Dưới 100km", price: "15k", unit: "/1km" },
          { distance: "Từ 100km trở lên", price: "11k", unit: "/1km" },
        ],
        features: [
          "Đi khứ hồi lượt về giảm đến 70% (tùy quãng đường)",
          "Phí đường bộ khách thanh toán nếu có",
          "Phù hợp cho gia đình, nhóm bạn",
          "Xe rộng rãi, thoải mái",
        ],
      },
    ],
    additionalInfo: {
      title: "Chính sách giá ưu đãi",
      features: [
        "Giảm 70% lượt về cho khứ hồi",
        "Miễn phí chờ đợi 15 phút đầu",
        "Hỗ trợ 24/7, không ngày lễ"
      ]
    }
  };

  const pricingConfig = config || defaultConfig;

  const scrollToBooking = () => {
    document.getElementById('booking-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'car':
        return <Car className="w-6 h-6" />;
      case 'users':
        return <Users className="w-6 h-6" />;
      default:
        return <Car className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {pricingConfig.sectionTitle}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {pricingConfig.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingConfig.plans.map((plan, index) => (
            <Card 
              key={plan.id}
              className={`relative border-2 transition-all duration-300 hover:shadow-strong ${
                plan.popular 
                  ? "border-primary shadow-medium" 
                  : "border-border hover:border-primary/50"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1">
                  Phổ biến nhất
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    plan.popular ? "bg-primary text-white" : "bg-primary/10 text-primary"
                  }`}>
                    {getIcon(plan.icon)}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-primary">
                  {plan.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Pricing Table */}
                <div className="space-y-3">
                  {plan.prices.map((priceItem, priceIndex) => (
                    <div 
                      key={priceIndex}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {priceItem.distance}
                      </span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-primary">
                          {priceItem.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {priceItem.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  onClick={scrollToBooking}
                  className={`w-full py-6 text-lg transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-primary hover:bg-primary-hover shadow-medium hover:shadow-strong"
                      : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Đặt xe {plan.id === "4seats" ? "4 chỗ" : "7 chỗ"} ngay
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        {pricingConfig.additionalInfo && (
          <div className="mt-12 text-center">
            <div className="bg-primary/5 rounded-xl p-6 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-foreground mb-3">
                {pricingConfig.additionalInfo.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                {pricingConfig.additionalInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingPreview;