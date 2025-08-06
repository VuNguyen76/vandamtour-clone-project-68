import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import Index from "./pages/Index";

import Contact from "./pages/Contact";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import ContentManagement from "./pages/admin/content/ContentManagement";
import ServicesEdit from "./pages/admin/content/ServicesEdit";
import PricingEdit from "./pages/admin/content/PricingEdit";
import NewsEdit from "./pages/admin/content/NewsEdit";
import TaxiDuongDaiEdit from "./pages/admin/content/TaxiDuongDaiEdit";
import BookingFormEdit from "./pages/admin/content/BookingFormEdit";
import HeaderEdit from "./pages/admin/content/HeaderEdit";
import FooterEdit from "./pages/admin/content/FooterEdit";
import FloatingContactsEdit from "./pages/admin/content/FloatingContactsEdit";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="content" element={<ContentManagement />} />
                <Route path="content/services" element={<ServicesEdit />} />
                <Route path="content/pricing" element={<PricingEdit />} />
                <Route path="content/news" element={<NewsEdit />} />
                <Route path="content/taxi-duong-dai" element={<TaxiDuongDaiEdit />} />
                <Route path="content/booking-form" element={<BookingFormEdit />} />
                <Route path="content/header" element={<HeaderEdit />} />
                <Route path="content/footer" element={<FooterEdit />} />
                <Route path="content/floating-contacts" element={<FloatingContactsEdit />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);

export default App;
