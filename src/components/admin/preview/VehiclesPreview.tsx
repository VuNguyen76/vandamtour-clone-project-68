import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Car, Truck } from "lucide-react";

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

interface VehiclesPreviewProps {
  config?: {
    vehicles: Vehicle[];
  };
}

const VehiclesPreview = ({ config }: VehiclesPreviewProps) => {
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

  const getVehicleIcon = (vehicleName: string) => {
    if (vehicleName.includes('4')) return <Car className="w-6 h-6" />;
    if (vehicleName.includes('7')) return <Users className="w-6 h-6" />;
    if (vehicleName.includes('16')) return <Truck className="w-6 h-6" />;
    return <Car className="w-6 h-6" />;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            CÁC LOẠI XE HIỆN CÓ
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Đa dạng các loại xe phù hợp với nhu cầu của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {enabledVehicles.map((vehicle, index) => (
            <Card 
              key={vehicle.id}
              className="group hover:shadow-strong border-0 bg-white transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    {getVehicleIcon(vehicle.name)}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {vehicle.label}
                </h3>
                
                <div className="text-2xl font-bold text-primary mb-3">
                  {vehicle.price}
                </div>
                
                {vehicle.description && (
                  <p className="text-muted-foreground text-sm mb-4">
                    {vehicle.description}
                  </p>
                )}
                
                {vehicle.features && vehicle.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {vehicle.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Chọn xe này
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {enabledVehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Không có xe nào được kích hoạt</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehiclesPreview;