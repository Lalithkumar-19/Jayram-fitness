
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./Admin/Login";
import AdminLayout from "./Admin/Layout";
import Dashboard from "./Admin/Dashboard";
import Members from "./Admin/Members";
import Expiring from "./Admin/Expiring";
import { AdminProvider } from "./Admin/context/AdminContext";

import { Helmet } from "react-helmet-async";

function App() {
  return (
    <div className="font-vazirmatn text-white">
      <Helmet titleTemplate="%s | JayRam Fitness" defaultTitle="JayRam Fitness" />
      <AdminProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Routes */}
          {localStorage.getItem("adminInfo") ? (
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="members" element={<Members />} />
              <Route path="expiring" element={<Expiring />} />
            </Route>
          ) : (
            <Route path="/admin" element={<Navigate to="/admin/login" />} />
          )}
        </Routes>
      </AdminProvider>
    </div>
  );
}

export default App;
