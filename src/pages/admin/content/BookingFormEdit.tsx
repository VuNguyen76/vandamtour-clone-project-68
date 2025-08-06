import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, GripVertical, Eye } from "lucide-react";
import { RootState } from "@/store/store";
import { addVehicle, updateVehicle, deleteVehicle, toggleVehicleEnabled, reorderVehicles, Vehicle } from "@/store/vehicleSlice";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import PreviewModal from "@/components/admin/preview/PreviewModal";
import BookingFormPreview from "@/components/admin/preview/BookingFormPreview";

const BookingFormEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    label: "",
    price: "",
    description: "",
    features: "",
    enabled: true,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      label: "",
      price: "",
      description: "",
      features: "",
      enabled: true,
    });
    setEditingVehicle(null);
  };

  const openAddDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      label: vehicle.label,
      price: vehicle.price,
      description: vehicle.description || "",
      features: vehicle.features?.join(", ") || "",
      enabled: vehicle.enabled,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.label || !formData.price) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      });
      return;
    }

    const vehicleData = {
      name: formData.name,
      label: formData.label,
      price: formData.price,
      description: formData.description,
      features: formData.features ? formData.features.split(",").map(f => f.trim()) : [],
      enabled: formData.enabled,
    };

    if (editingVehicle) {
      dispatch(updateVehicle({
        ...vehicleData,
        id: editingVehicle.id,
        order: editingVehicle.order,
      }));
      toast({
        title: "Thành công",
        description: "Đã cập nhật loại xe",
      });
    } else {
      dispatch(addVehicle(vehicleData));
      toast({
        title: "Thành công", 
        description: "Đã thêm loại xe mới",
      });
    }

    setDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa loại xe này?")) {
      dispatch(deleteVehicle(id));
      toast({
        title: "Thành công",
        description: "Đã xóa loại xe",
      });
    }
  };

  const handleToggleEnabled = (id: string) => {
    dispatch(toggleVehicleEnabled(id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Form đặt xe</h1>
          <p className="text-muted-foreground">Chỉnh sửa các tùy chọn xe trong form đặt xe</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="w-4 h-4 mr-2" />
            Xem trước
          </Button>
          <Button onClick={openAddDialog}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm loại xe
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách loại xe</CardTitle>
          <CardDescription>
            Quản lý các tùy chọn xe hiển thị trong form đặt xe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{vehicle.label}</span>
                      <Badge variant={vehicle.enabled ? "default" : "secondary"}>
                        {vehicle.enabled ? "Hiển thị" : "Ẩn"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Giá: {vehicle.price} • ID: {vehicle.name}
                    </div>
                    {vehicle.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {vehicle.description}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={vehicle.enabled}
                    onCheckedChange={() => handleToggleEnabled(vehicle.id)}
                  />
                  <Button
                    variant="outline" 
                    size="sm"
                    onClick={() => openEditDialog(vehicle)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(vehicle.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingVehicle ? "Chỉnh sửa loại xe" : "Thêm loại xe mới"}
            </DialogTitle>
            <DialogDescription>
              Điền thông tin chi tiết cho loại xe
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">ID xe *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="4seats"
                />
              </div>
              <div>
                <Label htmlFor="label">Tên hiển thị *</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="Xe 4 chỗ"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="price">Giá *</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="14k/km"
              />
            </div>
            <div>
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Mô tả chi tiết về loại xe này"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="features">Tính năng (phân cách bởi dấu phẩy)</Label>
              <Input
                id="features"
                value={formData.features}
                onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                placeholder="Tiết kiệm nhiên liệu, Linh hoạt trong phố"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="enabled"
                checked={formData.enabled}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enabled: checked }))}
              />
              <Label htmlFor="enabled">Hiển thị trong form đặt xe</Label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Hủy
              </Button>
              <Button type="submit">
                {editingVehicle ? "Cập nhật" : "Thêm"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Form đặt xe"
      >
        <BookingFormPreview config={{ vehicles }} />
      </PreviewModal>
    </div>
  );
};

export default BookingFormEdit;