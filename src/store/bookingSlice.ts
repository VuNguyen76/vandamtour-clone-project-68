import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookingForm {
  from: string;
  to: string;
  date: string;
  time: string;
  passengers: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface BookingState {
  currentBooking: Partial<BookingForm>;
  recentBookings: BookingForm[];
  favoriteRoutes: Array<{ from: string; to: string; label: string }>;
}

const initialState: BookingState = {
  currentBooking: {
    passengers: 1,
  },
  recentBookings: [],
  favoriteRoutes: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    updateBookingForm: (state, action: PayloadAction<Partial<BookingForm>>) => {
      state.currentBooking = { ...state.currentBooking, ...action.payload };
    },
    clearBookingForm: (state) => {
      state.currentBooking = { passengers: 1 };
    },
    addToRecentBookings: (state, action: PayloadAction<BookingForm>) => {
      state.recentBookings.unshift(action.payload);
      state.recentBookings = state.recentBookings.slice(0, 5);
    },
    addFavoriteRoute: (state, action: PayloadAction<{ from: string; to: string; label: string }>) => {
      const exists = state.favoriteRoutes.some(
        route => route.from === action.payload.from && route.to === action.payload.to
      );
      if (!exists) {
        state.favoriteRoutes.push(action.payload);
      }
    },
    removeFavoriteRoute: (state, action: PayloadAction<{ from: string; to: string }>) => {
      state.favoriteRoutes = state.favoriteRoutes.filter(
        route => !(route.from === action.payload.from && route.to === action.payload.to)
      );
    },
  },
});

export const {
  updateBookingForm,
  clearBookingForm,
  addToRecentBookings,
  addFavoriteRoute,
  removeFavoriteRoute,
} = bookingSlice.actions;

export default bookingSlice.reducer;