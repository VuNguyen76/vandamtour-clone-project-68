import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, ArrowRight, Search, Tag, Eye, Heart, MessageCircle, Clock, Star, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContacts from "@/components/FloatingContacts";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { name: "Tất cả", count: 42, active: true },
    { name: "Tin mới", count: 12, active: false },
    { name: "Khuyến mãi", count: 8, active: false },
    { name: "Hướng dẫn", count: 15, active: false },
    { name: "Thông báo", count: 7, active: false }
  ];

  const newsArticles = [
    {
      id: 1,
      title: "Khai trương tuyến taxi TP.HCM - Phú Quốc với dịch vụ cao cấp",
      excerpt: "Vân Đăm Tour chính thức khai trương tuyến đường mới phục vụ khách du lịch đến đảo ngọc Phú Quốc. Tuyến đường này được đầu tư với xe limousine cao cấp, WiFi miễn phí và nhiều tiện ích hiện đại...",
      date: "15/12/2024",
      author: "Nguyễn Văn Admin",
      category: "Tin mới",
      views: 1250,
      likes: 89,
      comments: 23,
      featured: true,
      readTime: "3 phút",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Ưu đãi cuối năm - Giảm 30% tất cả dịch vụ taxi đường dài",
      excerpt: "Nhân dịp cuối năm 2024, Vân Đăm Tour dành tặng khách hàng chương trình ưu đãi đặc biệt với mức giảm giá lên đến 30% cho tất cả các tuyến đường dài...",
      date: "10/12/2024",
      author: "Phòng Marketing",
      category: "Khuyến mãi",
      views: 892,
      likes: 156,
      comments: 45,
      featured: false,
      readTime: "2 phút",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Hướng dẫn đặt xe online qua ứng dụng di động mới",
      excerpt: "Cách đặt xe taxi nhanh chóng và tiện lợi thông qua ứng dụng di động mới của Vân Đăm Tour với giao diện thân thiện và nhiều tính năng thông minh...",
      date: "05/12/2024",
      author: "Đội ngũ Hỗ trợ",
      category: "Hướng dẫn",
      views: 567,
      likes: 78,
      comments: 12,
      featured: false,
      readTime: "4 phút",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Cam kết chất lượng dịch vụ 2025 - Đầu tư 50 xe mới",
      excerpt: "Vân Đăm Tour cam kết nâng cao chất lượng dịch vụ trong năm 2025 với kế hoạch đầu tư 50 xe mới, đào tạo lái xe chuyên nghiệp và nâng cấp hệ thống...",
      date: "01/12/2024",
      author: "Ban Giám Đốc",
      category: "Thông báo",
      views: 2100,
      likes: 234,
      comments: 67,
      featured: false,
      readTime: "5 phút",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Mở rộng dịch vụ taxi sân bay Tân Sơn Nhất 24/7",
      excerpt: "Để đáp ứng nhu cầu ngày càng tăng của khách hàng, Vân Đăm Tour chính thức mở rộng dịch vụ taxi sân bay hoạt động 24/7 với đội xe chuyên dụng...",
      date: "28/11/2024",
      author: "Phòng Vận hành",
      category: "Tin mới",
      views: 1456,
      likes: 123,
      comments: 34,
      featured: false,
      readTime: "3 phút",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Chương trình đào tạo lái xe an toàn cho tài xế",
      excerpt: "Nhằm nâng cao chất lượng dịch vụ và đảm bảo an toàn cho khách hàng, Vân Đăm Tour tổ chức chương trình đào tạo lái xe an toàn cho toàn bộ tài xế...",
      date: "25/11/2024",
      author: "Phòng Đào tạo",
      category: "Thông báo",
      views: 678,
      likes: 89,
      comments: 15,
      featured: false,
      readTime: "4 phút",
      image: "/placeholder.svg"
    }
  ];

  const filteredNews = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tất cả" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredNews = newsArticles.filter(article => article.featured);
  const regularNews = filteredNews.filter(article => !article.featured);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
              Tin tức & Khuyến mãi
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Cập nhật những thông tin mới nhất về dịch vụ, chương trình khuyến mãi hấp dẫn 
              và các tin tức hữu ích từ Vân Đăm Tour
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm tin tức..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className={`rounded-full transition-all duration-300 ${
                  selectedCategory === category.name
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
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <Star className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold text-foreground">Tin nổi bật</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((article) => (
                <Card key={article.id} className="group overflow-hidden border-0 bg-white/90 backdrop-blur-sm shadow-medium hover:shadow-strong transition-all duration-500">
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
                        {article.readTime}
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-primary to-primary-hover text-white text-xs font-medium rounded-full">
                          {article.category}
                        </span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {article.date}
                        </div>
                      </div>
                      
                      <Link to={`/news/${article.id}`}>
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors cursor-pointer leading-tight line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="w-4 h-4 mr-1" />
                            {article.author}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {article.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {article.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {article.comments}
                            </span>
                          </div>
                        </div>
                        
                        <Link to={`/news/${article.id}`}>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-white hover:bg-gradient-primary group/btn">
                            Đọc thêm 
                            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular News Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Tất cả tin tức</h2>
            <div className="text-sm text-muted-foreground">
              Hiển thị {filteredNews.length} trên {newsArticles.length} bài viết
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularNews.map((article) => (
              <Card key={article.id} className="group border-0 bg-white shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer hover:-translate-y-1">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-500">📰</div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-muted-foreground">
                    {article.readTime}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {article.date}
                    </span>
                  </div>
                  
                  <Link to={`/news/${article.id}`}>
                    <h3 className="font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-3">
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
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/50 text-primary hover:bg-gradient-primary hover:text-white hover:border-transparent shadow-medium hover:shadow-strong transition-all duration-300 px-8 py-3 rounded-xl group"
            >
              <TrendingUp className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Xem thêm tin tức
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContacts />
    </div>
  );
};

export default News;