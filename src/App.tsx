import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import DashboardLayout from "./components/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DoctorsPage from "./pages/DoctorsPage";
import NotFoundPage from "./pages/NotFoundPage";
import PatientDashboard from "./pages/PatientDashboard";
import LabResultsCenter from "./pages/LabResultsCenter";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import MedicalRecordsPage from "./pages/MedicalRecordsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import ProfilePage from "./pages/ProfilePage";
import ResourceCenterPage from "./pages/ResourceCenterPage";
import ReportsAnalyticsPage from "./pages/ReportsAnalyticsPage";
import AdminDashboard from "./pages/AdminDashboard";
import TeleconsultationPage from "./pages/TeleconsultationPage";
import VideoCallPage from "./pages/VideoCallPage";
import FinancialHubPage from "./pages/FinancialHubPage";
import DoctorDashboard from "./pages/DoctorDashboard";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route element={<DashboardLayout />}>
              <Route path="/patient-dashboard" element={<PatientDashboard />} />
              <Route path="/lab-results" element={<LabResultsCenter />} />
              <Route path="/doctor-profile/:id" element={<DoctorProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/medical-records" element={<MedicalRecordsPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/resources" element={<ResourceCenterPage />} />
              <Route path="/reports-analytics" element={<ReportsAnalyticsPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/teleconsultation" element={<TeleconsultationPage />} />
              <Route path="/video-call" element={<VideoCallPage />} />
              <Route path="/financial-hub" element={<FinancialHubPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
