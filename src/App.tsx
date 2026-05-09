import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EmployeeAttendancePage from "./pages/EmployeeAttendancePage";
import Carrer from "./pages/Carrerpage";
import TermsAndCondition from "./pages/TermsAndcondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UniversalAttendanceDocs from "./pages/UniversalAttendanceDocs";
import DeleteAccount from "./components/DeleteAccount";
import CreateLeadPage from './pages/CreateLeadPage'
import { initPixel, trackPageView } from './analytics/pixel';
import { useEffect } from "react";
import RouteTracker from "./RouteTracker";

const queryClient = new QueryClient();

const App = () => {
    useEffect(() => {
    initPixel();
    trackPageView();
  }, []);
  return (


    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <RouteTracker /> {/* Add RouteTracker to track page views */}
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Employee Attendance Page */}
            <Route path="/attendance" element={<EmployeeAttendancePage />} />
            <Route path="/career" element={<Carrer />} />
            <Route path="/UAI/TermsAndCondition" element={<TermsAndCondition />} />
            <Route path="/UAI/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/UAI/UniversalAttendanceDocs" element={<UniversalAttendanceDocs />} />
            <Route path="/UAI/DeleteAccount" element={<DeleteAccount />} />
            <Route path="/UAI/CreateLeadPage" element={<CreateLeadPage />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>

  )
};

export default App;
