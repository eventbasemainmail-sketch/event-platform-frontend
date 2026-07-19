import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import ScannerPage from "./pages/ScannerPage";
import AdminDashboard from "./pages/AdminDashboard";
import ManageEvent from "./pages/ManageEvent";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect homepage to Admin Dashboard */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-event" element={<CreateEvent />} />
        <Route path="/admin/events/:id" element={<ManageEvent />} />
        <Route path="/admin/events/:id/edit" element={<EditEvent />} />

        {/* Public Event Pages */}
        <Route path="/event/:slug" element={<LandingPage />} />
        <Route path="/register/:slug" element={<RegistrationPage />} />

        {/* QR Scanner */}
        <Route path="/scanner" element={<ScannerPage />} />

        {/* 404 - Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;