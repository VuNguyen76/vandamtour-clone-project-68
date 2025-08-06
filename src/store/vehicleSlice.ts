import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Vehicle {
  id: string;
  name: string;
  label: string;
  price: string;
  description?: string;
  features?: string[];
  enabled: boolean;
  order: number;
}

interface VehicleState {
  vehicles: Vehicle[];
}

const initialState: VehicleState = {
  vehicles: [
    {
      id: "4seats",
      name: "4seats",
      label: "Xe 4 chỗ",
      price: "14k/km",
      description: "Phù hợp cho gia đình nhỏ hoặc nhóm bạn ít người",
      features: ["Tiết kiệm nhiên liệu", "Linh hoạt trong phố"],
      enabled: true,
      order: 1,
    },
    {
      id: "7seats",
      name: "7seats", 
      label: "Xe 7 chỗ",
      price: "18k/km",
      description: "Lý tưởng cho gia đình đông thành viên",
      features: ["Rộng rãi", "Thoải mái"],
      enabled: true,
      order: 2,
    },
    {
      id: "9seats",
      name: "9seats",
      label: "Xe 9 chỗ", 
      price: "22k/km",
      description: "Phù hợp cho nhóm du lịch hoặc công ty",
      features: ["Không gian lớn", "Phù hợp nhóm đông"],
      enabled: true,
      order: 3,
    },
    {
      id: "16seats",
      name: "16seats",
      label: "Xe 16 chỗ",
      price: "Liên hệ",
      description: "Dành cho các chuyến đi nhóm lớn",
      features: ["Chuyên chở nhóm", "Dịch vụ đặc biệt"],
      enabled: true,
      order: 4,
    },
  ],
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    addVehicle: (state, action: PayloadAction<Omit<Vehicle, 'id' | 'order'>>) => {
      const newVehicle: Vehicle = {
        ...action.payload,
        id: Date.now().toString(),
        order: state.vehicles.length + 1,
      };
      state.vehicles.push(newVehicle);
    },
    updateVehicle: (state, action: PayloadAction<Vehicle>) => {
      const index = state.vehicles.findIndex(v => v.id === action.payload.id);
      if (index !== -1) {
        state.vehicles[index] = action.payload;
      }
    },
    deleteVehicle: (state, action: PayloadAction<string>) => {
      state.vehicles = state.vehicles.filter(v => v.id !== action.payload);
    },
    toggleVehicleEnabled: (state, action: PayloadAction<string>) => {
      const vehicle = state.vehicles.find(v => v.id === action.payload);
      if (vehicle) {
        vehicle.enabled = !vehicle.enabled;
      }
    },
    reorderVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload.map((vehicle, index) => ({
        ...vehicle,
        order: index + 1,
      }));
    },
  },
});

export const {
  addVehicle,
  updateVehicle,
  deleteVehicle,
  toggleVehicleEnabled,
  reorderVehicles,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;