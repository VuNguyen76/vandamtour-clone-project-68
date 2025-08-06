import { Phone, Mail, MapPin, Globe, Facebook, MessageCircle } from "lucide-react";

interface FooterPreviewProps {
  config?: {
    company: {
      name: string;
      description: string;
    };
    contact: {
      address: string;
      phone: string;
      email: string;
      website: string;
    };
    services: string[];
    socialLinks: Array<{
      name: string;
      url: string;
      icon: string;
    }>;
    copyright: string;
    additionalInfo: string;
  };
}

const FooterPreview = ({ config }: FooterPreviewProps) => {
  const defaultConfig = {
    company: {
      name: "Vân Đăm Tour",
      description: "Dịch vụ taxi uy tín và chuyên nghiệp tại Đà Lạt. Chúng tôi cam kết mang đến cho khách hàng những chuyến đi an toàn, thoải mái với giá cả hợp lý."
    },
    contact: {
      address: "Đà Lạt, Lâm Đồng",
      phone: "0823141862",
      email: "contact@vandamtour.com",
      website: "www.vandamtour.com"
    },
    services: [
      "Taxi trong thành phố",
      "Taxi đường dài",
      "Taxi hợp đồng",
      "Taxi sân bay"
    ],
    socialLinks: [
      { name: "Facebook", url: "https://facebook.com/vandamtour", icon: "facebook" },
      { name: "Zalo", url: "https://zalo.me/0823141862", icon: "zalo" },
      { name: "Phone", url: "tel:0823141862", icon: "phone" }
    ],
    copyright: "© 2024 Vân Đăm Tour. Tất cả quyền được bảo lưu.",
    additionalInfo: "Giấy phép kinh doanh vận tải số: XXXXX do Sở GTVT Lâm Đồng cấp"
  };

  const footerConfig = config || defaultConfig;

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'zalo':
      case 'message':
        return <MessageCircle className="w-5 h-5" />;
      case 'phone':
        return <Phone className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">{footerConfig.company.name}</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {footerConfig.company.description}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {footerConfig.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
                  title={social.name}
                >
                  {getIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2">
              {footerConfig.services.map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 text-gray-400" />
                <span className="text-gray-300">{footerConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <a 
                  href={`tel:${footerConfig.contact.phone}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {footerConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <a 
                  href={`mailto:${footerConfig.contact.email}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {footerConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">{footerConfig.contact.website}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">{footerConfig.copyright}</p>
            {footerConfig.additionalInfo && (
              <p className="text-gray-400 text-sm">{footerConfig.additionalInfo}</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPreview;