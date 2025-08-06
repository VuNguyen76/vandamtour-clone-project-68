import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Phone, Clock, User, Car } from "lucide-react";
import { toast } from "sonner";

const mockBookings = [
  {
    id: "BK001",
    customerName: "Nguyễn Văn A",
    phone: "0901234567",
    service: "Taxi sân bay",
    pickup: "146 Nguyễn Xiển, Thanh Xuân",
    destination: "Sân bay Nội Bài",
    date: "2024-12-16",
    time: "06:00",
    status: "confirmed",
    price: 450000,
    driverName: "Trần Văn B",
    licensePlate: "30A-12345"
  },
  {
    id: "BK002", 
    customerName: "Trần Thị C",
    phone: "0912345678",
    service: "Taxi trong thành phố",
    pickup: "Hồ Gươm",
    destination: "Times City",
    date: "2024-12-16",
    time: "14:30",
    status: "pending",
    price: 120000,
    driverName: "",
    licensePlate: ""
  },
  {
    id: "BK003",
    customerName: "Lê Minh D",
    phone: "0923456789", 
    service: "Taxi đường dài",
    pickup: "Hà Nội",
    destination: "Hạ Long",
    date: "2024-12-17",
    time: "08:00",
    status: "in_progress",
    price: 800000,
    driverName: "Phạm Văn E",
    licensePlate: "30A-67890"
  },
  {
    id: "BK004",
    customerName: "Hoàng Thị F",
    phone: "0934567890",
    service: "Taxi sân bay", 
    pickup: "Sân bay Nội Bài",
    destination: "Cầu Giấy",
    date: "2024-12-15",
    time: "22:15",
    status: "completed",
    price: 450000,
    driverName: "Vũ Văn G",
    licensePlate: "30A-11111"
  }
];

const Bookings = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.phone.includes(searchTerm) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: "Chờ xác nhận", variant: "secondary" as const },
      confirmed: { label: "Đã xác nhận", variant: "default" as const },
      in_progress: { label: "Đang thực hiện", variant: "default" as const },
      completed: { label: "Hoàn thành", variant: "default" as const },
      cancelled: { label: "Đã hủy", variant: "destructive" as const }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    setBookings(bookings.map(b => 
      b.id === bookingId ? { ...b, status: newStatus } : b
    ));
    toast.success("Đã cập nhật trạng thái đặt xe");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Đặt xe</h1>
          <p className="text-muted-foreground">Theo dõi và quản lý các đơn đặt xe</p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Input
          placeholder="Tìm kiếm theo tên, SĐT hoặc mã đặt xe..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="pending">Chờ xác nhận</SelectItem>
            <SelectItem value="confirmed">Đã xác nhận</SelectItem>
            <SelectItem value="in_progress">Đang thực hiện</SelectItem>
            <SelectItem value="completed">Hoàn thành</SelectItem>
            <SelectItem value="cancelled">Đã hủy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredBookings.map((booking) => {
          const statusInfo = getStatusBadge(booking.status);
          return (
            <Card key={booking.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle>#{booking.id}</CardTitle>
                      <Badge variant={statusInfo.variant}>
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {booking.customerName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {booking.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {booking.time}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {formatPrice(booking.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.service}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">Điểm đón</p>
                        <p className="text-sm text-muted-foreground">{booking.pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-red-600" />
                      <div>
                        <p className="text-sm font-medium">Điểm đến</p>
                        <p className="text-sm text-muted-foreground">{booking.destination}</p>
                      </div>
                    </div>
                  </div>
                  
                  {booking.driverName && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <div>
                          <p className="text-sm font-medium">Tài xế</p>
                          <p className="text-sm text-muted-foreground">{booking.driverName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        <div>
                          <p className="text-sm font-medium">Biển số xe</p>
                          <p className="text-sm text-muted-foreground">{booking.licensePlate}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Select 
                    value={booking.status} 
                    onValueChange={(value) => handleStatusChange(booking.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Chờ xác nhận</SelectItem>
                      <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                      <SelectItem value="in_progress">Đang thực hiện</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                      <SelectItem value="cancelled">Hủy</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="sm">
                    Gọi khách hàng
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    Chi tiết
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Bookings;