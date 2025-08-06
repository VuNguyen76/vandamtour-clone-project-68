import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, User, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContacts from "@/components/FloatingContacts";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactInfo = [
    {
      icon: Phone,
      title: "Điện thoại",
      details: ["Hotline: 0823141862", "Tổng đài: 1900-1234"],
      color: "text-green-600"
    },
    {
      icon: Mail, 
      title: "Email",
      details: ["info@vandamtour.vn", "booking@vandamtour.vn"],
      color: "text-blue-600"
    },
    {
      icon: MapPin,
      title: "Địa chỉ",
      details: ["123 Nguyễn Văn Cừ, Quận 1", "TP. Hồ Chí Minh, Việt Nam"],
      color: "text-red-600"
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      details: ["24/7 - Phục vụ liên tục", "Kể cả ngày lễ, Tết"],
      color: "text-purple-600"
    }
  ];

  const offices = [
    {
      name: "Văn phòng chính",
      address: "123 Nguyễn Văn Cừ, Quận 1, TP.HCM",
      phone: "0823141862",
      hours: "24/7"
    },
    {
      name: "Chi nhánh Quận 7",
      address: "456 Nguyễn Thị Thập, Quận 7, TP.HCM", 
      phone: "0823141863",
      hours: "6:00 - 22:00"
    },
    {
      name: "Chi nhánh Thủ Đức",
      address: "789 Võ Văn Ngân, TP. Thủ Đức, TP.HCM",
      phone: "0823141864", 
      hours: "6:00 - 22:00"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Gửi thành công!",
      description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
    });
    
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Hãy để lại thông tin, chúng tôi sẽ liên hệ tư vấn và hỗ trợ bạn một cách nhanh chóng nhất
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{info.title}</h3>
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-sm text-muted-foreground mb-1">{detail}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-medium">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Gửi tin nhắn</h2>
                    <p className="text-muted-foreground">Chúng tôi sẽ phản hồi trong 24h</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Họ tên <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Nhập họ tên"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Nhập số điện thoại"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Nhập email"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Chủ đề</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Nhập chủ đề"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Nội dung <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Nhập nội dung tin nhắn..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary hover:bg-primary-hover">
                    <Send className="w-4 h-4 mr-2" />
                    Gửi tin nhắn
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map and Offices */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <Card className="border-0 shadow-medium">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-lg font-medium text-foreground">Bản đồ văn phòng</p>
                      <p className="text-muted-foreground">123 Nguyễn Văn Cừ, Quận 1, TP.HCM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Office Locations */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Văn phòng & Chi nhánh</h3>
                {offices.map((office, index) => (
                  <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-foreground mb-2">{office.name}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{office.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{office.hours}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContacts />
    </div>
  );
};

export default Contact;