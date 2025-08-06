import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Eye, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContentManagement = () => {
  const navigate = useNavigate();

  const contentSections = [
    {
      id: "header",
      title: "Header & Navigation",
      description: "Logo, menu điều hướng và thông tin liên hệ",
      status: "Đã xuất bản",
      lastUpdated: "Hôm nay",
      url: "/admin/content/header"
    },
    {
      id: "services",
      title: "Dịch vụ",
      description: "Quản lý 4 dịch vụ chính: Taxi giá rẻ, đường dài, hợp đồng, sân bay",
      status: "Đã xuất bản",
      lastUpdated: "1 ngày trước",
      url: "/admin/content/services"
    },
    {
      id: "pricing",
      title: "Bảng giá",
      description: "Quản lý bảng giá xe 4 chỗ và 7 chỗ theo quãng đường",
      status: "Đã xuất bản",
      lastUpdated: "3 ngày trước",
      url: "/admin/content/pricing"
    },
    {
      id: "taxi-duong-dai",
      title: "Taxi Đường Dài",
      description: "Quản lý tuyến đường phổ biến, ưu đãi và quyền lợi khách hàng",
      status: "Đã xuất bản",
      lastUpdated: "1 tuần trước",
      url: "/admin/content/taxi-duong-dai"
    },
    {
      id: "news",
      title: "Tin tức & Khuyến mãi",
      description: "Quản lý tin tức nổi bật, khuyến mãi và bài viết blog",
      status: "Đã xuất bản",
      lastUpdated: "4 ngày trước",
      url: "/admin/content/news"
    },
    {
      id: "booking-form",
      title: "Form đặt xe",
      description: "Quản lý các tùy chọn xe trong form đặt xe",
      status: "Đã xuất bản",
      lastUpdated: "Hôm nay",
      url: "/admin/content/booking-form"
    },
    {
      id: "footer",
      title: "Footer",
      description: "Thông tin liên hệ, bản quyền và liên kết mạng xã hội",
      status: "Đã xuất bản",
      lastUpdated: "Hôm nay",
      url: "/admin/content/footer"
    },
    {
      id: "floating-contacts",
      title: "Liên hệ nổi",
      description: "Hotline và Zalo nổi bên phải màn hình",
      status: "Đã xuất bản", 
      lastUpdated: "Hôm nay",
      url: "/admin/content/floating-contacts"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Đã xuất bản": return "bg-green-100 text-green-800";
      case "Bản nháp": return "bg-yellow-100 text-yellow-800";
      case "Đang xem xét": return "bg-blue-100 text-blue-800";
      case "Chưa có quản lý": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quản lý nội dung</h1>
        <p className="text-muted-foreground">Chỉnh sửa nội dung các phần trên website</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="categories">Danh mục</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {contentSections.map((section) => (
              <Card key={section.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(section.status)}>
                      {section.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Cập nhật: {section.lastUpdated}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/")}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Xem
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => navigate(section.url)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Chỉnh sửa
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Danh mục động</CardTitle>
              <CardDescription>
                Quản lý các danh mục có thể tùy chỉnh trên website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Loại dịch vụ</div>
                    <div className="text-sm text-muted-foreground">4 danh mục</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-1" />
                    Quản lý
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Loại xe</div>
                    <div className="text-sm text-muted-foreground">2 danh mục</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-1" />
                    Quản lý
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Danh mục tin tức</div>
                    <div className="text-sm text-muted-foreground">5 danh mục</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-1" />
                    Quản lý
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt nội dung</CardTitle>
              <CardDescription>
                Cấu hình chung cho việc quản lý nội dung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  Các tùy chọn cài đặt sẽ được thêm vào sau
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;