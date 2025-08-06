import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { updateServices } from "@/store/contentSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Eye, Plus, Trash2, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PreviewModal from "@/components/admin/preview/PreviewModal";
import ServicesPreview from "@/components/admin/preview/ServicesPreview";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[] | string;
}

interface ServicesFormData {
  sectionTitle: string;
  sectionDescription: string;
  services: ServiceItem[];
}

const ServicesEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Get current services config from Redux
  const currentServicesConfig = useSelector((state: RootState) => state.content.services);
  
  const { register, handleSubmit, control, watch } = useForm<ServicesFormData>({
    defaultValues: currentServicesConfig
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services"
  });

  const onSubmit = (data: ServicesFormData) => {
    // Save to Redux store
    dispatch(updateServices(data));
    toast({
      title: "Đã lưu thành công",
      description: "Thông tin dịch vụ đã được cập nhật.",
    });
  };

  const addService = () => {
    append({
      id: Date.now().toString(),
      title: "Dịch vụ mới",
      description: "Mô tả dịch vụ mới",
      icon: "",
      features: ["Tính năng 1", "Tính năng 2"]
    });
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
            <h1 className="text-2xl font-bold">Chỉnh sửa Dịch vụ</h1>
            <p className="text-muted-foreground">Quản lý các dịch vụ taxi</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsPreviewOpen(true)}>
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
        <h2 className="text-xl font-semibold">Danh sách dịch vụ</h2>
        <Button onClick={addService}>
          <Plus className="w-4 h-4 mr-1" />
          Thêm dịch vụ
        </Button>
      </div>

      <div className="grid gap-6">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-lg">Dịch vụ {index + 1}</CardTitle>
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`services.${index}.title`}>Tên dịch vụ</Label>
                  <Input
                    {...register(`services.${index}.title`)}
                    placeholder="Nhập tên dịch vụ..."
                  />
                </div>
                <div>
                  <Label htmlFor={`services.${index}.icon`}>Icon (URL/filename)</Label>
                  <Input
                    {...register(`services.${index}.icon`)}
                    placeholder="taxi-icon.png"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`services.${index}.description`}>Mô tả</Label>
                <Textarea
                  {...register(`services.${index}.description`)}
                  placeholder="Nhập mô tả dịch vụ..."
                  rows={2}
                />
              </div>
              <div>
                <Label>Tính năng (mỗi dòng 1 tính năng)</Label>
                <Textarea
                  {...register(`services.${index}.features`)}
                  placeholder="Tính năng 1&#10;Tính năng 2&#10;Tính năng 3"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Dịch vụ"
      >
        <ServicesPreview 
          config={{
            sectionTitle: watch("sectionTitle"),
            sectionDescription: watch("sectionDescription"),
            services: watch("services") || []
          }}
        />
      </PreviewModal>
    </div>
  );
};

export default ServicesEdit;