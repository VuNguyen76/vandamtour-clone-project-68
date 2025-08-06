import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, Image } from "lucide-react";
import { toast } from "sonner";

const VehiclesEdit = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: "Xe 4 chỗ",
      description: "Xe sedan, SUV 4 chỗ ngồi thoải mái",
      basePrice: 12000,
      airportPrice: 450000,
      longDistancePrice: 8000,
      features: ["Điều hòa", "Wifi", "Nước uống"],
      image: "/placeholder.svg",
      active: true
    },
    {
      id: 2,
      name: "Xe 7 chỗ",
      description: "Xe 7 chỗ rộng rãi, phù hợp gia đình",
      basePrice: 15000,
      airportPrice: 550000,
      longDistancePrice: 10000,
      features: ["Điều hòa", "Wifi", "Nước uống", "TV"],
      image: "/placeholder.svg",
      active: true
    }
  ]);

  const [editingVehicle, setEditingVehicle] = useState(null);
  const [newFeature, setNewFeature] = useState("");

  const saveVehicle = (vehicleData) => {
    if (editingVehicle) {
      setVehicles(vehicles.map(v => 
        v.id === editingVehicle.id ? { ...vehicleData, id: editingVehicle.id } : v
      ));
      toast.success("Đã cập nhật phương tiện");
    } else {
      setVehicles([...vehicles, { ...vehicleData, id: Date.now() }]);
      toast.success("Đã thêm phương tiện mới");
    }
    setEditingVehicle(null);
  };

  const deleteVehicle = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
    toast.success("Đã xóa phương tiện");
  };

  const addFeature = () => {
    if (newFeature.trim() && editingVehicle) {
      setEditingVehicle({
        ...editingVehicle,
        features: [...editingVehicle.features, newFeature.trim()]
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    if (editingVehicle) {
      setEditingVehicle({
        ...editingVehicle,
        features: editingVehicle.features.filter((_, i) => i !== index)
      });
    }
  };

  const VehicleForm = ({ vehicle, onSave, onCancel }) => {
    const [formData, setFormData] = useState(vehicle || {
      name: "",
      description: "",
      basePrice: 0,
      airportPrice: 0,
      longDistancePrice: 0,
      features: [],
      image: "",
      active: true
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle>{vehicle ? "Chỉnh sửa phương tiện" : "Thêm phương tiện mới"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tên phương tiện</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label>Hình ảnh</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="URL hình ảnh"
                  />
                  <Button type="button" variant="outline">
                    <Image className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label>Mô tả</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Giá cơ bản (VNĐ/km)</Label>
                <Input
                  type="number"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({...formData, basePrice: Number(e.target.value)})}
                />
              </div>
              
              <div>
                <Label>Giá sân bay (VNĐ)</Label>
                <Input
                  type="number"
                  value={formData.airportPrice}
                  onChange={(e) => setFormData({...formData, airportPrice: Number(e.target.value)})}
                />
              </div>
              
              <div>
                <Label>Giá đường dài (VNĐ/km)</Label>
                <Input
                  type="number"
                  value={formData.longDistancePrice}
                  onChange={(e) => setFormData({...formData, longDistancePrice: Number(e.target.value)})}
                />
              </div>
            </div>

            <div>
              <Label>Tiện ích</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Thêm tiện ích"
                />
                <Button type="button" onClick={addFeature}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features?.map((feature, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeFeature(index)}
                  >
                    {feature} ✕
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Lưu
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Hủy
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Phương tiện</h1>
          <p className="text-muted-foreground">Quản lý các loại xe và bảng giá</p>
        </div>
        <Button onClick={() => setEditingVehicle({})}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm phương tiện
        </Button>
      </div>

      {editingVehicle !== null && (
        <VehicleForm
          vehicle={editingVehicle.id ? editingVehicle : null}
          onSave={saveVehicle}
          onCancel={() => setEditingVehicle(null)}
        />
      )}

      <div className="grid gap-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {vehicle.name}
                    <Badge variant={vehicle.active ? "default" : "secondary"}>
                      {vehicle.active ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{vehicle.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingVehicle(vehicle)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteVehicle(vehicle.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-lg font-bold">{vehicle.basePrice.toLocaleString()} VNĐ/km</div>
                  <div className="text-sm text-muted-foreground">Giá cơ bản</div>
                </div>
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-lg font-bold">{vehicle.airportPrice.toLocaleString()} VNĐ</div>
                  <div className="text-sm text-muted-foreground">Giá sân bay</div>
                </div>
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-lg font-bold">{vehicle.longDistancePrice.toLocaleString()} VNĐ/km</div>
                  <div className="text-sm text-muted-foreground">Giá đường dài</div>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Tiện ích</Label>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((feature, index) => (
                    <Badge key={index} variant="outline">{feature}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehiclesEdit;