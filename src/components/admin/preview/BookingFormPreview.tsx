import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Phone, Clock, Car, Users } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  label: string;
  price: string;
  description?: string;
  features?: string[];
  enabled: boolean;
  order: number;
}

interface BookingFormPreviewProps {
  config?: {
    vehicles: Vehicle[];
  };
}

const BookingFormPreview = ({ config }: BookingFormPreviewProps) => {
  const defaultVehicles: Vehicle[] = [
    {
      id: "1",
      name: "4seats",
      label: "Xe 4 chỗ",
      price: "14k/km",
      description: "Xe sedan 4 chỗ, phù hợp gia đình nhỏ",
      features: ["Tiết kiệm nhiên liệu", "Linh hoạt trong phố"],
      enabled: true,
      order: 1
    },
    {
      id: "2", 
      name: "7seats",
      label: "Xe 7 chỗ",
      price: "18k/km",
      description: "Xe SUV 7 chỗ, phù hợp nhóm bạn",
      features: ["Rộng rãi", "Thoải mái"],
      enabled: true,
      order: 2
    },
    {
      id: "3",
      name: "16seats",
      label: "Xe 16 chỗ",
      price: "25k/km", 
      description: "Xe khách 16 chỗ, phù hợp đoàn du lịch",
      features: ["Phù hợp đoàn", "Tiết kiệm chi phí"],
      enabled: true,
      order: 3
    }
  ];

  const vehicles = config?.vehicles || defaultVehicles;
  const enabledVehicles = vehicles.filter(v => v.enabled).sort((a, b) => a.order - b.order);

  const [formData, setFormData] = useState({
    pickupLocation: "",
    destination: "",
    vehicleType: "",
    departureDate: "",
    departureTime: "",
    customerName: "",
    customerPhone: "",
    notes: ""
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="glass-card w-full animate-fade-in">
            <CardHeader className="text-center pb-3">
              <CardTitle className="text-lg md:text-xl font-bold text-primary">
                ĐẶT XE NGAY TẠI ĐÂY
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3 px-3 md:px-6">
              <form className="space-y-3">
                {/* Trip Type Toggle */}
                <div className="flex rounded-lg bg-secondary p-1">
                  <button
                    type="button"
                    className="flex-1 py-2 px-3 rounded-md text-xs md:text-sm font-medium transition-all duration-200 bg-primary text-primary-foreground shadow-sm"
                  >
                    1 Chiều
                  </button>
                  <button
                    type="button"
                    className="flex-1 py-2 px-3 rounded-md text-xs md:text-sm font-medium transition-all duration-200 text-muted-foreground hover:text-foreground"
                  >
                    2 Chiều
                  </button>
                </div>

                {/* Pickup & Destination */}
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs md:text-sm font-medium mb-2 block text-primary">📍 Điểm đón</Label>
                    <Input
                      placeholder="Chọn tỉnh/thành phố đón"
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                      className="border-primary/20 focus:border-primary bg-background h-9 text-sm"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-xs md:text-sm font-medium mb-2 block text-destructive">🎯 Điểm đến</Label>
                    <Input
                      placeholder="Chọn tỉnh/thành phố đến"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      className="border-destructive/20 focus:border-destructive bg-background h-9 text-sm"
                    />
                  </div>
                </div>

              {/* Vehicle Selection */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-primary" />
                  Loại xe
                </Label>
                <Select value={formData.vehicleType} onValueChange={(value) => setFormData({...formData, vehicleType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại xe" />
                  </SelectTrigger>
                  <SelectContent>
                    {enabledVehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.name}>
                        <div className="flex items-center justify-between w-full">
                          <span>{vehicle.label}</span>
                          <span className="text-primary font-semibold ml-2">{vehicle.price}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* Vehicle Features */}
                {formData.vehicleType && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    {(() => {
                      const selectedVehicle = enabledVehicles.find(v => v.name === formData.vehicleType);
                      return selectedVehicle ? (
                        <div>
                          {selectedVehicle.description && (
                            <p className="text-sm text-muted-foreground mb-2">{selectedVehicle.description}</p>
                          )}
                          {selectedVehicle.features && selectedVehicle.features.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {selectedVehicle.features.map((feature, index) => (
                                <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Ngày đi
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Giờ đi
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.departureTime}
                    onChange={(e) => setFormData({...formData, departureTime: e.target.value})}
                  />
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Họ tên
                  </Label>
                  <Input
                    id="name"
                    placeholder="Nhập họ tên..."
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Số điện thoại
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Nhập số điện thoại..."
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  placeholder="Ghi chú thêm (tùy chọn)..."
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

                {/* Submit Button */}
                <Button className="w-full bg-gradient-primary hover:bg-primary-hover text-lg py-6 mt-4">
                  Đặt xe ngay
                </Button>
              </form>

              {/* Contact Info */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Hoặc gọi hotline để đặt xe:</p>
                <a href="tel:0823141862" className="text-primary font-bold text-lg hover:underline">
                  0823.141.862
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingFormPreview;