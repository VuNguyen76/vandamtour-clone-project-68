import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Shield, Star, Car, Users, Route, CheckCircle, Sparkles, ArrowRight, Phone, Calendar } from "lucide-react";

const TaxiDuongDaiSection = () => {
  const destinations = [
    {
      name: "TP.HCM - Vũng Tàu",
      price: "450.000đ",
      duration: "2 giờ",
      distance: "125km",
      popular: true,
      description: "Biển đẹp, resort cao cấp"
    },
    {
      name: "TP.HCM - Đà Lạt", 
      price: "850.000đ",
      duration: "4.5 giờ",
      distance: "300km",
      popular: false,
      description: "Khí hậu mát mẻ, phong cảnh thơ mộng"
    },
    {
      name: "TP.HCM - Cần Thơ",
      price: "380.000đ", 
      duration: "2.5 giờ",
      distance: "160km",
      popular: false,
      description: "Miệt vườn sông nước, chợ nổi"
    },
    {
      name: "TP.HCM - Phan Thiết",
      price: "520.000đ",
      duration: "3 giờ", 
      distance: "200km",
      popular: true,
      description: "Đồi cát bay, resort nghỉ dưỡng"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "An toàn tuyệt đối",
      description: "Lái xe kinh nghiệm hơn 10 năm, xe được bảo dưỡng định kỳ theo tiêu chuẩn quốc tế",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Clock,
      title: "Đúng giờ cam kết",
      description: "Cam kết đón đúng giờ 100%, không để khách chờ đợi với hệ thống theo dõi GPS",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Star,
      title: "Dịch vụ 5 sao",
      description: "Phục vụ tận tình, chu đáo trong suốt chuyến đi với đội ngũ được đào tạo chuyên nghiệp",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: MapPin,
      title: "Nhiều tuyến đường",
      description: "Phục vụ hơn 50 tuyến đường khắp miền Nam với mạng lưới đối tác rộng khắp",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const benefits = [
    "Xe đời mới, máy lạnh mát",
    "WiFi miễn phí suốt tuyến đường", 
    "Nước uống và khăn lạnh miễn phí",
    "Hỗ trợ hành lý lớn",
    "Thanh toán linh hoạt",
    "Bảo hiểm toàn diện"
  ];

  const scrollToBooking = () => {
    const element = document.getElementById('booking-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="taxiduongdai" className="py-20 bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Car className="w-4 h-4" />
            Dịch vụ cao cấp
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
            TAXI ĐƯỜNG DÀI
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Dịch vụ taxi đường dài chuyên nghiệp với hơn 15 năm kinh nghiệm. 
            Chúng tôi cam kết mang đến cho bạn những chuyến đi an toàn, thoải mái và đáng nhớ nhất.
          </p>
        </div>


        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Popular Routes */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Route className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-foreground">Tuyến đường phổ biến</h3>
                <p className="text-muted-foreground">Những điểm đến được yêu thích nhất</p>
              </div>
            </div>
            
            <div className="grid gap-6">
              {destinations.map((dest, index) => (
                <Card key={index} className="group border border-border/50 hover:border-primary/50 hover:shadow-medium transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {dest.name}
                            </h4>
                            {dest.popular && (
                              <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full">
                                <Sparkles className="w-3 h-3 inline mr-1" />
                                Hot
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{dest.price}</div>
                            <div className="text-xs text-muted-foreground">Khứ hồi</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">{dest.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{dest.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{dest.distance}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Car className="w-4 h-4 text-primary" />
                            <span>Xe 4-7 chỗ</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-4 bg-gradient-to-b from-primary/20 to-primary/5 group-hover:from-primary group-hover:to-primary-hover transition-all duration-300"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-8 text-center">
              <Button 
                onClick={scrollToBooking}
                size="lg" 
                className="bg-gradient-primary hover:bg-primary-hover text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Phone className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Đặt xe ngay - Hotline 24/7
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Promotions & Benefits */}
          <div className="space-y-8">
            {/* Special Offers */}
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
              <CardContent className="p-8 relative">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Ưu đãi đặc biệt</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:shadow-medium transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-primary">Đặt trước 24h</h4>
                    </div>
                    <p className="text-sm text-muted-foreground ml-13">Giảm ngay 10% + tặng nước uống miễn phí</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:shadow-medium transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-primary">Nhóm từ 4 người</h4>
                    </div>
                    <p className="text-sm text-muted-foreground ml-13">Ưu đãi 15% cho đoàn khách du lịch</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:shadow-medium transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Route className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-primary">Khứ hồi</h4>
                    </div>
                    <p className="text-sm text-muted-foreground ml-13">Miễn phí chờ 3 tiếng + giảm 20% lượt về</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="border-0 bg-white/60 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  Quyền lợi khách hàng
                </h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 group">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                        <CheckCircle className="w-4 h-4 text-primary group-hover:text-white" />
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxiDuongDaiSection;