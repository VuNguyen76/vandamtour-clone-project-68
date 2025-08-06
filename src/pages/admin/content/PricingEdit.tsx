import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Eye, Plus, Trash2, Star, Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  unit: string;
  isPopular: boolean;
  features: string[] | string;
}

interface PricingFormData {
  sectionTitle: string;
  sectionDescription: string;
  plans: PricingPlan[];
}

const PricingEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { register, handleSubmit, control, watch, setValue } = useForm<PricingFormData>({
    defaultValues: {
      sectionTitle: "BẢNG GIÁ DỊCH VỤ",
      sectionDescription: "Giá cả minh bạch, cạnh tranh nhất thị trường. Không phát sinh chi phí ẩn, khách hàng hoàn toàn yên tâm.",
      plans: [
        {
          id: "4seats",
          name: "BẢNG GIÁ XE 4 CHỖ",
          description: "Xe 4 chỗ phù hợp cho gia đình",
          price: "Dưới 10km: 14k/km\nDưới 100km: 10k/km\nTừ 100km trở lên: 9k/km",
          unit: "",
          isPopular: false,
          features: "Đi khứ hồi lượt về giảm đến 70% (tùy quãng đường)\nPhí đường bộ khách thanh toán (nếu có)\nLái xe an toàn, đón đúng giờ\nXe đời mới, sạch sẽ"
        },
        {
          id: "7seats",
          name: "BẢNG GIÁ XE 7 CHỖ",
          description: "Xe 7 chỗ rộng rãi cho nhóm đông",
          price: "Dưới 10km: 18k/km\nDưới 100km: 15k/km\nTừ 100km trở lên: 11k/km",
          unit: "",
          isPopular: true,
          features: "Đi khứ hồi lượt về giảm đến 70% (tùy quãng đường)\nPhí đường bộ khách thanh toán nếu có\nPhù hợp cho gia đình, nhóm bạn\nXe rộng rãi, thoải mái"
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "plans"
  });

  const onSubmit = (data: PricingFormData) => {
    console.log("Pricing data saved:", data);
    toast({
      title: "Đã lưu thành công",
      description: "Bảng giá đã được cập nhật.",
    });
  };

  const addPlan = () => {
    append({
      id: Date.now().toString(),
      name: "Gói mới",
      description: "Mô tả gói mới",
      price: "0",
      unit: "đ/km",
      isPopular: false,
      features: ["Tính năng 1", "Tính năng 2"]
    });
  };

  const togglePopular = (index: number, checked: boolean) => {
    // Chỉ cho phép 1 plan được popular
    if (checked) {
      fields.forEach((_, i) => {
        setValue(`plans.${i}.isPopular`, i === index);
      });
    } else {
      setValue(`plans.${index}.isPopular`, false);
    }
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
            <h1 className="text-2xl font-bold">Chỉnh sửa Bảng giá</h1>
            <p className="text-muted-foreground">Quản lý giá cước các loại xe</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/")}>
            <Eye className="w-4 h-4 mr-1" />
            Xem trước
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>
            <Save className="w-4 h-4 mr-1" />
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin chung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="sectionTitle">Tiêu đề section</Label>
            <Input
              id="sectionTitle"
              {...register("sectionTitle")}
              placeholder="Nhập tiêu đề..."
            />
          </div>
          <div>
            <Label htmlFor="sectionDescription">Mô tả section</Label>
            <Textarea
              id="sectionDescription"
              {...register("sectionDescription")}
              placeholder="Nhập mô tả..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Gói dịch vụ</h2>
        <Button onClick={addPlan}>
          <Plus className="w-4 h-4 mr-1" />
          Thêm gói
        </Button>
      </div>

      <div className="grid gap-6">
        {fields.map((field, index) => (
          <Card key={field.id} className={watch(`plans.${index}.isPopular`) ? "ring-2 ring-primary" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  Gói {index + 1}
                  {watch(`plans.${index}.isPopular`) && (
                    <Star className="w-4 h-4 fill-primary text-primary" />
                  )}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={watch(`plans.${index}.isPopular`)}
                      onCheckedChange={(checked) => togglePopular(index, checked)}
                    />
                    <Label className="text-sm">Phổ biến</Label>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`plans.${index}.name`}>Tên gói</Label>
                  <Input
                    {...register(`plans.${index}.name`)}
                    placeholder="Xe 4 chỗ"
                  />
                </div>
                <div>
                  <Label htmlFor={`plans.${index}.description`}>Mô tả ngắn</Label>
                  <Input
                    {...register(`plans.${index}.description`)}
                    placeholder="Phù hợp cho gia đình nhỏ"
                  />
                </div>
              </div>
              <div>
                <div>
                  <Label htmlFor={`plans.${index}.price`}>Bảng giá (mỗi dòng 1 mức giá)</Label>
                  <Textarea
                    {...register(`plans.${index}.price`)}
                    placeholder="Dưới 10km: 14k/km&#10;Dưới 100km: 10k/km&#10;Từ 100km trở lên: 9k/km"
                    rows={3}
                  />
                </div>
              </div>
              <div>
                <Label>Tính năng (mỗi dòng 1 tính năng)</Label>
                <Textarea
                  {...register(`plans.${index}.features`)}
                  placeholder="Xe đời mới&#10;Điều hòa mát&#10;Tài xế thân thiện"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Xem trước</CardTitle>
        </CardHeader>
        <CardContent>
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {watch("sectionTitle")}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {watch("sectionDescription")}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {watch("plans")?.map((plan, index) => (
                  <Card 
                    key={index}
                    className={`relative border-2 transition-all duration-300 hover:shadow-lg ${
                      plan.isPopular 
                        ? "border-primary shadow-md" 
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                        Phổ biến nhất
                      </div>
                    )}
                    
                    <div className="text-center pb-4 pt-6 px-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        plan.isPopular ? "bg-primary text-white" : "bg-primary/10 text-primary"
                      }`}>
                        <Car className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-primary">
                        {plan.name}
                      </h3>
                      <p className="text-muted-foreground mt-2">{plan.description}</p>
                    </div>

                    <div className="px-6 pb-6 space-y-6">
                      {/* Pricing Table */}
                      <div className="space-y-3">
                        {typeof plan.price === 'string' && plan.price.split('\n').map((priceItem, priceIndex) => (
                          <div 
                            key={priceIndex}
                            className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                          >
                            <span className="text-sm font-medium text-foreground">
                              {priceItem.split(':')[0]}
                            </span>
                            <div className="text-right">
                              <span className="text-lg font-bold text-primary">
                                {priceItem.split(':')[1]?.trim()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Features List */}
                      <ul className="space-y-3">
                        {(typeof plan.features === 'string' ? plan.features.split('\n') : plan.features).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Button 
                        className={`w-full py-6 text-lg transition-all duration-300 ${
                          plan.isPopular
                            ? "bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg"
                            : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white"
                        }`}
                        variant={plan.isPopular ? "default" : "outline"}
                      >
                        Đặt xe ngay
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingEdit;