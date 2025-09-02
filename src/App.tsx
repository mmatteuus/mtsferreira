import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OsLayout from "@/pages/os/OsLayout";
import Orders from "@/pages/os/Orders";
import NewOrder from "@/pages/os/NewOrder";
import Clients from "@/pages/os/Clients";
import OrderDetails from "@/pages/os/OrderDetails";
import OrderPrint from "@/pages/os/OrderPrint";
import OrderReceipt from "@/pages/os/OrderReceipt";
import Login from "@/pages/Login";
import { AuthProvider } from "@/features/auth/AuthContext";
import ProtectedRoute from "@/features/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/os" element={<ProtectedRoute><OsLayout /></ProtectedRoute>}>
                <Route index element={<Orders />} />
                <Route path="nova" element={<NewOrder />} />
                <Route path="clientes" element={<Clients />} />
                <Route path=":id" element={<OrderDetails />} />
                <Route path=":id/print" element={<OrderPrint />} />
                <Route path=":id/recibo" element={<OrderReceipt />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
