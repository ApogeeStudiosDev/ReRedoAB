import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import VaraTjanster from "./pages/VaraTjanster";
import OmOss from "./pages/OmOss";
import KontaktaOss from "./pages/KontaktaOss";
import FAQ from "./pages/FAQ";
import BokaKonsultation from "./pages/BokaKonsultation";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PricingPackages from "./pages/PricingPackages";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vara-tjanster" element={<VaraTjanster />} />
            <Route path="/om-oss" element={<OmOss />} />
            <Route path="/kontakta-oss" element={<KontaktaOss />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/boka-konsultation" element={<BokaKonsultation />} />
            <Route path="/priser" element={<PricingPackages />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
