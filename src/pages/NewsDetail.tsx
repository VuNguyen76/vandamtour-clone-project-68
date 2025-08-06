import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, User, ArrowLeft, Eye, Heart, MessageCircle, Clock, 
  Share2, Bookmark, ThumbsUp, ChevronLeft, ChevronRight, Tag 
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContacts from "@/components/FloatingContacts";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const NewsDetail = () => {
  const { id } = useParams();

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // In a real app, this would be fetched based on the ID
  const article = {
    id: 1,
    title: "Khai trương tuyến taxi TP.HCM - Phú Quốc với dịch vụ cao cấp",
    excerpt: "Vân Đăm Tour chính thức khai trương tuyến đường mới phục vụ khách du lịch đến đảo ngọc Phú Quốc.",
    content: `
      <p>Ngày 15/12/2024, Vân Đăm Tour đã chính thức khai trương tuyến đường mới từ TP.HCM đến Phú Quốc, mang đến cho khách hàng trải nghiệm di chuyển cao cấp và tiện nghi nhất.</p>
      
      <h3>Dịch vụ cao cấp với tiêu chuẩn quốc tế</h3>
      <p>Tuyến đường mới này được đầu tư với đội xe limousine hạng sang, trang bị đầy đủ các tiện nghi hiện đại như:</p>
      <ul>
        <li>Ghế massage cao cấp với chức năng điều chỉnh điện</li>
        <li>Hệ thống giải trí với màn hình LCD cá nhân</li>
        <li>WiFi miễn phí tốc độ cao trong suốt hành trình</li>
        <li>Điều hòa độc lập cho từng khu vực</li>
        <li>Minibar với đồ uống miễn phí</li>
      </ul>
      
      <h3>Lộ trình tối ưu và thời gian di chuyển</h3>
      <p>Với kinh nghiệm hơn 15 năm trong lĩnh vực vận chuyển, Vân Đăm Tour đã nghiên cứu và xây dựng lộ trình tối ưu nhất cho tuyến TP.HCM - Phú Quốc:</p>
      <ul>
        <li>Thời gian di chuyển: 4-5 giờ (tùy điều kiện giao thông)</li>
        <li>Điểm dừng chân nghỉ tại các trạm dịch vụ cao cấp</li>
        <li>Tài xế chuyên nghiệp, giàu kinh nghiệm đường dài</li>
      </ul>
      
      <h3>Chương trình khuyến mãi đặc biệt</h3>
      <p>Nhân dịp khai trương, Vân Đăm Tour áp dụng chương trình ưu đãi hấp dẫn:</p>
      <ul>
        <li>Giảm 20% cho 100 khách hàng đầu tiên</li>
        <li>Tặng kèm voucher ăn uống tại điểm đến</li>
        <li>Miễn phí đón tận nhà trong nội thành TP.HCM</li>
      </ul>
      
      <p>Để đặt xe hoặc tìm hiểu thêm thông tin, quý khách vui lòng liên hệ hotline: <strong>0823141862</strong> hoặc đặt xe trực tuyến qua website.</p>
    `,
    date: "15/12/2024",
    author: "Nguyễn Văn Admin",
    category: "Tin mới",
    views: 1250,
    likes: 89,
    comments: 23,
    readTime: "3 phút",
    image: "/placeholder.svg",
    tags: ["taxi cao cấp", "phú quốc", "limousine", "khai trương"]
  };

  const relatedArticles = [
    {
      id: 2,
      title: "Ưu đãi cuối năm - Giảm 30% tất cả dịch vụ taxi đường dài",
      excerpt: "Nhân dịp cuối năm 2024, Vân Đăm Tour dành tặng khách hàng chương trình ưu đãi đặc biệt...",
      date: "10/12/2024",
      category: "Khuyến mãi",
      readTime: "2 phút"
    },
    {
      id: 3,
      title: "Hướng dẫn đặt xe online qua ứng dụng di động mới",
      excerpt: "Cách đặt xe taxi nhanh chóng và tiện lợi thông qua ứng dụng di động mới...",
      date: "05/12/2024",
      category: "Hướng dẫn",
      readTime: "4 phút"
    },
    {
      id: 5,
      title: "Mở rộng dịch vụ taxi sân bay Tân Sơn Nhất 24/7",
      excerpt: "Để đáp ứng nhu cầu ngày càng tăng của khách hàng, Vân Đăm Tour chính thức mở rộng...",
      date: "28/11/2024",
      category: "Tin mới",
      readTime: "3 phút"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-secondary/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/news" className="hover:text-primary">Tin tức</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Chi tiết</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <Link to="/news">
              <Button variant="ghost" className="mb-6 text-primary hover:bg-primary/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại danh sách
              </Button>
            </Link>

            {/* Article Header */}
            <Card className="border-0 shadow-medium mb-8">
              <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                <div className="text-8xl">🚗</div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-primary to-primary-hover text-white">
                    {article.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {article.readTime}
                </div>
              </div>
              
              <CardContent className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {article.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {article.comments}
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    <Heart className="w-4 h-4 mr-2" />
                    Thích ({article.likes})
                  </Button>
                  <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                    <Share2 className="w-4 h-4 mr-2" />
                    Chia sẻ
                  </Button>
                  <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Lưu bài
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Article Content */}
            <Card className="border-0 shadow-medium mb-8">
              <CardContent className="p-8">
                <div 
                  className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                
                {/* Tags */}
                <div className="mt-8 pt-8 border-t">
                  <h4 className="font-semibold text-foreground mb-3">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="border-0 shadow-medium">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Bình luận ({article.comments})
                </h3>
                
                {/* Comment Form */}
                <div className="mb-8 p-6 bg-secondary/20 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-4">Để lại bình luận của bạn</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Họ và tên"
                        className="px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      />
                    </div>
                    <textarea
                      placeholder="Nội dung bình luận..."
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-white resize-none"
                    />
                    <Button className="bg-gradient-primary hover:bg-primary-hover">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Gửi bình luận
                    </Button>
                  </div>
                </div>
                
                {/* Comments List */}
                <div className="space-y-6">
                  {[
                    {
                      id: 1,
                      name: "Nguyễn Văn A",
                      time: "2 giờ trước",
                      content: "Dịch vụ rất tốt, xe sạch sẽ và tài xế lịch sự. Tôi sẽ sử dụng dịch vụ này thường xuyên.",
                      likes: 5,
                      avatar: "👤"
                    },
                    {
                      id: 2,
                      name: "Trần Thị B",
                      time: "1 ngày trước",
                      content: "Giá cả hợp lý, đặt xe online rất tiện lợi. Tài xế đến đúng giờ và lái xe an toàn.",
                      likes: 3,
                      avatar: "👩"
                    },
                    {
                      id: 3,
                      name: "Lê Minh C",
                      time: "2 ngày trước",
                      content: "Tuyến đường mới này rất thuận tiện cho việc đi du lịch. Xe limousine cao cấp, đáng đồng tiền bát gạo.",
                      likes: 8,
                      avatar: "👨"
                    }
                  ].map((comment) => (
                    <div key={comment.id} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                          <span className="text-sm">{comment.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-foreground">{comment.name}</span>
                            <span className="text-xs text-muted-foreground">{comment.time}</span>
                          </div>
                          <p className="text-muted-foreground mb-3 leading-relaxed">
                            {comment.content}
                          </p>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              Hữu ích ({comment.likes})
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                              Trả lời
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Articles */}
            <Card className="border-0 shadow-medium mb-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Bài viết liên quan</h3>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <Link key={related.id} to={`/news/${related.id}`}>
                      <div className="group border-b border-border pb-4 last:border-b-0 hover:bg-secondary/30 p-2 rounded transition-colors">
                        <Badge variant="secondary" className="text-xs mb-2">{related.category}</Badge>
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {related.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {related.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{related.date}</span>
                          <span>{related.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="border-0 shadow-medium bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold text-foreground mb-3">Đăng ký nhận tin</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Nhận thông báo về các tin tức mới nhất từ Vân Đăm Tour
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Email của bạn"
                    className="w-full px-3 py-2 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <Button className="w-full bg-gradient-primary hover:bg-primary-hover text-sm">
                    Đăng ký ngay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingContacts />
    </div>
  );
};

export default NewsDetail;