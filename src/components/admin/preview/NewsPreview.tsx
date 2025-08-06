import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featured: boolean;
  status: "Đã xuất bản" | "Bản nháp" | "Đang xem xét";
  author: string;
  publishDate: string;
  tags: string[];
}

interface NewsPreviewProps {
  config?: {
    sectionTitle: string;
    sectionDescription: string;
    badgeText: string;
    articles: NewsArticle[];
  };
}

const NewsPreview = ({ config }: NewsPreviewProps) => {
  const defaultConfig = {
    sectionTitle: "TIN TỨC & KHUYẾN MÃI",
    sectionDescription: "Cập nhật những thông tin mới nhất về dịch vụ, chương trình khuyến mãi hấp dẫn và các tin tức hữu ích từ Vân Đăm Tour",
    badgeText: "Cập nhật liên tục",
    articles: [
      {
        id: 1,
        title: "Khai trương tuyến taxi TP.HCM - Phú Quốc với dịch vụ cao cấp",
        excerpt: "Vân Đăm Tour chính thức khai trương tuyến đường mới phục vụ khách du lịch đến đảo ngọc Phú Quốc...",
        content: "# Khai trương tuyến taxi TP.HCM - Phú Quốc\n\nVân Đăm Tour chính thức khai trương tuyến đường mới phục vụ khách du lịch đến đảo ngọc Phú Quốc với dịch vụ cao cấp, thoải mái.",
        category: "Tin mới",
        featured: true,
        status: "Đã xuất bản" as const,
        author: "Admin",
        publishDate: "2024-08-06",
        tags: ["phú quốc", "taxi", "cao cấp"]
      },
      {
        id: 2,
        title: "Ưu đãi cuối năm - Giảm 30% tất cả dịch vụ taxi đường dài",
        excerpt: "Nhân dịp cuối năm 2024, Vân Đăm Tour dành tặng khách hàng chương trình ưu đãi đặc biệt...",
        content: "# Ưu đãi cuối năm 2024\n\nChương trình ưu đãi lớn nhất trong năm với mức giảm giá lên đến 30%.",
        category: "Khuyến mãi",
        featured: false,
        status: "Đã xuất bản" as const,
        author: "Admin",
        publishDate: "2024-08-05",
        tags: ["ưu đãi", "giảm giá", "cuối năm"]
      },
      {
        id: 3,
        title: "Hướng dẫn đặt xe online qua ứng dụng di động mới",
        excerpt: "Cách đặt xe taxi nhanh chóng và tiện lợi thông qua ứng dụng di động mới...",
        content: "# Hướng dẫn đặt xe online\n\nỨng dụng di động mới của Vân Đăm Tour giúp việc đặt xe trở nên dễ dàng hơn bao giờ hết.",
        category: "Hướng dẫn",
        featured: false,
        status: "Đã xuất bản" as const,
        author: "Admin",
        publishDate: "2024-08-04",
        tags: ["hướng dẫn", "app", "booking"]
      }
    ]
  };

  const newsConfig = config || defaultConfig;
  const publishedArticles = newsConfig.articles.filter(article => article.status === "Đã xuất bản");
  const featuredArticle = publishedArticles.find(article => article.featured);
  const regularArticles = publishedArticles.filter(article => !article.featured).slice(0, 2);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {newsConfig.badgeText}
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {newsConfig.sectionTitle}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {newsConfig.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          {featuredArticle && (
            <div className="lg:col-span-2">
              <Card className="overflow-hidden hover:shadow-strong transition-shadow duration-300 group border-0 bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center">
                    <span className="text-primary/60 text-sm">Hình ảnh bài viết</span>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white">
                    Nổi bật
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <Badge variant="outline" className="border-primary text-primary">
                      {featuredArticle.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {featuredArticle.publishDate}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      {featuredArticle.author}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {featuredArticle.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                      Đọc thêm
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Regular Articles */}
          <div className="space-y-6">
            {regularArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-medium transition-shadow duration-300 group border-0">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {article.publishDate}
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {article.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-xs px-2">
                      Xem
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-primary hover:bg-primary-hover">
            Xem tất cả tin tức
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsPreview;