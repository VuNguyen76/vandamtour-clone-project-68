import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Bell, 
  Shield, 
  Palette,
  Database
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [settings, setSettings] = useState({
    // Thông tin công ty
    companyName: "Vân Đăm Tour",
    companyDescription: "Dịch vụ taxi uy tín, an toàn và chuyên nghiệp",
    address: "123 Đường ABC, Quận XYZ, Hà Nội",
    phone: "0901234567",
    email: "info@vandamtour.com",
    website: "https://vandamtour.com",
    
    // Giờ hoạt động
    operatingHours: "24/7",
    
    // Cài đặt thông báo
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    
    // Cài đặt bảo mật
    twoFactorAuth: false,
    sessionTimeout: 30,
    
    // Cài đặt giao diện
    darkMode: false,
    companyLogo: "/placeholder.svg",
    primaryColor: "#3B82F6",
    
    // Cài đặt SEO
    metaTitle: "Vân Đăm Tour - Dịch vụ taxi uy tín",
    metaDescription: "Dịch vụ taxi, đưa đón sân bay, taxi đường dài uy tín tại Hà Nội",
    keywords: "taxi, đưa đón sân bay, taxi đường dài, Hà Nội"
  });

  const handleSave = () => {
    toast.success("Đã lưu cài đặt thành công!");
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Cài đặt hệ thống</h1>
          <p className="text-muted-foreground">Quản lý cấu hình và thiết lập website</p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Lưu tất cả
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Thông tin công ty */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Thông tin công ty
            </CardTitle>
            <CardDescription>
              Cập nhật thông tin cơ bản về công ty
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Tên công ty</Label>
                <Input
                  id="companyName"
                  value={settings.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={settings.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả công ty</Label>
              <Textarea
                id="description"
                value={settings.companyDescription}
                onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Cài đặt thông báo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Cài đặt thông báo
            </CardTitle>
            <CardDescription>
              Quản lý các loại thông báo hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo email</Label>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo qua email khi có đơn đặt xe mới
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo qua tin nhắn SMS
                </p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Thông báo đẩy</Label>
                <p className="text-sm text-muted-foreground">
                  Hiển thị thông báo trên trình duyệt
                </p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleInputChange('pushNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Cài đặt bảo mật */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Bảo mật
            </CardTitle>
            <CardDescription>
              Cấu hình bảo mật cho hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Xác thực 2 lớp</Label>
                <p className="text-sm text-muted-foreground">
                  Bật xác thực 2 lớp cho tài khoản admin
                </p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleInputChange('twoFactorAuth', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Thời gian hết hạn phiên (phút)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                className="max-w-32"
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Cài đặt SEO
            </CardTitle>
            <CardDescription>
              Tối ưu hóa website cho công cụ tìm kiếm
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Tiêu đề Meta</Label>
              <Input
                id="metaTitle"
                value={settings.metaTitle}
                onChange={(e) => handleInputChange('metaTitle', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Mô tả Meta</Label>
              <Textarea
                id="metaDescription"
                value={settings.metaDescription}
                onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="keywords">Từ khóa</Label>
              <Input
                id="keywords"
                value={settings.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                placeholder="Phân cách bằng dấu phẩy"
              />
            </div>
          </CardContent>
        </Card>

        {/* Backup & Database */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Sao lưu & Cơ sở dữ liệu
            </CardTitle>
            <CardDescription>
              Quản lý sao lưu dữ liệu hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <h4 className="font-medium">Sao lưu tự động</h4>
                <p className="text-sm text-muted-foreground">
                  Sao lưu dữ liệu hàng ngày lúc 2:00 AM
                </p>
              </div>
              <Badge variant="default">Đang hoạt động</Badge>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                Tạo bản sao lưu ngay
              </Button>
              <Button variant="outline">
                Khôi phục từ sao lưu
              </Button>
              <Button variant="outline">
                Xuất dữ liệu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;