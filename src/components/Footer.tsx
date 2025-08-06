import { Phone, Mail, MapPin, Clock, Facebook, Zap, Instagram, Youtube, Award, Shield, Users, Star, CheckCircle, Car, Route, Globe, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  const quickLinks = [
    { name: "Giới thiệu", href: "#gioithieu", icon: Users },
    { name: "Dịch vụ", href: "#dichvu", icon: Car },
    { name: "Bảng giá", href: "#banggia", icon: Star },
    { name: "Tin tức", href: "#tintuc", icon: Globe },
    { name: "Liên hệ", href: "#lienhe", icon: Phone }
  ];

  const services = [
    { name: "Taxi trong thành phố", price: "Từ 15.000đ/km", popular: true },
    { name: "Taxi đường dài", price: "Giá ưu đãi", popular: true },
    { name: "Đưa đón sân bay", price: "Từ 200.000đ", popular: false },
    { name: "Taxi hợp đồng", price: "Thỏa thuận", popular: false },
    { name: "Thuê xe du lịch", price: "Từ 1.200.000đ/ngày", popular: true }
  ];

  const achievements = [
    { icon: Award, title: "15+ năm", subtitle: "Kinh nghiệm" },
    { icon: Users, title: "50.000+", subtitle: "Khách hàng" },
    { icon: Car, title: "200+", subtitle: "Xe taxi" },
    { icon: Shield, title: "100%", subtitle: "An toàn" }
  ];

  const certifications = [
    "Giấy phép kinh doanh taxi",
    "Chứng chỉ ISO 9001:2015",
    "Bảo hiểm trách nhiệm nghề nghiệp",
    "Chứng nhận doanh nghiệp uy tín"
  ];

  return (
    <footer id="lienhe" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-primary"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      

      {/* Main Footer */}
      <div className="relative z-10 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">BC</span>
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-white">BICOM</h3>
                  <p className="text-primary font-medium">Sản xuất và Thương mại Dịch vụ</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                CÔNG TY TNHH SẢN XUẤT VÀ THƯƠNG MẠI DỊCH VỤ BICOM - Mã số thuế: 0315360616. 
                Địa chỉ: 3/26 Bình Giã, Phường Tân Bình, TP Hồ Chí Minh, Việt Nam.
              </p>

              {/* Social Media */}
              <div className="flex space-x-3 mb-6">
                <Button size="icon" className="bg-blue-600 hover:bg-blue-700 border-0">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button size="icon" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button size="icon" className="bg-red-600 hover:bg-red-700 border-0">
                  <Youtube className="w-4 h-4" />
                </Button>
                <Button size="icon" className="bg-blue-400 hover:bg-blue-500 border-0">
                  <Zap className="w-4 h-4" />
                </Button>
              </div>

              {/* Certifications */}
              <div>
                <h5 className="font-semibold text-white mb-3">Chứng nhận & Giấy phép</h5>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Liên kết nhanh</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="group flex items-center gap-3 text-gray-300 hover:text-primary transition-all duration-300 py-1"
                    >
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                        <link.icon className="w-4 h-4" />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Dịch vụ & Giá</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {service.popular && (
                          <Star className="w-3 h-3 text-yellow-400" />
                        )}
                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                          {service.name}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-primary font-medium ml-5">{service.price}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Liên hệ 24/7</h4>
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Hotline 24/7</p>
                      <p className="text-primary text-xl font-bold">0823141862</p>
                      <p className="text-xs text-gray-400">Miễn phí cuộc gọi</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300 text-sm">Email</p>
                      <p className="text-white">info@bicom.vn</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300 text-sm">Địa chỉ</p>
                      <p className="text-white">3/26 Bình Giã, Phường Tân Bình, TP Hồ Chí Minh</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300 text-sm">Giờ hoạt động</p>
                      <p className="text-white">24/7 - Tất cả các ngày</p>
                    </div>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-4 border border-primary/20">
                  <h5 className="font-semibold text-white mb-2">Nhận tin khuyến mãi</h5>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Email của bạn"
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button size="sm" className="bg-gradient-primary hover:bg-primary-hover">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 BICOM. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-primary transition-colors">Điều khoản sử dụng</a>
              <a href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</a>
              <a href="#" className="hover:text-primary transition-colors">Hỗ trợ khách hàng</a>
              <a href="#" className="hover:text-primary transition-colors">Tuyển dụng</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;