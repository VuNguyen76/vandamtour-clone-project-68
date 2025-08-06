import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Eye, Plus, Trash2, Star, Route, MapPin, Gift } from "lucide-react";
import { toast } from "sonner";
import PreviewModal from "@/components/admin/preview/PreviewModal";
import TaxiDuongDaiPreview from "@/components/admin/preview/TaxiDuongDaiPreview";

interface Destination {
  name: string;
  price: string;
  duration: string;
  distance: string;
  description: string;
  popular: boolean;
}

interface Promotion {
  title: string;
  description: string;
  icon: string;
}

interface Benefit {
  text: string;
}

interface TaxiDuongDaiFormData {
  sectionTitle: string;
  sectionDescription: string;
  badgeText: string;
  destinations: Destination[];
  promotions: Promotion[];
  benefits: Benefit[];
}

const TaxiDuongDaiEdit = () => {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  
  const { register, handleSubmit, control, watch, setValue } = useForm<TaxiDuongDaiFormData>({
    defaultValues: {
      sectionTitle: "TAXI ĐƯỜNG DÀI",
      sectionDescription: "Dịch vụ taxi đường dài chuyên nghiệp với hơn 15 năm kinh nghiệm. Chúng tôi cam kết mang đến cho bạn những chuyến đi an toàn, thoải mái và đáng nhớ nhất.",
      badgeText: "Dịch vụ cao cấp",
      destinations: [
        {
          name: "TP.HCM - Vũng Tàu",
          price: "450.000đ",
          duration: "2 giờ",
          distance: "125km",
          description: "Biển đẹp, resort cao cấp",
          popular: true
        },
        {
          name: "TP.HCM - Đà Lạt",
          price: "850.000đ",
          duration: "4.5 giờ",
          distance: "300km",
          description: "Khí hậu mát mẻ, phong cảnh thơ mộng",
          popular: false
        },
        {
          name: "TP.HCM - Cần Thơ",
          price: "380.000đ",
          duration: "2.5 giờ",
          distance: "160km",
          description: "Miệt vườn sông nước, chợ nổi",
          popular: false
        },
        {
          name: "TP.HCM - Phan Thiết",
          price: "520.000đ",
          duration: "3 giờ",
          distance: "200km",
          description: "Đồi cát bay, resort nghỉ dưỡng",
          popular: true
        }
      ],
      promotions: [
        {
          title: "Đặt trước 24h",
          description: "Giảm ngay 10% + tặng nước uống miễn phí",
          icon: "Calendar"
        },
        {
          title: "Nhóm từ 4 người",
          description: "Ưu đãi 15% cho đoàn khách du lịch",
          icon: "Users"
        },
        {
          title: "Khứ hồi",
          description: "Miễn phí chờ 3 tiếng + giảm 20% lượt về",
          icon: "Route"
        }
      ],
      benefits: [
        { text: "Xe đời mới, máy lạnh mát" },
        { text: "WiFi miễn phí suốt tuyến đường" },
        { text: "Nước uống và khăn lạnh miễn phí" },
        { text: "Hỗ trợ hành lý lớn" },
        { text: "Thanh toán linh hoạt" },
        { text: "Bảo hiểm toàn diện" }
      ]
    }
  });

  const { fields: destinationFields, append: appendDestination, remove: removeDestination } = useFieldArray({
    control,
    name: "destinations"
  });

  const { fields: promotionFields, append: appendPromotion, remove: removePromotion } = useFieldArray({
    control,
    name: "promotions"
  });

  const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
    control,
    name: "benefits"
  });

  const onSubmit = (data: TaxiDuongDaiFormData) => {
    console.log("Taxi Duong Dai data saved:", data);
    toast.success("Đã lưu thay đổi thành công!");
  };

  const togglePopular = (index: number, checked: boolean) => {
    setValue(`destinations.${index}.popular`, checked);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/content")}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Chỉnh sửa Taxi Đường Dài</h1>
            <p className="text-muted-foreground">Quản lý tuyến đường, ưu đãi và quyền lợi</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="w-4 h-4 mr-1" />
            Xem trước
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>
            <Save className="w-4 h-4 mr-1" />
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList>
          <TabsTrigger value="content">Nội dung chung</TabsTrigger>
          <TabsTrigger value="destinations">Tuyến đường</TabsTrigger>
          <TabsTrigger value="promotions">Ưu đãi</TabsTrigger>
          <TabsTrigger value="benefits">Quyền lợi</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="w-5 h-5" />
                Thông tin Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="badgeText">Text badge</Label>
                <Input
                  id="badgeText"
                  {...register("badgeText")}
                  placeholder="Dịch vụ cao cấp"
                />
              </div>
              
              <div>
                <Label htmlFor="sectionTitle">Tiêu đề chính</Label>
                <Input
                  id="sectionTitle"
                  {...register("sectionTitle")}
                  className="text-lg font-semibold"
                />
              </div>
              
              <div>
                <Label htmlFor="sectionDescription">Mô tả</Label>
                <Textarea
                  id="sectionDescription"
                  {...register("sectionDescription")}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="destinations" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Tuyến đường phổ biến</h2>
            <Button 
              onClick={() => appendDestination({
                name: "TP.HCM - Địa điểm mới",
                price: "0đ",
                duration: "0 giờ",
                distance: "0km",
                description: "Mô tả tuyến đường",
                popular: false
              })}
            >
              <Plus className="w-4 h-4 mr-1" />
              Thêm tuyến đường
            </Button>
          </div>

          <div className="grid gap-6">
            {destinationFields.map((field, index) => (
              <Card key={field.id} className={watch(`destinations.${index}.popular`) ? "ring-2 ring-primary" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Tuyến đường {index + 1}
                      {watch(`destinations.${index}.popular`) && (
                        <Star className="w-4 h-4 fill-primary text-primary" />
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={watch(`destinations.${index}.popular`)}
                          onCheckedChange={(checked) => togglePopular(index, checked)}
                        />
                        <Label className="text-sm">Phổ biến</Label>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeDestination(index)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`destinations.${index}.name`}>Tên tuyến đường</Label>
                    <Input
                      {...register(`destinations.${index}.name`)}
                      placeholder="TP.HCM - Vũng Tàu"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`destinations.${index}.price`}>Giá</Label>
                      <Input
                        {...register(`destinations.${index}.price`)}
                        placeholder="450.000đ"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`destinations.${index}.duration`}>Thời gian</Label>
                      <Input
                        {...register(`destinations.${index}.duration`)}
                        placeholder="2 giờ"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`destinations.${index}.distance`}>Khoảng cách</Label>
                      <Input
                        {...register(`destinations.${index}.distance`)}
                        placeholder="125km"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`destinations.${index}.description`}>Mô tả</Label>
                    <Input
                      {...register(`destinations.${index}.description`)}
                      placeholder="Biển đẹp, resort cao cấp"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Ưu đãi đặc biệt</h2>
            <Button 
              onClick={() => appendPromotion({
                title: "Ưu đãi mới",
                description: "Mô tả ưu đãi",
                icon: "Gift"
              })}
            >
              <Plus className="w-4 h-4 mr-1" />
              Thêm ưu đãi
            </Button>
          </div>

          <div className="grid gap-6">
            {promotionFields.map((field, index) => (
              <Card key={field.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      Ưu đãi {index + 1}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removePromotion(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`promotions.${index}.title`}>Tiêu đề</Label>
                      <Input
                        {...register(`promotions.${index}.title`)}
                        placeholder="Đặt trước 24h"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`promotions.${index}.icon`}>Icon</Label>
                      <Input
                        {...register(`promotions.${index}.icon`)}
                        placeholder="Calendar"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`promotions.${index}.description`}>Mô tả</Label>
                    <Textarea
                      {...register(`promotions.${index}.description`)}
                      placeholder="Giảm ngay 10% + tặng nước uống miễn phí"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Quyền lợi khách hàng</h2>
            <Button 
              onClick={() => appendBenefit({ text: "Quyền lợi mới" })}
            >
              <Plus className="w-4 h-4 mr-1" />
              Thêm quyền lợi
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {benefitFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-3">
                    <Input
                      {...register(`benefits.${index}.text`)}
                      placeholder="Xe đời mới, máy lạnh mát"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeBenefit(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Taxi Đường Dài"
      >
        <TaxiDuongDaiPreview config={{
          sectionTitle: watch('sectionTitle'),
          sectionDescription: watch('sectionDescription'), 
          badgeText: watch('badgeText'),
          destinations: watch('destinations'),
          promotions: watch('promotions'),
          benefits: watch('benefits')
        }} />
      </PreviewModal>
    </div>
  );
};

export default TaxiDuongDaiEdit;