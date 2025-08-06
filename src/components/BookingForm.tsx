import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Users, Clock, MessageSquare, User, Car } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Province {
  code: string;
  name: string;
}

interface District {
  code: string;
  name: string;
  province_code: string;
}

interface Ward {
  code: string;
  name: string;
  district_code: string;
}

const BookingForm = () => {
  const [formData, setFormData] = useState({
    pickupProvince: "",
    pickupDistrict: "", 
    pickupWard: "",
    destProvince: "",
    destDistrict: "", 
    destWard: "",
    tripType: "oneway", // oneway or roundtrip
    vehicleType: "4seats",
    name: "",
    phone: "",
    pickupDate: "",
    pickupTime: "",
    notes: "",
  });

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [pickupDistricts, setPickupDistricts] = useState<District[]>([]);
  const [pickupWards, setPickupWards] = useState<Ward[]>([]);
  const [destDistricts, setDestDistricts] = useState<District[]>([]);
  const [destWards, setDestWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const vehicles = useSelector((state: RootState) => 
    state.vehicle.vehicles.filter(v => v.enabled).sort((a, b) => a.order - b.order)
  );

  // Load provinces on component mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  // Load pickup districts when pickup province changes
  useEffect(() => {
    if (formData.pickupProvince) {
      fetchDistricts(formData.pickupProvince, 'pickup');
      setFormData(prev => ({ ...prev, pickupDistrict: "", pickupWard: "" }));
    }
  }, [formData.pickupProvince]);

  // Load pickup wards when pickup district changes
  useEffect(() => {
    if (formData.pickupDistrict) {
      fetchWards(formData.pickupDistrict, 'pickup');
      setFormData(prev => ({ ...prev, pickupWard: "" }));
    }
  }, [formData.pickupDistrict]);

  // Load destination districts when destination province changes
  useEffect(() => {
    if (formData.destProvince) {
      fetchDistricts(formData.destProvince, 'dest');
      setFormData(prev => ({ ...prev, destDistrict: "", destWard: "" }));
    }
  }, [formData.destProvince]);

  // Load destination wards when destination district changes
  useEffect(() => {
    if (formData.destDistrict) {
      fetchWards(formData.destDistrict, 'dest');
      setFormData(prev => ({ ...prev, destWard: "" }));
    }
  }, [formData.destDistrict]);

  const fetchProvinces = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://provinces.open-api.vn/api/p/');
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách tỉnh thành",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDistricts = async (provinceCode: string, type: 'pickup' | 'dest') => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
      const data = await response.json();
      if (type === 'pickup') {
        setPickupDistricts(data.districts || []);
      } else {
        setDestDistricts(data.districts || []);
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const fetchWards = async (districtCode: string, type: 'pickup' | 'dest') => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      const data = await response.json();
      if (type === 'pickup') {
        setPickupWards(data.wards || []);
      } else {
        setDestWards(data.wards || []);
      }
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation - Only require provinces and basic info
    if (!formData.pickupProvince || !formData.destProvince || !formData.name || !formData.phone) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ thông tin để đặt xe.",
        variant: "destructive",
      });
      return;
    }

    // Get location names
    const pickupProvinceName = provinces.find(p => p.code === formData.pickupProvince)?.name;
    const destProvinceName = provinces.find(p => p.code === formData.destProvince)?.name;
    
    toast({
      title: "Đặt xe thành công!",
      description: `Từ: ${pickupProvinceName} → Đến: ${destProvinceName}. Chúng tôi sẽ liên hệ với bạn trong vòng 5 phút.`,
    });

    // Reset form
    setFormData({
      pickupProvince: "",
      pickupDistrict: "",
      pickupWard: "",
      destProvince: "",
      destDistrict: "",
      destWard: "",
      tripType: "oneway",
      vehicleType: "4seats",
      name: "",
      phone: "",
      pickupDate: "",
      pickupTime: "",
      notes: "",
    });
  };

  const vehicleOptions = vehicles.map(v => ({
    value: v.name,
    label: v.label,
    price: v.price,
  }));

  return (
    <Card className="glass-card w-full max-w-md mx-auto animate-fade-in">
      <CardHeader className="text-center pb-3">
        <CardTitle className="text-lg md:text-xl font-bold text-primary">
          ĐẶT XE NGAY TẠI ĐÂY
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-3 md:px-6">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Trip Type Toggle */}
          <div className="flex rounded-lg bg-secondary p-1">
            <button
              type="button"
              className={`flex-1 py-2 px-3 rounded-md text-xs md:text-sm font-medium transition-all duration-200 ${
                formData.tripType === "oneway"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => handleInputChange("tripType", "oneway")}
            >
              1 Chiều
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-3 rounded-md text-xs md:text-sm font-medium transition-all duration-200 ${
                formData.tripType === "roundtrip"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => handleInputChange("tripType", "roundtrip")}
            >
              2 Chiều
            </button>
          </div>

          {/* Tabbed Layout for Mobile */}
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto p-1">
              <TabsTrigger value="info" className="text-xs py-2 flex flex-col items-center gap-1">
                <MapPin className="w-3 h-3" />
                Thông tin & Địa điểm
              </TabsTrigger>
              <TabsTrigger value="vehicle" className="text-xs py-2 flex flex-col items-center gap-1">
                <Car className="w-3 h-3" />
                Phương tiện
              </TabsTrigger>
            </TabsList>

            {/* Info & Location Tab */}
            <TabsContent value="info" className="space-y-3 mt-3">
              {/* Pickup Location */}
              <div>
                <Label className="text-xs md:text-sm font-medium mb-2 block text-primary">📍 Điểm đón</Label>
                <Select
                  value={formData.pickupProvince}
                  onValueChange={(value) => handleInputChange("pickupProvince", value)}
                  disabled={loading}
                >
                  <SelectTrigger className="border-primary/20 focus:border-primary bg-background h-9 text-sm">
                    <MapPin className="w-3 h-3 text-primary mr-2" />
                    <SelectValue placeholder="Chọn tỉnh/thành phố đón" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background border border-border">
                    {provinces.map((province) => (
                      <SelectItem key={province.code} value={province.code.toString()}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Destination Location */}
              <div>
                <Label className="text-xs md:text-sm font-medium mb-2 block text-destructive">🎯 Điểm đến</Label>
                <Select
                  value={formData.destProvince}
                  onValueChange={(value) => handleInputChange("destProvince", value)}
                  disabled={loading}
                >
                  <SelectTrigger className="border-destructive/20 focus:border-destructive bg-background h-9 text-sm">
                    <MapPin className="w-3 h-3 text-destructive mr-2" />
                    <SelectValue placeholder="Chọn tỉnh/thành phố đến" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background border border-border">
                    {provinces.map((province) => (
                      <SelectItem key={province.code} value={province.code.toString()}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Customer Info */}
              <div className="space-y-2 pt-2">
                <Input
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-primary/20 focus:border-primary h-9 text-sm"
                />
                <Input
                  placeholder="Số điện thoại"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="border-primary/20 focus:border-primary h-9 text-sm"
                />
              </div>

              {/* Date and Time */}
              <div className="space-y-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 w-3 h-3 text-primary" />
                  <Input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                    className="pl-8 border-primary/20 focus:border-primary h-9 text-sm"
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 w-3 h-3 text-primary" />
                  <Input
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => handleInputChange("pickupTime", e.target.value)}
                    className="pl-8 border-primary/20 focus:border-primary h-9 text-sm"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Vehicle Tab */}
            <TabsContent value="vehicle" className="space-y-3 mt-3">
              <Label className="text-xs md:text-sm font-medium mb-2 block">Tùy chọn xe</Label>
              <div className="grid grid-cols-1 gap-2">
                {vehicleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                      formData.vehicleType === option.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleInputChange("vehicleType", option.value)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">{option.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground font-semibold">{option.price}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Customer Notes moved to Vehicle Tab */}
              <div className="mt-4">
                <Label className="text-xs font-medium mb-2 block text-muted-foreground">
                  <MessageSquare className="w-3 h-3 inline mr-1" />
                  Ghi chú (tùy chọn)
                </Label>
                <Textarea
                  placeholder="Ghi chú đặc biệt, địa chỉ cụ thể..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="border-muted/20 focus:border-primary resize-none text-sm"
                  rows={2}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full bg-gradient-primary hover:bg-primary-hover transition-all duration-300 shadow-soft hover:shadow-medium text-sm md:text-lg py-4 md:py-6 mt-4"
          >
            Đặt xe ngay
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;