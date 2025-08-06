import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Newspaper, Tag, TrendingUp, Bell, Eye, Heart, Share2, MessageCircle, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const TinTucSection = () => {
  const news = [
    {
      id: 1,
      title: "Khai trương tuyến taxi TP.HCM - Phú Quốc với dịch vụ cao cấp",
      excerpt: "Vân Đăm Tour chính thức khai trương tuyến đường mới phục vụ khách du lịch đến đảo ngọc Phú Quốc. Tuyến đường này được đầu tư với xe limousine cao cấp, WiFi miễn phí và nhiều tiện ích hiện đại...",
      date: "15/12/2024",
      author: "Nguyễn Văn Admin",
      image: "/placeholder.svg",
      category: "Tin mới",
      views: 1250,
      likes: 89,
      comments: 23,
      featured: true,
      readTime: "3 phút"
    },
    {
      id: 2, 
      title: "Ưu đãi cuối năm - Giảm 30% tất cả dịch vụ taxi đường dài",
      excerpt: "Nhân dịp cuối năm 2024, Vân Đăm Tour dành tặng khách hàng chương trình ưu đãi đặc biệt với mức giảm giá lên đến 30% cho tất cả các tuyến đường dài...",
      date: "10/12/2024",
      author: "Phòng Marketing",
      image: "/placeholder.svg",
      category: "Khuyến mãi",
      views: 892,
      likes: 156,
      comments: 45,
      featured: false,
      readTime: "2 phút"
    },
    {
      id: 3,
      title: "Hướng dẫn đặt xe online qua ứng dụng di động mới",
      excerpt: "Cách đặt xe taxi nhanh chóng và tiện lợi thông qua ứng dụng di động mới của Vân Đăm Tour với giao diện thân thiện và nhiều tính năng thông minh...",
      date: "05/12/2024", 
      author: "Đội ngũ Hỗ trợ",
      image: "/placeholder.svg",
      category: "Hướng dẫn",
      views: 567,
      likes: 78,
      comments: 12,
      featured: false,
      readTime: "4 phút"
    },
    {
      id: 4,
      title: "Cam kết chất lượng dịch vụ 2025 - Đầu tư 50 xe mới",
      excerpt: "Vân Đăm Tour cam kết nâng cao chất lượng dịch vụ trong năm 2025 với kế hoạch đầu tư 50 xe mới, đào tạo lái xe chuyên nghiệp và nâng cấp hệ thống...",
      date: "01/12/2024",
      author: "Ban Giám Đốc", 
      image: "/placeholder.svg",
      category: "Thông báo",
      views: 2100,
      likes: 234,
      comments: 67,
      featured: false,
      readTime: "5 phút"
    }
  ];

  const categories = [
    { name: "Tất cả", count: 42, active: true },
    { name: "Tin mới", count: 12, active: false },
    { name: "Khuyến mãi", count: 8, active: false },
    { name: "Hướng dẫn", count: 15, active: false },
    { name: "Thông báo", count: 7, active: false }
  ];

  const stats = [
    { label: "Bài viết", value: "150+", icon: Newspaper },
    { label: "Lượt xem", value: "25K+", icon: Eye },
    { label: "Khách hàng", value: "5K+", icon: User }
  ];

  return (
    <section id="tintuc" className="py-20 bg-gradient-to-br from-secondary/30 via-background to-secondary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Newspaper className="w-4 h-4" />
            Cập nhật liên tục
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
            TIN TỨC & KHUYẾN MÃI
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cập nhật những thông tin mới nhất về dịch vụ, chương trình khuyến mãi hấp dẫn 
            và các tin tức hữu ích từ Vân Đăm Tour
          </p>
        </div>


        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <Button
              key={category.name}
              variant={category.active ? "default" : "outline"}
              size="sm"
              className={`rounded-full transition-all duration-300 ${
                category.active 
                  ? "bg-gradient-primary text-white shadow-medium hover:shadow-strong" 
                  : "border-primary/20 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Tag className="w-3 h-3 mr-1" />
              {category.name}
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {category.count}
              </span>
            </Button>
          ))}
        </div>

        {/* Featured News Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <Link to={`/news/${news[0].id}`}>
              <Card className="group overflow-hidden border-0 bg-white/90 backdrop-blur-sm shadow-medium hover:shadow-strong transition-all duration-500 cursor-pointer">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-500">🚗</div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full">
                        <Star className="w-3 h-3 inline mr-1" />
                        Nổi bật
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {news[0].readTime}
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-primary to-primary-hover text-white text-xs font-medium rounded-full">
                        {news[0].category}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {news[0].date}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                      {news[0].title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                      {news[0].excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="w-4 h-4 mr-1" />
                          {news[0].author}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {news[0].views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {news[0].likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {news[0].comments}
                          </span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-primary hover:text-white hover:bg-gradient-primary group/btn">
                        Đọc thêm 
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>

          {/* Side Articles */}
          <div className="space-y-6">
            {news.slice(1, 4).map((article, index) => (
              <Link key={article.id} to={`/news/${article.id}`}>
                <Card className="group border-0 bg-white/80 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {article.readTime}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {article.likes}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>


        {/* Call to Action */}
        <div className="text-center">
          <Link to="/news">
            <Button 
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-gradient-primary hover:text-white hover:border-transparent shadow-medium hover:shadow-strong transition-all duration-300 px-8 py-3 rounded-xl group"
            >
              <TrendingUp className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Xem tất cả tin tức
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TinTucSection;