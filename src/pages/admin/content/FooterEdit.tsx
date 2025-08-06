import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, RotateCcw, Plus, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PreviewModal from "@/components/admin/preview/PreviewModal";
import FooterPreview from "@/components/admin/preview/FooterPreview";

const FooterEdit = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  
  // Footer configuration state
  const [footerConfig, setFooterConfig] = useState({
    company: {
      name: "Vân Đăm Tour",
      description: "Dịch vụ taxi uy tín và chuyên nghiệp tại Đà Lạt. Chúng tôi cam kết mang đến cho khách hàng những chuyến đi an toàn, thoải mái với giá cả hợp lý."
    },
    contact: {
      address: "Đà Lạt, Lâm Đồng",
      phone: "0823141862",
      email: "contact@vandamtour.com",
      website: "www.vandamtour.com"
    },
    services: [
      "Taxi trong thành phố",
      "Taxi đường dài",
      "Taxi hợp đồng",
      "Taxi sân bay"
    ],
    socialLinks: [
      { name: "Facebook", url: "https://facebook.com/vandamtour", icon: "facebook" },
      { name: "Zalo", url: "https://zalo.me/0823141862", icon: "zalo" },
      { name: "Phone", url: "tel:0823141862", icon: "phone" }
    ],
    copyright: "© 2024 Vân Đăm Tour. Tất cả quyền được bảo lưu.",
    additionalInfo: "Giấy phép kinh doanh vận tải số: XXXXX do Sở GTVT Lâm Đồng cấp"
  });

  const handleSave = () => {
    console.log("Saving footer config:", footerConfig);
    toast.success("Đã lưu cấu hình footer thành công!");
  };

  const handleReset = () => {
    toast.info("Đã khôi phục về cài đặt mặc định");
  };

  const addService = () => {
    setFooterConfig({
      ...footerConfig,
      services: [...footerConfig.services, "Dịch vụ mới"]
    });
  };

  const updateService = (index: number, value: string) => {
    const newServices = [...footerConfig.services];
    newServices[index] = value;
    setFooterConfig({
      ...footerConfig,
      services: newServices
    });
  };

  const removeService = (index: number) => {
    const newServices = footerConfig.services.filter((_, i) => i !== index);
    setFooterConfig({
      ...footerConfig,
      services: newServices
    });
  };

  const addSocialLink = () => {
    setFooterConfig({
      ...footerConfig,
      socialLinks: [...footerConfig.socialLinks, { name: "Mạng xã hội mới", url: "", icon: "link" }]
    });
  };

  const updateSocialLink = (index: number, field: string, value: string) => {
    const newLinks = [...footerConfig.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFooterConfig({
      ...footerConfig,
      socialLinks: newLinks
    });
  };

  const removeSocialLink = (index: number) => {
    const newLinks = footerConfig.socialLinks.filter((_, i) => i !== index);
    setFooterConfig({
      ...footerConfig,
      socialLinks: newLinks
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/content")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Chỉnh sửa Footer</h1>
            <p className="text-muted-foreground">Quản lý thông tin liên hệ, bản quyền và liên kết mạng xã hội</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="w-4 h-4 mr-2" />
            Xem trước
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Khôi phục
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin công ty</CardTitle>
            <CardDescription>
              Tên công ty và mô tả hiển thị trong footer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="company-name">Tên công ty</Label>
              <Input
                id="company-name"
                value={footerConfig.company.name}
                onChange={(e) => setFooterConfig({
                  ...footerConfig,
                  company: { ...footerConfig.company, name: e.target.value }
                })}
                placeholder="Vân Đăm Tour"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company-desc">Mô tả công ty</Label>
              <Textarea
                id="company-desc"
                value={footerConfig.company.description}
                onChange={(e) => setFooterConfig({
                  ...footerConfig,
                  company: { ...footerConfig.company, description: e.target.value }
                })}
                rows={3}
                placeholder="Mô tả về công ty và dịch vụ..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin liên hệ</CardTitle>
            <CardDescription>
              Địa chỉ, số điện thoại, email và website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Input
                id="address"
                value={footerConfig.contact.address}
                onChange={(e) => setFooterConfig({
                  ...footerConfig,
                  contact: { ...footerConfig.contact, address: e.target.value }
                })}
                placeholder="Đà Lạt, Lâm Đồng"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={footerConfig.contact.phone}
                  onChange={(e) => setFooterConfig({
                    ...footerConfig,
                    contact: { ...footerConfig.contact, phone: e.target.value }
                  })}
                  placeholder="0823141862"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={footerConfig.contact.email}
                  onChange={(e) => setFooterConfig({
                    ...footerConfig,
                    contact: { ...footerConfig.contact, email: e.target.value }
                  })}
                  placeholder="contact@vandamtour.com"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={footerConfig.contact.website}
                onChange={(e) => setFooterConfig({
                  ...footerConfig,
                  contact: { ...footerConfig.contact, website: e.target.value }
                })}
                placeholder="www.vandamtour.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Services List */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách dịch vụ</CardTitle>
            <CardDescription>
              Các dịch vụ hiển thị trong footer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {footerConfig.services.map((service, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={service}
                  onChange={(e) => updateService(index, e.target.value)}
                  placeholder="Tên dịch vụ"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeService(index)}
                  disabled={footerConfig.services.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addService}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm dịch vụ
            </Button>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle>Liên kết mạng xã hội</CardTitle>
            <CardDescription>
              Các liên kết đến mạng xã hội và kênh liên hệ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {footerConfig.socialLinks.map((link, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={link.name}
                  onChange={(e) => updateSocialLink(index, "name", e.target.value)}
                  placeholder="Tên mạng xã hội"
                  className="flex-1"
                />
                <Input
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, "url", e.target.value)}
                  placeholder="https://..."
                  className="flex-1"
                />
                <Input
                  value={link.icon}
                  onChange={(e) => updateSocialLink(index, "icon", e.target.value)}
                  placeholder="icon"
                  className="w-24"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeSocialLink(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addSocialLink}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm liên kết
            </Button>
          </CardContent>
        </Card>

        {/* Copyright & Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle>Bản quyền & Thông tin bổ sung</CardTitle>
            <CardDescription>
              Thông tin bản quyền và các thông tin pháp lý khác
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="copyright">Thông tin bản quyền</Label>
              <Input
                id="copyright"
                value={footerConfig.copyright}
                onChange={(e) => setFooterConfig({
                  ...footerConfig,
                  copyright: e.target.value
                })}
                placeholder="© 2024 Vân Đăm Tour. Tất cả quyền được bảo lưu."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="additional-info">Thông tin bổ sung</Label>
              <Textarea
                id="additional-info"
                value={footerConfig.additionalInfo}
                onChange={(e) => setFooterConfig({
                  ...footerConfig,
                  additionalInfo: e.target.value
                })}
                rows={2}
                placeholder="Giấy phép kinh doanh, thông tin pháp lý..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Footer"
      >
        <FooterPreview config={footerConfig} />
      </PreviewModal>
    </div>
  );
};

export default FooterEdit;