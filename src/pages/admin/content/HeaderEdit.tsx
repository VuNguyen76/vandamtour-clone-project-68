import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, RotateCcw, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { updateHeader } from "@/store/contentSlice";
import PreviewModal from "@/components/admin/preview/PreviewModal";
import HeaderPreview from "@/components/admin/preview/HeaderPreview";

const HeaderEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPreview, setShowPreview] = useState(false);
  
  // Get current header config from Redux
  const currentHeaderConfig = useSelector((state: RootState) => state.content.header);
  
  // Header configuration state
  const [headerConfig, setHeaderConfig] = useState(currentHeaderConfig);

  const handleSave = () => {
    // Save to Redux store
    dispatch(updateHeader(headerConfig));
    toast.success("Đã lưu cấu hình header thành công!");
  };

  const handleReset = () => {
    // Reset to current Redux state
    setHeaderConfig(currentHeaderConfig);
    toast.info("Đã khôi phục về cài đặt hiện tại");
  };

  const updateNavItem = (index: number, field: string, value: string) => {
    const newItems = [...headerConfig.navigation.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setHeaderConfig({
      ...headerConfig,
      navigation: { ...headerConfig.navigation, items: newItems }
    });
  };

  const addNavItem = () => {
    setHeaderConfig({
      ...headerConfig,
      navigation: {
        ...headerConfig.navigation,
        items: [...headerConfig.navigation.items, { label: "Mục mới", href: "#" }]
      }
    });
  };

  const removeNavItem = (index: number) => {
    const newItems = headerConfig.navigation.items.filter((_, i) => i !== index);
    setHeaderConfig({
      ...headerConfig,
      navigation: { ...headerConfig.navigation, items: newItems }
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
            <h1 className="text-2xl font-bold">Chỉnh sửa Header</h1>
            <p className="text-muted-foreground">Quản lý logo, menu điều hướng và thông tin liên hệ</p>
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
        {/* Logo Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Logo & Thương hiệu</CardTitle>
            <CardDescription>
              Cấu hình tên thương hiệu và mô tả hiển thị bên cạnh logo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="logo-text">Tên thương hiệu</Label>
              <Input
                id="logo-text"
                value={headerConfig.logo.text}
                onChange={(e) => setHeaderConfig({
                  ...headerConfig,
                  logo: { ...headerConfig.logo, text: e.target.value }
                })}
                placeholder="Vân Đăm Tour"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="logo-desc">Mô tả thương hiệu</Label>
              <Textarea
                id="logo-desc"
                value={headerConfig.logo.description}
                onChange={(e) => setHeaderConfig({
                  ...headerConfig,
                  logo: { ...headerConfig.logo, description: e.target.value }
                })}
                placeholder="Dịch vụ taxi uy tín tại Đà Lạt"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Navigation Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Menu điều hướng</CardTitle>
            <CardDescription>
              Quản lý các mục trong menu chính
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {headerConfig.navigation.items.map((item, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1 grid gap-2">
                  <Label>Tên mục</Label>
                  <Input
                    value={item.label}
                    onChange={(e) => updateNavItem(index, "label", e.target.value)}
                    placeholder="Tên menu"
                  />
                </div>
                <div className="flex-1 grid gap-2">
                  <Label>Đường dẫn</Label>
                  <Input
                    value={item.href}
                    onChange={(e) => updateNavItem(index, "href", e.target.value)}
                    placeholder="/path hoặc #section"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeNavItem(index)}
                  disabled={headerConfig.navigation.items.length <= 1}
                >
                  Xóa
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addNavItem}>
              Thêm mục menu
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin liên hệ</CardTitle>
            <CardDescription>
              Cấu hình số điện thoại và địa chỉ hiển thị trên header
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="show-phone"
                checked={headerConfig.contact.showPhone}
                onChange={(e) => setHeaderConfig({
                  ...headerConfig,
                  contact: { ...headerConfig.contact, showPhone: e.target.checked }
                })}
                className="rounded"
              />
              <Label htmlFor="show-phone">Hiển thị số điện thoại</Label>
            </div>
            {headerConfig.contact.showPhone && (
              <div className="grid gap-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={headerConfig.contact.phone}
                  onChange={(e) => setHeaderConfig({
                    ...headerConfig,
                    contact: { ...headerConfig.contact, phone: e.target.value }
                  })}
                  placeholder="0823141862"
                />
              </div>
            )}

            <Separator />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="show-address"
                checked={headerConfig.contact.showAddress}
                onChange={(e) => setHeaderConfig({
                  ...headerConfig,
                  contact: { ...headerConfig.contact, showAddress: e.target.checked }
                })}
                className="rounded"
              />
              <Label htmlFor="show-address">Hiển thị địa chỉ</Label>
            </div>
            {headerConfig.contact.showAddress && (
              <div className="grid gap-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  value={headerConfig.contact.address}
                  onChange={(e) => setHeaderConfig({
                    ...headerConfig,
                    contact: { ...headerConfig.contact, address: e.target.value }
                  })}
                  placeholder="Đà Lạt, Lâm Đồng"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Header"
      >
        <HeaderPreview config={headerConfig} />
      </PreviewModal>
    </div>
  );
};

export default HeaderEdit;