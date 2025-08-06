import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Save, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

const mockPricing = [
  {
    id: 1,
    name: "Taxi trong thành phố",
    basePrice: 15000,
    unit: "VNĐ/km",
    description: "Giá cơ bản cho taxi trong nội thành",
    active: true
  },
  {
    id: 2,
    name: "Đưa đón sân bay Nội Bài",
    basePrice: 450000,
    unit: "VNĐ/chuyến",
    description: "Giá cố định đưa đón sân bay",
    active: true
  },
  {
    id: 3,
    name: "Taxi đường dài",
    basePrice: 12000,
    unit: "VNĐ/km",
    description: "Giá taxi liên tỉnh",
    active: true
  },
  {
    id: 4,
    name: "Thuê xe theo giờ",
    basePrice: 200000,
    unit: "VNĐ/giờ",
    description: "Dịch vụ thuê xe theo giờ",
    active: false
  }
];

const Pricing = () => {
  const [pricing, setPricing] = useState(mockPricing);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: "", basePrice: 0, unit: "", description: "" });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newPricing, setNewPricing] = useState({
    name: "",
    basePrice: 0,
    unit: "VNĐ/km",
    description: "",
    active: true
  });

  const handleEdit = (item: typeof mockPricing[0]) => {
    setEditingId(item.id);
    setEditData({
      name: item.name,
      basePrice: item.basePrice,
      unit: item.unit,
      description: item.description
    });
  };

  const handleSave = (id: number) => {
    setPricing(pricing.map(p => 
      p.id === id ? { ...p, ...editData } : p
    ));
    setEditingId(null);
    toast.success("Đã cập nhật giá");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({ name: "", basePrice: 0, unit: "", description: "" });
  };

  const toggleStatus = (id: number) => {
    setPricing(pricing.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
    toast.success("Đã cập nhật trạng thái");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleCreate = () => {
    const newId = Math.max(...pricing.map(p => p.id)) + 1;
    setPricing([...pricing, { ...newPricing, id: newId }]);
    setNewPricing({
      name: "",
      basePrice: 0,
      unit: "VNĐ/km",
      description: "",
      active: true
    });
    setIsCreateDialogOpen(false);
    toast.success("Đã thêm bảng giá mới");
  };

  const handleEditDialog = (item: typeof mockPricing[0]) => {
    setEditData({
      name: item.name,
      basePrice: item.basePrice,
      unit: item.unit,
      description: item.description
    });
    setEditingId(item.id);
    setIsEditDialogOpen(true);
  };

  const handleSaveDialog = () => {
    setPricing(pricing.map(p => 
      p.id === editingId ? { ...p, ...editData } : p
    ));
    setIsEditDialogOpen(false);
    setEditingId(null);
    toast.success("Đã cập nhật bảng giá");
  };

  const handleDelete = (id: number) => {
    setPricing(pricing.filter(p => p.id !== id));
    toast.success("Đã xóa bảng giá");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Bảng giá</h1>
          <p className="text-muted-foreground">Cập nhật giá cả các dịch vụ</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Thêm bảng giá mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm bảng giá mới</DialogTitle>
              <DialogDescription>
                Tạo bảng giá mới cho dịch vụ taxi
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên dịch vụ</Label>
                <Input
                  id="name"
                  value={newPricing.name}
                  onChange={(e) => setNewPricing({...newPricing, name: e.target.value})}
                  placeholder="VD: Taxi sân bay"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Giá</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newPricing.basePrice}
                    onChange={(e) => setNewPricing({...newPricing, basePrice: Number(e.target.value)})}
                    placeholder="15000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Đơn vị</Label>
                  <Input
                    id="unit"
                    value={newPricing.unit}
                    onChange={(e) => setNewPricing({...newPricing, unit: e.target.value})}
                    placeholder="VNĐ/km"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={newPricing.description}
                  onChange={(e) => setNewPricing({...newPricing, description: e.target.value})}
                  placeholder="Mô tả chi tiết về dịch vụ"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleCreate}>
                Tạo bảng giá
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {pricing.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">
                    {editingId === item.id ? (
                      <Input
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        className="max-w-xs"
                      />
                    ) : (
                      item.name
                    )}
                  </CardTitle>
                  <Badge variant={item.active ? "default" : "secondary"}>
                    {item.active ? "Đang áp dụng" : "Tạm dừng"}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  {editingId === item.id ? (
                    <>
                      <Button size="sm" onClick={() => handleSave(item.id)}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleEditDialog(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toggleStatus(item.id)}
                      >
                        {item.active ? "Tạm dừng" : "Kích hoạt"}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription>
                {editingId === item.id ? (
                  <Input
                    value={editData.description}
                    onChange={(e) => setEditData({...editData, description: e.target.value})}
                    placeholder="Mô tả"
                  />
                ) : (
                  item.description
                )}
              </CardDescription>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Giá cơ bản</Label>
                  {editingId === item.id ? (
                    <Input
                      type="number"
                      value={editData.basePrice}
                      onChange={(e) => setEditData({...editData, basePrice: Number(e.target.value)})}
                    />
                  ) : (
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(item.basePrice)}
                    </div>
                  )}
                </div>
                
                <div>
                  <Label>Đơn vị</Label>
                  {editingId === item.id ? (
                    <Input
                      value={editData.unit}
                      onChange={(e) => setEditData({...editData, unit: e.target.value})}
                    />
                  ) : (
                    <div className="text-lg text-muted-foreground">
                      {item.unit}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa bảng giá</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin bảng giá dịch vụ
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Tên dịch vụ</Label>
              <Input
                id="edit-name"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                placeholder="VD: Taxi sân bay"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-price">Giá</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editData.basePrice}
                  onChange={(e) => setEditData({...editData, basePrice: Number(e.target.value)})}
                  placeholder="15000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-unit">Đơn vị</Label>
                <Input
                  id="edit-unit"
                  value={editData.unit}
                  onChange={(e) => setEditData({...editData, unit: e.target.value})}
                  placeholder="VNĐ/km"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Mô tả</Label>
              <Textarea
                id="edit-description"
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                placeholder="Mô tả chi tiết về dịch vụ"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveDialog}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pricing;