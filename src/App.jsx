import {
  BrowserRouter,
  Routes,
  Route
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

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/create-event"
          element={<CreateEvent />}
        />

        <Route
          path="/admin/events/:id"
          element={<ManageEvent />}
        />

        <Route
          path="/admin/events/:id/edit"
          element={<EditEvent />}
        />

        <Route
          path="/event/:slug"
          element={<LandingPage />}
        />

        <Route
          path="/scanner"
          element={<ScannerPage />}
        />

        <Route
          path="/register/:slug"
          element={<RegistrationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;