import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import { HelmetProvider } from "react-helmet-async";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const VaraTjanster = lazy(() => import("./pages/VaraTjanster"));
const OmOss = lazy(() => import("./pages/OmOss"));
const KontaktaOss = lazy(() => import("./pages/KontaktaOss"));
const FAQ = lazy(() => import("./pages/FAQ"));
const BokaKonsultation = lazy(() => import("./pages/BokaKonsultation"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Priser = lazy(() => import("./pages/Priser"));
const PriserAktiebolag = lazy(() => import("./pages/PriserAktiebolag"));
const PriserEnskildFirma = lazy(() => import("./pages/PriserEnskildFirma"));
const Integritetspolicy = lazy(() => import("./pages/Integritetspolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/vara-tjanster" element={<VaraTjanster />} />
              <Route path="/om-oss" element={<OmOss />} />
              <Route path="/kontakta-oss" element={<KontaktaOss />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/boka-konsultation" element={<BokaKonsultation />} />
              <Route path="/priser" element={<Priser />} />
              <Route path="/priser/aktiebolag" element={<PriserAktiebolag />} />
              <Route path="/priser/enskild-firma" element={<PriserEnskildFirma />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/integritetspolicy" element={<Integritetspolicy />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
