import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const quickLinks = [
    { name: "Trang chủ", href: "/", icon: Home },
    { name: "Giới thiệu", href: "/about", icon: MapPin },
    { name: "Tin tức", href: "/news", icon: Search },
    { name: "Liên hệ", href: "/contact", icon: Phone }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4 py-20">
        <div className="text-center max-w-2xl">
          <div className="relative mb-8">
            <div className="text-9xl md:text-[12rem] font-bold text-primary/20 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-bounce">🚗</div>
            </div>
          </div>
          
          <Card className="border-0 shadow-medium mb-8">
            <CardContent className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Oops! Trang không tìm thấy
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Có vẻ như bạn đã đi lạc đường. Trang bạn đang tìm kiếm có thể đã bị xóa, 
                đổi tên hoặc tạm thời không khả dụng.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-primary hover:bg-primary-hover">
                    <Home className="w-5 h-5 mr-2" />
                    Về trang chủ
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => window.history.back()}
                  className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Quay lại
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-medium">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Liên kết nhanh</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickLinks.map((link) => (
                  <Link key={link.name} to={link.href}>
                    <Button 
                      variant="ghost" 
                      className="w-full flex flex-col items-center gap-2 h-auto py-4 hover:bg-primary/10 hover:text-primary"
                    >
                      <link.icon className="w-6 h-6" />
                      <span className="text-sm">{link.name}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
