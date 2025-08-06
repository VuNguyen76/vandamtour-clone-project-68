import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Image, FileText, Video, Trash2, Download, Eye, X, Plus } from "lucide-react";
import { toast } from "sonner";

const mockMedia = [
  {
    id: 1,
    name: "hero-background.jpg",
    type: "image",
    size: "1.2 MB",
    uploadDate: "2024-12-15",
    category: "Hero Images",
    url: "/hero-background.jpg",
    usedIn: ["Trang chủ", "About"]
  },
  {
    id: 2,
    name: "taxi-service.jpg",
    type: "image", 
    size: "890 KB",
    uploadDate: "2024-12-14",
    category: "Services",
    url: "/taxi-service.jpg",
    usedIn: ["Dịch vụ"]
  },
  {
    id: 3,
    name: "company-intro.mp4",
    type: "video",
    size: "15.3 MB",
    uploadDate: "2024-12-13",
    category: "Videos",
    url: "/company-intro.mp4",
    usedIn: ["About"]
  },
  {
    id: 4,
    name: "price-list.pdf",
    type: "document",
    size: "245 KB",
    uploadDate: "2024-12-12",
    category: "Documents",
    url: "/price-list.pdf",
    usedIn: ["Bảng giá"]
  },
  {
    id: 5,
    name: "airport-pickup.jpg",
    type: "image",
    size: "756 KB", 
    uploadDate: "2024-12-11",
    category: "Services",
    url: "/airport-pickup.jpg",
    usedIn: []
  }
];

const Media = () => {
  const [media, setMedia] = useState(mockMedia);
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<typeof mockMedia[0] | null>(null);
  const [uploadData, setUploadData] = useState({
    name: "",
    category: "",
    description: ""
  });

  const filteredMedia = media.filter(item => {
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-8 w-8 text-blue-500" />;
      case "video": return <Video className="h-8 w-8 text-purple-500" />;
      case "document": return <FileText className="h-8 w-8 text-green-500" />;
      default: return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const typeMap = {
      image: "Hình ảnh",
      video: "Video", 
      document: "Tài liệu"
    };
    return typeMap[type as keyof typeof typeMap] || type;
  };

  const handleDelete = (id: number) => {
    setMedia(media.filter(m => m.id !== id));
    toast.success("Đã xóa file");
  };

  const handleUpload = () => {
    setShowUploadDialog(true);
  };

  const handleDownload = (item: typeof mockMedia[0]) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = item.url;
    link.download = item.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Đang tải xuống ${item.name}`);
  };

  const handlePreview = (item: typeof mockMedia[0]) => {
    setSelectedFile(item);
    setShowPreviewDialog(true);
  };

  const handleUploadSubmit = () => {
    if (!uploadData.name.trim()) {
      toast.error("Vui lòng nhập tên file");
      return;
    }
    
    // Simulate file upload
    const newFile = {
      id: media.length + 1,
      name: uploadData.name,
      type: "image", // Default type
      size: "1.5 MB",
      uploadDate: new Date().toISOString().split('T')[0],
      category: uploadData.category || "General",
      url: "/placeholder.svg",
      usedIn: []
    };
    
    setMedia([...media, newFile]);
    setUploadData({ name: "", category: "", description: "" });
    setShowUploadDialog(false);
    toast.success("Đã tải lên file thành công!");
  };

  const renderPreviewContent = (file: typeof mockMedia[0]) => {
    switch (file.type) {
      case "image":
        return (
          <div className="text-center">
            <img 
              src={file.url} 
              alt={file.name}
              className="max-w-full max-h-96 mx-auto rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
        );
      case "video":
        return (
          <div className="text-center">
            <video 
              controls 
              className="max-w-full max-h-96 mx-auto rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            >
              <source src={file.url} type="video/mp4" />
              Trình duyệt không hỗ trợ video
            </video>
          </div>
        );
      case "document":
        return (
          <div className="text-center py-8">
            <FileText className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium">{file.name}</p>
            <p className="text-muted-foreground mb-4">
              Tài liệu PDF - {file.size}
            </p>
            <Button onClick={() => handleDownload(file)}>
              <Download className="h-4 w-4 mr-2" />
              Tải xuống để xem
            </Button>
          </div>
        );
      default:
        return (
          <div className="text-center py-8">
            <FileText className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
            <p>Không thể xem trước loại file này</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Media</h1>
          <p className="text-muted-foreground">Quản lý hình ảnh, video và tài liệu</p>
        </div>
        <Button onClick={handleUpload} className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Tải lên file mới
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Tìm kiếm file..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loại file</SelectItem>
            <SelectItem value="image">Hình ảnh</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="document">Tài liệu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMedia.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                {getFileIcon(item.type)}
                <Badge variant="outline">
                  {getTypeLabel(item.type)}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-medium text-sm truncate" title={item.name}>
                  {item.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {item.category}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.size} • {item.uploadDate}
                </p>
              </div>

              {item.usedIn.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-medium">Được sử dụng trong:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.usedIn.map((usage, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {usage}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-1 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handlePreview(item)}
                >
                  <Eye className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleDownload(item)}
                >
                  <Download className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="text-center py-12">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Không tìm thấy file nào</h3>
          <p className="text-muted-foreground mb-4">
            Thử thay đổi bộ lọc hoặc tải lên file mới
          </p>
          <Button onClick={handleUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Tải lên file đầu tiên
          </Button>
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tải lên file mới</DialogTitle>
            <DialogDescription>
              Thêm file mới vào thư viện media
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Kéo và thả file vào đây hoặc click để chọn
              </p>
              <Button variant="outline" size="sm">
                Chọn file
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fileName">Tên file</Label>
              <Input
                id="fileName"
                value={uploadData.name}
                onChange={(e) => setUploadData({...uploadData, name: e.target.value})}
                placeholder="Nhập tên file..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fileCategory">Danh mục</Label>
              <Select 
                value={uploadData.category} 
                onValueChange={(value) => setUploadData({...uploadData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hero Images">Hero Images</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                  <SelectItem value="Videos">Videos</SelectItem>
                  <SelectItem value="Documents">Documents</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fileDescription">Mô tả (tùy chọn)</Label>
              <Textarea
                id="fileDescription"
                value={uploadData.description}
                onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                placeholder="Mô tả file..."
                rows={2}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowUploadDialog(false)}
              >
                Hủy
              </Button>
              <Button onClick={handleUploadSubmit}>
                Tải lên
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedFile?.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreviewDialog(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              {selectedFile?.category} • {selectedFile?.size} • {selectedFile?.uploadDate}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            {selectedFile && renderPreviewContent(selectedFile)}
          </div>
          
          {selectedFile && selectedFile.usedIn.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium mb-2">Được sử dụng trong:</p>
              <div className="flex flex-wrap gap-2">
                {selectedFile.usedIn.map((usage, idx) => (
                  <Badge key={idx} variant="secondary">
                    {usage}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              variant="outline"
              onClick={() => selectedFile && handleDownload(selectedFile)}
            >
              <Download className="h-4 w-4 mr-2" />
              Tải xuống
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                if (selectedFile) {
                  handleDelete(selectedFile.id);
                  setShowPreviewDialog(false);
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa file
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Media;