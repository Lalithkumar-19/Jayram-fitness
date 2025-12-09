
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./Admin/Login";
import AdminLayout from "./Admin/Layout";
import Dashboard from "./Admin/Dashboard";
import Members from "./Admin/Members";
import Expiring from "./Admin/Expiring";
import { AdminProvider } from "./Admin/context/AdminContext";

function App() {
  return (
    <div className="font-vazirmatn text-white">
      <AdminProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="expiring" element={<Expiring />} />
          </Route>
        </Routes>
      </AdminProvider>
    </div>
  );
}

export default App;
