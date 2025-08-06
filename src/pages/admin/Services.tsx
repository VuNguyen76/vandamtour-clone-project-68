import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Car, Plane, MapPin, X } from "lucide-react";
import { toast } from "sonner";

const mockServices = [
  {
    id: 1,
    name: "Taxi trong thành phố",
    description: "Dịch vụ taxi di chuyển trong nội thành Hà Nội",
    price: "15,000 VNĐ/km",
    status: "active",
    iconType: "Car",
    features: ["Xe đời mới", "Tài xế kinh nghiệm", "24/7"]
  },
  {
    id: 2,
    name: "Đưa đón sân bay",
    description: "Dịch vụ đưa đón sân bay Nội Bài",
    price: "450,000 VNĐ",
    status: "active",
    iconType: "Plane",
    features: ["Xe VIP", "Đúng giờ", "Miễn phí chờ 30 phút"]
  },
  {
    id: 3,
    name: "Taxi đường dài",
    description: "Dịch vụ taxi liên tỉnh các tuyến phổ biến",
    price: "12,000 VNĐ/km",
    status: "inactive",
    iconType: "MapPin",
    features: ["Xe 4-7 chỗ", "An toàn", "Giá cả hợp lý"]
  }
];

const Services = () => {
  const [services, setServices] = useState(mockServices);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<typeof mockServices[0] | null>(null);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    status: "active" as const,
    iconType: "Car" as const,
    features: [""]
  });

  const iconMap = {
    Car: Car,
    Plane: Plane,
    MapPin: MapPin
  };

  const getIcon = (iconType: string) => {
    return iconMap[iconType as keyof typeof iconMap] || Car;
  };

  const handleCreate = () => {
    const newId = Math.max(...services.map(s => s.id)) + 1;
    setServices([...services, { 
      ...newService, 
      id: newId,
      features: newService.features.filter(f => f.trim() !== "")
    }]);
    setNewService({
      name: "",
      description: "",
      price: "",
      status: "active",
      iconType: "Car",
      features: [""]
    });
    setIsCreateDialogOpen(false);
    toast.success("Đã thêm dịch vụ mới");
  };

  const handleEdit = (service: typeof mockServices[0]) => {
    setEditingService({...service});
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingService) return;
    setServices(services.map(s => 
      s.id === editingService.id ? editingService : s
    ));
    setIsEditDialogOpen(false);
    setEditingService(null);
    toast.success("Đã cập nhật dịch vụ");
  };

  const handleDelete = (id: number) => {
    setServices(services.filter(s => s.id !== id));
    toast.success("Đã xóa dịch vụ");
  };

  const handleToggleStatus = (id: number) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s
    ));
    toast.success("Đã cập nhật trạng thái");
  };

  const addFeature = (isEditing = false) => {
    if (isEditing && editingService) {
      setEditingService({
        ...editingService,
        features: [...editingService.features, ""]
      });
    } else {
      setNewService({
        ...newService,
        features: [...newService.features, ""]
      });
    }
  };

  const removeFeature = (index: number, isEditing = false) => {
    if (isEditing && editingService) {
      setEditingService({
        ...editingService,
        features: editingService.features.filter((_, i) => i !== index)
      });
    } else {
      setNewService({
        ...newService,
        features: newService.features.filter((_, i) => i !== index)
      });
    }
  };

  const updateFeature = (index: number, value: string, isEditing = false) => {
    if (isEditing && editingService) {
      const updated = [...editingService.features];
      updated[index] = value;
      setEditingService({
        ...editingService,
        features: updated
      });
    } else {
      const updated = [...newService.features];
      updated[index] = value;
      setNewService({
        ...newService,
        features: updated
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Dịch vụ</h1>
          <p className="text-muted-foreground">Quản lý các dịch vụ taxi của công ty</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Thêm dịch vụ mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Thêm dịch vụ mới</DialogTitle>
              <DialogDescription>
                Tạo dịch vụ taxi mới cho công ty
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên dịch vụ</Label>
                  <Input
                    id="name"
                    value={newService.name}
                    onChange={(e) => setNewService({...newService, name: e.target.value})}
                    placeholder="VD: Taxi sân bay"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Giá</Label>
                  <Input
                    id="price"
                    value={newService.price}
                    onChange={(e) => setNewService({...newService, price: e.target.value})}
                    placeholder="VD: 15,000 VNĐ/km"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  placeholder="Mô tả chi tiết về dịch vụ"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Select value={newService.iconType} onValueChange={(value) => setNewService({...newService, iconType: value as typeof newService.iconType})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Car">Xe hơi</SelectItem>
                      <SelectItem value="Plane">Máy bay</SelectItem>
                      <SelectItem value="MapPin">Bản đồ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Trạng thái</Label>
                  <Select value={newService.status} onValueChange={(value) => setNewService({...newService, status: value as typeof newService.status})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="inactive">Tạm dừng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Tính năng</Label>
                  <Button type="button" variant="outline" size="sm" onClick={() => addFeature()}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                {newService.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Nhập tính năng"
                    />
                    {newService.features.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeFeature(index)}>
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleCreate}>
                Tạo dịch vụ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const IconComponent = getIcon(service.iconType);
          return (
            <Card key={service.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge 
                        variant={service.status === 'active' ? 'default' : 'secondary'}
                        className="mt-1"
                      >
                        {service.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription>{service.description}</CardDescription>
                
                <div className="text-lg font-semibold text-primary">
                  {service.price}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Tính năng:</p>
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(service)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Sửa
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(service.id)}
                  >
                    {service.status === 'active' ? 'Tạm dừng' : 'Kích hoạt'}
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa dịch vụ</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin dịch vụ taxi
            </DialogDescription>
          </DialogHeader>
          {editingService && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Tên dịch vụ</Label>
                  <Input
                    id="edit-name"
                    value={editingService.name}
                    onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                    placeholder="VD: Taxi sân bay"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Giá</Label>
                  <Input
                    id="edit-price"
                    value={editingService.price}
                    onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                    placeholder="VD: 15,000 VNĐ/km"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Mô tả</Label>
                <Textarea
                  id="edit-description"
                  value={editingService.description}
                  onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                  placeholder="Mô tả chi tiết về dịch vụ"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Select value={editingService.iconType} onValueChange={(value) => setEditingService({...editingService, iconType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Car">Xe hơi</SelectItem>
                      <SelectItem value="Plane">Máy bay</SelectItem>
                      <SelectItem value="MapPin">Bản đồ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Trạng thái</Label>
                  <Select value={editingService.status} onValueChange={(value) => setEditingService({...editingService, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="inactive">Tạm dừng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Tính năng</Label>
                  <Button type="button" variant="outline" size="sm" onClick={() => addFeature(true)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                {editingService.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value, true)}
                      placeholder="Nhập tính năng"
                    />
                    {editingService.features.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeFeature(index, true)}>
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
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

export default Services;