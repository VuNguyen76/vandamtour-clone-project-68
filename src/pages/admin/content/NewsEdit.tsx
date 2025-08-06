import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Save, Plus, Edit, Trash, Newspaper, Tag, ArrowLeft, Star, Calendar, User, Eye } from "lucide-react";
import { toast } from "sonner";
import MDEditor from '@uiw/react-md-editor';
import PreviewModal from "@/components/admin/preview/PreviewModal";
import NewsPreview from "@/components/admin/preview/NewsPreview";

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

const NewsEdit = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [news, setNews] = useState<NewsArticle[]>([
    {
      id: 1,
      title: "Khai trương tuyến taxi TP.HCM - Phú Quốc với dịch vụ cao cấp",
      excerpt: "Vân Đăm Tour chính thức khai trương tuyến đường mới phục vụ khách du lịch đến đảo ngọc Phú Quốc...",
      content: "# Khai trương tuyến taxi TP.HCM - Phú Quốc\n\nVân Đăm Tour chính thức khai trương tuyến đường mới phục vụ khách du lịch đến đảo ngọc Phú Quốc với dịch vụ cao cấp, thoải mái.\n\n## Lợi ích của dịch vụ\n\n- Xe đời mới, thoải mái\n- Tài xế kinh nghiệm\n- Giá cả hợp lý\n- Hỗ trợ 24/7",
      category: "Tin mới",
      featured: true,
      status: "Đã xuất bản",
      author: "Admin",
      publishDate: "2024-08-06",
      tags: ["phú quốc", "taxi", "cao cấp"]
    },
    {
      id: 2,
      title: "Ưu đãi cuối năm - Giảm 30% tất cả dịch vụ taxi đường dài",
      excerpt: "Nhân dịp cuối năm 2024, Vân Đăm Tour dành tặng khách hàng chương trình ưu đãi đặc biệt...",
      content: "# Ưu đãi cuối năm 2024\n\nChương trình ưu đãi lớn nhất trong năm với mức giảm giá lên đến 30%.\n\n## Điều kiện áp dụng\n\n- Áp dụng cho các chuyến đi trên 100km\n- Booking trước 24h\n- Thanh toán online",
      category: "Khuyến mãi",
      featured: false,
      status: "Đã xuất bản",
      author: "Admin",
      publishDate: "2024-08-05",
      tags: ["ưu đãi", "giảm giá", "cuối năm"]
    },
    {
      id: 3,
      title: "Hướng dẫn đặt xe online qua ứng dụng di động mới",
      excerpt: "Cách đặt xe taxi nhanh chóng và tiện lợi thông qua ứng dụng di động mới...",
      content: "# Hướng dẫn đặt xe online\n\nỨng dụng di động mới của Vân Đăm Tour giúp việc đặt xe trở nên dễ dàng hơn bao giờ hết.\n\n## Các bước đặt xe\n\n1. Tải ứng dụng\n2. Đăng ký tài khoản\n3. Chọn địa điểm\n4. Xác nhận booking",
      category: "Hướng dẫn",
      featured: false,
      status: "Bản nháp",
      author: "Admin",
      publishDate: "2024-08-04",
      tags: ["hướng dẫn", "app", "booking"]
    }
  ]);

  const [categories] = useState([
    { name: "Tin mới", count: 12 },
    { name: "Khuyến mãi", count: 8 },
    { name: "Hướng dẫn", count: 15 },
    { name: "Thông báo", count: 7 }
  ]);

  // Section configuration
  const [sectionConfig, setSectionConfig] = useState({
    sectionTitle: "TIN TỨC & KHUYẾN MÃI",
    sectionDescription: "Cập nhật những thông tin mới nhất về dịch vụ, chương trình khuyến mãi hấp dẫn và các tin tức hữu ích từ Vân Đăm Tour",
    badgeText: "Cập nhật liên tục"
  });

  const [formData, setFormData] = useState<{
    title: string;
    excerpt: string;
    category: string;
    featured: boolean;
    status: "Đã xuất bản" | "Bản nháp" | "Đang xem xét";
    tags: string;
  }>({
    title: "",
    excerpt: "",
    category: "",
    featured: false,
    status: "Bản nháp",
    tags: ""
  });

  const handleSave = () => {
    toast.success("Đã lưu thay đổi thành công!");
  };

  const handleCreateArticle = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      excerpt: "",
      category: "",
      featured: false,
      status: "Bản nháp",
      tags: ""
    });
    setMarkdownContent("");
    setDialogOpen(true);
  };

  const handleEditArticle = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      featured: article.featured,
      status: article.status,
      tags: article.tags.join(", ")
    });
    setMarkdownContent(article.content);
    setDialogOpen(true);
  };

  const handleDeleteArticle = (id: number) => {
    setNews(news.filter(article => article.id !== id));
    toast.success("Đã xóa bài viết thành công!");
  };

  const handleSaveArticle = () => {
    const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag);
    
    if (editingArticle) {
      // Update existing article
      setNews(news.map(article => 
        article.id === editingArticle.id 
          ? {
              ...article,
              ...formData,
              content: markdownContent,
              tags: tagsArray,
              publishDate: new Date().toISOString().split('T')[0]
            }
          : article
      ));
      toast.success("Đã cập nhật bài viết thành công!");
    } else {
      // Create new article
      const newArticle: NewsArticle = {
        id: Math.max(...news.map(a => a.id)) + 1,
        ...formData,
        content: markdownContent,
        tags: tagsArray,
        author: "Admin",
        publishDate: new Date().toISOString().split('T')[0]
      };
      setNews([newArticle, ...news]);
      toast.success("Đã tạo bài viết mới thành công!");
    }
    
    setDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã xuất bản": return "bg-green-100 text-green-800";
      case "Bản nháp": return "bg-yellow-100 text-yellow-800";
      case "Đang xem xét": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/content")}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Quản lý Tin tức & Khuyến mãi</h1>
            <p className="text-muted-foreground">Chỉnh sửa nội dung section tin tức trên trang chủ</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="w-4 h-4 mr-2" />
            Xem trước
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Nội dung</TabsTrigger>
          <TabsTrigger value="news">Tin tức</TabsTrigger>
          <TabsTrigger value="categories">Danh mục</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Newspaper className="w-5 h-5" />
                Nội dung Section
              </CardTitle>
              <CardDescription>
                Chỉnh sửa tiêu đề và mô tả của section tin tức
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="section-title">Tiêu đề chính</Label>
                  <Input
                    id="section-title"
                    value={sectionConfig.sectionTitle}
                    onChange={(e) => setSectionConfig({...sectionConfig, sectionTitle: e.target.value})}
                    className="text-lg font-semibold"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="section-description">Mô tả</Label>
                  <Textarea
                    id="section-description"
                    value={sectionConfig.sectionDescription}
                    onChange={(e) => setSectionConfig({...sectionConfig, sectionDescription: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="badge-text">Text badge</Label>
                  <Input
                    id="badge-text"
                    value={sectionConfig.badgeText}
                    onChange={(e) => setSectionConfig({...sectionConfig, badgeText: e.target.value})}
                  />
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Quản lý tin tức</CardTitle>
                  <CardDescription>Danh sách tin tức hiển thị trên trang chủ</CardDescription>
                </div>
                <Button onClick={handleCreateArticle}>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm tin tức
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {news.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{article.title}</h4>
                        {article.featured && (
                          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Nổi bật
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant="outline">{article.category}</Badge>
                        <Badge className={getStatusColor(article.status)}>
                          {article.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          {article.author}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {article.publishDate}
                        </div>
                        {article.tags.length > 0 && (
                          <div className="flex gap-1">
                            {article.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditArticle(article)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteArticle(article.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Danh mục tin tức
                  </CardTitle>
                  <CardDescription>Quản lý các danh mục tin tức</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm danh mục
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-muted-foreground">{category.count} bài viết</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Article Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingArticle ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
            </DialogTitle>
            <DialogDescription>
              Sử dụng Markdown để định dạng nội dung bài viết
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Nhập tiêu đề bài viết..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Danh mục</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Tóm tắt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                placeholder="Nhập tóm tắt ngắn gọn..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (phân cách bằng dấu phẩy)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="vd: taxi, ưu đãi, phú quốc"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                />
                <Label>Bài viết nổi bật</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bản nháp">Bản nháp</SelectItem>
                    <SelectItem value="Đang xem xét">Đang xem xét</SelectItem>
                    <SelectItem value="Đã xuất bản">Đã xuất bản</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Nội dung (Markdown)</Label>
              <div data-color-mode="light">
                <MDEditor
                  value={markdownContent}
                  onChange={(val) => setMarkdownContent(val || "")}
                  height={400}
                  preview="edit"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveArticle}>
              {editingArticle ? "Cập nhật" : "Tạo mới"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Tin tức & Khuyến mãi"
      >
        <NewsPreview config={{...sectionConfig, articles: news}} />
      </PreviewModal>
    </div>
  );
};

export default NewsEdit;