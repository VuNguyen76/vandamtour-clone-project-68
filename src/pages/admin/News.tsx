import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Eye, Calendar } from "lucide-react";
import { toast } from "sonner";

const mockNews = [
  {
    id: 1,
    title: "Khai trương dịch vụ taxi đường dài mới",
    excerpt: "Chúng tôi vui mừng thông báo khai trương tuyến taxi đường dài mới từ Hà Nội đi các tỉnh miền Bắc...",
    content: "Nội dung chi tiết bài viết...",
    author: "Nguyễn Văn Admin",
    publishDate: "2024-12-15",
    status: "published",
    category: "Tin công ty",
    views: 156,
    featured: true
  },
  {
    id: 2,
    title: "Chương trình khuyến mãi tháng 12",
    excerpt: "Nhân dịp cuối năm, Vân Đăm Tour triển khai chương trình khuyến mãi hấp dẫn...",
    content: "Nội dung chi tiết bài viết...",
    author: "Nguyễn Văn Admin", 
    publishDate: "2024-12-10",
    status: "published",
    category: "Khuyến mãi",
    views: 89,
    featured: false
  },
  {
    id: 3,
    title: "Hướng dẫn đặt xe online",
    excerpt: "Hướng dẫn chi tiết cách đặt xe taxi online qua website và ứng dụng di động...",
    content: "Nội dung chi tiết bài viết...",
    author: "Nguyễn Văn Admin",
    publishDate: "2024-12-08",
    status: "draft",
    category: "Hướng dẫn",
    views: 45,
    featured: false
  }
];

const News = () => {
  const [news, setNews] = useState(mockNews);
  const [filter, setFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<typeof mockNews[0] | null>(null);
  const [newNews, setNewNews] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "Nguyễn Văn Admin",
    category: "Tin công ty",
    status: "draft" as const,
    featured: false
  });

  const filteredNews = news.filter(item => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const categories = ["Tin công ty", "Khuyến mãi", "Hướng dẫn", "Sự kiện", "Thông báo"];

  const handleCreate = () => {
    const newId = Math.max(...news.map(n => n.id)) + 1;
    const today = new Date().toISOString().split('T')[0];
    setNews([...news, { 
      ...newNews, 
      id: newId,
      publishDate: today,
      views: 0
    }]);
    setNewNews({
      title: "",
      excerpt: "",
      content: "",
      author: "Nguyễn Văn Admin",
      category: "Tin công ty",
      status: "draft",
      featured: false
    });
    setIsCreateDialogOpen(false);
    toast.success("Đã tạo bài viết mới");
  };

  const handleEdit = (item: typeof mockNews[0]) => {
    setEditingNews({...item});
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingNews) return;
    setNews(news.map(n => 
      n.id === editingNews.id ? editingNews : n
    ));
    setIsEditDialogOpen(false);
    setEditingNews(null);
    toast.success("Đã cập nhật bài viết");
  };

  const handleDelete = (id: number) => {
    setNews(news.filter(n => n.id !== id));
    toast.success("Đã xóa bài viết");
  };

  const handleToggleStatus = (id: number) => {
    setNews(news.map(n => 
      n.id === id ? { 
        ...n, 
        status: n.status === 'published' ? 'draft' : 'published' 
      } : n
    ));
    toast.success("Đã cập nhật trạng thái");
  };

  const handleToggleFeatured = (id: number) => {
    setNews(news.map(n => 
      n.id === id ? { ...n, featured: !n.featured } : n
    ));
    toast.success("Đã cập nhật tin nổi bật");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Tin tức</h1>
          <p className="text-muted-foreground">Quản lý bài viết và tin tức công ty</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Viết bài mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Tạo bài viết mới</DialogTitle>
              <DialogDescription>
                Viết bài viết tin tức cho website
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề</Label>
                <Input
                  id="title"
                  value={newNews.title}
                  onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Tóm tắt</Label>
                <Textarea
                  id="excerpt"
                  value={newNews.excerpt}
                  onChange={(e) => setNewNews({...newNews, excerpt: e.target.value})}
                  placeholder="Tóm tắt ngắn gọn về bài viết"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Nội dung</Label>
                <Textarea
                  id="content"
                  value={newNews.content}
                  onChange={(e) => setNewNews({...newNews, content: e.target.value})}
                  placeholder="Nội dung chi tiết bài viết"
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Select value={newNews.category} onValueChange={(value) => setNewNews({...newNews, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select value={newNews.status} onValueChange={(value) => setNewNews({...newNews, status: value as typeof newNews.status})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Bản nháp</SelectItem>
                      <SelectItem value="published">Xuất bản</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={newNews.featured}
                  onCheckedChange={(checked) => setNewNews({...newNews, featured: checked})}
                />
                <Label htmlFor="featured">Tin nổi bật</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleCreate}>
                Tạo bài viết
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2">
        <Button 
          variant={filter === "all" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("all")}
        >
          Tất cả ({news.length})
        </Button>
        <Button 
          variant={filter === "published" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("published")}
        >
          Đã xuất bản ({news.filter(n => n.status === 'published').length})
        </Button>
        <Button 
          variant={filter === "draft" ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter("draft")}
        >
          Bản nháp ({news.filter(n => n.status === 'draft').length})
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredNews.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    {item.featured && (
                      <Badge variant="default" className="bg-yellow-500">
                        Nổi bật
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {item.publishDate}
                    </span>
                    <span>{item.author}</span>
                    <Badge variant="outline">{item.category}</Badge>
                    <Badge 
                      variant={item.status === 'published' ? 'default' : 'secondary'}
                    >
                      {item.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    {item.views}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleToggleStatus(item.id)}
                  >
                    {item.status === 'published' ? 'Ẩn' : 'Xuất bản'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleToggleFeatured(item.id)}
                  >
                    {item.featured ? 'Bỏ nổi bật' : 'Nổi bật'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <CardDescription className="line-clamp-2">
                {item.excerpt}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin bài viết tin tức
            </DialogDescription>
          </DialogHeader>
          {editingNews && (
            <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Tiêu đề</Label>
                <Input
                  id="edit-title"
                  value={editingNews.title}
                  onChange={(e) => setEditingNews({...editingNews, title: e.target.value})}
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-excerpt">Tóm tắt</Label>
                <Textarea
                  id="edit-excerpt"
                  value={editingNews.excerpt}
                  onChange={(e) => setEditingNews({...editingNews, excerpt: e.target.value})}
                  placeholder="Tóm tắt ngắn gọn về bài viết"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">Nội dung</Label>
                <Textarea
                  id="edit-content"
                  value={editingNews.content}
                  onChange={(e) => setEditingNews({...editingNews, content: e.target.value})}
                  placeholder="Nội dung chi tiết bài viết"
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Danh mục</Label>
                  <Select value={editingNews.category} onValueChange={(value) => setEditingNews({...editingNews, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Trạng thái</Label>
                  <Select value={editingNews.status} onValueChange={(value) => setEditingNews({...editingNews, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Bản nháp</SelectItem>
                      <SelectItem value="published">Xuất bản</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-featured"
                  checked={editingNews.featured}
                  onCheckedChange={(checked) => setEditingNews({...editingNews, featured: checked})}
                />
                <Label htmlFor="edit-featured">Tin nổi bật</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveEdit}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default News;