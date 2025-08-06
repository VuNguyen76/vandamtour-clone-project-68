import { Phone, MessageCircle, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingContactsPreviewProps {
  config?: {
    enabled: boolean;
    phone: {
      enabled: boolean;
      number: string;
      showNumber: boolean;
      backgroundColor: string;
      hoverColor: string;
    };
    zalo: {
      enabled: boolean;
      number: string;
      backgroundColor: string;
      hoverColor: string;
      showNotificationDot: boolean;
    };
    scrollToTop: {
      enabled: boolean;
      backgroundColor: string;
      hoverColor: string;
    };
    position: {
      side: string;
      bottomOffset: number;
      sideOffset: number;
    };
  };
}

const FloatingContactsPreview = ({ config }: FloatingContactsPreviewProps) => {
  const defaultConfig = {
    enabled: true,
    phone: {
      enabled: true,
      number: "0823141862",
      showNumber: true,
      backgroundColor: "#22c55e",
      hoverColor: "#16a34a"
    },
    zalo: {
      enabled: true,
      number: "0823141862",
      backgroundColor: "#3b82f6",
      hoverColor: "#2563eb",
      showNotificationDot: true
    },
    scrollToTop: {
      enabled: true,
      backgroundColor: "#6b7280",
      hoverColor: "#4b5563"
    },
    position: {
      side: "right",
      bottomOffset: 20,
      sideOffset: 20
    }
  };

  const contactsConfig = config || defaultConfig;

  if (!contactsConfig.enabled) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Liên hệ nổi đã bị tắt
      </div>
    );
  }

  const positionClass = contactsConfig.position.side === "right" ? "right-0" : "left-0";

  return (
    <div className="relative min-h-[400px] bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Demo content */}
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-4">Xem trước Liên hệ nổi</h3>
        <p className="text-muted-foreground mb-4">
          Các nút liên hệ sẽ xuất hiện ở {contactsConfig.position.side === "right" ? "bên phải" : "bên trái"} màn hình
        </p>
        <div className="space-y-4">
          <p>Cuộn xuống để xem các nút liên hệ nổi...</p>
          <div className="h-32 bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600">Nội dung demo website</p>
          </div>
          <div className="h-32 bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600">Nội dung demo website</p>
          </div>
        </div>
      </div>

      {/* Floating Contacts */}
      <div className="floating-contact">
        {/* Scroll to Top Button */}
        {contactsConfig.scrollToTop.enabled && (
          <Button
            className="floating-btn bg-gray-600 hover:bg-gray-700 animate-fade-in"
            size="icon"
          >
            <ChevronUp className="w-6 h-6" />
          </Button>
        )}

        {/* Zalo Button */}
        {contactsConfig.zalo.enabled && (
          <Button
            className="floating-btn bg-blue-500 hover:bg-blue-600 relative animate-bounce-gentle"
            size="icon"
          >
            <div className="pulse-ring bg-blue-400"></div>
            <MessageCircle className="w-6 h-6" />
            {contactsConfig.zalo.showNotificationDot && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                !
              </span>
            )}
          </Button>
        )}

        {/* Phone Button */}
        <Button
          className="floating-btn bg-green-500 hover:bg-green-600 relative animate-pulse-scale"
          size="icon"
        >
          <div className="pulse-ring bg-green-400"></div>
          <Phone className="w-6 h-6" />
        </Button>

        {/* Phone Number Display */}
        <div className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-bold shadow-lg animate-fade-in hidden md:block">
          {contactsConfig.phone.number}
        </div>
      </div>
    </div>
  );
};

export default FloatingContactsPreview;