import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, RotateCcw, Phone, MessageCircle, ChevronUp, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PreviewModal from "@/components/admin/preview/PreviewModal";
import FloatingContactsPreview from "@/components/admin/preview/FloatingContactsPreview";

const FloatingContactsEdit = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  
  // Floating contacts configuration state
  const [contactsConfig, setContactsConfig] = useState({
    enabled: true,
    showAfterScroll: 100, // pixels
    phone: {
      enabled: true,
      number: "0823141862",
      showNumber: true,
      backgroundColor: "#22c55e",
      hoverColor: "#16a34a",
      animation: "pulse-scale"
    },
    zalo: {
      enabled: true,
      number: "0823141862",
      backgroundColor: "#3b82f6",
      hoverColor: "#2563eb",
      animation: "bounce-gentle",
      showNotificationDot: true
    },
    scrollToTop: {
      enabled: true,
      showAfterScroll: 500, // pixels
      backgroundColor: "#6b7280",
      hoverColor: "#4b5563"
    },
    position: {
      side: "right", // right or left
      bottomOffset: 20,
      sideOffset: 20
    },
    animations: {
      fadeIn: true,
      pulseRings: true
    }
  });

  const handleSave = () => {
    console.log("Saving floating contacts config:", contactsConfig);
    toast.success("Đã lưu cấu hình liên hệ nổi thành công!");
  };

  const handleReset = () => {
    toast.info("Đã khôi phục về cài đặt mặc định");
  };

  const updateConfig = (path: string[], value: any) => {
    const newConfig = { ...contactsConfig };
    let current = newConfig;
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    setContactsConfig(newConfig);
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
            <h1 className="text-2xl font-bold">Chỉnh sửa Liên hệ nổi</h1>
            <p className="text-muted-foreground">Quản lý hotline và Zalo nổi bên phải màn hình</p>
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
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt chung</CardTitle>
            <CardDescription>
              Bật/tắt và cấu hình hiển thị của liên hệ nổi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Kích hoạt liên hệ nổi</Label>
                <p className="text-sm text-muted-foreground">Hiển thị các nút liên hệ nổi trên website</p>
              </div>
              <Switch
                checked={contactsConfig.enabled}
                onCheckedChange={(checked) => updateConfig(["enabled"], checked)}
              />
            </div>
            
            {contactsConfig.enabled && (
              <>
                <Separator />
                <div className="grid gap-2">
                  <Label htmlFor="show-after-scroll">Hiển thị sau khi cuộn (pixels)</Label>
                  <Input
                    id="show-after-scroll"
                    type="number"
                    value={contactsConfig.showAfterScroll}
                    onChange={(e) => updateConfig(["showAfterScroll"], parseInt(e.target.value))}
                    placeholder="100"
                  />
                  <p className="text-sm text-muted-foreground">Số pixel cuộn xuống để hiển thị các nút</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Phone Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Cấu hình nút điện thoại
            </CardTitle>
            <CardDescription>
              Cài đặt nút gọi điện thoại
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Bật nút điện thoại</Label>
              <Switch
                checked={contactsConfig.phone.enabled}
                onCheckedChange={(checked) => updateConfig(["phone", "enabled"], checked)}
              />
            </div>
            
            {contactsConfig.phone.enabled && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="phone-number">Số điện thoại</Label>
                  <Input
                    id="phone-number"
                    value={contactsConfig.phone.number}
                    onChange={(e) => updateConfig(["phone", "number"], e.target.value)}
                    placeholder="0823141862"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Hiển thị số điện thoại</Label>
                    <p className="text-sm text-muted-foreground">Hiển thị số bên cạnh các nút</p>
                  </div>
                  <Switch
                    checked={contactsConfig.phone.showNumber}
                    onCheckedChange={(checked) => updateConfig(["phone", "showNumber"], checked)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone-bg">Màu nền</Label>
                    <div className="flex gap-2">
                      <Input
                        id="phone-bg"
                        type="color"
                        value={contactsConfig.phone.backgroundColor}
                        onChange={(e) => updateConfig(["phone", "backgroundColor"], e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={contactsConfig.phone.backgroundColor}
                        onChange={(e) => updateConfig(["phone", "backgroundColor"], e.target.value)}
                        placeholder="#22c55e"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone-hover">Màu hover</Label>
                    <div className="flex gap-2">
                      <Input
                        id="phone-hover"
                        type="color"
                        value={contactsConfig.phone.hoverColor}
                        onChange={(e) => updateConfig(["phone", "hoverColor"], e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={contactsConfig.phone.hoverColor}
                        onChange={(e) => updateConfig(["phone", "hoverColor"], e.target.value)}
                        placeholder="#16a34a"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Zalo Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Cấu hình nút Zalo
            </CardTitle>
            <CardDescription>
              Cài đặt nút chat Zalo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Bật nút Zalo</Label>
              <Switch
                checked={contactsConfig.zalo.enabled}
                onCheckedChange={(checked) => updateConfig(["zalo", "enabled"], checked)}
              />
            </div>
            
            {contactsConfig.zalo.enabled && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="zalo-number">Số Zalo</Label>
                  <Input
                    id="zalo-number"
                    value={contactsConfig.zalo.number}
                    onChange={(e) => updateConfig(["zalo", "number"], e.target.value)}
                    placeholder="0823141862"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Hiển thị dấu chấm thông báo</Label>
                    <p className="text-sm text-muted-foreground">Dấu chấm đỏ để thu hút chú ý</p>
                  </div>
                  <Switch
                    checked={contactsConfig.zalo.showNotificationDot}
                    onCheckedChange={(checked) => updateConfig(["zalo", "showNotificationDot"], checked)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="zalo-bg">Màu nền</Label>
                    <div className="flex gap-2">
                      <Input
                        id="zalo-bg"
                        type="color"
                        value={contactsConfig.zalo.backgroundColor}
                        onChange={(e) => updateConfig(["zalo", "backgroundColor"], e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={contactsConfig.zalo.backgroundColor}
                        onChange={(e) => updateConfig(["zalo", "backgroundColor"], e.target.value)}
                        placeholder="#3b82f6"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zalo-hover">Màu hover</Label>
                    <div className="flex gap-2">
                      <Input
                        id="zalo-hover"
                        type="color"
                        value={contactsConfig.zalo.hoverColor}
                        onChange={(e) => updateConfig(["zalo", "hoverColor"], e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={contactsConfig.zalo.hoverColor}
                        onChange={(e) => updateConfig(["zalo", "hoverColor"], e.target.value)}
                        placeholder="#2563eb"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Scroll to Top Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChevronUp className="w-5 h-5" />
              Cấu hình nút về đầu trang
            </CardTitle>
            <CardDescription>
              Cài đặt nút cuộn lên đầu trang
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Bật nút về đầu trang</Label>
              <Switch
                checked={contactsConfig.scrollToTop.enabled}
                onCheckedChange={(checked) => updateConfig(["scrollToTop", "enabled"], checked)}
              />
            </div>
            
            {contactsConfig.scrollToTop.enabled && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="scroll-after">Hiển thị sau khi cuộn (pixels)</Label>
                  <Input
                    id="scroll-after"
                    type="number"
                    value={contactsConfig.scrollToTop.showAfterScroll}
                    onChange={(e) => updateConfig(["scrollToTop", "showAfterScroll"], parseInt(e.target.value))}
                    placeholder="500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="scroll-bg">Màu nền</Label>
                    <div className="flex gap-2">
                      <Input
                        id="scroll-bg"
                        type="color"
                        value={contactsConfig.scrollToTop.backgroundColor}
                        onChange={(e) => updateConfig(["scrollToTop", "backgroundColor"], e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={contactsConfig.scrollToTop.backgroundColor}
                        onChange={(e) => updateConfig(["scrollToTop", "backgroundColor"], e.target.value)}
                        placeholder="#6b7280"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="scroll-hover">Màu hover</Label>
                    <div className="flex gap-2">
                      <Input
                        id="scroll-hover"
                        type="color"
                        value={contactsConfig.scrollToTop.hoverColor}
                        onChange={(e) => updateConfig(["scrollToTop", "hoverColor"], e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={contactsConfig.scrollToTop.hoverColor}
                        onChange={(e) => updateConfig(["scrollToTop", "hoverColor"], e.target.value)}
                        placeholder="#4b5563"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Position & Animation Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Vị trí & Hiệu ứng</CardTitle>
            <CardDescription>
              Cấu hình vị trí và hiệu ứng animation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="bottom-offset">Khoảng cách từ dưới (px)</Label>
                <Input
                  id="bottom-offset"
                  type="number"
                  value={contactsConfig.position.bottomOffset}
                  onChange={(e) => updateConfig(["position", "bottomOffset"], parseInt(e.target.value))}
                  placeholder="20"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="side-offset">Khoảng cách từ bên (px)</Label>
                <Input
                  id="side-offset"
                  type="number"
                  value={contactsConfig.position.sideOffset}
                  onChange={(e) => updateConfig(["position", "sideOffset"], parseInt(e.target.value))}
                  placeholder="20"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="side">Vị trí</Label>
                <select
                  id="side"
                  value={contactsConfig.position.side}
                  onChange={(e) => updateConfig(["position", "side"], e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="right">Bên phải</option>
                  <option value="left">Bên trái</option>
                </select>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Hiệu ứng fade in</Label>
                <p className="text-sm text-muted-foreground">Hiệu ứng xuất hiện mượt mà</p>
              </div>
              <Switch
                checked={contactsConfig.animations.fadeIn}
                onCheckedChange={(checked) => updateConfig(["animations", "fadeIn"], checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Hiệu ứng vòng tròn xung</Label>
                <p className="text-sm text-muted-foreground">Vòng tròn xung quanh các nút</p>
              </div>
              <Switch
                checked={contactsConfig.animations.pulseRings}
                onCheckedChange={(checked) => updateConfig(["animations", "pulseRings"], checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Liên hệ nổi"
      >
        <FloatingContactsPreview config={contactsConfig} />
      </PreviewModal>
    </div>
  );
};

export default FloatingContactsEdit;