import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HeaderConfig {
  logo: {
    text: string;
    description: string;
  };
  navigation: {
    items: Array<{ label: string; href: string }>;
  };
  contact: {
    phone: string;
    showPhone: boolean;
    address: string;
    showAddress: boolean;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[] | string;
}

export interface ServicesConfig {
  sectionTitle: string;
  sectionDescription: string;
  services: ServiceItem[];
}

export interface FloatingContactsConfig {
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
}

interface ContentState {
  header: HeaderConfig;
  services: ServicesConfig;
  floatingContacts: FloatingContactsConfig;
}

const initialState: ContentState = {
  header: {
    logo: {
      text: "BICOM",
      description: "Sản xuất và Thương mại Dịch vụ"
    },
    navigation: {
      items: [
        { label: "TRANG CHỦ", href: "/" },
        { label: "DỊCH VỤ", href: "/#dichvu" },
        { label: "BẢNG GIÁ", href: "/#banggia" },
        { label: "TIN TỨC", href: "/news" },
        { label: "LIÊN HỆ", href: "/contact" },
      ]
    },
    contact: {
      phone: "0823141862",
      showPhone: true,
      address: "TP. Hồ Chí Minh, Việt Nam",
      showAddress: true
    }
  },
  services: {
    sectionTitle: "DỊCH VỤ CỦA CHÚNG TÔI",
    sectionDescription: "Chúng tôi cung cấp đa dạng các dịch vụ taxi và vận chuyển chất lượng cao, đáp ứng mọi nhu cầu di chuyển của khách hàng",
    services: [
      {
        id: "taxi-gia-re",
        title: "Taxi Giá Rẻ",
        description: "Dịch vụ taxi giá rẻ, chất lượng cao trong thành phố",
        icon: "taxi-icon.png",
        features: ["Giá cả hợp lý", "Đón đúng giờ", "Xe sạch sẽ"]
      },
      {
        id: "taxi-duong-dai",
        title: "Taxi Đường Dài",
        description: "Dịch vụ taxi đường dài an toàn, thoải mái",
        icon: "long-distance-icon.png",
        features: ["Lái xe kinh nghiệm", "Xe đời mới", "Giá ưu đãi"]
      },
      {
        id: "taxi-hop-dong",
        title: "Taxi Hợp Đồng",
        description: "Dịch vụ taxi theo hợp đồng cho doanh nghiệp",
        icon: "contract-icon.png",
        features: ["Cam kết chất lượng", "Giá ưu đãi", "Dịch vụ chuyên nghiệp"]
      },
      {
        id: "dua-don-san-bay",
        title: "Đưa Đón Sân Bay",
        description: "Dịch vụ đưa đón sân bay nhanh chóng, tiện lợi",
        icon: "airport-icon.png",
        features: ["Đón đúng giờ bay", "Theo dõi chuyến bay", "Hỗ trợ 24/7"]
      }
    ]
  },
  floatingContacts: {
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
  }
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    updateHeader: (state, action: PayloadAction<HeaderConfig>) => {
      state.header = action.payload;
    },
    updateServices: (state, action: PayloadAction<ServicesConfig>) => {
      state.services = action.payload;
    },
    updateFloatingContacts: (state, action: PayloadAction<FloatingContactsConfig>) => {
      state.floatingContacts = action.payload;
    },
  },
});

export const { updateHeader, updateServices, updateFloatingContacts } = contentSlice.actions;
export default contentSlice.reducer;